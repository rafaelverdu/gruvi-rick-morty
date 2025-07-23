// Web-specific database service using localStorage
const STORAGE_KEY = 'rickmorty_favorites';

// Web storage interface
interface WebFavoriteEpisode {
  episode_id: number;
  score: number | null;
  created_at: string;
}

interface FavoriteEpisode {
  id: number;
  episode_id: number;
  score: number | null;
  created_at: string;
}

// Web storage helpers
const getWebStorage = (): WebFavoriteEpisode[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

const setWebStorage = (data: WebFavoriteEpisode[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

// Database service class for web
export class DatabaseService {
  async init(): Promise<void> {
    console.log('Using localStorage for web platform');
  }

  async addToFavorites(episodeId: number): Promise<void> {
    const storage = getWebStorage();
    const existingIndex = storage.findIndex(item => item.episode_id === episodeId);
    
    if (existingIndex >= 0) {
      // Update existing entry
      storage[existingIndex].created_at = new Date().toISOString();
    } else {
      // Add new entry
      storage.push({
        episode_id: episodeId,
        score: null,
        created_at: new Date().toISOString()
      });
    }
    
    setWebStorage(storage);
    console.log(`Episode ${episodeId} added to favorites (web)`);
  }

  async updateEpisodeScore(episodeId: number, score: number): Promise<void> {
    if (score < 1 || score > 5) {
      throw new Error('Score must be between 1 and 5');
    }

    const storage = getWebStorage();
    const existingIndex = storage.findIndex(item => item.episode_id === episodeId);
    
    if (existingIndex >= 0) {
      storage[existingIndex].score = score;
      setWebStorage(storage);
      console.log(`Episode ${episodeId} score updated to ${score} (web)`);
    }
  }

  async getEpisodeScore(episodeId: number): Promise<number | null> {
    const storage = getWebStorage();
    const item = storage.find(item => item.episode_id === episodeId);
    return item?.score || null;
  }

  async removeFromFavorites(episodeId: number): Promise<void> {
    const storage = getWebStorage();
    const filtered = storage.filter(item => item.episode_id !== episodeId);
    setWebStorage(filtered);
    console.log(`Episode ${episodeId} removed from favorites (web)`);
  }

  async isFavorite(episodeId: number): Promise<boolean> {
    const storage = getWebStorage();
    return storage.some(item => item.episode_id === episodeId);
  }

  async getFavoriteEpisodeIds(): Promise<{ episode_id: number; score: number | null }[]> {
    const storage = getWebStorage();
    return storage
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .map(item => ({
        episode_id: item.episode_id,
        score: item.score
      }));
  }

  async getFavoriteEpisodes(): Promise<FavoriteEpisode[]> {
    const storage = getWebStorage();
    return storage
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .map((item, index) => ({
        id: index + 1,
        episode_id: item.episode_id,
        score: item.score,
        created_at: item.created_at
      }));
  }

  async clearAllFavorites(): Promise<void> {
    setWebStorage([]);
    console.log('All favorites cleared (web)');
  }

  async getFavoritesCount(): Promise<number> {
    const storage = getWebStorage();
    return storage.length;
  }

  async close(): Promise<void> {
    // No cleanup needed for localStorage
  }
}

// Export singleton instance
export const databaseService = new DatabaseService(); 