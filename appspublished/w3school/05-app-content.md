# 05 — App Content Declarations

Play Console → **App content**. Fill each section as below.

## 1. Ads

```
Does your app contain ads?  →  Yes
```

Ad formats: banner, interstitial, rewarded, native. Provider: Google AdMob.

## 2. App access

```
All functionality in this app is available without any special access.
```

No login, no invitation code, no location gate. Reviewers can open every course, quiz and interview question immediately.

## 3. Target audience

```
Age groups: 13-15, 16-17, 18+
Primary audience: 13+
```

Reasons:

- The content is educational but written for teens and adults.
- Ads are shown, so the app should not be in the Families programme.
- Do **not** select "Under 13" unless you are ready for the Families policy, family-safe ads and a separate review.

## 4. News app

```
No
```

## 5. COVID-19 contact tracing / status

```
No
```

## 6. Data deletion

```
Yes
```

```
Users can delete learning data by clearing app storage or uninstalling.
For advertising data, users can reset/delete the advertising ID in Android
Settings → Privacy → Ads, or email [EMAIL]. We respond within 30 days.
```

## 7. Financial features

```
None of the above
```

The app teaches payment integration but does not process payments, offer loans, or provide financial advice.

## 8. Health

```
No
```

## 9. Government app

```
No
```

## 10. Permissions review

Current manifest declares:

| Permission | Needed? | Action |
|---|---|---|
| `INTERNET` | Yes (ads) | Keep |
| `ACCESS_NETWORK_STATE` | Yes (ads) | Keep if declared |
| `POST_NOTIFICATIONS` | Yes (local notifications) | Keep |
| `READ_EXTERNAL_STORAGE` / `WRITE_EXTERNAL_STORAGE` | No (data is in app storage) | **Removed** from the manifest |

Removing unused storage permissions avoids review questions and a scarier install prompt. Do it in `android/app/src/main/AndroidManifest.xml`, then rebuild.

## 11. Advertising ID declaration

The app uses the advertising ID through the Google Mobile Ads SDK. This is covered by the Data safety form (`03-data-safety.md`). Do not disable it while ads remain.

## 12. Play Integrity / app signing

- Enrol in **Play App Signing** (default for new apps).
- Upload the AAB signed with your **upload keystore**, not the debug keystore.
- Keep the upload keystore and passwords in two secure backups.

## 13. Content accuracy

The app makes no medical, legal or financial claims. Course content is educational and may contain simplifications. Add the disclaimer from `10-support-terms.md` to the About screen or the store description if you want extra protection.

## 14. Store listing accuracy

- Title/description must match the app.
- Do not use competitor brand names (Sololearn, Programming Hero, Mimo, W3Schools) in the title, description or screenshots.
- "Offline" must stay true: do not move lessons behind a server without updating the listing.
