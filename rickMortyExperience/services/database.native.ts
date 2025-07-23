import * as SQLite from 'expo-sqlite';

// Database name
const DATABASE_NAME = 'rickmorty.db';

// Table name
const FAVORITES_TABLE = 'favorite_episodes';

// Database interface
interface FavoriteEpisode {
  id: number;
  episode_id: number;
  score: number | null;
  created_at: string;
}

interface CountResult {
  count: number;
}

// Database service class for mobile
export class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;

  // Initialize database
  async init(): Promise<void> {
    try {
      this.db = await SQLite.openDatabaseAsync(DATABASE_NAME);
      await this.createTables();
      await this.runMigrations();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  // Create tables
  private async createTables(): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS ${FAVORITES_TABLE} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        episode_id INTEGER UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await this.db.execAsync(createTableSQL);
  }

  // Run database migrations
  private async runMigrations(): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      // Check if score column exists
      const checkColumnSQL = `
        SELECT COUNT(*) as count 
        FROM pragma_table_info('${FAVORITES_TABLE}') 
        WHERE name = 'score'
      `;
      
      const result = await this.db.getAllAsync(checkColumnSQL) as CountResult[];
      const scoreColumnExists = result[0]?.count > 0;

      // Add score column if it doesn't exist
      if (!scoreColumnExists) {
        console.log('Adding score column to favorites table...');
        const addColumnSQL = `
          ALTER TABLE ${FAVORITES_TABLE} 
          ADD COLUMN score INTEGER CHECK (score >= 1 AND score <= 5)
        `;
        
        await this.db.execAsync(addColumnSQL);
        console.log('Score column added successfully');
      }
    } catch (error) {
      console.error('Error running migrations:', error);
      throw error;
    }
  }

  // Add episode to favorites
  async addToFavorites(episodeId: number): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      const insertSQL = `
        INSERT OR REPLACE INTO ${FAVORITES_TABLE} (episode_id, created_at)
        VALUES (${episodeId}, CURRENT_TIMESTAMP)
      `;
      
      await this.db.execAsync(insertSQL);
      console.log(`Episode ${episodeId} added to favorites`);
    } catch (error) {
      console.error('Error adding episode to favorites:', error);
      throw error;
    }
  }

  // Update episode score
  async updateEpisodeScore(episodeId: number, score: number): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    if (score < 1 || score > 5) {
      throw new Error('Score must be between 1 and 5');
    }

    try {
      const updateSQL = `
        UPDATE ${FAVORITES_TABLE}
        SET score = ${score}
        WHERE episode_id = ${episodeId}
      `;
      
      await this.db.execAsync(updateSQL);
      console.log(`Episode ${episodeId} score updated to ${score}`);
    } catch (error) {
      console.error('Error updating episode score:', error);
      throw error;
    }
  }

  // Get episode score
  async getEpisodeScore(episodeId: number): Promise<number | null> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      const selectSQL = `
        SELECT score
        FROM ${FAVORITES_TABLE}
        WHERE episode_id = ${episodeId}
      `;
      
      const result = await this.db.getAllAsync(selectSQL) as { score: number | null }[];
      return result[0]?.score || null;
    } catch (error) {
      console.error('Error getting episode score:', error);
      return null;
    }
  }

  // Remove episode from favorites
  async removeFromFavorites(episodeId: number): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      const deleteSQL = `
        DELETE FROM ${FAVORITES_TABLE}
        WHERE episode_id = ${episodeId}
      `;
      
      await this.db.execAsync(deleteSQL);
      console.log(`Episode ${episodeId} removed from favorites`);
    } catch (error) {
      console.error('Error removing episode from favorites:', error);
      throw error;
    }
  }

  // Check if episode is favorite
  async isFavorite(episodeId: number): Promise<boolean> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      const selectSQL = `
        SELECT COUNT(*) as count
        FROM ${FAVORITES_TABLE}
        WHERE episode_id = ${episodeId}
      `;
      
      const result = await this.db.getAllAsync(selectSQL) as CountResult[];
      return result[0]?.count > 0;
    } catch (error) {
      console.error('Error checking if episode is favorite:', error);
      return false;
    }
  }

  // Get all favorite episode IDs with scores
  async getFavoriteEpisodeIds(): Promise<{ episode_id: number; score: number | null }[]> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      const selectSQL = `
        SELECT episode_id, score
        FROM ${FAVORITES_TABLE}
        ORDER BY created_at DESC
      `;
      
      const result = await this.db.getAllAsync(selectSQL) as { episode_id: number; score: number | null }[];
      return result;
    } catch (error) {
      console.error('Error getting favorite episode IDs:', error);
      return [];
    }
  }

  // Get favorite episodes with details
  async getFavoriteEpisodes(): Promise<FavoriteEpisode[]> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      const selectSQL = `
        SELECT id, episode_id, score, created_at
        FROM ${FAVORITES_TABLE}
        ORDER BY created_at DESC
      `;
      
      const result = await this.db.getAllAsync(selectSQL) as FavoriteEpisode[];
      return result;
    } catch (error) {
      console.error('Error getting favorite episodes:', error);
      return [];
    }
  }

  // Clear all favorites
  async clearAllFavorites(): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      const deleteSQL = `DELETE FROM ${FAVORITES_TABLE}`;
      await this.db.execAsync(deleteSQL);
      console.log('All favorites cleared');
    } catch (error) {
      console.error('Error clearing all favorites:', error);
      throw error;
    }
  }

  // Get favorites count
  async getFavoritesCount(): Promise<number> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    try {
      const selectSQL = `SELECT COUNT(*) as count FROM ${FAVORITES_TABLE}`;
      const result = await this.db.getAllAsync(selectSQL) as CountResult[];
      return result[0]?.count || 0;
    } catch (error) {
      console.error('Error getting favorites count:', error);
      return 0;
    }
  }

  // Close database
  async close(): Promise<void> {
    if (this.db) {
      await this.db.closeAsync();
      this.db = null;
    }
  }
}

// Export singleton instance
export const databaseService = new DatabaseService(); 