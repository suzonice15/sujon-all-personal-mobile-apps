# 05 — App Content Declarations

Play Console → **App content**. Fill each section as below.

## 1. Ads

```
Does your app contain ads?  →  Yes
```

Formats: banner, interstitial, rewarded, native. Provider: Google AdMob with Meta, Unity and AppLovin mediation.

## 2. App access

```
All functionality in this app is available without any special access.
```

- Reading every topic, the quiz, bookmarks and notifications work without login.
- Login is optional and only adds the profile, referral and cross-device account features.
- The coin and withdrawal flow uses a device identifier, so a reviewer can test it without credentials.

If a reviewer ever needs the account screens, add test credentials here (`[test email / password]`) — never a real user's account.

## 3. Target audience

```
Age groups: 18+
Primary audience: 18+
```

Reasons:

- The app includes a **cash-reward and bKash withdrawal** feature. That makes an adult audience the correct declaration.
- Ads are shown, so the app must not be in the Families programme.
- Do **not** select any age group under 18 while the withdrawal feature exists.

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
Users can delete local data in Android Settings → Apps → নারী ও ইসলাম → Storage →
Clear data, or by uninstalling. Account and server data (profile, coins,
referral and withdrawal records) are deleted on request by emailing
suzonice15@gmail.com; requests are completed within 30 days.
```

> **Gap to fix before release:** the app currently has no in-app "Delete account"
> button. Play's account-deletion policy expects a deletion path that users can
> reach easily, plus a public web URL. Add a *Delete account* action in
> Profile → Settings that calls a backend delete endpoint, and use the same
> policy URL for the web request.

## 7. Financial features

```
None of the above
```

The app does not provide banking, loans, credit, insurance, investment, cryptocurrency or payment-account services. It pays a **loyalty reward** (coins converted to bKash) for optional in-app activity. Describe this honestly in the listing and terms; do not present it as a job, investment or guaranteed income.

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
| `INTERNET` | Yes (content, coins, ads) | Keep |
| `POST_NOTIFICATIONS` | Yes (local notifications) | Keep |
| `READ_EXTERNAL_STORAGE` | No (data is in app storage) | **Remove** |
| `WRITE_EXTERNAL_STORAGE` | No | **Remove** |

Removing the two storage permissions avoids review questions and a scarier install prompt. They are also no-ops on modern Android. Edit `android/app/src/main/AndroidManifest.xml`, then rebuild.

Also consider removing `android:usesCleartextTraffic="true"` — all endpoints are HTTPS; leaving it on weakens the "encrypted in transit" answer.

## 11. Advertising ID declaration

The app uses the advertising ID through the Google Mobile Ads SDK and mediation. This is covered by the Data safety form (`03-data-safety.md`). Do not disable it while ads remain.

## 12. Play Integrity / app signing

- Enrol in **Play App Signing** (default for new apps).
- Upload the AAB signed with the shared **upload keystore**, not the debug keystore.
- Keep the keystore and passwords in two secure backups.

## 13. Content accuracy

- The app is an educational aid. It is **not** a fatwa service, a madrasa certificate or a religious authority.
- State in the listing and About screen: "কনটেন্ট শিক্ষামূলক; মতামতের ভিন্নতায় নির্ভরযোগ্য আলেমের পরামর্শ নিন।"
- Do not claim that rewards are guaranteed income. Rates can change and are shown in the app.

## 14. Store listing accuracy

- Title and description must match the real features.
- Do not use another scholar's, madrasa's or app's name or logo.
- Do not promise "daily income", "guaranteed earning" or specific payout amounts.
- Keep the reward terms in the description: ১০০ কয়েন = ৳১, সর্বনিম্ন ৳১০০, ফি ৳৫.
- "Offline" may only be claimed for saved content; ads and sync need internet.
