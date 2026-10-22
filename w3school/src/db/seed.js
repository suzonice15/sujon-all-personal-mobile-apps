import { getDB } from './db';
import { syncMobileContents } from './mobileContents';
import { syncQuizes } from './quizeContents';
import { getHomeData, getQuizeData } from '../api';
import { emit } from '../utils/events';

export const seedDB = async () => {
  const db = await getDB();

  try {
    // sync mobile_contents from the API
    // const res = await getHomeData();
    // await syncMobileContents(res.data);
    emit('contentsSynced');

    // const quize = await getQuizeData();
    // await syncQuizes(quize.data);
    const [chk] = await db.executeSql('SELECT COUNT(*) as c FROM notifications');
    if (chk.rows.item(0).c === 0) {
      await db.executeSql(
        `INSERT INTO notifications (title, body, type) VALUES
          ('App Guide', '🪙 Ways to earn coins:
1. Read lessons → claim coins
2. Collect the daily coin box (every 1 minute)
3. Watch ads to open boxes (30 per day)
4. Play quizzes and collect rewards
5. Referral bonus

🛍️ Shop:
• Buy products from the Shop
• Pay with coins + cash

💳 Withdraw:
• Mobile recharge
• Withdraw to bKash
• Minimum withdrawal 100 Tk

✅ Tips:
• Open the app every day
• Complete all boxes and quizzes
• Share your referral link to earn more', 'general')`
      );
    }
  } catch (e) {
    console.log('Sync skipped (offline):', e.message);
  }
};
