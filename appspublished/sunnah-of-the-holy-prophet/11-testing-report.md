# 11 — Testing Report

**Build tested:** release AAB + release APK, version 1.0 (versionCode 1), signed with the shared upload key
**Date:** 13 November 2026
**Device:** Moto G35 5G (Android 15), wireless ADB

---

## 1. Build verification

| Output | Path | Result |
|---|---|---|
| AAB (upload key) | `appspublished/sunnah-of-the-holy-prophet/build/ProphetsSunnah-1.0-release.aab` | 49,393,896 bytes (47.11 MB) |
| Gradle output | `.build-cache/prophet/app/outputs/bundle/release/app-release.aab` | same file |

- AAB build: **BUILD SUCCESSFUL in 2m 3s** — 615 tasks.
- Screenshot APK (ads off): **BUILD SUCCESSFUL in 57s**.
- The final AAB is the ads-on build from the same source state; `ADMOB_ENABLED=true` was restored afterwards.
- R8 printed two Kotlin-metadata parse warnings. They are non-fatal and pre-existing.

## 2. Signature

```powershell
keytool -printcert -jarfile ProphetsSunnah-1.0-release.aab
```

| Field | Value |
|---|---|
| Owner | `CN=Shahinul Islam Sujon, OU=Software, O=SIS Foundation, L=Dhaka, ST=Dhaka, C=BD` |
| SHA-256 | `8F:18:B6:EC:64:EF:DA:AF:FA:0D:E4:57:9F:CD:CB:DF:7A:5A:01:AE:4B:5C:CE:8A:44:24:3A:51:B8:3F:10:44` |
| Valid | 18 Sep 2026 → 04 Jul 2300 |

Matches the other published apps. **No new keystore was created.**

## 3. Bundle contents

| Check | Result |
|---|---|
| Package name | `com.prophetsunnat2` |
| Old package `com.narioislam` present | No |
| AdMob app id in manifest | `ca-app-pub-4817870874747259~9388140084` |
| `mipmap-*/ic_launcher.png` (48–192) | Present, new artwork |
| `mipmap-*/ic_launcher_round.png` | Present |
| `mipmap-*/ic_launcher_adaptive_fore/back.png` (108–432) | Present |
| Icon pixels vs `apps_photo/prophet_sunnat` | Identical |

## 4. Icon assets

| Density | Legacy | Adaptive |
|---|---|---|
| mdpi | 48×48 | 108×108 |
| hdpi | 72×72 | 162×162 |
| xhdpi | 96×96 | 216×216 |
| xxhdpi | 144×144 | 324×324 |
| xxxhdpi | 192×192 | 432×432 |

- Play icon: 512×512, 32-bit PNG, no transparency.
- Master: 1024×1024.
- Feature graphic: 1024×500, no transparency.

## 5. On-device checks

| Test | Status |
|---|---|
| Install on a real device | **Done** — release APK, upload-key signed |
| App label and launch | **Done** — launcher label `প্রিয় নবীর সুন্নাহ`, in-app header `রাসূল ﷺ এর সুন্নাহ` |
| Home categories load from API | **Done** — 25 categories |
| Category → topic list | **Done** — আকীদাহ, সালাত, খাওয়া-দাওয়া etc. |
| Article reading | **Done** — e.g. তাওহীদ, খাওয়ার আগে (10 sunnah points) |
| Quiz list | **Done** — 8 categories, 100–220 questions each |
| Quiz question + correct answer | **Done** — timer, green correct-answer highlight |
| Ad rendering | Not checked in this session (screenshot build had ads off) |
| Registration / login | Not run |
| Coin earn and withdrawal request | Not run |
| Airplane-mode reading | Not run |
| Bookmark persistence | Not run for this app (known issue in shared code) |
| Accessibility / pre-launch report | Not run |

> First launch happened while the phone screen was asleep; the home list stayed empty with a "Network request failed" log. After waking the device and restarting, all 25 categories loaded normally. Consider showing a retry button when the first load fails.

## 6. Known issues to fix before release

1. **Empty home on a failed first fetch.** Add a retry/empty-state instead of a blank list.
2. **Bookmark save did not persist in the shared code.** On the six-point build the bookmark sheet opened but the Bookmarks list stayed empty. Check `BookmarkModal` / `bookmarks` DB writes.
3. **Shop tab shows placeholder data.** `src/screens/product/ProductListScreen.js` uses hard-coded products and Unsplash images; checkout does not send an order anywhere. Hide the tab or connect real data.
4. **No in-app account deletion.** Play's account-deletion policy expects an easily reachable deletion path. Add a *Delete account* action in Profile and a backend endpoint.
5. **Unused storage permissions.** `READ_EXTERNAL_STORAGE` and `WRITE_EXTERNAL_STORAGE` are declared but not needed. Remove them.
6. **`usesCleartextTraffic="true"`** is enabled although every endpoint is HTTPS. Remove it.
7. **No UMP consent dialog.** Either add Google UMP or exclude EEA/UK/Switzerland from distribution.
8. **Reward-flow policy check.** Coins must only be tied to rewarded video and normal activity, never banner/interstitial clicks.
9. **Store listing text must stay honest.** Keep the coin rate, minimum, fee and the "not a guaranteed income" line. The content is educational, not a fatwa.
10. **First upload uses versionCode 1.** Every later upload must increase it.

## 7. Manual pass before upload

- [ ] Install the AAB on a clean device (`adb uninstall com.prophetsunnat2` first).
- [ ] Open all 25 home categories and 5 random articles.
- [ ] Complete one quiz and restart the app; confirm the result is saved.
- [ ] Bookmark an article, restart, confirm it is still bookmarked.
- [ ] Register a test account; check profile fields, referral code and coin balance.
- [ ] Earn a small number of coins and submit a test withdrawal; confirm it reaches the admin side.
- [ ] Toggle notifications and confirm a local notification appears.
- [ ] Airplane mode: open a saved article and a quiz; confirm no crash.
- [ ] Confirm real ads appear and are not over buttons; do not click them.
- [ ] `adb logcat -s ReactNativeJS:E` is empty.
- [ ] Launcher shows the new icon and the label `প্রিয় নবীর সুন্নাহ`.
- [ ] Splash opens on emerald `#10513A`.
