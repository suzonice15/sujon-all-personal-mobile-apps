# 07 — Store Graphics

## Provided assets

| File | Size | Use |
|---|---|---|
| `assets/nari-o-islam-icon-512.png` | 512×512 | Play Store app icon |
| `assets/nari-o-islam-icon-1024.png` | 1024×1024 | Master / press kit |
| `assets/nari-o-islam-feature-graphic-1024x500.png` | 1024×500 | Feature graphic |

The 512 icon is full-bleed (no transparent corners). The artwork shows a hijab silhouette, a crescent and star, an open book, and an ornate gold frame on deep emerald. It survives Google's rounded mask.

Launcher icons were generated from the same source (`Downloads/nari o ilsam.webp`):

```
android/app/src/main/res/mipmap-*/ic_launcher.png                    (48–192 px)
android/app/src/main/res/mipmap-*/ic_launcher_round.png
android/app/src/main/res/mipmap-*/ic_launcher_adaptive_fore.png      (108–432 px)
android/app/src/main/res/mipmap-*/ic_launcher_adaptive_back.png
```

Adaptive background uses an emerald gradient matched to the artwork, with the trimmed artwork as the foreground so the gold frame stays inside the launcher mask.

The splash screen was aligned with the brand: background `#0E4A34` (instead of the previous app colour). On Android 12+ the splash uses a blank icon over the emerald background; on older versions `launch_screen.xml` shows the launcher icon and the app name.

---

## Captured screenshots

**5 screenshots captured from the real app** on a Moto G35 5G (Android 15), 1080×2160 each, with the status bar and navigation bar removed and a branded Bengali caption band on top. No ads and no personal notifications are visible.

```
store/phone-01-home.png          নারীর জন্য ইসলামি শিক্ষা
store/phone-02-topics.png        বিস্তারিত আলোচনা
store/phone-03-article.png       সহজ বাংলা ব্যাখ্যা
store/phone-04-quiz-list.png     ইসলামি কুইজ
store/phone-05-quiz-answer.png   সাথে সাথে সঠিক উত্তর
```

All five are 1080×2160 (2:1), within Play's 320–3840 px limit and the 2:1 aspect ratio rule.

Rules applied:

- Real app only, no mockups, no fake ratings or install counts.
- Ads disabled for the capture build, so no ad appears in any screenshot.
- Status bar cropped out; no personal notifications.
- The placeholder Shop tab is visible only as a tab label; no fake products shown.
- One message per screenshot, 3–6 words, Bengali captions.

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

Recommended phone size: **1080×1920** portrait (this set uses 1080×2160, which Play accepts).

---

## Capturing screenshots from the phone

```powershell
adb shell screencap -p /sdcard/shot1.png
adb pull /sdcard/shot1.png .\store\phone-01-home.png
```

Capture at the device's native resolution and crop the status and navigation bars. Avoid a low battery indicator or personal notifications.

---

## Naming

```
store/
  phone-01-home.png
  phone-02-topics.png
  phone-03-article.png
  phone-04-quiz-list.png
  phone-05-quiz-answer.png
  tablet-7-01.png        (optional)
  tablet-10-01.png       (optional)
```

Keep the source files in this folder so a future update can reuse them.

---

## Feature graphic notes

- The graphic already contains the Bengali title **নারী ও ইসলাম** and the line **নারীর জন্য ইসলামি শিক্ষা**.
- Keep the icon and text within the central area; some Play surfaces crop the outer edges.
- If you edit it, keep the emerald background and the gold palette from the icon so the store and the launcher look like one brand.
