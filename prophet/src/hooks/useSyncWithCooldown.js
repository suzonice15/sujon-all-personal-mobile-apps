import { useState, useCallback, useEffect, useRef } from 'react';
import { getLastSyncAt, setLastSyncAt } from '../db/settings';
import { syncCoinsToServer, syncPointsToServer } from '../db/sync';
import { saveReferralCache, insertReferralCommissions } from '../db/referral';
import { getReferralInfo, getReferralHistory, getLeaderboard, getReferralCommissions, markCommissionsMoved } from '../api/userApi';
import { getDeviceId } from '../db/earnings';

const FIVE_MINUTES = 5 * 60 * 1000;

export default function useSyncWithCooldown() {
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState(null);
  const intervalRef = useRef(null);

  const formatCooldown = (ms) => {
    const totalSec = Math.ceil(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    if (min > 0) return `${min} মিনিট ${sec} সেকেন্ড`;
    return `${sec} সেকেন্ড`;
  };

  const startCountdown = useCallback(async () => {
    const lastSync = await getLastSyncAt();
    const elapsed = Date.now() - lastSync;
    const remaining = Math.max(0, FIVE_MINUTES - elapsed);

    if (remaining <= 0) {
      setSyncMsg(null);
      return;
    }

    if (intervalRef.current) clearInterval(intervalRef.current);

    const update = () => {
      const left = Math.max(0, FIVE_MINUTES - (Date.now() - lastSync));
      if (left <= 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setSyncMsg(null);
        return;
      }
      setSyncMsg(`আবার সিঙ্ক করতে ${formatCooldown(left)} অপেক্ষা করুন`);
    };

    update();
    intervalRef.current = setInterval(update, 1000);
  }, []);

  useEffect(() => {
    startCountdown();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startCountdown]);

  const handleSync = useCallback(async () => {
    const lastSync = await getLastSyncAt();
    const now = Date.now();
    if (now - lastSync < FIVE_MINUTES) {
      startCountdown();
      return;
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

    const commissions = await getReferralCommissions(deviceId).catch(() => null);
    if (commissions?.success && commissions?.data) {
      const coinComms = commissions.data.coin_commissions || [];
      const pointComms = commissions.data.point_commissions || [];
      await insertReferralCommissions(coinComms, pointComms, deviceId);

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

    startCountdown();
  }, [startCountdown]);

  return { syncing, syncMsg, handleSync };
}
