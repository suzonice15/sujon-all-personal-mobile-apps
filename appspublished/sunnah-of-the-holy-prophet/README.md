# রাসূল ﷺ এর সুন্নাহ — Play Store Publishing Kit

**App name (Play title):** `রাসূল ﷺ এর সুন্নাহ`
**Launcher label:** `প্রিয় নবীর সুন্নাহ`
**Package / applicationId:** `com.prophetsunnat2`
**Version:** `1.0` (versionCode `1`)
**Category:** Education
**Pricing:** Free, contains ads
**Content:** দৈনন্দিন জীবনের ২৫টি বিষয়ে সুন্নাহ — আকীদাহ, পবিত্রতা, সালাত, কুরআন, যিকির ও দোয়া, রোজা, যাকাত, হজ্জ, খাওয়া-দাওয়া, পোশাক, ঘুম, পরিবার, সামাজিক আচরণ, আখলাক, ব্যবসা, সফর, ঘর, অসুস্থতা, দাওয়াত, বিশেষ দিন, নারী, শিশু, মৃত্যু ও আখিরাত, নবী ﷺ-এর ব্যক্তিগত জীবন, নিষিদ্ধ বিষয় — সাথে ইসলামি কুইজ
**Default language:** Bengali (Bangladesh) — `bn-BD`

> **New Play app:** the previous `com.prophetsunnat` upload key (`SHA1 9F:1F:B7:...`) is not available on this machine and the app is not enrolled in Play App Signing, so the old package cannot be updated.
> This build is published as a **new app** with package **`com.prophetsunnat2`**. The old app can be deleted/unpublished from Play Console; the old package name stays reserved forever.

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
| `assets/sunnah-of-the-holy-prophet-icon-512.png` | Play Store icon (512×512, full-bleed) |
| `assets/sunnah-of-the-holy-prophet-icon-1024.png` | Master icon (1024×1024) |
| `assets/sunnah-of-the-holy-prophet-feature-graphic-1024x500.png` | Feature graphic |
| `store/phone-01…05.png` | 5 captured store screenshots (1080×2160) |
| `build/ProphetsSunnah-1.0-release.aab` | Signed release bundle for Play upload |

---

## Publish in 8 steps

1. **Reuse the existing upload key** — no new keystore. See `06-release-build.md`.
2. **Build a signed AAB** — `./gradlew bundleRelease` (already built: `build/ProphetsSunnah-1.0-release.aab`).
3. **Host the privacy policy** — upload `02-privacy-policy.html` to a public HTTPS URL.
4. **Create the app in Play Console** — name, default language Bengali, app, free.
5. **Fill the listing** — `01-store-listing.md` + graphics from `07-store-graphics.md`.
6. **Complete declarations** — Data safety (`03`), content rating (`04`), ads/access/audience (`05`).
7. **Upload to internal testing** first, install from Play, test reading, quiz, ads and reward flow.
8. **Promote to production** with a staged rollout (10% → 50% → 100%).

---

## Brand and release changes in this build

- New launcher, round and adaptive icons generated from `Downloads/sunnat.jpg` — book with crescent, miswak and tasbih, gold frame on emerald.
- Splash screen colour set to `#10513A`.
- `applicationId` set to `com.prophetsunnat2`; launcher label `প্রিয় নবীর সুন্নাহ`.
- AdMob app id `ca-app-pub-4817870874747259~9388140084` wired in the manifest and `app.json`.
- Release AAB built and signed with the shared upload key (SHA-256 verified).
- 5 store screenshots captured from the real app at 1080×2160 with Bengali captions.

---

## Must-know before publishing

- **Play title ≠ launcher label.** The store shows **রাসূল ﷺ এর সুন্নাহ**; the phone shows **প্রিয় নবীর সুন্নাহ**. This is intentional and keeps the home screen label short.
- **No new keystore is needed.** This app reuses `my-upload-key.keystore`, alias `upload`, the same key as the other apps.
- **The reward programme must be explained honestly.** ১০০ কয়েন = ৳১, সর্বনিম্ন উইথড্র ৳১০০, ফি ৳৫. Do not promise income in the listing.
- **Do not click your own ads.** Use test ads in debug builds. Self-clicks can suspend AdMob.
- **Fill every placeholder** marked `[...]` (address, website, dates) before submitting.
- **The Shop tab still shows placeholder products.** See `11-testing-report.md` — hide it or wire real data before release.

---

## Content (from the live API)

1. আকীদাহ ও ঈমান
2. পবিত্রতা (তাহারাত)
3. সালাত
4. কুরআন
5. যিকির ও দোয়া
6. রোজা
7. যাকাত ও সদকা
8. হজ্জ ও উমরাহ
9. খাওয়া-দাওয়া
10. পোশাক ও সৌন্দর্য
11. ঘুম ও বিশ্রাম
12. পরিবার
13. সামাজিক আচরণ
14. উত্তম চরিত্র (আখলাক)
15. ব্যবসা ও লেনদেন
16. সফর
17. ঘর ও গৃহস্থালি
18. অসুস্থতা ও চিকিৎসা
19. দাওয়াত ও শিক্ষা
20. বিশেষ দিন ও সময়
21. নারী বিষয়ক সুন্নাহ
22. শিশু বিষয়ক সুন্নাহ
23. মৃত্যু ও আখিরাত
24. নবী ﷺ-এর ব্যক্তিগত জীবন
25. নিষিদ্ধ ও বর্জনীয় বিষয়

Quiz uses the shared `islamic-quize` category set.

---

## Facts used in the forms

| Item | Value |
|---|---|
| applicationId | `com.prophetsunnat2` |
| versionCode / versionName | `1` / `1.0` |
| minSdk / targetSdk / compileSdk | 24 / 36 / 36 |
| Permissions declared | INTERNET, POST_NOTIFICATIONS, READ/WRITE_EXTERNAL_STORAGE (legacy, unused) |
| AdMob app ID | `ca-app-pub-4817870874747259~9388140084` |
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
