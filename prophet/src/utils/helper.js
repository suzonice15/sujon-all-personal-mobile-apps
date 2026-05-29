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