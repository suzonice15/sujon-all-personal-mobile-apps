"""
Shared helpers for the kids' game asset generators (scripts/assets/generate_gameNN_assets.py).

- synth_clips():  Bangla / English voice clips via Microsoft Edge neural voices (edge-tts)
- fluent_image(): 3D pictures from Microsoft Fluent Emoji (MIT), cached in the temp folder
- save_picture(): resize + WebP export used for every bundled picture

Internet is only needed while a generator runs; the app uses the generated files offline.

Requirements (scratch venv is fine):  pip install pillow edge-tts miniaudio lameenc
"""
import asyncio
import json
import tempfile
import unicodedata
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
COMMON_IMG_DIR = ROOT / 'src/assets/images/common'

FONT_BN = 'C:/Windows/Fonts/NirmalaB.ttf'
FONT_EN = 'C:/Windows/Fonts/ARLRDBD.TTF'

VOICE = {'bn': 'bn-BD-NabanitaNeural', 'en': 'en-US-AnaNeural'}
RATE = {'bn': '-12%', 'en': '-15%'}

# Precomposed forms keep String.includes() checks reliable (ড় ঢ় য়).
NUKTA_FIX = [('\u09A1\u09BC', '\u09DC'), ('\u09A2\u09BC', '\u09DD'), ('\u09AF\u09BC', '\u09DF')]


def normalize(text):
    for src, dst in NUKTA_FIX:
        text = text.replace(src, dst)
    return text


def to_snake(name):
    return ''.join('_' + c.lower() if c.isupper() else c for c in name)


# ---------------------------------------------------------------- voice clips

COMPRESS_RATE = 22050  # Hz, mono
COMPRESS_KBPS = 32


def compress_mp3(path):
    """Re-encodes a 48 kbps edge-tts clip to 32 kbps / 22 kHz mono (about a third smaller, still clear speech)."""
    import lameenc
    import miniaudio

    decoded = miniaudio.decode_file(
        str(path), output_format=miniaudio.SampleFormat.SIGNED16, nchannels=1, sample_rate=COMPRESS_RATE)
    encoder = lameenc.Encoder()
    encoder.set_bit_rate(COMPRESS_KBPS)
    encoder.set_in_sample_rate(COMPRESS_RATE)
    encoder.set_channels(1)
    encoder.set_quality(2)
    path.write_bytes(encoder.encode(bytes(decoded.samples)) + encoder.flush())


def synth_clips(jobs, out_dir, force=False, compress=True):
    """jobs: iterable of (key, text, lang). Writes out_dir/<key>.mp3, skipping existing files.
    New clips are compressed with compress_mp3() unless compress=False (needs miniaudio + lameenc)."""
    import edge_tts

    out_dir.mkdir(parents=True, exist_ok=True)

    async def run():
        sem = asyncio.Semaphore(6)

        async def synth(key, text, lang):
            out = out_dir / f'{key}.mp3'
            if out.exists() and not force:
                return
            async with sem:
                for attempt in range(3):
                    try:
                        await edge_tts.Communicate(text, VOICE[lang], rate=RATE[lang]).save(str(out))
                        if compress:
                            compress_mp3(out)
                        return
                    except Exception as exc:  # network hiccups — retry
                        if attempt == 2:
                            raise RuntimeError(f'TTS failed for {key}: {exc}') from exc
                        await asyncio.sleep(1.5)

        await asyncio.gather(*(synth(*job) for job in jobs))

    asyncio.run(run())


# ---------------------------------------------------------------- Fluent 3D pictures

FLUENT_TREE = 'https://api.github.com/repos/microsoft/fluentui-emoji/git/trees/main?recursive=1'
FLUENT_RAW = 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/'
FLUENT_CACHE = Path(tempfile.gettempdir()) / 'fluentui-emoji-cache'
PICTURE_SIZE = 220

