# 03 — Data Safety Form (exact answers)

Play Console → **App content → Data safety**.

## Section 1 — Data collection and security

| Question | Answer |
|---|---|
| Does your app collect or share any of the required user data types? | **Yes** |
| Is all of the user data collected by your app encrypted in transit? | **Yes** |
| Do you provide a way for users to request that their data is deleted? | **Yes** |

Deletion method:

```
Users can delete all local learning data by clearing app storage or uninstalling.
For advertising data, users can reset or delete their advertising ID in Android
Settings → Privacy → Ads, or email [EMAIL] and we will forward the request to
Google where applicable. We respond within 30 days.
```

---

## Section 2 — Data types

### Location

| Field | Answer |
|---|---|
| Type | **Approximate location** |
| Collected | **Yes** |
| Shared | **Yes** |
| Processed ephemerally | **No** |
| Required or optional | **Required** (ads) |
| Purposes | **Advertising or marketing**, **Fraud prevention, security and compliance** |

Reason: the AdMob SDK derives coarse location from the IP address. The app does not request GPS permission.

### Device or other IDs

| Field | Answer |
|---|---|
| Type | **Device or other IDs** |
| Collected | **Yes** |
| Shared | **Yes** |
| Processed ephemerally | **No** |
| Required or optional | **Required** |
| Purposes | **Advertising or marketing**, **Fraud prevention, security and compliance**, **Analytics** |

Reason: advertising ID and app set ID used by the Google Mobile Ads SDK.

### App activity (only if you later add analytics or mediation)

| Field | Answer |
|---|---|
| Type | **Other in-app actions** |
| Collected | **Yes** |
| Shared | **Yes** |
| Purposes | **Advertising or marketing**, **Analytics** |

> This app currently has no Firebase Analytics or Crashlytics. Do **not** declare this type unless you add such an SDK. AdMob's own ad interactions are covered by the two rows above.

---

## Section 3 — Not collected

Do **not** declare these; they are not collected by the app or the ads SDK:

- Name, email address, phone number, address
- Precise location
- Contacts, calendar, SMS, call logs
- Photos, videos, audio, files
- Health and fitness
- Financial info
- Web browsing history
- Installed apps list
- User-generated content

Local progress is stored only on the device and is **not** transmitted, so it is not "collected" under Play's definition.

---

## Section 4 — Consistency checks

- The privacy policy must mention approximate location, device/advertising IDs, AdMob and the deletion path. `02-privacy-policy.md` does.
- The listing must say the app contains ads. `01-store-listing.md` does.
- The app must show ads in the release build. It does (AdMob real IDs, test mode only in `__DEV__`).
- If you remove ads for a paid tier later, update this form.

---

## Section 5 — Common rejection reasons

1. Declaring "No data collected" while an ads SDK is present.
2. Missing the deletion path.
3. Privacy policy URL not publicly reachable, or behind a login.
4. Policy does not name the ad provider or the data types.
5. Declaring data as "optional" when the app cannot be used without ads.

Fix these before submitting.
