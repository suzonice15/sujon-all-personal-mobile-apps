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
    const [chk] = await db.executeSql('SELECT COUNT(*) as c FROM notifications');
    if (chk.rows.item(0).c === 0) {
      await db.executeSql(
        `INSERT INTO notifications (title, body, type) VALUES
          ('স্বাগতম!', 'নবী রাসূলের জীবনী অ্যাপে আপনাকে স্বাগত', 'general'),
          ('নতুন গল্প যোগ হয়েছে', 'আজ নতুন একটি গল্প যোগ করা হয়েছে', 'general'),
          ('দৈনিক বোনাস', 'প্রতিদিন অ্যাপ খুলে ১০০ পয়েন্ট বোনাস নিন', 'bonus')`
      );
    }
  } catch (e) {
    console.log('Sync skipped (offline):', e.message);
  }
};
