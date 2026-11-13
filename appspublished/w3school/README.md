# CodeNest — Play Store Publishing Kit

**App name (Play title):** `CodeNest: Learn Coding Offline` (30 characters)
**Launcher label:** `CodeNest` (short, so Android does not truncate it)
**Package / applicationId:** `com.codenest.app`
**Version:** `1.0` (versionCode `1`)
**Category:** Education
**Pricing:** Free, contains ads
**Content:** 69 courses · 800 chapters · 2,913 lessons · 3,430 quiz questions · 3,080 interview Q&A

---

## Folder map

| File | Use |
|---|---|
| `01-store-listing.md` | Title, short/full description, Bangla listing, What's new |
| `02-privacy-policy.md` | Privacy policy source text |
| `02-privacy-policy.html` | Ready-to-host privacy policy page |
| `03-data-safety.md` | Exact answers for the Play Data safety form |
| `04-content-rating.md` | IARC questionnaire answers |
| `05-app-content.md` | Ads, app access, target audience, other declarations |
| `06-release-build.md` | Upload keystore, signed AAB, versioning, test tracks |
| `07-store-graphics.md` | Icon, feature graphic and screenshot requirements |
| `08-launch-checklist.md` | Step-by-step Play Console checklist |
| `09-ads-monetization.md` | AdMob setup, app-ads.txt, consent and policy rules |
| `10-support-terms.md` | Support email template, terms and disclaimer |
| `11-testing-report.md` | What was tested and the current results |
| `assets/codenest-icon-512.png` | Play Store icon (512×512, full-bleed) |
| `assets/codenest-icon-1024.png` | Master icon (1024×1024) |
| `assets/codenest-feature-graphic-1024x500.png` | Feature graphic |

---

## Publish in 8 steps

1. **Create the upload keystore** — `06-release-build.md`. Never use `debug.keystore` for Play.
2. **Build a signed AAB** — `./gradlew bundleRelease` → `app-release.aab`.
3. **Host the privacy policy** — upload `02-privacy-policy.html` to a public HTTPS URL.
4. **Create the app in Play Console** — name, default language, app/game, free.
5. **Fill the listing** — `01-store-listing.md` + graphics from `07-store-graphics.md`.
6. **Complete declarations** — Data safety (`03`), content rating (`04`), ads/access/audience (`05`).
7. **Upload to internal testing** first, install from Play, test ads and offline mode.
8. **Promote to production** with a staged rollout (10% → 50% → 100%).

---

## Brand and release changes in this build

- New launcher and adaptive icons (teal gradient + `</>` mark).
- Splash screen aligned to the brand colour `#0F766E`.
- Unused storage permissions removed (only `INTERNET` and `POST_NOTIFICATIONS` remain).
- Display name set to `CodeNest`; Play title is `CodeNest: Learn Coding Offline`.
- Release APK and AAB build successfully (see `build/README.md`).

---

## Must-know before publishing

- **Play title ≠ launcher label.** The store shows the 30-character title; the phone shows `CodeNest`. This is normal and keeps the home screen clean.
- **The installed debug APK and the Play version have different signatures.** Uninstall the debug build before installing from Play, or the install will fail.
- **Never use the debug keystore for Play.** Create a dedicated upload keystore and keep two backups.
- **Do not click your own ads.** Use AdMob test ads during development. Self-clicks can suspend the AdMob account.
- **The "offline" claim applies to lessons, quizzes and interview Q&A.** Ads need a connection; the listing says so.
- **Fill every placeholder** marked `[...]` (email, name, address, dates) before submitting.

---

## Facts used in the forms

| Item | Value |
|---|---|
| applicationId | `com.codenest.app` |
| versionCode / versionName | `1` / `1.0` |
| minSdk / targetSdk / compileSdk | 24 / 36 / 36 |
| Permissions | INTERNET, POST_NOTIFICATIONS |
| AdMob app ID | `ca-app-pub-4817870874747259~4412023883` |
| Ads in release | Yes (banner, interstitial, rewarded, native) |
| Login required | No |
| In-app purchases | No |
| User-generated content | No |
| Data stored on device | Course progress, quiz results, bookmarks, settings (local database) |
| Upload key | `android/app/my-upload-key.keystore`, alias `upload` (shared with the other apps) |
| Key SHA-256 | `8F:18:B6:EC:64:EF:DA:AF:FA:0D:E4:57:9F:CD:CB:DF:7A:5A:01:AE:4B:5C:CE:8A:44:24:3A:51:B8:3F:10:44` |
