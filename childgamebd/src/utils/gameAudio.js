import SoundPlayer from 'react-native-sound-player';

// Shared audio helper for the kids' games.
// A clip is either a bundled asset (require(...) number) or the name of a file in
// android/app/src/main/res/raw (e.g. 'correct'). Clips can be chained so a sound
// effect is followed by a voice line without the two cutting each other off.

const TAP_SOUND = require('../assets/audio/common/pop.wav');

export const SFX = {
  correct: 'correct',
  wrong: 'wrong',
  celebrate: 'finish',
};

let queue = [];
let finishedSub = null;
let muted = false;
const muteListeners = new Set();

export const isMuted = () => muted;

export const setMuted = (value) => {
  muted = value;
  if (muted) {
    stopAudio();
  }
  muteListeners.forEach((fn) => fn(muted));
};

export const subscribeMuted = (fn) => {
  muteListeners.add(fn);
  return () => muteListeners.delete(fn);
};

const ensureListener = () => {
  if (!finishedSub) {
    finishedSub = SoundPlayer.addEventListener('FinishedPlaying', () => playNext());
  }
};

const start = (clip) => {
  if (typeof clip === 'number') {
    return Promise.resolve(SoundPlayer.playAsset(clip));
  }
  SoundPlayer.playSoundFile(clip, 'mp3');
  return Promise.resolve();
};

function playNext() {
  const clip = queue.shift();
  if (clip == null) {
    return;
  }
  try {
    start(clip).catch(() => playNext());
  } catch (e) {
    playNext();
  }
}

export const playSequence = (clips) => {
  if (muted) {
    return;
  }
  ensureListener();
  queue = clips.filter((c) => c != null);
  playNext();
};

export const playClip = (clip) => playSequence([clip]);

export const playTap = () => playClip(TAP_SOUND);

export function stopAudio() {
  queue = [];
  try {
    SoundPlayer.stop();
  } catch (e) {
    // nothing playing
  }
}
