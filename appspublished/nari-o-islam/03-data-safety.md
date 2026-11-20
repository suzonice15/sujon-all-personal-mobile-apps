# 03 — Data Safety Form (exact answers)

Play Console → **App content → Data safety**.

This app is **not** a "no data collected" app: it has optional accounts, a coin/withdrawal system and AdMob with mediation. Declare the rows below.

## Section 1 — Data collection and security

| Question | Answer |
|---|---|
| Does your app collect or share any of the required user data types? | **Yes** |
| Is all of the user data collected by your app encrypted in transit? | **Yes** (HTTPS for the API and the ads SDK) |
| Do you provide a way for users to request that their data is deleted? | **Yes** |

Deletion method:

```
Users can delete local data in Android Settings → Apps → নারী ও ইসলাম → Storage →
Clear data, or by uninstalling the app. Account and server data (profile, coins,
referral and withdrawal records) are deleted on request by emailing
suzonice15@gmail.com from the registered address; requests are completed within
30 days, except records we must keep by law. Advertising data can be reset in
Android Settings → Privacy → Ads.
```

---

## Section 2 — Data types

### Personal info

| Type | Collected | Shared | Optional | Purposes |
|---|---|---|---|---|
| **Name** | Yes | No | Yes | App functionality, Account management |
| **Email address** | Yes | No | Yes | App functionality, Account management |
| **Phone number** | Yes | No | Yes | App functionality, Account management |
| **Address** | Yes | No | Yes | App functionality |

Reason: these fields are entered only when the user creates an optional account. The phone number is also used as the bKash withdrawal number when the user requests a payout.

> "Optional" means the user can read everything and use the app without providing the field. Play still counts it as collected when a user chooses to provide it.

### Financial info

| Type | Collected | Shared | Optional | Purposes |
|---|---|---|---|---|
| **Other financial info** (withdrawal amount, coin value, payout history) | Yes | No | Yes | App functionality, Fraud prevention |

The app does not process card payments or bank credentials. It records how many coins were converted and the amount paid out.

### Location

| Type | Collected | Shared | Optional | Purposes |
|---|---|---|---|---|
| **Approximate location** | Yes | Yes | No | Advertising or marketing, Fraud prevention |

Reason: the AdMob/mediation SDKs derive coarse location from the IP address. The app does not request GPS permission.

### Device or other IDs

| Type | Collected | Shared | Optional | Purposes |
|---|---|---|---|---|
| **Device or other IDs** | Yes | Yes | No | App functionality, Advertising or marketing, Fraud prevention |

Reason: Android ID is used for the coin/withdrawal ledger; the advertising ID and app set ID are used by the Google Mobile Ads SDK and mediated networks.

### App activity

| Type | Collected | Shared | Optional | Purposes |
|---|---|---|---|---|
| **Other in-app actions** (coins earned/spent, quiz completion, referral clicks, withdrawals) | Yes | No | No | App functionality, Fraud prevention |

The app has no Firebase Analytics or Crashlytics. Do not declare "App interactions" for analytics unless such an SDK is added later.

---

## Section 3 — Not collected

Do **not** declare these:

- Precise location (no GPS)
- Contacts, calendar, SMS or call logs
- Photos, videos, audio or files
- Health and fitness
- Messages
- Web browsing history
- Installed apps list
- User-generated content
- Credit card or bank account credentials

---

## Section 4 — Consistency checks

- The privacy policy names the account fields, Android ID, withdrawal data, AdMob and the mediation partners, and the deletion path. `02-privacy-policy.md` does.
- The listing says the app contains ads and explains the coin rate and withdrawal terms. `01-store-listing.md` does.
- The release build shows real AdMob ads (test mode only in `__DEV__`).
- If the Shop tab is removed before release, no data answer changes.
- If a crash-reporting SDK is added later, declare **App info and performance → Crash logs / Diagnostics**.

---

## Section 5 — Common rejection reasons

1. Declaring "No data collected" while AdMob and accounts exist.
2. Forgetting the device identifier, which is central to this app's coin system.
3. Promising a deletion path that does not work. Test the email once before submitting.
4. Privacy policy URL unreachable, behind a login, or missing the partner names.
5. Declaring account data as "required" when the app works without an account.
6. Not declaring approximate location while AdMob/mediation is present.
