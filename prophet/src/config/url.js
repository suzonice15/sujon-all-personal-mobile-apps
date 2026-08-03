export const api_url='https://education.tablighshop.com/api';
// export const api_url='http:// 192.168.0.122:7070/api';



// start nobijir sunnat apps configuaration 
// export const apps_slug='sunnah-of-the-holy-prophet';
// export const published_app_slug='com.prophetsunnat';
// export const quize_slug='islamic-quize';
// export const app_version='1.0.0';
// export const lastUpdate = '২৫ জুলাই ২০২৬';
// export const apps_title='রাসূল ﷺ এর সুন্নাহ'; 
// const REAL_BANNER_ID = 'ca-app-pub-4817870874747259/7747901141';
// const REAL_INTERSTITIAL_ID = 'ca-app-pub-4817870874747259/4364024051';
// const REAL_REWARDED_ID = 'ca-app-pub-4817870874747259/7129788191';
// const REAL_NATIVE_ID = 'ca-app-pub-4817870874747259/5541374358';
// const add_app_id = 'ca-app-pub-4817870874747259~9388140084';

// start prophet apps configuaration 

export const apps_slug='profet';
export const published_app_slug='com.prophetlife';
export const quize_slug='islamic-quize';
export const app_version='6.0.0';
export const lastUpdate = '৩ জুলাই ২০২৬'; 
export const apps_title='নবী রাসূলের জীবনী'; 
const REAL_BANNER_ID = 'ca-app-pub-4817870874747259/8444849224';
const REAL_INTERSTITIAL_ID = 'ca-app-pub-4817870874747259/3002619155';
const REAL_REWARDED_ID = 'ca-app-pub-4817870874747259/1845414760';
const REAL_NATIVE_ID = 'ca-app-pub-4817870874747259/4445481779';
const add_app_id = 'ca-app-pub-4817870874747259~4412023883';
 





// ===== AdMob / Mediation Configuration (Android only) =====
export const ADMOB_ENABLED = true;
export const ADMOB_TEST_MODE = __DEV__;
// export const ADMOB_TEST_MODE = false;

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
export const BOX_CLAIM_COOLDOWN_SEC = 60; 
export const AD_INTERSTITIAL_COOLDOWN = 100000;
export const AD_REWARDED_COOLDOWN = 60000;
export const developer_id='8499372884242273199';
export const email='suzonice15@gmail.com';
export const DAILY_BOXES=30;
export const video_coin_per_box=10;
export const story_detail_per_box=10;
export const daily_coin_count=10;
export const daily_bonus_coin=30;
export const max_claim_per_day=100;
export const story_detail_points=100;
export const referral_percent=2;
export const sync_interval_minutes=60;