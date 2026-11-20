# নারী ও ইসলাম — Play Store Publishing Kit

**App name (Play title):** `নারী ও ইসলাম - ইসলামি শিক্ষা`
**Launcher label:** `নারী ও ইসলাম`
**Package / applicationId:** `com.narioislam`
**Version:** `1.0` (versionCode `1`)
**Category:** Education
**Pricing:** Free, contains ads
**Content:** ৮টি বিষয় — ইসলামে নারীর মর্যাদা, নারী ও ঈমান, নারীর ইবাদত, নারীর বিশেষ মাসআলা, পর্দা ও শালীনতা, বিবাহ ও দাম্পত্য জীবন, মা ও মাতৃত্ব, কন্যা ও নারী হিসেবে জীবন — সাথে ইসলামি কুইজ
**Default language:** Bengali (Bangladesh) — `bn-BD`

---

## Folder map

| File | Use |
|---|---|
| `01-store-listing.md` | Title, short/full description, English custom listing, What's new |
| `02-privacy-policy.md` | Privacy policy source text |
| `02-privacy-policy.html` | Ready-to-host privacy policy page |
| `03-data-safety.md` | Exact answers for the Play Data safety form |
| `04-content-rating.md` | IARC questionnaire answers |
| `05-app-content.md` | Ads, app access, target audience, other declarations |
| `06-release-build.md` | Upload keystore, signed AAB, versioning, test tracks |
| `07-store-graphics.md` | Icon, feature graphic and screenshot requirements |
| `08-launch-checklist.md` | Step-by-step Play Console checklist |
| `09-ads-monetization.md` | AdMob setup, mediation, app-ads.txt and policy rules |
| `10-support-terms.md` | Support templates, terms, coin/withdrawal rules, disclaimer |
| `11-testing-report.md` | What was tested and the current results |
| `app-ads.txt` | Ready-to-host AdMob verification file |
| `assets/nari-o-islam-icon-512.png` | Play Store icon (512×512, full-bleed) |
| `assets/nari-o-islam-icon-1024.png` | Master icon (1024×1024) |
| `assets/nari-o-islam-feature-graphic-1024x500.png` | Feature graphic |
| `store/phone-01…05.png` | 5 captured store screenshots (1080×2160) |
| `build/NariOIslam-1.0-release.aab` | Signed release bundle for Play upload |

---

## Publish in 8 steps

1. **Reuse the existing upload key** — no new keystore. See `06-release-build.md`.
2. **Build a signed AAB** — `./gradlew bundleRelease` (already built: `build/NariOIslam-1.0-release.aab`).
3. **Host the privacy policy** — upload `02-privacy-policy.html` to a public HTTPS URL.
4. **Create the app in Play Console** — name, default language Bengali, app, free.
5. **Fill the listing** — `01-store-listing.md` + graphics from `07-store-graphics.md`.
6. **Complete declarations** — Data safety (`03`), content rating (`04`), ads/access/audience (`05`).
7. **Upload to internal testing** first, install from Play, test reading, quiz, ads and reward flow.
8. **Promote to production** with a staged rollout (10% → 50% → 100%).

---

## Brand and release changes in this build

- New launcher, round and adaptive icons generated from `Downloads/nari o ilsam.webp` — hijab silhouette, crescent, open book, gold frame on emerald.
- Splash screen colour set to the brand emerald `#0E4A34`.
- `applicationId` set to `com.narioislam`; app label `নারী ও ইসলাম`.
- AdMob app id `ca-app-pub-4817870874747259~4342732930` wired in the manifest and `app.json`.
- Release AAB built and signed with the shared upload key (SHA-256 verified).
- 5 store screenshots captured from the real app at 1080×2160 with Bengali captions.

---

## Must-know before publishing

- **Play title ≠ launcher label.** The store shows the longer title; the phone shows `নারী ও ইসলাম`. This is normal.
- **No new keystore is needed.** This app reuses `my-upload-key.keystore`, alias `upload`, the same key as the other apps.
- **The reward programme must be explained honestly.** ১০০ কয়েন = ৳১, সর্বনিম্ন উইথড্র ৳১০০, ফি ৳৫. Do not promise income in the listing.
- **Do not click your own ads.** Use test ads in debug builds. Self-clicks can suspend AdMob.
- **Fill every placeholder** marked `[...]` (address, website, dates) before submitting.
- **The Shop tab still shows placeholder products.** See `11-testing-report.md` — hide it or wire real data before release.

---

## Content (from the live API)

1. ইসলামে নারীর মর্যাদা
2. নারী ও ঈমান
3. নারীর ইবাদত
4. নারীর বিশেষ মাসআলা
5. পর্দা ও শালীনতা
6. বিবাহ ও দাম্পত্য জীবন
7. মা ও মাতৃত্ব
8. কন্যা ও নারী হিসেবে জীবন

Quiz uses the shared `islamic-quize` category set (আল-কুরআন, হাদিস, যাকাত, হালাল ও হারাম, পিতা-মাতার অধিকার, কিয়ামত …).

---

## Facts used in the forms

| Item | Value |
|---|---|
| applicationId | `com.narioislam` |
| versionCode / versionName | `1` / `1.0` |
| minSdk / targetSdk / compileSdk | 24 / 36 / 36 |
| Permissions declared | INTERNET, POST_NOTIFICATIONS, READ/WRITE_EXTERNAL_STORAGE (legacy, unused) |
| AdMob app ID | `ca-app-pub-4817870874747259~4342732930` |
| Ads in release | Yes (banner, interstitial, rewarded, native) |
| Login required | No — account is optional; earning uses a device ID |
| In-app purchases | No |
| User-generated content | No |
| Data stored on device | Bookmarks, coin ledger, withdrawal history, settings, quiz results (SQLite) |
| Data sent to server | Account details (only if registered), device ID, coin/withdrawal records, referral records |
| Backend | `https://education.tablighshop.com/api` |
| Upload key | `android/app/my-upload-key.keystore`, alias `upload` (shared with the other apps) |
| Key SHA-256 | `8F:18:B6:EC:64:EF:DA:AF:FA:0D:E4:57:9F:CD:CB:DF:7A:5A:01:AE:4B:5C:CE:8A:44:24:3A:51:B8:3F:10:44` |
| Support email | `suzonice15@gmail.com` |
