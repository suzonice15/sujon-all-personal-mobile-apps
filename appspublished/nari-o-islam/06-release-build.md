# 06 — Release Build & Signing

## Current configuration

| Item | Value |
|---|---|
| applicationId | `com.narioislam` |
| versionCode | `1` |
| versionName | `1.0` |
| minSdk | 24 (Android 7.0) |
| targetSdk / compileSdk | 36 |
| Signing properties | `MYAPP_UPLOAD_STORE_FILE`, `MYAPP_UPLOAD_STORE_PASSWORD`, `MYAPP_UPLOAD_KEY_ALIAS`, `MYAPP_UPLOAD_KEY_PASSWORD` |
| Build file | `android/app/build.gradle` |
| Source project | `sujon-all-personal-mobile-apps/prophet` (shared source) |

> Do not use `debug.keystore` for Play. This app uses the **existing** upload keystore — no new keystore was created.

---

## 1. Reuse the existing upload key

This project uses the same upload keystore as the other apps:

| Item | Value |
|---|---|
| Keystore | `android/app/my-upload-key.keystore` |
| Alias | `upload` |
| Certificate | `CN=Shahinul Islam Sujon, OU=Software, O=SIS Foundation, L=Dhaka, ST=Dhaka, C=BD` |
| SHA-256 | `8F:18:B6:EC:64:EF:DA:AF:FA:0D:E4:57:9F:CD:CB:DF:7A:5A:01:AE:4B:5C:CE:8A:44:24:3A:51:B8:3F:10:44` |
| Validity | 18 Sep 2026 → 04 Jul 2300 |

The values live in `%USERPROFILE%\.gradle\gradle.properties`:

```properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_STORE_PASSWORD=********
MYAPP_UPLOAD_KEY_ALIAS=upload
MYAPP_UPLOAD_KEY_PASSWORD=********
```

`file()` resolves the relative path against `android/app`, so the keystore must stay at `android/app/my-upload-key.keystore`.

### Important when one key signs several apps

- A leak or loss now affects **every** app signed with it.
- Keep two offline backups of the keystore and passwords.
- Never commit the keystore to a public repository or share the project folder with it inside.
- Play App Signing still gives each app its own app signing key; this file is the **upload key**.
- The certificate is valid until 2300, which satisfies Play's requirement.

---

## 2. Build the AAB

From `android/`:

```powershell
cd D:\Work\MobileApp\sujon-all-personal-mobile-apps\prophet\android
.\gradlew.bat clean
.\gradlew.bat bundleRelease
```

The four `MYAPP_UPLOAD_*` values are already in `%USERPROFILE%\.gradle\gradle.properties`, so no `-P` flags are needed.

Output (the project redirects the build cache):

```
D:\Work\MobileApp\.build-cache\prophet\app\outputs\bundle\release\app-release.aab
```

A copy for upload is kept at:

```
appspublished\nari-o-islam\build\NariOIslam-1.0-release.aab   (47.06 MB)
```

Play requires an **AAB**, not an APK.

### Current build result

| Output | Size | Result |
|---|---|---|
| AAB (upload-key signed) | 49,342,110 bytes (47.06 MB) | Build successful, signature verified |

---

## 3. Bump the version for every upload

In `android/app/build.gradle`:

```gradle
versionCode 2          // must increase on every Play upload
versionName "1.0.1"    // shown to users
```

Rules:

- `versionCode` is an integer and must always increase.
- `versionName` is free text; use semantic versioning.
- You cannot reuse a versionCode in Play, even after deleting a release.

---

## 4. Verify before uploading

```powershell
keytool -printcert -jarfile appspublished\nari-o-islam\build\NariOIslam-1.0-release.aab
```

Checklist:

- [ ] SHA-256 matches `8F:18:B6:EC:...:10:44`.
- [ ] Package inside the bundle is `com.narioislam`.
- [ ] Launcher icon is the new emerald/gold নারী ও ইসলাম icon.
- [ ] App label is `নারী ও ইসলাম`.
- [ ] Ads appear in the release build (real AdMob IDs).

Install locally (optional) with bundletool:

```powershell
java -jar bundletool.jar build-apks --bundle=NariOIslam-1.0-release.aab --output=narioislam.apks --ks=android/app/my-upload-key.keystore --ks-key-alias=upload --ks-pass=pass:**** --key-pass=pass:****
java -jar bundletool.jar install-apks --apks=narioislam.apks
```

Uninstall any debug-signed build first:

```powershell
adb uninstall com.narioislam
```

---

## 5. Play App Signing

New apps use Play App Signing by default:

- You sign the AAB with the **upload key**.
- Google re-signs the distributed APKs with the **app signing key**.
- If the upload key is lost, request an upload key reset in Play Console.
- If the app signing key is lost, recovery is much harder — Play handles it, but this is why you enrol.

---

## 6. Test tracks

| Track | Use |
|---|---|
| Internal testing | Up to 100 testers, fastest review, use for every build |
| Closed testing | Larger group, collect feedback |
| Open testing | Public beta, still needs review |
| Production | Staged rollout: 10% → 50% → 100% |

Always upload to **internal testing** first and install from Play. That validates signing, the AAB and the store listing together.

---

## 7. Release notes (Play Console)

```
প্রথম প্রকাশ।
• ইসলামে নারীর মর্যাদা, অধিকার ও ইবাদত — সহজ বাংলায়
• ৮টি বিষয়: মর্যাদা, ঈমান, ইবাদত, বিশেষ মাসআলা, পর্দা, বিবাহ, মাতৃত্ব ও কন্যা
• কুরআন ও হাদিসের উদ্ধৃতি সহ ব্যাখ্যা
• ইসলামি কুইজ — সঠিক উত্তর ও ব্যাখ্যা
• বুকমার্ক, নোটিফিকেশন ও পঠন-অগ্রগতি
• দৈনিক বোনাস ও কয়েন রিওয়ার্ড
• নতুন আইকন ও সবুজ থিম
```

---

## 8. The shared source project

`prophet` is reused for every app. Before building a different app, change all of:

| File | What to change |
|---|---|
| `src/config/url.js` | slug, title, version, AdMob unit IDs |
| `android/app/build.gradle` | `applicationId` |
| `app.json` | `android_app_id` |
| `android/app/src/main/AndroidManifest.xml` | AdMob app id meta-data |
| `android/app/src/main/res/values/strings.xml` | `app_name` |
| `android/app/src/main/res/values/colors.xml` | splash colour |
| `android/app/src/main/res/mipmap-*` | launcher icons |

For this build the values are already set to নারী ও ইসলাম / `com.narioislam`.

---

## 9. Common build failures

| Error | Fix |
|---|---|
| `Keystore file not found` | Use an absolute path in `MYAPP_UPLOAD_STORE_FILE` |
| `SigningConfig "release" is missing` | Pass all four `MYAPP_UPLOAD_*` properties |
| `versionCode already used` | Increment `versionCode` |
| `App bundle was signed with the wrong key` | Sign with the same upload keystore used for the first upload |
| `INSTALL_FAILED_UPDATE_INCOMPATIBLE` | Uninstall the debug build first |
| Gradle runs out of memory | `org.gradle.jvmargs=-Xmx4096m` is already set in `android/gradle.properties` |
