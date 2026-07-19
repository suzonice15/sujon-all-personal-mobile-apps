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
          ('অ্যাপ গাইড', '🪙 কয়েন আয়ের উপায়:
১. গল্প পড়ুন → কয়েন দাবি করুন
২. দৈনিক কয়েন বক্স নিন (প্রতি ১ মিনিটে)
৩. বিজ্ঞাপন দেখে বক্স খুলুন (প্রতি দিন ৩০টি)
৪. কুইজ খেলে পুরস্কার নিন
৫. রেফারেল থেকে বোনাস

🛍️ প্রোডাক্ট সেল:
• কিনাকাটা থেকে প্রোডাক্ট কিনুন
• কয়েন + টাকা দিয়ে কিনতে পারবেন

💳 উইথড্র:
• মোবাইল রিচার্জ করুন
• বিকাশে উত্তোলন করুন
• ন্যূনতম ১০০ টাকা উত্তোলনযোগ্য

✅ টিপস:
• প্রতিদিন অ্যাপ খুলুন
• সব বক্স ও কুইজ সম্পন্ন করুন
• রেফারেল লিংক শেয়ার করে আরও আয় করুন', 'general')`
      );
    }
  } catch (e) {
    console.log('Sync skipped (offline):', e.message);
  }
};
