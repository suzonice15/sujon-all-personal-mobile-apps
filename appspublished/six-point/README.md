# ছয় নম্বর — Play Store Publishing Kit

**App name (Play title):** `ছয় নম্বর - ছয় সিফাত`
**Launcher label:** `ছয় নম্বর`
**Package / applicationId:** `com.sixpoint.tabligh`
**Version:** `1.0` (versionCode `1`)
**Category:** Education
**Pricing:** Free, contains ads
**Content:** ৭টি বিষয় — ছয় সিফাত (কালিমা, নামাজ, ইলম ও জিকির, ইকরামুল মুসলিমিন, ইখলাসে নিয়ত, তাবলিগে দাওয়াত) ও গাশতের দাওয়াত, সাথে ইসলামি কুইজ
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
| `10-support-terms.md` | Support email templates, terms, coin/withdrawal rules, disclaimer |
| `11-testing-report.md` | What was tested and the current results |
| `app-ads.txt` | Ready-to-host AdMob verification file |
| `assets/sixpoint-icon-512.png` | Play Store icon (512×512, full-bleed) |
| `assets/sixpoint-icon-1024.png` | Master icon (1024×1024) |
| `assets/sixpoint-feature-graphic-1024x500.png` | Feature graphic |
| `build/SixPoint-1.0-release.aab` | Signed release bundle for Play upload |
| `store/phone-01…05.png` | 5 captured store screenshots (1080×2160) |

---

## Publish in 8 steps

1. **Reuse the existing upload key** — no new keystore. See `06-release-build.md`.
2. **Build a signed AAB** — `./gradlew bundleRelease` → `app-release.aab` (already built: `build/SixPoint-1.0-release.aab`).
3. **Host the privacy policy** — upload `02-privacy-policy.html` to a public HTTPS URL.
4. **Create the app in Play Console** — name, default language Bengali, app, free.
5. **Fill the listing** — `01-store-listing.md` + graphics from `07-store-graphics.md`.
6. **Complete declarations** — Data safety (`03`), content rating (`04`), ads/access/audience (`05`).
7. **Upload to internal testing** first, install from Play, test reading, quiz, ads and reward flow.
8. **Promote to production** with a staged rollout (10% → 50% → 100%).

---

## Brand and release changes in this build

- New launcher, round and adaptive icons: deep emerald background, gold mosque dome, open book and Bengali title **ছয় নম্বর**.
- Splash screen colour changed from the old indigo `#4F46E5` to the brand emerald `#0B3026`.
- `applicationId` set to `com.sixpoint.tabligh`; app label `ছয় নম্বর`.
- AdMob app id `ca-app-pub-4817870874747259~5627894444` wired in the manifest and `app.json`.
- Release AAB built and signed with the shared upload key (SHA-256 verified).
- 5 store screenshots captured from the real app at 1080×2160 with Bengali captions.

---

## Must-know before publishing

- **Play title ≠ launcher label.** The store shows the longer title; the phone shows `ছয় নম্বর`. This is normal.
- **No new keystore is needed.** This app reuses `my-upload-key.keystore`, alias `upload`, the same key as the other apps.
- **The reward programme must be explained honestly.** ১০০ কয়েন = ৳১, সর্বনিম্ন উইথড্র ৳১০০, ফি ৳৫. Do not promise income in the listing.
- **Do not click your own ads.** Use test ads in debug builds. Self-clicks can suspend AdMob.
- **Fill every placeholder** marked `[...]` (address, website, dates) before submitting.
- **The Shop tab still shows placeholder products.** See `11-testing-report.md` — hide it or wire real data before release.

---

## Facts used in the forms

| Item | Value |
|---|---|
| applicationId | `com.sixpoint.tabligh` |
| versionCode / versionName | `1` / `1.0` |
| minSdk / targetSdk / compileSdk | 24 / 36 / 36 |
| Permissions declared | INTERNET, POST_NOTIFICATIONS, READ/WRITE_EXTERNAL_STORAGE (legacy, unused) |
| AdMob app ID | `ca-app-pub-4817870874747259~5627894444` |
| Ads in release | Yes (banner, interstitial, rewarded, native) |
| Login required | No — account is optional; earning uses a device ID |
| In-app purchases | No |
| User-generated content | No |
| Data stored on device | Bookmarks, coins ledger, withdrawal history, settings, quiz results (SQLite) |
| Data sent to server | Account details (only if registered), device ID, coin/withdrawal records, referral records |
| Backend | `https://education.tablighshop.com/api` |
| Upload key | `android/app/my-upload-key.keystore`, alias `upload` (shared with the other apps) |
| Key SHA-256 | `8F:18:B6:EC:64:EF:DA:AF:FA:0D:E4:57:9F:CD:CB:DF:7A:5A:01:AE:4B:5C:CE:8A:44:24:3A:51:B8:3F:10:44` |
| Support email | `suzonice15@gmail.com` |
