import { Platform } from 'react-native';

// Platform-specific database service
let databaseService: any;

if (Platform.OS === 'web') {
  // Web platform - use localStorage
  const { databaseService: webDatabaseService } = require('./database.web');
  databaseService = webDatabaseService;
} else {
  // Mobile platform - use SQLite
  const { databaseService: nativeDatabaseService } = require('./database.native');
  databaseService = nativeDatabaseService;
}

export { databaseService }; 