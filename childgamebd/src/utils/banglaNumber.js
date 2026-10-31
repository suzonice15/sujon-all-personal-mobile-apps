const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export const toBanglaDigits = (value) => String(value).replace(/\d/g, (d) => BN_DIGITS[d]);

// 84 -> "০১:২৪"
export const formatClock = (seconds) => {
  const s = Math.max(0, Math.round(seconds));
  return toBanglaDigits(`${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`);
};
