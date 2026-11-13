# 11 — Testing Report

**Build tested:** release APK + AAB, version 1.0 (versionCode 1), signed with the debug keystore for local testing
**Date:** 13 November 2026
**Device:** Android phone, USB debugging enabled

**Build verification (latest):**

| Output | Path | Size |
|---|---|---|
| Universal APK | `.build-cache/w3school/app/outputs/apk/release/app-universal-release.apk` | 73.91 MB |
| AAB (upload key) | `appspublished/w3school/build/CodeNest-1.0-release.aab` | 47.58 MB |

Both built successfully after the icon, splash and permission changes. The AAB is signed with the shared upload key (`my-upload-key.keystore`, alias `upload`) and its SHA-256 was verified against the certificate.

---

## 1. Automated tests

Command:

```powershell
npx jest
```

Result:

| Metric | Value |
|---|---|
| Suites | 46 passed, 1 failed (pre-existing) |
| Tests | **410 passed** |
| Failures | `__tests__/App.test.tsx` only |

The `App.test.tsx` failure is pre-existing and environmental: Jest cannot load the native `RNGestureHandlerModule` without a native binary. It does not affect the app.

### Content integrity suite (`__tests__/contentIntegrity.test.js`)

| Check | Result |
|---|---|
| 69 unique course IDs | Pass |
| Globally unique lesson IDs (progress keys) | Pass |
| Every lesson resolves with correct prev/next | Pass |
| Every chapter has a quiz with at least 3 questions | Pass |
| Every chapter has at least 1 interview question | Pass |
| Every learning path step resolves | Pass |
| Quiz options are unique and the answer index is valid | Pass |
| Every block type renders, no empty values, supported code languages | Pass |

### Course-specific suites

Structure and code-sample tests pass for Java (samples compiled with `javac`), Node.js (samples executed), DSA, Docker, Kotlin, Swift, Flutter, React Native, Kubernetes, Angular, Next.js, and the new course batch.

---

## 2. Device crawl

A UI automation crawl opened screens and checked for expected content. It also read `logcat` for JavaScript and Android runtime errors.

| Check | Result |
|---|---|
| Home renders with course grid | Pass |
| Course pages: CodeIgniter, Bootstrap, Tailwind, jQuery, SQLite, Laravel, Node.js, Kotlin, Swift, Flutter, Kubernetes, React, Angular, Docker, MongoDB, Java, Python, GitHub Actions | **18/18 pass** |
| Quiz tab and course quiz list | Pass |
| Quiz starts and shows question 1 | Pass |
| Quiz answer feedback ("Not quite" + correct answer + Next question) | Pass |
| Interview tab and course page | Pass |
| Interview "Show all answers" reveals ANSWER | Pass |
| Skill Test tab | Pass |
| Profile tab | Pass |
| Drawer and Settings page | Pass |
| New advanced chapter listed (Node.js → Deployment & Scaling) | Pass |
| Advanced chapter renders lesson content | Pass |
| Lesson page renders with NEXT LESSON | Pass |
| JavaScript errors in logcat | **None** |

Screenshots: `%TEMP%\codenest-crawl\`

---

## 3. Bugs found and fixed during this test round

| Bug | Impact | Fix |
|---|---|---|
| `laravel/packages-ecosystem.js` was corrupted (every `i` replaced by `d`, `String.raw` broken) | Opening the chapter would throw and show the error boundary | Chapter rewritten with valid content |
| Duplicate lesson IDs in Laravel (`laravel-events`, `laravel-broadcasting`, `laravel-livewire`) | Progress overwritten between chapters | Renamed to unique IDs |
| 17 Laravel chapters had no interview questions | Empty interview page for those chapters | Added 2 Q&A per chapter |
| 7 Laravel chapters had only 1 quiz question | Thin quiz and failed integrity rules | Added 2 questions each |
| `cloud/security` had no interview questions | Empty section | Added 4 Q&A |
| `git/challenges` had 2 quiz questions | Below the 3-question minimum | Added 1 question |
| Redis used `lang: 'lua'` with no highlighter | Plain text, label "LUA" | Added Lua to CodeBlock labels/highlighter |

---

## 4. Offline test

Status: **not completed in this session**. The test device disconnected before the airplane-mode pass.

To run it:

```powershell
adb shell svc wifi disable
adb shell svc data disable
# open a course, a lesson, a quiz, an interview answer
adb shell svc wifi enable
adb shell svc data enable
```

Expected: all learning content opens; ads show nothing or a placeholder; no crash.

---

## 5. Known limitations

1. `App.test.tsx` fails in Jest for the native gesture-handler module (environmental).
2. No cloud sync or account; progress is device-local.
3. No UMP consent dialog yet — see `09-ads-monetization.md` before targeting the EEA/UK.
4. Unused `READ/WRITE_EXTERNAL_STORAGE` permissions were removed from the manifest; only `INTERNET` and `POST_NOTIFICATIONS` remain.
5. Real ads only appear in release builds; debug builds use Google test units.

---

## 6. Manual pass before upload

- [ ] Install the signed AAB build on a clean device.
- [ ] Open 5 random courses from different groups.
- [ ] Complete one quiz and check the score saves.
- [ ] Open an interview answer, mark it practiced, restart the app and confirm it persists.
- [ ] Toggle dark mode, quiz sound and notifications.
- [ ] Airplane mode: lesson, quiz, interview.
- [ ] Check `adb logcat -s ReactNativeJS:E` is empty.
- [ ] Confirm no ad is placed over a button.
- [ ] Confirm the launcher icon and app name are correct.
