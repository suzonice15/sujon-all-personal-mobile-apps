# 08 — Launch Checklist

Work top to bottom. Each item has the exact value or file to use.

## A. Before Play Console

- [x] Reuse the existing upload key (`my-upload-key.keystore`, alias `upload`) — no new keystore needed.
- [x] Back up keystore + passwords in two places. (Do this if not already done.)
- [x] Remove unused storage permissions from `AndroidManifest.xml`. (Done: only INTERNET and POST_NOTIFICATIONS remain.)
- [x] Bump `versionCode` to `1` for the first upload.
- [x] Build a signed AAB — `build/CodeNest-1.0-release.aab` (upload-key signed).
- [ ] Host `02-privacy-policy.html` at a public HTTPS URL.
- [ ] Create `support@yourdomain.com` (or use an existing address).
- [ ] Reserve `codenest.app` or another domain for the privacy URL.
- [ ] Check the name is free on Play (search "CodeNest") and there is no obvious trademark conflict.
- [ ] Prepare 6 phone screenshots (`07-store-graphics.md`).

## B. Play Console setup

- [ ] Create developer account and complete identity verification.
- [ ] Accept the Developer Programme Policies.
- [ ] Create app: name `CodeNest: Learn Coding Offline`, language English (US), App, Free.
- [ ] Set package name `com.codenest.app` (cannot change later).
- [ ] Enrol in Play App Signing.

## C. Store listing

- [ ] Title: `CodeNest: Learn Coding Offline` (30 chars).
- [ ] Short description: `Learn coding offline: 69 courses, quizzes and interview Q&A in one app.`
- [ ] Full description from `01-store-listing.md`.
- [ ] App icon: `assets/codenest-icon-512.png`.
- [ ] Feature graphic: `assets/codenest-feature-graphic-1024x500.png`.
- [ ] Upload 6 phone screenshots with captions.
- [ ] Category: Education. Tags: Education, Programming.
- [ ] Contact email and website.
- [ ] Add Bangla custom listing (optional).
- [ ] What's new from `01-store-listing.md`.

## D. App content

- [ ] **Privacy policy** URL saved and reachable in incognito.
- [ ] **Ads:** Yes.
- [ ] **App access:** all functionality available without restrictions.
- [ ] **Content rating:** complete questionnaire (`04`). Expect Everyone / 3+.
- [ ] **Target audience:** 13+. Do not select under 13.
- [ ] **Data safety:** answers from `03`.
- [ ] **Data deletion:** email `[EMAIL]` + local clear/uninstall.
- [ ] **News app:** No. **COVID:** No. **Government:** No.
- [ ] **Financial features:** none.
- [ ] **Advertising ID:** declared as used.
- [ ] **Photo/video permissions:** remove unused storage permissions first.

## E. Release

- [ ] Upload AAB to **Internal testing**.
- [ ] Add your own account as a tester.
- [ ] Install from Play on a clean device (uninstall the debug build first).
- [ ] Verify: 69 courses, lesson, quiz, interview answer, dark mode, settings.
- [ ] Verify ads appear and do **not** click them.
- [ ] Turn on airplane mode and open a lesson, a quiz and an interview question.
- [ ] Check `adb logcat -s ReactNativeJS:E` shows no error.
- [ ] Run the pre-launch report; fix crashes, ANRs and accessibility warnings.
- [ ] Promote to Closed testing → Open testing (optional) → Production.
- [ ] Start a staged rollout at 10%, then 50%, then 100%.

## F. After launch

- [ ] Watch crash rate and ANR rate for 48 hours.
- [ ] Read the first reviews; reply to every substantive one.
- [ ] Check AdMob impressions and invalid-traffic warnings.
- [ ] Add `app-ads.txt` to the website (`09-ads-monetization.md`).
- [ ] Plan version 1.1: fix the top complaint, add one requested course.

---

## Review timeline

| Stage | Typical time |
|---|---|
| Internal testing | Minutes to a few hours |
| Closed/open testing | 1–3 days |
| Production (first release) | 3–7 days |
| Updates | 1–3 days |

New accounts and apps that declare ads often take longer on the first review.

---

## Do not submit if

- The privacy URL is broken or requires a login.
- The app declares "no ads" but shows ads.
- Data safety says "no data collected" while AdMob is present.
- The title contains a competitor name.
- The app crashes on a clean install.
- The "offline" claim is false.
- The upload is signed with the debug keystore.
