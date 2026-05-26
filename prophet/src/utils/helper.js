import DeviceInfo from 'react-native-device-info';
 

export const isOnline = async () => {
  try {
    const connected = await DeviceInfo.isInternetReachable();

    // কিছু ডিভাইসে null আসে, তাই fallback
    if (connected === null) {
      return await DeviceInfo.isConnected();
    }

    return connected;
  } catch (error) {
    console.log('Network check error:', error);
    return false;
  }
};