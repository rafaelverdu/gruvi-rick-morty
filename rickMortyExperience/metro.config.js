const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add resolver configuration to handle platform-specific imports
config.resolver.platforms = ['native', 'web', 'ios', 'android'];

// Add resolver configuration to handle expo-sqlite on web
config.resolver.alias = {
  ...config.resolver.alias,
  // Exclude expo-sqlite from web bundling
  'expo-sqlite': false,
};

module.exports = config; 