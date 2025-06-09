import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, ScrollView, FlatList, Image } from 'react-native';
import VideoCard from '../components/VideoCard'; // Импортируем VideoCard

const { width: screenWidth } = Dimensions.get('window');
// Изменяем MAIN_CARD_HEIGHT, чтобы она занимала большую часть верхней секции
const MAIN_CARD_HEIGHT = screenWidth * 0.9; 

// Пример видео для демонстрации. В реальном приложении это может быть загружено из API
const sampleVideos = [
  {
    id: '1',
    title: 'DIY Paper Tunnel Race',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    type: 'Activities',
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

      <ScrollView style={styles.contentScrollView}>
        {/* Main Video Card Area */}
        {mainVideo && (
          <TouchableOpacity
            style={styles.mainVideoCardWrapper}
            onPress={() => navigation.navigate('FullScreenVideo', mainVideo)}
          >
            {/* Используем VideoCard для мини-плеера вместо Image для миниатюры */}
            <VideoCard 
              cardWidth={screenWidth - 20} // Ширина главной карты (почти весь экран)
              title={mainVideo.title} // Заголовок будет наложен отдельно
              videoUrl={mainVideo.videoUrl}
              onPress={() => navigation.navigate('FullScreenVideo', mainVideo)}
              isPlaying={false} // Видео приостановлено по умолчанию
              showTitle={false} // Заголовок не отображается внутри VideoCard, так как он наложен
            />
            <View style={styles.mainVideoOverlay}>
              <Text style={styles.mainVideoTitle}>{mainVideo.title}</Text>
              <View style={styles.mainVideoActions}>
                <View style={styles.mainVideoActivity}>
                  <Text style={styles.playIcon}>▶️</Text>
                  <Text style={styles.activityText}>{mainVideo.type}</Text>
                </View>
                <TouchableOpacity style={styles.bookmarkIcon}>
                  <Text style={{ fontSize: 24 }}>🔖</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Text style={styles.searchBarText}>🔍 Search...</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Text>🎛️</Text>
          </TouchableOpacity>
        </View>

        {/* Indoor Categories */}
        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>Indoor</Text>
          <TouchableOpacity style={styles.categoriesArrow}>
            <Text>⬇️</Text>
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
      <View style={styles.bottomNavBar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Browse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🗄️</Text>
          <Text style={styles.navText}>Library</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🔎</Text>
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F7', // Светло-голубой фон как на изображении
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#00BCD4', // Цвет заголовка как на изображении
    paddingTop: 40, // Для учета статус-бара
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  upgradeButton: {
    backgroundColor: '#FFEB3B', // Желтый цвет кнопки Upgrade
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
    height: MAIN_CARD_HEIGHT,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative', // Для наложения текста
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff', // Добавим фон, чтобы VideoCard не был прозрачным
  },
  mainVideoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    // background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%); // Можно попробовать позже для градиента
    backgroundColor: 'rgba(0,0,0,0.4)', // Полупрозрачный фон для текста
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
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginTop: 10,
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
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10, // Добавим немного отступа снизу
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    alignItems: 'center',
    padding: 5,
  },
  navIcon: {
    fontSize: 24,
  },
  navText: {
    fontSize: 12,
    color: '#666',
  },
  mainVideoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
});

export default MainScreen; 