# Fluent folder names follow CLDR short names, which sometimes differ from Unicode names.
FLUENT_NAMES = {
    '\u2600': 'Sun', '\u2696': 'Balance scale', '\u2753': 'Red question mark', '\u2b50': 'Star',
    '\U0001f32a': 'Tornado', '\U0001f33e': 'Sheaf of rice', '\U0001f355': 'Pizza',
    '\U0001f381': 'Wrapped gift', '\U0001f3e0': 'House', '\U0001f3ee': 'Red paper lantern',
    '\U0001f411': 'Ewe', '\U0001f42a': 'Camel', '\U0001f438': 'Frog', '\U0001f43b': 'Bear',
    '\U0001f453': 'Glasses', '\U0001f45f': 'Running shoe', '\U0001f4a8': 'Dashing away',
    '\U0001f4b5': 'Dollar banknote', '\U0001f512': 'Locked', '\U0001f522': 'Input numbers',
    '\U0001f54a': 'Dove', '\U0001f58a': 'Pen', '\U0001f58d': 'Crayon', '\U0001f5bc': 'Framed picture',
    '\U0001f682': 'Locomotive', '\U0001f6d2': 'Shopping cart', '\U0001f92b': 'Shushing face',
    '\U0001f941': 'Drum', '\U0001f976': 'Cold face', '\U0001f981': 'Lion', '\U0001f984': 'Unicorn',
    '\U0001f98a': 'Fox', '\U0001f992': 'Giraffe', '\U0001f993': 'Zebra', '\U0001f9c2': 'Salt',
    '\U0001f9d9': 'Old man', '\U0001f9f6': 'Yarn', '\U0001f5e3': 'Speaking head',
    '\U0001f50d': 'Magnifying glass tilted left', '\U0001f31f': 'Glowing star',
    '\u2705': 'Check mark button', '\u274c': 'Cross mark', '\u23f0': 'Alarm clock',
    '0\u20e3': 'Keycap 0', '1\u20e3': 'Keycap 1', '6\u20e3': 'Keycap 6',
    '\u260e': 'Telephone', '\u265f': 'Chess pawn', '\u26a1': 'High voltage', '\u26d1': 'Rescue workers helmet',
    '\u2702': 'Scissors', '\u2764': 'Red heart', '\U0001f30d': 'Globe showing europe-africa',
    '\U0001f32c': 'Wind face', '\U0001f33d': 'Ear of corn', '\U0001f346': 'Eggplant', '\U0001f392': 'Backpack',
    '\U0001f3ca': 'Person swimming', '\U0001f3cd': 'Motorcycle', '\U0001f3cf': 'Cricket game',
    '\U0001f3d3': 'Ping pong', '\U0001f3d4': 'Snow-capped mountain', '\U0001f3f8': 'Badminton',
    '\U0001f4a1': 'Light bulb', '\U0001f4bb': 'Laptop', '\U0001f526': 'Flashlight', '\U0001f53a': 'Red triangle',
    '\U0001f7e0': 'Orange circle', '\U0001f7e6': 'Blue square', '\U0001f93c': 'Person wrestling',
    '\U0001f95d': 'Kiwi fruit', '\U0001f975': 'Hot face', '\U0001f9fc': 'Soap',
    '♻': 'Recycling symbol', '🕶': 'Sunglasses', '🚰': 'Potable water',
    '🟫': 'Brown square', '🪓': 'Axe', '♨': 'Hot springs',
    # Profession sequences (person + ZWJ + object).
    '\U0001f9d1\u200d\u2695': 'Health worker', '\U0001f9d1\u200d\u2708': 'Pilot',
    '\U0001f9d1\u200d\U0001f33e': 'Farmer', '\U0001f9d1\u200d\U0001f373': 'Cook',
    '\U0001f9d1\u200d\U0001f3a4': 'Singer', '\U0001f9d1\u200d\U0001f3a8': 'Artist',
    '\U0001f9d1\u200d\U0001f3eb': 'Teacher', '\U0001f9d1\u200d\U0001f527': 'Mechanic',
    '\U0001f9d1\u200d\U0001f52c': 'Scientist', '\U0001f9d1\u200d\U0001f680': 'Astronaut',
    '\U0001f9d1\u200d\U0001f692': 'Firefighter',
}

