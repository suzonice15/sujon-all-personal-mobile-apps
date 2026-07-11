export const api_url='https://education.tablighshop.com/api';
// export const api_url='http://192.168.0.122:7070/api';


export const apps_slug='profet';
export const published_app_slug='com.prophetlife';
export const quize_slug='islamic-quize';
export const app_version='1.0.0';
export const lastUpdate = '৩ জুলাই ২০২৬'; 
export const apps_title='নবী রাসূলের জীবনী';
export const developer_id='8499372884242273199';
export const email='suzonice15@gmail.com';
export const DAILY_BOXES=50;
export const video_coin_per_box=12;
export const story_detail_per_box=10;
export const daily_coin_count=15;
export const daily_bonus_coin=25;
export const max_claim_per_day=60;
export const story_detail_points=100;
export const referral_percent=2;
export const sync_interval_minutes=60;

// ===== AdMob / Mediation Configuration (Android only) =====
export const ADMOB_ENABLED = true;
export const ADMOB_TEST_MODE = __DEV__;
// export const ADMOB_TEST_MODE = false ;

// Replace these with your real AdMob unit IDs in production
const REAL_BANNER_ID = 'ca-app-pub-4817870874747259/8444849224';
const REAL_INTERSTITIAL_ID = 'ca-app-pub-4817870874747259/3002619155';
const REAL_REWARDED_ID = 'ca-app-pub-4817870874747259/1845414760';
const REAL_NATIVE_ID = 'ca-app-pub-4817870874747259/4445481779';

const isPlaceholder = (id) => id.includes('XXXXXXXXXX');
const ADMOB_USE_REAL = ADMOB_ENABLED && !ADMOB_TEST_MODE && !isPlaceholder(REAL_BANNER_ID);

// Google test Ad Unit IDs (Android)
const TEST_BANNER = 'ca-app-pub-3940256099942544/6300978111';
const TEST_INTERSTITIAL = 'ca-app-pub-3940256099942544/1033173712';
const TEST_REWARDED = 'ca-app-pub-3940256099942544/5224354917';
const TEST_NATIVE = 'ca-app-pub-3940256099942544/2247696110';

export const AD_UNIT_ID_BANNER = ADMOB_USE_REAL ? REAL_BANNER_ID : TEST_BANNER;
export const AD_UNIT_ID_INTERSTITIAL = ADMOB_USE_REAL ? REAL_INTERSTITIAL_ID : TEST_INTERSTITIAL;
export const AD_UNIT_ID_REWARDED = ADMOB_USE_REAL ? REAL_REWARDED_ID : TEST_REWARDED;
export const AD_UNIT_ID_NATIVE = ADMOB_USE_REAL ? REAL_NATIVE_ID : TEST_NATIVE;

// Claim cooldown (seconds)
export const BOX_CLAIM_COOLDOWN_SEC = 180;

// Ad show cooldowns (ms)
export const AD_INTERSTITIAL_COOLDOWN = 10000;
export const AD_REWARDED_COOLDOWN = 60000;
