import { useState, useCallback } from 'react';
import { getLastSyncAt, setLastSyncAt } from '../db/settings';
import { syncCoinsToServer, syncPointsToServer } from '../db/sync';
import { saveReferralCache, insertReferralCommissions } from '../db/referral';
import { getReferralInfo, getReferralHistory, getLeaderboard, getReferralCommissions, markCommissionsMoved } from '../api/userApi';
import { getDeviceId } from '../db/earnings';

const ONE_HOUR = 60 * 60 * 1000;

export default function useSyncWithCooldown() {
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState(null);

  const handleSync = useCallback(async () => {
    const lastSync = await getLastSyncAt();
    const now = Date.now();
    if (now - lastSync < ONE_HOUR) {
      const remaining = Math.ceil((ONE_HOUR - (now - lastSync)) / 60000);
      setSyncMsg(`আবার সিঙ্ক করতে ${remaining} মিনিট অপেক্ষা করুন`);
      // return;
    }

    setSyncing(true);
    setSyncMsg(null);

    const deviceId = await getDeviceId();

    const [coinResult, pointResult] = await Promise.all([
      syncCoinsToServer(),
      syncPointsToServer(),
    ]);

    const [refInfo, refHistory, leader] = await Promise.all([
      getReferralInfo(deviceId).catch(() => null),
      getReferralHistory(deviceId).catch(() => null),
      getLeaderboard().catch(() => null),
    ]);

    if (refInfo?.success && refInfo?.data) {
      await saveReferralCache('referral_info', refInfo.data);
    }
    if (refHistory?.success && refHistory?.data) {
      await saveReferralCache('referral_history', refHistory.data);
    }
    if (leader?.success && leader?.data) {
      await saveReferralCache('leaderboard', leader.data);
    }

    // Fetch referral commissions (pending is_mobile_moved=0 records), save locally, mark moved
    const commissions = await getReferralCommissions(deviceId).catch(() => null);
    if (commissions?.success && commissions?.data) {
      const coinComms = commissions.data.coin_commissions || [];
      const pointComms = commissions.data.point_commissions || [];
      await insertReferralCommissions(coinComms, pointComms, deviceId);

      // Mark them as moved on server
      const markRecords = [
        ...coinComms.map(r => ({ type: 'coin', id: r.id })),
        ...pointComms.map(r => ({ type: 'point', id: r.id })),
      ];
      if (markRecords.length > 0) {
        await markCommissionsMoved(deviceId, markRecords).catch(() => null);
      }
    }

    const total = (coinResult.synced || 0) + (pointResult.synced || 0);
    await setLastSyncAt();

    let msg = `সিঙ্ক সম্পন্ন! ${total} টি রেকর্ড সিঙ্ক হয়েছে`;
    if (refInfo?.success || refHistory?.success || leader?.success) {
      msg += ' ও রেফারেল ডাটা আপডেট হয়েছে';
    }
    setSyncMsg(msg);
    setSyncing(false);
  }, []);

  return { syncing, syncMsg, handleSync };
}
