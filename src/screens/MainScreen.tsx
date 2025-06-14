
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, ScrollView, FlatList, Image } from 'react-native';
import VideoCard from '../components/VideoCard';
import BrowseIcon from '../assets/icons/browse.svg';
import LibraryIcon from '../assets/icons/library.svg';
import SearchIcon from '../assets/icons/search.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import { BlurView } from '@react-native-community/blur';
import Video from 'react-native-video';
import { useFocusEffect } from '@react-navigation/native';


import React, { useState, useCallback } from 'react';


const { width: screenWidth } = Dimensions.get('window');
const MAIN_CARD_ASPECT_RATIO = 16 / 9; // Стандартное соотношение сторон видео
const MAIN_CARD_WIDTH = screenWidth - 40; // Ширина главной карты (учитывая marginHorizontal)
const MAIN_CARD_HEIGHT = MAIN_CARD_WIDTH / MAIN_CARD_ASPECT_RATIO; // Высота на основе ширины и соотношения сторон


// Пример видео для демонстрации. В реальном приложении это может быть загружено из API
const sampleVideos = [
  {
    id: '1',
    title: '',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    type: '',
  },
  {
    id: '2',
    title: 'Example Video 2',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    type: 'Crafts',
  },
  {
    id: '3',
    title: 'Example Video 3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    type: 'Science',
  },
  {
    id: '4',
    title: 'Example Video 4',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
    type: 'Games',
  },
];

const MainScreen: React.FC<any> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Browse');
  const [isFocused, setIsFocused] = useState(true);

  useFocusEffect(
      useCallback(() => {
        setIsFocused(true);
        return () => setIsFocused(false);
      }, [])
  );
  const mainVideo = sampleVideos[0];
  const otherVideos = sampleVideos.slice(1);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Ideas of the week</Text>
        <TouchableOpacity style={styles.upgradeButton}>
          <Text style={styles.upgradeButtonText}>UPGRADE</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentScrollView} showsVerticalScrollIndicator={false}>
        {/* Main Video Card Area */}
        {mainVideo && (
          <TouchableOpacity
            style={styles.mainVideoCardWrapper}
            onPress={() => navigation.navigate('FullScreenVideo', mainVideo)}
          >
            {/* Используем Image для миниатюры главной карты */}
            <Video
                source={{ uri: mainVideo.videoUrl }}
                style={styles.mainVideoThumbnail}
                resizeMode="cover"
                repeat
                muted
                paused={false}
                ignoreSilentSwitch="obey"
            />
            <View style={styles.mainVideoOverlay}>
              <Text style={styles.mainVideoTitle}>{mainVideo.title}</Text>
              <View style={styles.mainVideoActions}>
                <View style={styles.mainVideoActivity}>
                  <Text style={styles.playIcon}></Text>
                  <Text style={styles.activityText}>{mainVideo.type}</Text>
                </View>
                <TouchableOpacity style={styles.bookmarkIcon}>
                  <Text style={{ fontSize: 24 }}></Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Text style={styles.searchBarText}>🔍 Search...</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Text></Text>
          </TouchableOpacity>
        </View>

        {/* Indoor Categories */}
        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>Indoor</Text>
          <TouchableOpacity style={styles.categoriesArrow}>
            <Text></Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={otherVideos}
          renderItem={({ item }) => (
            <VideoCard
              cardWidth={screenWidth / 2 - 20} // Ширина карты (половина экрана минус отступы)
              title={item.title}
              videoUrl={item.videoUrl}
              onPress={() => navigation.navigate('FullScreenVideo', item)}
              isPlaying={false} // Эти карты тоже должны быть статичными миниатюрами
              showTitle={true}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalVideoList}
        />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavWrapper}>
        <BlurView
            style={styles.bottomNavBar}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white">
          <TouchableOpacity style={styles.navItem}>
            <BrowseIcon width={33} height={33} fill="white" />
            <Text style={[styles.navText, { color: 'white' }]}>Browse</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <LibraryIcon width={33} height={33} fill="white" />
            <Text style={[styles.navText, { color: 'white' }]}>Library</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <SearchIcon width={33} height={33} fill="white" />
            <Text style={[styles.navText, { color: 'white' }]}>Search</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <ProfileIcon width={33} height={33} fill="white" />
            <Text style={[styles.navText, { color: 'white' }]}>Profile</Text>
          </TouchableOpacity>
        </BlurView>
      </View>
    </SafeAreaView>
  );
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F07A3E', // Светло-голубой фон как на изображении
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F07A3E', // Цвет заголовка как на изображении
    paddingTop: 50,
    borderBottomRightRadius: 30, // Для диагонального эффекта
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  upgradeButton: {
    backgroundColor: 'white', // Желтый цвет кнопки Upgrade
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  upgradeButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  contentScrollView: {
    flex: 1,
  },
  mainVideoCardWrapper: {
    width: MAIN_CARD_WIDTH,
    height: 470,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 15, // Более скругленные углы
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
  },
  mainVideoThumbnail: {
    width: '100%',
    height: '100%',
  },
  mainVideoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  mainVideoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  mainVideoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainVideoActivity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 20,
    color: '#fff',
    marginRight: 5,
  },
  activityText: {
    fontSize: 16,
    color: '#fff',
  },
  bookmarkIcon: {
    padding: 5,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 20, // Увеличиваем горизонтальные отступы
    backgroundColor: '#fff',
    borderRadius: 25,
    marginTop: 20, // Увеличиваем верхний отступ
  },
  searchBarText: {
    flex: 1,
    fontSize: 16,
    color: '#666',
    paddingLeft: 10,
  },
  filterButton: {
    padding: 5,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 20, // Увеличиваем верхний отступ
    paddingBottom: 0,
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  categoriesArrow: {
    padding: 5,
  },
  horizontalVideoList: {
    paddingLeft: 10, // Отступ для первого элемента
    paddingRight: 10, // Отступ для последнего элемента
    paddingBottom: 10,
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // прозрачный белый
    paddingBottom: 10,
    paddingTop: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',        // каждая иконка занимает 25% ширины панели
    paddingVertical: 5,
  },
  navIcon: {
    fontSize: 24,
  },
  navText: {
    fontSize: 12,
    color: '#666',
  },
  bottomNavWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  
});

export default MainScreen; 