"""
Asset generator for Game 1 — বর্ণ ও শব্দের অ্যাডভেঞ্চার (Letter & Word Adventure).

Reads   src/data/game01_letterAdventure.json  (single source of truth for content)
Writes  src/assets/audio/game01/*.mp3          (Bangla + English voice clips)
        src/assets/audio/common/pop.wav         (soft button click)
        src/assets/images/game01/trace/*.png    (finger-tracing guides + clipping stencils)
        src/assets/images/game01/words/*.webp   (word pictures)
        src/assets/images/common/*.webp         (shared game UI pictures: mascots, leaves...)
        src/assets/images/game01/*.jpg          (background + crops from the design PDF)
        src/data/game01_assets.generated.js     (static require() map + tracing hit-grids)

The app only uses the generated files — nothing is fetched at runtime.
Voice clips are synthesised once with Microsoft Edge neural voices, and pictures come from
Microsoft Fluent Emoji 3D (MIT licence, github.com/microsoft/fluentui-emoji); both need
internet only while this script runs. Existing mp3/picture files are kept, so re-running is
cheap; pass --force-audio to regenerate the voice clips.

Usage (Python 3.10+, Windows fonts Nirmala UI + Arial Rounded):
    pip install pillow edge-tts miniaudio lameenc
    python scripts/assets/generate_game01_assets.py
"""
import argparse
import json
import math
import random
import struct
import sys
import wave
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

from asset_utils import (
    FLUENT_LICENSE,
    FONT_BN,
    FONT_EN,
    fluent_image,
    make_ui_pictures,
    normalize,
    picture_key,
    save_picture,
    synth_clips,
    to_snake,
)

ROOT = Path(__file__).resolve().parents[2]
CONTENT = ROOT / 'src/data/game01_letterAdventure.json'
AUDIO_DIR = ROOT / 'src/assets/audio/game01'
COMMON_AUDIO_DIR = ROOT / 'src/assets/audio/common'
IMG_DIR = ROOT / 'src/assets/images/game01'
TRACE_DIR = IMG_DIR / 'trace'
WORD_IMG_DIR = IMG_DIR / 'words'
OUT_JS = ROOT / 'src/data/game01_assets.generated.js'
DESIGN_PAGES = ROOT / 'pdf_pages/01 Letter & Word Adventure UI'
COVER = ROOT / 'src/assets/games/game_01.jpg'

TRACE_SIZE = 384
TRACE_GRID = 12
PAD_BG = (255, 253, 248)  # must match TracePad's background colour
GUIDE_FILL = (236, 228, 214)
GUIDE_BORDER = (206, 190, 168)

# Fluent folder names follow CLDR short names, which sometimes differ from Unicode names.
# Pictures with no Fluent equivalent are drawn here instead.
DRAWN_PICTURES = {'\U0001f1e7\U0001f1e9': 'flag_bd', '\u09e7\u09ec': 'number', '\u09ec\u09e6': 'number'}

# Shared UI pictures used by the game kit (src/components/game) and screens.
UI_PICTURES = {
    'mascot_giraffe': '\U0001f992', 'mascot_penguin': '\U0001f427', 'leaf': '\U0001f33f',
    'speaking_head': '\U0001f5e3', 'pencil': '\u270f', 'trophy': '\U0001f3c6',
    'party': '\U0001f389', 'muscle': '\U0001f4aa',
}

# Precomposed forms keep String.includes() checks reliable (ড় ঢ় য়).
def load_content():
    data = json.loads(CONTENT.read_text(encoding='utf-8'))
    for lang in ('bn', 'en'):
        for letter in data[lang]['letters']:
            letter['char'] = normalize(letter['char'])
            letter['words'] = [[normalize(w), e] for w, e in letter['words']]
    return data


# ---------------------------------------------------------------- audio

def audio_jobs(data):
    jobs = []
    for lang in ('bn', 'en'):
        for letter in data[lang]['letters']:
            jobs.append((letter['id'], letter.get('speak', letter['char'] + '.'), lang))
            for i, (word, _) in enumerate(letter['words'], start=1):
                jobs.append((f"{letter['id']}_w{i}", word, lang))
    for key, text in data['prompts'].items():
        jobs.append((f'p_{to_snake(key)}', text, 'bn'))
    return jobs


