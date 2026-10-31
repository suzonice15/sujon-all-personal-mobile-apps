const { getDefaultConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

// Don't watch native Android build output. On Windows, Metro's file watcher
// holds handles on these folders and makes Gradle fail with "Access is denied".
config.resolver.blockList = [
  /.*[\\/]android[\\/](.*[\\/])?(build|build-output|\.cxx|\.gradle)[\\/].*/,
];

module.exports = config;
