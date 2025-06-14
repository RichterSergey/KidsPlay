import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, ScrollView, FlatList, Image, StatusBar, Platform } from 'react-native';
import VideoCard from '../components/VideoCard';
import { theme } from '../theme/theme';

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth - (theme.spacing.lg * 2);
const MAIN_CARD_HEIGHT = 480; // Фиксированная высота главной карты

// Пример видео для демонстрации. В реальном приложении это может быть загружено из API
const sampleVideos = [
  {
    id: '1',
    title: 'DIY Paper Tunnel Race',
    videoUrl: 'C:/Users/richt/Desktop/777.mp4',
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
  {
    id: '5',
    title: 'Пример видео 5 (новое)',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
    type: 'Animation',
  },
  {
    id: '6',
    title: 'Пример видео 6 (новое)',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg',
    type: 'Cars',
  },
  {
    id: '7',
    title: 'Пример видео 7 (новое)',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',
    type: 'Sci-Fi',
  },
];

const MainScreen: React.FC<any> = ({ navigation }) => {
  const mainVideo = sampleVideos[0];
  const otherVideos = sampleVideos.slice(1);
  const currentTime = "14:43"; // Заглушка для времени

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      {/* Top Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRow}>
          <Text style={styles.timeText}>{currentTime}</Text>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>UPGRADE</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>Ideas of the week</Text>
      </View>

      <ScrollView style={styles.contentScrollView} showsVerticalScrollIndicator={false}>
        {/* Main Video Card Area */}
        <FlatList
          data={sampleVideos}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.mainVideoCardWrapper}
              onPress={() => navigation.navigate('FullScreenVideo', item)}
            >
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.mainVideoThumbnail}
              />
              <View style={styles.mainVideoOverlay}>
                <Text style={styles.mainVideoTitle}>{item.title}</Text>
                <View style={styles.mainVideoActions}>
                  <View style={styles.playActivityContainer}>
                    <Text style={styles.playIcon}>▶️</Text>
                    <Text style={styles.activityText}>{item.type}</Text>
                  </View>
                  <TouchableOpacity style={styles.bookmarkIcon}>
                    <Text>🔖</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          snapToInterval={ITEM_WIDTH} // Снап к ширине элемента
          decelerationRate="fast"
          snapToAlignment="center"
          contentContainerStyle={styles.mainVideoListContent}
        />

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Text style={styles.searchBarPlaceholder}>🔍 Search...</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>≡</Text>
          </TouchableOpacity>
        </View>

        {/* Indoor Categories */}
        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>Indoor</Text>
          <TouchableOpacity style={styles.categoriesArrow}>
            <Text>≫</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={otherVideos}
          renderItem={({ item }) => (
            <VideoCard
              cardWidth={screenWidth / 2 - theme.spacing.lg} // Ширина карты (половина экрана минус отступы)
              title={item.title}
              videoUrl={item.videoUrl}
              onPress={() => navigation.navigate('FullScreenVideo', item)}
              isPlaying={false}
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
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Text style={[styles.navIcon, styles.activeNavIcon]}>🏠</Text>
          <Text style={[styles.navText, styles.activeNavText]}>Browse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📚</Text>
          <Text style={styles.navText}>Library</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🔍</Text>
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
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Добавляем отступ для StatusBar только на Android
  },
  headerContainer: {
    backgroundColor: theme.colors.primary,
    paddingTop: Platform.OS === 'ios' ? theme.spacing.xl : theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderBottomRightRadius: theme.borderRadius.xl,
    ...theme.shadows.medium,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing.sm,
  },
  timeText: {
    ...theme.typography.caption,
    color: theme.colors.surface,
  },
  headerText: {
    ...theme.typography.h2,
    color: theme.colors.surface,
    textAlign: 'center',
  },
  upgradeButton: {
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.small,
  },
  upgradeButtonText: {
    color: theme.colors.text.primary,
    fontWeight: 'bold',
  },
  contentScrollView: {
    flex: 1,
  },
  mainVideoCardWrapper: {
    width: ITEM_WIDTH - theme.spacing.md, // Фактическая ширина карты минус отступ для зазора
    height: MAIN_CARD_HEIGHT,
    marginTop: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    ...theme.shadows.large,
    backgroundColor: theme.colors.surface,
    marginRight: theme.spacing.md, // Отступ справа от каждой карты
  },
  mainVideoThumbnail: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
  },
  mainVideoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mainVideoTitle: {
    ...theme.typography.h2,
    color: theme.colors.surface,
    marginBottom: theme.spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  mainVideoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playActivityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  playIcon: {
    fontSize: 16,
    color: theme.colors.primary,
    marginRight: theme.spacing.xs,
  },
  activityText: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    fontWeight: 'bold',
  },
  bookmarkIcon: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.sm,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    marginTop: theme.spacing.lg,
    ...theme.shadows.small,
  },
  searchBarPlaceholder: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    paddingLeft: theme.spacing.sm,
  },
  filterButton: {
    padding: theme.spacing.xs,
  },
  filterIcon: {
    fontSize: 20,
    color: theme.colors.primary,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: 0,
  },
  categoriesTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  categoriesArrow: {
    padding: theme.spacing.xs,
  },
  horizontalVideoList: {
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70, // Скорректированная высота для лучшего соответствия изображению
    backgroundColor: theme.colors.surface,
    borderTopWidth: 0,
    ...theme.shadows.medium,
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  activeNavItem: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg, // Изменил на lg для менее круглого вида
    paddingVertical: theme.spacing.md, // Увеличил вертикальный отступ
    paddingHorizontal: theme.spacing.md + theme.spacing.sm,
    ...theme.shadows.small,
  },
  navIcon: {
    fontSize: theme.typography.h3.fontSize, // Использование h3 для большего размера
    marginBottom: theme.spacing.xs / 2,
    color: theme.colors.text.secondary,
  },
  activeNavIcon: {
    color: theme.colors.surface,
  },
  navText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  activeNavText: {
    color: theme.colors.surface,
  },
  mainVideoListContent: {
    paddingHorizontal: theme.spacing.lg, // Отступ для первого и последнего элемента
  },
});

export default MainScreen; 