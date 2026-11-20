# 08 — Launch Checklist

Work top to bottom. Each item has the exact value or file to use.

## A. Before Play Console

- [x] Reuse the existing upload key (`my-upload-key.keystore`, alias `upload`) — no new keystore.
- [ ] Back up keystore + passwords in two places (if not already done).
- [x] Set `applicationId` to `com.sixpoint.tabligh`, label `ছয় নম্বর`, AdMob app id.
- [x] New launcher / adaptive / round icons generated and included in the AAB.
- [x] Splash colour changed to brand emerald `#0B3026`.
- [x] Build a signed AAB — `build/SixPoint-1.0-release.aab` (upload-key signed, signature verified).
- [ ] Host `02-privacy-policy.html` at a public HTTPS URL.
- [ ] Confirm the support email `suzonice15@gmail.com` receives mail.
- [ ] Check the name is free on Play and there is no trademark conflict.
- [x] 5 phone screenshots captured from the real app (`store/`, see `07-store-graphics.md`).
- [ ] **Hide or finish the Shop tab** — it still shows placeholder products (`11-testing-report.md`).
- [ ] Add an in-app **Delete account** action (`05-app-content.md`).
- [ ] Remove `READ/WRITE_EXTERNAL_STORAGE` and `usesCleartextTraffic` from the manifest, then rebuild.

## B. Play Console setup

- [ ] Create developer account and complete identity verification.
- [ ] Accept the Developer Programme Policies.
- [ ] Create app: name `ছয় নম্বর - ছয় সিফাত`, language Bengali (bn-BD), App, Free.
- [ ] Set package name `com.sixpoint.tabligh` (cannot change later).
- [ ] Enrol in Play App Signing.

## C. Store listing

- [ ] Title: `ছয় নম্বর - ছয় সিফাত` (21 characters).
- [ ] Short description: `ছয় সিফাত, কালিমা, নামাজ, ইলম ও জিকির — বাংলায় ইসলামি শিক্ষা ও কুইজ।`
- [ ] Full description from `01-store-listing.md`.
- [ ] App icon: `assets/sixpoint-icon-512.png`.
- [ ] Feature graphic: `assets/sixpoint-feature-graphic-1024x500.png`.
- [ ] Upload 6 phone screenshots with Bengali captions.
- [ ] Category: Education. Tags: Education, Islam.
- [ ] Contact email `suzonice15@gmail.com` and website.
- [ ] Optional English custom listing from `01-store-listing.md`.
- [ ] What's new from `01-store-listing.md`.

## D. App content

- [ ] **Privacy policy** URL saved and reachable in incognito.
- [ ] **Ads:** Yes.
- [ ] **App access:** all functionality available without restrictions.
- [ ] **Content rating:** complete questionnaire (`04`). Expect Everyone / 3+.
- [ ] **Target audience:** 18 and over only.
- [ ] **Data safety:** answers from `03`.
- [ ] **Data deletion:** email `suzonice15@gmail.com` + local clear/uninstall + in-app button.
- [ ] **News app:** No. **COVID:** No. **Government:** No.
- [ ] **Financial features:** none of the listed categories; reward programme disclosed in the listing.
- [ ] **Advertising ID:** declared as used.

## E. Release

- [ ] Upload AAB to **Internal testing**.
- [ ] Add your own account as a tester.
- [ ] Install from Play on a clean device (uninstall the debug build first).
- [ ] Verify: home topics open, article text, quiz answer + explanation, bookmark, notification.
- [ ] Register a test account and verify profile, referral code and coin balance.
- [ ] Test one small withdrawal end-to-end (or confirm the admin side handles it).
- [ ] Verify ads appear and do **not** click them.
- [ ] Airplane mode: open a saved topic and a quiz; confirm no crash.
- [ ] Check `adb logcat -s ReactNativeJS:E` shows no error.
- [ ] Run the pre-launch report; fix crashes, ANRs and accessibility warnings.
- [ ] Promote to Closed testing → Open testing (optional) → Production.
- [ ] Start a staged rollout at 10%, then 50%, then 100%.

## F. After launch

- [ ] Watch crash rate and ANR rate for 48 hours.
- [ ] Read the first reviews; reply to every substantive one.
- [ ] Check AdMob impressions and invalid-traffic warnings.
- [ ] Host `app-ads.txt` on the developer website (`09-ads-monetization.md`).
- [ ] Check that withdrawal requests are being processed and paid.
- [ ] Plan version 1.1: add content, fix the top complaint.

---

## Review timeline

| Stage | Typical time |
|---|---|
| Internal testing | Minutes to a few hours |
| Closed/open testing | 1–3 days |
| Production (first release) | 3–7 days |
| Updates | 1–3 days |

New accounts, religious content and cash-reward apps often take longer on the first review.

---

## Do not submit if

- The privacy URL is broken or requires a login.
- The app declares "no ads" but shows ads.
- Data safety says "no data collected" while AdMob and accounts are present.
- The Shop tab still shows fake products, or the app promises guaranteed income.
- There is no way to request account deletion.
- The app crashes on a clean install.
- The upload is signed with the debug keystore.
