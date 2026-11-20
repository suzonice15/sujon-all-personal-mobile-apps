# 11 — Testing Report

**Build tested:** release AAB, version 1.0 (versionCode 1), signed with the shared upload key
**Date:** 13 November 2026
**Device:** Moto G35 5G (Android 15), wireless ADB — app installed and 5 store screenshots captured

---

## 1. Build verification

| Output | Path | Result |
|---|---|---|
| AAB (upload key) | `appspublished/six-point/build/SixPoint-1.0-release.aab` | 48,695,997 bytes (46.44 MB) |
| Gradle output | `.build-cache/prophet/app/outputs/bundle/release/app-release.aab` | same file |

- Build 1 (new icons): **BUILD SUCCESSFUL in 5m 47s** — 615 tasks.
- Build 2 (splash colour): **BUILD SUCCESSFUL in 36s** — incremental.
- Build 3 (Ads re-enabled, package `com.sixpoint.tabligh`): **BUILD SUCCESSFUL in 55s** — final AAB above.
- R8 printed two Kotlin-metadata parse warnings. They are non-fatal and were present before this change.
- The screenshot build used `ADMOB_ENABLED=false` (no ads in the images). The final AAB has `ADMOB_ENABLED=true` again, verified in `src/config/url.js`.

## 2. Signature

```powershell
keytool -printcert -jarfile SixPoint-1.0-release.aab
```

| Field | Value |
|---|---|
| Owner | `CN=Shahinul Islam Sujon, OU=Software, O=SIS Foundation, L=Dhaka, ST=Dhaka, C=BD` |
| SHA-256 | `8F:18:B6:EC:64:EF:DA:AF:FA:0D:E4:57:9F:CD:CB:DF:7A:5A:01:AE:4B:5C:CE:8A:44:24:3A:51:B8:3F:10:44` |
| Valid | 18 Sep 2026 → 04 Jul 2300 |

Matches the other published apps. **No new keystore was created.**

## 3. Bundle contents

Verified inside the AAB:

| Check | Result |
|---|---|
| Package name | `com.sixpoint.tabligh` |
| `base/res/mipmap-*/ic_launcher.png` | present, 48–192 px, new icon |
| `base/res/mipmap-*/ic_launcher_round.png` | present |
| `base/res/mipmap-*/ic_launcher_adaptive_fore.png` | present, 108–432 px |
| `base/res/mipmap-*/ic_launcher_adaptive_back.png` | present |
| `base/res/mipmap-anydpi-v26/ic_launcher.xml` | present |
| Extracted `ic_launcher.png` from the AAB | Decoded and visually confirmed as the new ছয় নম্বর icon |

## 4. Icon asset verification

All generated densities match the Android requirements and are identical in `apps_photo/six_point` and the project `res` folder (MD5 compared):

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
- Legacy icons keep transparent rounded corners; round icons are circle-masked; adaptive backgrounds are full-bleed.

## 5. What was not tested

| Test | Status |
|---|---|
| Install on a real device | **Done** — release APK (upload-key signed) on Moto G35 5G, Android 15 |
| Home content loads from API | **Done** — গাশতের দাওয়াত ও ছয় সিফাত |
| Article / topic reading | **Done** — ৬টি বিষয়, বাংলা + আরবি হাদিস |
| Quiz answer + explanation | **Done** — question, timer, correct answer highlight |
| Bookmark persistence | **Failed** — bookmark modal opened, but the saved item did not appear in the Bookmarks list |
| Registration / login | Not run |
| Coin earn and withdrawal request | Not run |
| Airplane-mode reading | Not run |
| Ads in release build | Not run (screenshot build had ads disabled) |
| Accessibility / pre-launch report | Not run |

Run the remaining manual pass in section 7 before uploading.

## 6. Known issues to fix before release

1. **Bookmark save did not persist.** On the নামাজ article the bookmark sheet opened, but after tapping সংরক্ষণ করুন the Bookmarks screen still showed "কোনো ফোল্ডার নেই". Check `BookmarkModal` / `bookmarks` DB writes and the folder requirement.
2. **Shop tab shows placeholder data.** `src/screens/product/ProductListScreen.js` uses hard-coded products and Unsplash images; checkout only shows a success screen and does not send an order anywhere. A fake shop in a published app invites "misleading" complaints. Hide the tab or connect real data.
3. **No in-app account deletion.** Play's account-deletion policy expects an easily reachable deletion path. Add a *Delete account* action in Profile and a backend endpoint.
4. **Unused storage permissions.** `READ_EXTERNAL_STORAGE` and `WRITE_EXTERNAL_STORAGE` are declared but not needed. Remove them.
5. **`usesCleartextTraffic="true"`** is enabled although every endpoint is HTTPS. Remove it to match the "encrypted in transit" answer.
6. **No UMP consent dialog.** Either add Google UMP or exclude EEA/UK/Switzerland from distribution.
7. **Reward-flow policy check.** Confirm that coins are only tied to rewarded video and normal activity, never to banner/interstitial clicks.
8. **Screenshots:** 5 real screenshots captured (1080×2160) and saved in `store/`; upload them with the listing.
9. **Store listing text must stay honest.** Keep the coin rate, minimum, fee and the "not a guaranteed income" line in the description.
10. **First upload uses versionCode 1.** Every later upload must increase it.

## 7. Manual pass before upload

- [ ] Install the AAB on a clean device (`adb uninstall com.sixpoint.tabligh` first).
- [ ] Open every top-level topic and 5 random articles.
- [ ] Complete one quiz and restart the app; confirm the result is saved.
- [ ] Bookmark an article, restart, confirm it is still bookmarked.
- [ ] Register a test account; check profile fields, referral code and coin balance.
- [ ] Earn a small number of coins and submit a test withdrawal; confirm it reaches the admin side.
- [ ] Toggle notifications and confirm a local notification appears.
- [ ] Airplane mode: open a saved article and a quiz; confirm no crash.
- [ ] Confirm real ads appear and are not over buttons; do not click them.
- [ ] `adb logcat -s ReactNativeJS:E` is empty.
- [ ] Launcher shows the new icon and the label `ছয় নম্বর`.
- [ ] Splash opens on emerald `#0B3026`, not the old indigo.
