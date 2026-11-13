# Store Screenshots — CodeNest

Play Console needs **2–8 phone screenshots**. This folder is where they go.

## Current status

| Asset | Status |
|---|---|
| App icon 512×512 | ✅ `../assets/codenest-icon-512.png` |
| Feature graphic 1024×500 | ✅ `../assets/codenest-feature-graphic-1024x500.png` |
| Phone screenshots | ✅ captured — 6 files in this folder |

## Captured files

| File | Size |
|---|---|
| `phone-01-home.png` | 1080×2160 |
| `phone-02-course.png` | 1080×2160 |
| `phone-03-lesson.png` | 1080×2160 |
| `phone-04-quiz.png` | 1080×2160 |
| `phone-05-interview.png` | 1080×2160 |
| `phone-06-dark.png` | 1080×2160 |

## Specs

- Size: **1080×2160** after crop (within Play's max 2:1 ratio)
- Format: PNG or JPEG, no alpha
- No personal notifications, no low battery, no debug banners
- Same app, real content — do not mock up screens

## Capture

```powershell
# Phone connected with USB debugging
powershell -ExecutionPolicy Bypass -File .\capture-screenshots.ps1
```

The script captures full-screen 1080×2400 shots, then crops the status bar and navigation bar to 1080×2160.

## If you capture manually

```powershell
adb shell screencap -p /sdcard/shot.png
adb pull /sdcard/shot.png .\phone-01-home.png
```

Then crop the top 120 px and bottom 120 px so the file is 1080×2160.
