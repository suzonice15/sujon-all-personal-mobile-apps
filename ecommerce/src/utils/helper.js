const BN_MAP = { '০': 0, '১': 1, '২': 2, '৩': 3, '৪': 4, '৫': 5, '৬': 6, '৭': 7, '৮': 8, '৯': 9 };
const EN_TO_BN = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export const toBn = (num) => String(num).replace(/\d/g, d => EN_TO_BN[parseInt(d)]);

export const bnToNumber = (str) => {
  if (typeof str === 'number') return str;
  const cleaned = String(str || '').replace(/[,\s]/g, '');
  let numStr = '';
  for (const ch of cleaned) {
    numStr += BN_MAP[ch] !== undefined ? BN_MAP[ch] : ch;
  }
  const num = parseInt(numStr, 10);
  return isNaN(num) ? 0 : num;
};

export const isOnline = async () => {
  try {
    const response = await fetch('https://www.google.com', {
      method: 'HEAD',
      cache: 'no-cache',
    });
    return response.ok;
  } catch {
    return false;
  }
};