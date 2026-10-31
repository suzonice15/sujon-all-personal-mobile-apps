import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getGameProgress } from '../../db/gameProgress';

// Loads { [levelId]: stars } for a game track every time the screen gains focus.
export default function useGameProgress(gameId, track) {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(false);

  const reload = useCallback(() => {
    setError(false);
    getGameProgress(gameId, track)
      .then(setProgress)
      .catch(() => setError(true));
  }, [gameId, track]);

  useFocusEffect(reload);

  const totalStars = progress ? Object.values(progress).reduce((a, b) => a + b, 0) : 0;
  return { progress, error, reload, totalStars };
}
