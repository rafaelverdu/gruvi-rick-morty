import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout() {
  return (
    <Tabs
  screenOptions={{
    tabBarActiveTintColor: '#ffd33d',
    headerStyle: {
      backgroundColor: '#25292e',
    },
    headerShadowVisible: false,
    headerTintColor: '#fff',
    tabBarStyle: {
      backgroundColor: '#25292e',
    },
  }}
>

      <Tabs.Screen
        name="episodes"
        options={{
          title: 'Episodes',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'tv-sharp' : 'tv-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'heart-sharp' : 'heart-outline'} color={color} size={24}/>
          ),
        }}
      />
    </Tabs>
  );
}
