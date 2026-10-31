import { useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { stopAudio } from '../../utils/gameAudio';

const findDrawer = (navigation) => {
  let parent = navigation?.getParent?.();
  while (parent && parent.getState?.()?.type !== 'drawer') {
    parent = parent.getParent?.();
  }
  return parent;
};

// While a game screen is focused: the side drawer can't be swiped open by accident
// (children drag fingers near the edge), and voice lines stop when the player leaves.
export default function useGameScreen() {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const drawer = findDrawer(navigation);
      drawer?.setOptions({ swipeEnabled: false });
      return () => {
        stopAudio();
        drawer?.setOptions({ swipeEnabled: true });
      };
    }, [navigation]),
  );
}
