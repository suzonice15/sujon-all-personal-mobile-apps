module.exports = {
  preset: '@react-native/jest-preset',
  moduleNameMapper: {
    '\\.(mp3|wav)$': '<rootDir>/__mocks__/audioAssetMock.js',
  },
};
