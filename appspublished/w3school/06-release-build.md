# 06 — Release Build & Signing

## Current configuration

| Item | Value |
|---|---|
| applicationId | `com.codenest.app` |
| versionCode | `1` |
| versionName | `1.0` |
| minSdk | 24 (Android 7.0) |
| targetSdk / compileSdk | 36 |
| Signing properties | `MYAPP_UPLOAD_STORE_FILE`, `MYAPP_UPLOAD_STORE_PASSWORD`, `MYAPP_UPLOAD_KEY_ALIAS`, `MYAPP_UPLOAD_KEY_PASSWORD` |
| Build file | `android/app/build.gradle` |

> The debug keystore is only for local testing. **Create a dedicated upload keystore before the first Play upload.**

---

## 1. Reuse the existing upload key (already configured)

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

No new keystore is needed. The AAB is already signed with this key (verified fingerprint above).

### Important when one key signs several apps

- A leak or loss now affects **every** app signed with it, not just CodeNest.
- Keep two offline backups of the keystore and passwords.
- Never commit the keystore to a public repository or share the project folder with it inside.
- Play App Signing still gives each app its own app signing key; this file is the **upload key**.
- The certificate is valid until 2300, which satisfies Play's requirement.

### If you ever need a new key

```powershell
keytool -genkeypair -v -storetype PKCS12 `
  -keystore codenest-upload.keystore `
  -alias codenest `
  -keyalg RSA -keysize 4096 -validity 10000
```

Then update the four `MYAPP_UPLOAD_*` properties. Do this only for a new app or a deliberate key rotation — not for this release.

---

## 2. Give Gradle the signing values

Already configured at `%USERPROFILE%\.gradle\gradle.properties`:

```properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_STORE_PASSWORD=********
MYAPP_UPLOAD_KEY_ALIAS=upload
MYAPP_UPLOAD_KEY_PASSWORD=********
```

Because `file()` resolves the relative path against `android/app`, the keystore must remain at `android/app/my-upload-key.keystore` in every project that reuses this key.

**Option B - pass properties on the command line** (nothing stored on disk):

```powershell
.\gradlew.bat bundleRelease `
  "-PMYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore" `
  "-PMYAPP_UPLOAD_STORE_PASSWORD=your-store-password" `
  "-PMYAPP_UPLOAD_KEY_ALIAS=upload" `
  "-PMYAPP_UPLOAD_KEY_PASSWORD=your-key-password"
```

Never commit a real keystore or password. Add `*.keystore` and `*.jks` to `.gitignore`.

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

## 4. Build the AAB

From `android/`:

```powershell
.\gradlew.bat clean
.\gradlew.bat bundleRelease
```

The four `MYAPP_UPLOAD_*` values are already in `%USERPROFILE%\.gradle\gradle.properties`, so no `-P` flags are needed. If you prefer passing them explicitly:

```powershell
.\gradlew.bat bundleRelease `
  "-PMYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore" `
  "-PMYAPP_UPLOAD_STORE_PASSWORD=your-store-password" `
  "-PMYAPP_UPLOAD_KEY_ALIAS=upload" `
  "-PMYAPP_UPLOAD_KEY_PASSWORD=your-key-password"
```

Output:

```
android/app/build/outputs/bundle/release/app-release.aab
```

> This project redirects the Gradle build cache, so the real file appears at
> `D:\Work\MobileApp\.build-cache\w3school\app\outputs\bundle\release\app-release.aab`.
> See `build/README.md`.

Play requires an **AAB**, not an APK.

---

## 5. Verify before uploading

Install the generated APK set locally (optional but recommended):

```powershell
# Requires bundletool
java -jar bundletool.jar build-apks `
  --bundle=android/app/build/outputs/bundle/release/app-release.aab `
  --output=codenest.apks `
  --ks=C:/keys/codenest-upload.keystore `
  --ks-key-alias=codenest `
  --ks-pass=pass:your-store-password `
  --key-pass=pass:your-key-password

java -jar bundletool.jar install-apks --apks=codenest.apks
```

Checklist before upload:

- [ ] App launches and the home screen shows 69 courses.
- [ ] A lesson, a quiz and an interview answer open.
- [ ] Ads appear (release build uses real AdMob IDs).
- [ ] No red screen and no JS error in `adb logcat`.
- [ ] Version code is higher than the previous upload.
- [ ] AAB is signed with the upload keystore.

---

## 6. Play App Signing

New apps use Play App Signing by default:

- You sign the AAB with the **upload key**.
- Google re-signs the distributed APKs with the **app signing key**.
- If the upload key is lost, request an upload key reset in Play Console.
- If the app signing key is lost, recovery is much harder — Play handles it, but this is why you enrol.

The debug-signed APK currently installed on the test phone has a different signature. **Uninstall it** before installing the Play build:

```powershell
adb uninstall com.codenest.app
```

---

## 7. Test tracks

| Track | Use |
|---|---|
| Internal testing | Up to 100 testers, fastest review, use for every build |
| Closed testing | Larger group, collect feedback |
| Open testing | Public beta, still needs review |
| Production | Staged rollout: 10% → 50% → 100% |

Always upload to **internal testing** first and install from Play. That validates signing, the AAB and the store listing together.

---

## 8. Release notes (Play Console)

```
First release.
• 69 courses, 800 chapters and 2,913 lessons
• 3,430 quiz questions with explanations
• 3,080 interview questions with answers
• Offline lessons, quizzes and interview prep
• Progress tracking, bookmarks and dark mode
```

---

## 9. Common build failures

| Error | Fix |
|---|---|
| `Keystore file not found` | Use an absolute path in `MYAPP_UPLOAD_STORE_FILE` |
| `SigningConfig "release" is missing` | Pass all four `MYAPP_UPLOAD_*` properties |
| `versionCode already used` | Increment `versionCode` |
| `App bundle was signed with the wrong key` | Sign with the same upload keystore used for the first upload |
| `INSTALL_FAILED_UPDATE_INCOMPATIBLE` | Uninstall the debug build first |
