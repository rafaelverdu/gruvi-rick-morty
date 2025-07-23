import { Platform } from 'react-native';

// Platform-specific database service
let databaseService: any;

async function initializeDatabase() {
  if (Platform.OS === 'web') {
    // Web platform - use localStorage
    const { databaseService: webDatabaseService } = await import('./database.web');
    databaseService = webDatabaseService;
  } else {
    // Mobile platform - use SQLite
    const { databaseService: nativeDatabaseService } = await import('./database.native');
    databaseService = nativeDatabaseService;
  }
}

// Initialize immediately
initializeDatabase();

export { databaseService }; 