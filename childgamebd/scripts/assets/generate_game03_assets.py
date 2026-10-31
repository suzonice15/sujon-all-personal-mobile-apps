"""
Asset generator for Game 3 — শব্দ খোঁজার অভিযান (Guess the Word from Clue).

Reads   src/data/game03_clues.json           (clues, answers, pictures, explanations)
Writes  src/assets/audio/game03/*.mp3         (clue + answer voice clips, prompts)
        src/assets/images/game03/pics/*.webp  (answer pictures not already in Game 1)
        src/assets/images/game03/*.jpg        (crops from the design PDF)
        src/data/game03_assets.generated.js   (static require() maps)

Pictures and spoken words that Game 1 already ships are reused, not duplicated.
Picture codes starting with '#' are drawn as number cards (e.g. '#৯৯৯'), '*' codes are custom
drawings from asset_utils.CUSTOM_PICTURES (e.g. '*doel').

Usage:  python scripts/assets/generate_game03_assets.py [--force-audio]
"""
import argparse
import json
import sys

from asset_utils import (
    CUSTOM_PICTURES,
    FLUENT_LICENSE,
    ROOT,
    crop_to,
    fluent_image,
    make_ui_pictures,
    normalize,
    number_card,
    picture_key,
    save_picture,
    synth_clips,
    to_snake,
)

CONTENT = ROOT / 'src/data/game03_clues.json'
GAME01 = ROOT / 'src/data/game01_letterAdventure.json'
AUDIO_DIR = ROOT / 'src/assets/audio/game03'
IMG_DIR = ROOT / 'src/assets/images/game03'
PIC_DIR = IMG_DIR / 'pics'
GAME01_PICS = ROOT / 'src/assets/images/game01/words'
GAME01_AUDIO = ROOT / 'src/assets/audio/game01'
OUT_JS = ROOT / 'src/data/game03_assets.generated.js'
DESIGN_PAGES = ROOT / 'pdf_pages/03 Guess the Word from Clue'

UI_PICTURES = {'light_bulb': '\U0001f4a1', 'thinking_face': '\U0001f914'}


def clue_entries(data):
    """Yields (track, level_index, item_index, lang, answer, picture, clue, explanation)."""
    for track, info in data['tracks'].items():
        catalog = {w: e for items in info.get('catalog', {}).values() for w, e in items}
        for li, level in enumerate(info['levels']):
            for ii, item in enumerate(level['items']):
                if track == 'gk':
                    answer, _, clue, explain = item[:4]
                    picture = catalog[answer]
                else:
                    answer, picture, clue = item
                    explain = ''
                yield track, li, ii, info['lang'], normalize(answer), picture, normalize(clue), normalize(explain)


def all_pictures(data):
    pics = set()
    for info in data['tracks'].values():
        for level in info['levels']:
            for item in level.get('items', []):
                if len(item) == 3:
                    pics.add(item[1])
            for _, pic in level.get('extras', []):
                pics.add(pic)
        for items in info.get('catalog', {}).values():
            pics.update(pic for _, pic in items)
    return sorted(pics)


def game01_word_clips():
    """{(lang, word): clip key} for words Game 1 already speaks."""
    data = json.loads(GAME01.read_text(encoding='utf-8'))
    found = {}
    for lang in ('bn', 'en'):
        for letter in data[lang]['letters']:
            for i, (word, _) in enumerate(letter['words'], start=1):
                key = f"{letter['id']}_w{i}"
                if (GAME01_AUDIO / f'{key}.mp3').exists():
                    found.setdefault((lang, normalize(word)), key)
    return found


def make_pictures(data):
    PIC_DIR.mkdir(parents=True, exist_ok=True)
    paths = {}
    for pic in all_pictures(data):
        key = picture_key(pic)
        if (GAME01_PICS / f'{key}.webp').exists():
            paths[pic] = f'../assets/images/game01/words/{key}.webp'
            continue
        out = PIC_DIR / f'{key}.webp'
        if not out.exists():
            if pic.startswith('#'):
                img = number_card(pic[1:])
            elif pic in CUSTOM_PICTURES:
                img = CUSTOM_PICTURES[pic]()
            else:
                img = fluent_image(pic)
            save_picture(img, out)
        paths[pic] = f'../assets/images/game03/pics/{key}.webp'
    (PIC_DIR / 'LICENSE-fluentui-emoji.txt').write_text(FLUENT_LICENSE, encoding='utf-8')
    return paths


def make_design_images():
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    crop_to(DESIGN_PAGES / 'page_1.png', (530, 130, 1470, 615), 900, IMG_DIR / 'title_hero.jpg')
    page = DESIGN_PAGES / 'page_2.png'
    crop_to(page, (478, 500, 828, 730), 360, IMG_DIR / 'subject_bn.jpg')
    crop_to(page, (895, 500, 1245, 730), 360, IMG_DIR / 'subject_gk.jpg')
    crop_to(page, (1312, 500, 1662, 730), 360, IMG_DIR / 'subject_en.jpg')
    make_ui_pictures(UI_PICTURES)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--force-audio', action='store_true')
    args = parser.parse_args()

    data = json.loads(CONTENT.read_text(encoding='utf-8'))
    reuse = game01_word_clips()
    jobs, audio = [], {}
    for track, li, ii, lang, answer, _, clue, explain in clue_entries(data):
        base = f'{track}_{li + 1}_{ii + 1}'
        jobs.append((f'{base}_c', clue, lang))
        audio[f'{base}_c'] = f'../assets/audio/game03/{base}_c.mp3'
        spoken = f'{answer}। {explain}' if explain else answer
        if not explain and (lang, answer) in reuse:
            audio[f'{base}_a'] = f"../assets/audio/game01/{reuse[(lang, answer)]}.mp3"
        else:
            jobs.append((f'{base}_a', spoken, lang))
            audio[f'{base}_a'] = f'../assets/audio/game03/{base}_a.mp3'
    for key, text in data['prompts'].items():
        jobs.append((f'p_{to_snake(key)}', text, 'bn'))
        audio[f'p_{to_snake(key)}'] = f'../assets/audio/game03/p_{to_snake(key)}.mp3'

    synth_clips(jobs, AUDIO_DIR, args.force_audio)
    pictures = make_pictures(data)
    make_design_images()

    lines = [
        '// AUTO-GENERATED by scripts/assets/generate_game03_assets.py — do not edit by hand.',
        '/* eslint-disable */',
        '',
        'export const AUDIO = {',
        *[f"  {key}: require('{path}')," for key, path in audio.items()],
        '};',
        '',
        '// Keyed by the picture code used in game03_clues.json.',
        'export const PICTURES = {',
        *[f"  {json.dumps(pic, ensure_ascii=False)}: require('{path}')," for pic, path in pictures.items()],
        '};',
        '',
    ]
    OUT_JS.write_text('\n'.join(lines), encoding='utf-8')
    reused = sum(1 for p in audio.values() if 'game01' in p)
    print(f'Done: {len(jobs)} clips, {reused} reused from Game 1, {len(pictures)} pictures.')


if __name__ == '__main__':
    sys.exit(main())
