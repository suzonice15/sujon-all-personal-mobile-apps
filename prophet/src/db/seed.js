import { getDB } from './db';
import { syncMobileContents } from './mobileContents';
import { syncQuizes } from './quizeContents';
import { getHomeData, getQuizeData } from '../api';

export const seedDB = async () => {
  const db = await getDB();

  try {
    // API থেকে mobile_contents sync
    const res = await getHomeData();
    await syncMobileContents(res.data);

    const quize = await getQuizeData();
    await syncQuizes(quize.data);
  } catch (e) {
    console.log('Sync skipped (offline):', e.message);
  }
};
