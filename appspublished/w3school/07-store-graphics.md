# 07 — Store Graphics

## Provided assets

| File | Size | Use |
|---|---|---|
| `assets/codenest-icon-512.png` | 512×512 | Play Store app icon |
| `assets/codenest-icon-1024.png` | 1024×1024 | Master / press kit |
| `assets/codenest-feature-graphic-1024x500.png` | 1024×500 | Feature graphic |

The 512 icon is full-bleed (no transparent corners) with a teal gradient and the `</>` mark, so it survives Google's rounded mask.

Launcher icons were also regenerated in the app:

```
android/app/src/main/res/mipmap-*/ic_launcher.png            (48–192 px)
android/app/src/main/res/mipmap-*/ic_launcher_round.png
android/app/src/main/res/mipmap-*/ic_launcher_adaptive_fore.png   (108–432 px)
android/app/src/main/res/mipmap-*/ic_launcher_adaptive_back.png
```

The splash screen was also aligned with the brand: background `#0F766E` and the `</>` mark as the Android 12 splash icon.

Rebuild the app to see the new launcher icon.

---

## Captured screenshots

6 phone screenshots are ready in `store/` at 1080×2160:

```
store/phone-01-home.png
store/phone-02-course.png
store/phone-03-lesson.png
store/phone-04-quiz.png
store/phone-05-interview.png
store/phone-06-dark.png
```

All were captured from the real app with the status bar and navigation bar cropped out. No ads are visible.

---

## Play Store requirements

| Asset | Requirement |
|---|---|
| App icon | 512×512, 32-bit PNG, max 1 MB, no transparency |
| Feature graphic | 1024×500, PNG or JPEG, no transparency, no critical text near edges |
| Phone screenshots | 2–8 images, 16:9 or 9:16, min 320 px, max 3840 px |
| 7-inch tablet | 2–8 images, recommended 1200×1920 |
| 10-inch tablet | 2–8 images, recommended 1600×2560 |
| Promo video | Optional, YouTube URL |

Recommended phone size: **1080×1920** portrait.

---

## Screenshot plan (6 images)

| # | Screen | Caption overlay |
|---|---|---|
| 1 | Home with learning paths and course grid | **69 complete courses** |
| 2 | Course detail with chapters | **From beginner to advanced** |
| 3 | Lesson with code block | **Real code, short lessons** |
| 4 | Quiz with explanation | **3,430 quiz questions** |
| 5 | Interview question with answer open | **3,080 interview Q&A** |
| 6 | Dark mode or progress screen | **Track progress. Works offline.** |

Rules:

- Keep text within the middle 80%; Play crops edges in some layouts.
- Use one message per screenshot, 3–6 words.
- Show the real app, not a mockup. Reviewers compare.
- No competitor logos, no "best app" claims, no fake ratings.
- Use the same teal brand colour for caption bars.

---

## Capturing screenshots from the phone

```powershell
adb shell screencap -p /sdcard/shot1.png
adb pull /sdcard/shot1.png .\store\shot1.png
```

Capture at 1080×1920 (most phones) or resize afterwards without stretching. Avoid the status bar showing a low battery or personal notifications.

---

## Naming

```
store/
  icon-512.png
  feature-graphic-1024x500.png
  phone-01-home.png
  phone-02-course.png
  phone-03-lesson.png
  phone-04-quiz.png
  phone-05-interview.png
  phone-06-progress.png
  tablet-7-01.png
  tablet-10-01.png
```

Keep the source files in this folder so a future update can reuse them.
