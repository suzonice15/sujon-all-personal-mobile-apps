# 09 — Ads & Monetization

## AdMob account

| Item | Value |
|---|---|
| Publisher ID | `pub-4817870874747259` |
| App ID | `ca-app-pub-4817870874747259~5627894444` |
| Banner unit | `ca-app-pub-4817870874747259/8194348035` |
| Interstitial unit | `ca-app-pub-4817870874747259/2622457156` |
| Rewarded unit | `ca-app-pub-4817870874747259/7135437296` |
| Native unit | `ca-app-pub-4817870874747259/3196192280` |

Where they are used: `src/config/url.js` and `app.json` (Android app id) plus the manifest meta-data.

- Debug builds use Google test ad units.
- Release builds use the real units above (`ADMOB_TEST_MODE = __DEV__`).
- Interstitial cooldown: 100 seconds. Rewarded: 60 seconds. Native: 300 seconds. Do not lower them.

### Mediation

`android/app/build.gradle` includes mediation adapters:

| Network | Adapter |
|---|---|
| Meta Audience Network | `com.google.ads.mediation:facebook:6.22.0.0` |
| Unity Ads | `com.google.ads.mediation:unity:4.12.0.0` |
| AppLovin | `com.google.ads.mediation:applovin:13.0.1.0` |

Configure each network's app id / placement in the AdMob console (Mediation → ad source). Until they are configured, AdMob simply falls back to Google demand.

---

## Coin economy (disclose, do not exaggerate)

From `src/config/url.js`:

| Setting | Value |
|---|---|
| Coins per taka | 100 |
| Minimum withdrawal | ৳100 (10,000 coins) |
| Withdrawal fee | ৳5 |
| Daily bonus | 30 coins |
| Daily coin / story detail | 10 coins |
| Rewarded video per box | 10 coins |
| Daily boxes | 9 |
| Box claim cooldown | 120 seconds |
| Referral commission | 2% |

Withdrawal is paid manually through bKash after review. Keep these numbers in the listing and in the app's Help/Terms so the reward is not misleading.

---

## app-ads.txt (important)

Create `https://yourdomain.com/app-ads.txt` containing exactly:

```
google.com, pub-4817870874747259, DIRECT, f08c47fec0942fa0
```

A copy is in this folder (`app-ads.txt`). Then add the same domain in AdMob → **App settings → app-ads.txt**. Without it, some demand sources pay less or skip the app.

The domain must match the developer website in the Play listing.

---

## Consent (EEA / UK / Switzerland)

The app does **not** show a Google UMP consent dialog. That is a compliance gap for personalized ads in the EEA, UK and Switzerland.

Two options before launch:

1. **Add UMP** (recommended): use the `react-native-google-mobile-ads` consent APIs, show the form on first launch where required, and request personalized ads only after consent.
2. **Exclude EEA/UK/Switzerland** from country distribution until UMP is implemented. For a Bengali-first launch this is the simpler choice.

The privacy policy says non-personalized ads are served where consent is required — keep that true.

---

## Rewarded-coin policy (read before launch)

Paying users coins for **rewarded video** is allowed: the user chooses to watch and receives an in-app reward. The following are **not** allowed:

- Rewarding clicks, installs or views of banners/interstitials.
- Wording such as "ক্লিক করে কয়েন নিন" or "বিজ্ঞাপনে ক্লিক করুন".
- Forcing an interstitial as the only way to claim a bonus the user already earned.
- Hiding the close button, or stacking interstitials.

Check the Claim / AdEarn / DailyCoin screens against these rules. If a screen gives coins merely for opening a page that shows an interstitial, change it to a rewarded ad or to a plain daily bonus.

---

## Ad placement rules

Do:

- Banner at the bottom of content screens, outside the reading area.
- Interstitial after a completed quiz or a finished article, never on app launch.
- Rewarded ad only when the user taps an explicit "watch to earn" button.
- Native ad clearly labelled and visually distinct from content cards.

Do not:

- Place ads over buttons, quiz answers or the Next control.
- Show an interstitial while a quiz is in progress.
- Encourage clicks.
- Click your own ads or ask friends to click them.
- Use ads on a screen with no content.

---

## Account safety

1. Add your test device as a test device in AdMob before testing.
2. Never tap a live ad, even once, from your own device.
3. Do not install a click bot or "ad warmer".
4. Watch for **invalid traffic** warnings in AdMob; act immediately.
5. Keep the AdMob account payment and tax details complete.

Policy violations can suspend the AdMob account, which also breaks the app's ads.

---

## If ads fail

| Symptom | Check |
|---|---|
| No ads at all | App ID in manifest / `app.json`, internet, AdMob account status |
| Test ads only | Build is debug, or `ADMOB_TEST_MODE` is true |
| Low fill | app-ads.txt, country, ad unit status, mediation config |
| Account warning | Stop testing immediately, review invalid traffic report |

A missing ad must never block reading or the quiz. Wrap ad calls so a failure shows nothing instead of an error screen.
