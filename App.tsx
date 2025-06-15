/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, FlatList, Dimensions } from 'react-native';
import VideoCard from './src/components/VideoCard';
import FullScreenVideo from './src/screens/FullScreenVideo';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';
import UpgradeScreen from './src/screens/UpgradeScreen';

const { width: screenWidth } = Dimensions.get('window');

const Stack = createNativeStackNavigator<RootStackParamList>();

type RootStackParamList = {
  Home: undefined;
  FullScreenVideo: {
    videoUrl: string;
    title: string;
  };
  Upgrade: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

// Пример видео для демонстрации
const sampleVideos = [
  {
    id: '1',
    title: 'Пример видео 1',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: '2',
    title: 'Пример видео 2',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: '3',
    title: 'Пример видео 3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: '4',
    title: 'Пример видео 4',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sampleVideos}
        renderItem={({ item }) => (
          <VideoCard
            cardWidth={screenWidth / 2 - 20} // Ширина карты (половина экрана минус отступы)
            title={item.title}
            videoUrl={item.videoUrl}
            onPress={() => navigation.navigate('FullScreenVideo', item)}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={MainScreen}
          options={{ title: '', headerShown: false }}
        />
        <Stack.Screen
          name="FullScreenVideo"
          component={FullScreenVideo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Upgrade"
          component={UpgradeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default App;
