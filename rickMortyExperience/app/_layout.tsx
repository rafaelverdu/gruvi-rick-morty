import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { databaseService } from '../services/database';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

export default function RootLayout() {
  useEffect(() => {
    // Initialize database when app starts
    const initDatabase = async () => {
      try {
        await databaseService.init();
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };

    initDatabase();

    // Cleanup on unmount
    return () => {
      databaseService.close();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}