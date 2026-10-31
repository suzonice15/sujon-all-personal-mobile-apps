const { getDefaultConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

// Don't watch native build output. On Windows the watcher holds handles on
// these folders, which stops Gradle from cleaning them ("Unable to delete directory").
config.resolver.blockList = [
  /[\\/]android[\\/](build|\.cxx|\.gradle)[\\/].*/,
  /[\\/]android[\\/]app[\\/](build|\.cxx)[\\/].*/,
];

module.exports = config;
