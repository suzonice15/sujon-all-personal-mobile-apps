// Quiz sound effects. The user can turn them off in Settings.
// The setting is stored in app_settings_json under the key "quizSound".

import SoundPlayer from 'react-native-sound-player';
import { getAppSetting, getAllAppSettings, saveAppSettings } from '../db/appSettings';

let enabled = true;
let loaded = false;
let loading = null;

const loadSetting = () => {
  if (loaded) return Promise.resolve(enabled);
  if (!loading) {
    loading = getAppSetting('quizSound', true)
      .then((value) => {
        enabled = value !== false;
        loaded = true;
        return enabled;
      })
      .catch(() => {
        loaded = true;
        return enabled;
      });
  }
  return loading;
};

export const getQuizSoundEnabled = async () => {
  await loadSetting();
  return enabled;
};

export const setQuizSoundEnabled = async (value) => {
  enabled = !!value;
  loaded = true;
  try {
    const all = await getAllAppSettings();
    await saveAppSettings({ ...all, quizSound: enabled });
  } catch (e) {
    console.log('Could not save quiz sound setting', e);
  }
};

export const playQuizSound = (file) => {
  if (loaded && !enabled) return;
  if (!loaded) {
    // First sound of the session: load the setting, then play if allowed.
    loadSetting().then((allowed) => {
      if (allowed) {
        try {
          SoundPlayer.playSoundFile(file, 'mp3');
        } catch (e) {
          console.log('Sound error:', e);
        }
      }
    });
    return;
  }
  try {
    SoundPlayer.playSoundFile(file, 'mp3');
  } catch (e) {
    console.log('Sound error:', e);
  }
};