def make_pop_sound():
    """Short, soft 'pop' for taps (synthesised so it has no licensing strings)."""
    COMMON_AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    rate, dur = 22050, 0.09
    frames = bytearray()
    for n in range(int(rate * dur)):
        t = n / rate
        freq = 880 - 4200 * t  # quick downward chirp
        env = math.exp(-t * 45)
        frames += struct.pack('<h', int(14000 * env * math.sin(2 * math.pi * freq * t)))
    with wave.open(str(COMMON_AUDIO_DIR / 'pop.wav'), 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes(bytes(frames))


# ---------------------------------------------------------------- tracing guides

def glyph_mask(text, font_path):
    font = ImageFont.truetype(font_path, 620)
    canvas = Image.new('L', (1600, 1200), 0)
    ImageDraw.Draw(canvas).text((300, 150), text, font=font, fill=255)
    bbox = canvas.getbbox()
    if not bbox:
        raise RuntimeError(f'Font cannot render {text!r}')
    glyph = canvas.crop(bbox)
    box = int(TRACE_SIZE * 0.78)
    scale = min(box / glyph.width, box / glyph.height)
    glyph = glyph.resize((max(1, int(glyph.width * scale)), max(1, int(glyph.height * scale))), Image.LANCZOS)
    mask = Image.new('L', (TRACE_SIZE, TRACE_SIZE), 0)
    mask.paste(glyph, ((TRACE_SIZE - glyph.width) // 2, (TRACE_SIZE - glyph.height) // 2))
    return mask


def trace_images(mask):
    """Guide = grey letter to trace over. Stencil = pad colour everywhere except the letter;
    it is drawn above the child's ink so the ink only shows inside the letter (a solid fill)."""
    dilated = mask.filter(ImageFilter.MaxFilter(9))
    ring = ImageChops.subtract(dilated, mask)

    guide = Image.new('RGBA', mask.size, (0, 0, 0, 0))
    guide.paste(GUIDE_FILL + (255,), (0, 0), dilated)

    stencil = Image.new('RGBA', mask.size, PAD_BG + (255,))
    stencil.putalpha(ImageChops.invert(mask))
    stencil.paste(GUIDE_BORDER + (255,), (0, 0), ring)
    return guide, stencil


def trace_grid(mask):
    cell = TRACE_SIZE / TRACE_GRID
    ink = [[False] * TRACE_GRID for _ in range(TRACE_GRID)]
    px = mask.load()
    for r in range(TRACE_GRID):
        for c in range(TRACE_GRID):
            x0, y0 = int(c * cell), int(r * cell)
            x1, y1 = int((c + 1) * cell), int((r + 1) * cell)
            total = covered = 0
            for y in range(y0, y1, 2):
                for x in range(x0, x1, 2):
                    total += 1
                    covered += px[x, y] > 128
            ink[r][c] = covered / total >= 0.18
    out = []
    for r in range(TRACE_GRID):
        for c in range(TRACE_GRID):
            if ink[r][c]:
                out.append('1')
            elif any(
                0 <= r + dr < TRACE_GRID and 0 <= c + dc < TRACE_GRID and ink[r + dr][c + dc]
                for dr in (-1, 0, 1) for dc in (-1, 0, 1)
            ):
                out.append('2')
            else:
                out.append('0')
    return ''.join(out)


def make_trace_assets(data):
    TRACE_DIR.mkdir(parents=True, exist_ok=True)
    grids = {}
    for lang in ('bn', 'en'):
        for letter in data[lang]['letters']:
            if lang == 'bn':
                mask = glyph_mask(letter['char'], FONT_BN)
            else:
                mask = glyph_mask(letter['char'] + letter['char'].lower(), FONT_EN)
            guide, stencil = trace_images(mask)
            guide.quantize(colors=16, method=Image.Quantize.FASTOCTREE).save(TRACE_DIR / f"{letter['id']}.png", optimize=True)
            stencil.quantize(colors=16, method=Image.Quantize.FASTOCTREE).save(TRACE_DIR / f"{letter['id']}_stencil.png", optimize=True)
            grids[letter['id']] = trace_grid(mask)
    return grids


# ---------------------------------------------------------------- background + design crops

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def hill(draw, base_y, amp, waves, phase, color, width, height):
    pts = [(0, height)]
    for x in range(0, width + 10, 10):
        y = base_y + amp * math.sin(x / width * math.pi * waves + phase)
        pts.append((x, y))
    pts.append((width, height))
    draw.polygon(pts, fill=color)


def make_background():
    rnd = random.Random(7)
    W, H = 1080, 1920
    img = Image.new('RGB', (W, H))
    d = ImageDraw.Draw(img)
    top, mid = (110, 192, 245), (214, 241, 255)
    for y in range(H):
        d.line([(0, y), (W, y)], fill=lerp(top, mid, min(1, y / 1150)))

    glow = Image.new('L', (W, H), 0)
    ImageDraw.Draw(glow).ellipse((700, 120, 1000, 420), fill=255)
    glow = glow.filter(ImageFilter.GaussianBlur(70))
    img.paste((255, 244, 200), (0, 0), glow)

    clouds = Image.new('L', (W, H), 0)
    cd = ImageDraw.Draw(clouds)
    for cx, cy, s in [(180, 300, 1.0), (620, 180, 0.8), (880, 560, 0.9), (330, 720, 0.7)]:
        for dx, dy, r in [(-90, 10, 60), (-30, -30, 80), (50, -10, 70), (110, 15, 55), (10, 30, 70)]:
            cd.ellipse((cx + dx * s - r * s, cy + dy * s - r * s, cx + dx * s + r * s, cy + dy * s + r * s), fill=235)
    img.paste((255, 255, 255), (0, 0), clouds.filter(ImageFilter.GaussianBlur(5)))

    layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    hill(ld, 1080, 60, 2.2, 0.4, (150, 200, 220, 255), W, H)  # distant blue hills
    hill(ld, 1180, 45, 3.0, 1.7, (156, 210, 130, 255), W, H)
    for _ in range(14):  # tree line
        x, y = rnd.randint(0, W), rnd.randint(1150, 1230)
        r = rnd.randint(34, 56)
        ld.ellipse((x - r, y - r * 1.4, x + r, y + r * 0.6), fill=(88, 160, 82, 255))
        ld.ellipse((x - r * 0.7, y - r * 1.25, x + r * 0.2, y - r * 0.45), fill=(116, 186, 98, 255))
    hill(ld, 1290, 35, 2.5, 3.1, (118, 190, 92, 255), W, H)
    img = Image.alpha_composite(img.convert('RGBA'), layer).convert('RGB')

    d = ImageDraw.Draw(img)
    for y in range(1330, H):
        d.line([(0, y), (W, y)], fill=lerp((140, 205, 98), (92, 168, 70), (y - 1330) / (H - 1330)))
    hill(d, 1340, 20, 1.6, 0.2, (140, 205, 98), W, H)
    for _ in range(140):  # little flowers
        x, y = rnd.randint(0, W), rnd.randint(1380, H - 10)
        r = rnd.randint(4, 8)
        color = rnd.choice([(255, 255, 255), (255, 230, 120), (255, 170, 200), (255, 255, 255)])
        d.ellipse((x - r, y - r, x + r, y + r), fill=color)
    img = img.filter(ImageFilter.GaussianBlur(1.2))
    img.save(IMG_DIR / 'bg_adventure.jpg', quality=80, optimize=True, progressive=True)


def rounded(img, radius):
    mask = Image.new('L', img.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, img.width - 1, img.height - 1), radius, fill=255)
    out = img.convert('RGBA')
    out.putalpha(mask)
    return out


def make_design_crops():
    cover = Image.open(COVER).convert('RGB')
    hero = cover.crop((300, 150, 1372, 590))
    hero.resize((900, int(900 * hero.height / hero.width)), Image.LANCZOS).save(
        IMG_DIR / 'title_hero.jpg', quality=84, optimize=True)

    page = Image.open(DESIGN_PAGES / 'page_2.png').convert('RGB')
    for name, box in [('lang_bangla.jpg', (430, 345, 930, 780)), ('lang_english.jpg', (1000, 345, 1500, 780))]:
        crop = page.crop(box)
        crop.resize((420, int(420 * crop.height / crop.width)), Image.LANCZOS).save(
            IMG_DIR / name, quality=85, optimize=True)


# ---------------------------------------------------------------- pictures

def drawn_picture(glyph):
    img = Image.new('RGBA', (256, 256), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if DRAWN_PICTURES[glyph] == 'flag_bd':
        d.rounded_rectangle((26, 58, 238, 196), 14, fill=(0, 0, 0, 40))
        d.rounded_rectangle((20, 50, 232, 188), 14, fill=(0, 106, 78, 255))
        d.ellipse((76, 74, 166, 164), fill=(244, 42, 65, 255))
        d.rounded_rectangle((20, 50, 232, 80), 14, fill=(255, 255, 255, 38))
        return img
    d.rounded_rectangle((22, 30, 238, 230), 44, fill=(0, 0, 0, 40))
    d.rounded_rectangle((16, 22, 232, 222), 44, fill=(255, 197, 49, 255))
    d.rounded_rectangle((16, 22, 232, 90), 44, fill=(255, 220, 120, 255))
    font = ImageFont.truetype(FONT_BN, 120)
    box = d.textbbox((0, 0), glyph, font=font, stroke_width=8)
    x = (248 - (box[2] - box[0])) / 2 - box[0]
    y = (244 - (box[3] - box[1])) / 2 - box[1]
    d.text((x, y), glyph, font=font, fill=(240, 56, 79, 255), stroke_width=8, stroke_fill=(255, 255, 255, 255))
    return img


def make_pictures(data):
    WORD_IMG_DIR.mkdir(parents=True, exist_ok=True)
    word_files = {}
    for lang in ('bn', 'en'):
        for letter in data[lang]['letters']:
            for i, (_, glyph) in enumerate(letter['words'], start=1):
                key = picture_key(glyph)
                out = WORD_IMG_DIR / f'{key}.webp'
                if not out.exists():
                    base = glyph.replace('\ufe0f', '')
                    img = drawn_picture(base) if base in DRAWN_PICTURES else fluent_image(glyph)
                    save_picture(img, out)
                word_files[f"{letter['id']}_w{i}"] = key
    make_ui_pictures(UI_PICTURES)
    (WORD_IMG_DIR / 'LICENSE-fluentui-emoji.txt').write_text(FLUENT_LICENSE, encoding='utf-8')
    return word_files


# ---------------------------------------------------------------- JS map

def write_js(data, grids, word_files):
    lines = [
        '// AUTO-GENERATED by scripts/assets/generate_game01_assets.py — do not edit by hand.',
        '/* eslint-disable */',
        '',
        'export const AUDIO = {',
    ]
    for key, _, _ in audio_jobs(data):
        lines.append(f"  {key}: require('../assets/audio/game01/{key}.mp3'),")
    lines += ['};', '', 'export const WORD_IMAGES = {']
    for word_id, key in word_files.items():
        lines.append(f"  {word_id}: require('../assets/images/game01/words/{key}.webp'),")
    lines += ['};', '', 'export const TRACE_IMAGES = {']
    for lang in ('bn', 'en'):
        for letter in data[lang]['letters']:
            lines.append(f"  {letter['id']}: require('../assets/images/game01/trace/{letter['id']}.png'),")
    lines += ['};', '', 'export const TRACE_STENCILS = {']
    for lang in ('bn', 'en'):
        for letter in data[lang]['letters']:
            lines.append(f"  {letter['id']}: require('../assets/images/game01/trace/{letter['id']}_stencil.png'),")
    lines += ['};', '', f'export const TRACE_GRID_SIZE = {TRACE_GRID};', '',
              '// Per cell: 1 = letter stroke, 2 = next to stroke (allowed), 0 = outside.',
              'export const TRACE_GRIDS = {']
    for key, grid in grids.items():
        lines.append(f"  {key}: '{grid}',")
    lines += ['};', '']
    OUT_JS.write_text('\n'.join(lines), encoding='utf-8')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--force-audio', action='store_true')
    parser.add_argument('--skip-audio', action='store_true')
    args = parser.parse_args()

    data = load_content()
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    if not args.skip_audio:
        synth_clips(audio_jobs(data), AUDIO_DIR, args.force_audio)
    make_pop_sound()
    grids = make_trace_assets(data)
    word_files = make_pictures(data)
    make_background()
    make_design_crops()
    write_js(data, grids, word_files)
    print(f'Done: {len(audio_jobs(data))} clips, {len(grids)} trace guides.')


if __name__ == '__main__':
    sys.exit(main())
