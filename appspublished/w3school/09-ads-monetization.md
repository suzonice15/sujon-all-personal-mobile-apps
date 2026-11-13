# 09 — Ads & Monetization

## AdMob account

| Item | Value |
|---|---|
| Publisher ID | `pub-4817870874747259` |
| App ID | `ca-app-pub-4817870874747259~4412023883` |
| Banner unit | `ca-app-pub-4817870874747259/8444849224` |
| Interstitial unit | `ca-app-pub-4817870874747259/3002619155` |
| Rewarded unit | `ca-app-pub-4817870874747259/1845414760` |
| Native unit | `ca-app-pub-4817870874747259/4445481779` |

Where they are used: `src/utils/url.js`.

- Debug builds use Google test ad units.
- Release builds use the real units above (`ADMOB_TEST_MODE = __DEV__`).
- Interstitial cooldown: 100 seconds (do not lower it).

---

## app-ads.txt (important)

Create `https://yourdomain.com/app-ads.txt` containing exactly:

```
google.com, pub-4817870874747259, DIRECT, f08c47fec0942fa0
```

Then add the same domain to the AdMob app settings (**App settings → app-ads.txt**). Without it, some demand sources pay less or skip the app.

The domain must match the developer website in the Play listing.

---

## Consent (EEA / UK / Switzerland)

The app does **not** currently show a Google UMP consent dialog. That is a compliance gap for personalized ads in the EEA, UK and Switzerland.

Two options before launch:

1. **Add UMP** (recommended): use `react-native-google-mobile-ads` consent APIs, show the form on first launch where required, and only request personalized ads after consent.
2. **Exclude EEA/UK/Switzerland** from country distribution until UMP is implemented.

The privacy policy already says non-personalized ads are served where consent is required — keep that true.

---

## Ad placement rules

Do:

- Banner at the bottom of content screens, outside the reading area.
- Interstitial after a completed quiz or a finished chapter, never on app launch.
- Rewarded ad only when the user taps an explicit "watch to unlock" button.
- Native ad clearly labelled and visually distinct from course cards.

Do not:

- Place ads over buttons, quiz answers or the NEXT LESSON control.
- Show an interstitial while a quiz is in progress.
- Encourage clicks ("tap the ad to continue").
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

## Revenue expectations

Coding-education traffic is usually low-volume but high-intent. Revenue depends on country mix and format. Track:

- impressions and match rate
- eCPM by country
- interstitial completion
- invalid traffic warnings

Do not optimise revenue before retention. An app with 100 daily learners and clean ads beats 10,000 installs with a banned account.

---

## If ads fail

| Symptom | Check |
|---|---|
| No ads at all | App ID in `AndroidManifest` / `app.json`, internet, AdMob account status |
| Test ads only | Build is debug, or `ADMOB_TEST_MODE` is true |
| Low fill | app-ads.txt, country, ad unit status |
| Account warning | Stop testing immediately, review invalid traffic report |

A missing ad must never block learning. Wrap ad calls so a failure shows nothing instead of an error screen.