FLUENT_LICENSE = """Pictures in this folder are from Microsoft Fluent Emoji (3D style),
https://github.com/microsoft/fluentui-emoji - resized and converted to WebP.
The Bangladesh flag and the Bangla number cards were drawn by the generator script.

MIT License

Copyright (c) Microsoft Corporation.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""


def picture_key(picture):
    return 'pic_' + '_'.join(f'{ord(c):x}' for c in picture if c != '\ufe0f')


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'childgamebd-asset-generator'})
    with urllib.request.urlopen(req, timeout=60) as res:
        return res.read()


_paths = None


def fluent_paths():
    global _paths
    if _paths is None:
        FLUENT_CACHE.mkdir(parents=True, exist_ok=True)
        cached = FLUENT_CACHE / 'tree.json'
        if not cached.exists():
            cached.write_bytes(fetch(FLUENT_TREE))
        _paths = {item['path'] for item in json.loads(cached.read_text(encoding='utf-8'))['tree']}
    return _paths


def fluent_image(glyph):
    base = glyph.replace('\ufe0f', '')
    name = FLUENT_NAMES.get(base) or unicodedata.name(base).capitalize()
    paths = fluent_paths()
    # Plain 3D art first; for people/hands prefer the medium skin tone.
    for variant in ('3D/', 'Medium/3D/', 'Default/3D/'):
        found = sorted(p for p in paths if p.startswith(f'assets/{name}/{variant}') and p.endswith('.png'))
        if found:
            cache = FLUENT_CACHE / found[0].replace('/', '__')
            if not cache.exists():
                cache.write_bytes(fetch(FLUENT_RAW + urllib.parse.quote(found[0])))
            return Image.open(cache).convert('RGBA')
    raise RuntimeError(f'No Fluent 3D picture for {glyph!r} (looked for "{name}")')


def number_card(text):
    """Yellow rounded card with a big red Bangla number, sized like the Fluent pictures."""
    from PIL import ImageDraw, ImageFont

    img = Image.new('RGBA', (256, 256), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((22, 30, 238, 230), 44, fill=(0, 0, 0, 40))
    d.rounded_rectangle((16, 22, 232, 222), 44, fill=(255, 197, 49, 255))
    d.rounded_rectangle((16, 22, 232, 90), 44, fill=(255, 220, 120, 255))
    size = {1: 150, 2: 120, 3: 92}.get(len(text), 76)
    font = ImageFont.truetype(FONT_BN, size)
    box = d.textbbox((0, 0), text, font=font, stroke_width=8)
    x = (248 - (box[2] - box[0])) / 2 - box[0]
    y = (244 - (box[3] - box[1])) / 2 - box[1]
    d.text((x, y), text, font=font, fill=(240, 56, 79, 255), stroke_width=8, stroke_fill=(255, 255, 255, 255))
    return img


def trim_picture(img, pad=0.08):
    """Crops away empty transparent borders and re-centres the art on a square canvas."""
    box = img.getchannel('A').point(lambda a: 255 if a > 16 else 0).getbbox()
    if not box:
        return img
    art = img.crop(box)
    side = int(max(art.size) * (1 + pad * 2))
    canvas = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    canvas.paste(art, ((side - art.width) // 2, (side - art.height) // 2))
    return canvas


def doel_picture():
    """Bangladesh's magpie robin (দোয়েল): Fluent's pink bird recoloured black with a white belly and wing."""
    import colorsys
    from PIL import ImageDraw, ImageFilter

    img = fluent_image('🐦')
    w, h = img.size
    belly = Image.new('L', (w, h), 0)
    ImageDraw.Draw(belly).ellipse((w * 0.12, h * 0.55, w * 0.58, h * 0.86), fill=255)
    belly = belly.filter(ImageFilter.GaussianBlur(w * 0.03)).load()
    px = img.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if not a:
                continue
            hue, light, sat = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
            if sat > 0.25 and (hue > 0.83 or hue < 0.03):  # the pink body; beak, legs and eye stay
                white = max(min(1, max(0, (light - 0.58) / 0.08)), belly[x, y] / 255)
                dark = 28 + light * 80
                v = dark + (244 - dark) * white
                px[x, y] = (int(v), int(v), int(min(255, v + 5)), a)
    return img


# Picture codes starting with '*' are custom drawings.
CUSTOM_PICTURES = {'*doel': doel_picture}


def save_picture(img, out, size=PICTURE_SIZE):
    img = trim_picture(img.convert('RGBA'))
    img.thumbnail((size, size), Image.LANCZOS)
    img.save(out, 'WEBP', quality=86, method=6)


def make_ui_pictures(pictures):
    """pictures: {file_name: glyph} -> src/assets/images/common/<file_name>.webp"""
    COMMON_IMG_DIR.mkdir(parents=True, exist_ok=True)
    for name, glyph in pictures.items():
        out = COMMON_IMG_DIR / f'{name}.webp'
        if not out.exists():
            save_picture(fluent_image(glyph), out)
    (COMMON_IMG_DIR / 'LICENSE-fluentui-emoji.txt').write_text(FLUENT_LICENSE, encoding='utf-8')


def crop_to(src, box, width, out, quality=84):
    """Crop a region of a design image and save it as a JPEG of the given width."""
    img = Image.open(src).convert('RGB').crop(box)
    img.resize((width, int(width * img.height / img.width)), Image.LANCZOS).save(out, quality=quality, optimize=True)
