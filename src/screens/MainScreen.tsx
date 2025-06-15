import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, ScrollView, FlatList, Image, Animated } from 'react-native';
import VideoCard from '../components/VideoCard';
import BrowseIcon from '../assets/icons/browse.svg';
import LibraryIcon from '../assets/icons/library.svg';
import SearchIcon from '../assets/icons/search.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import { BlurView } from '@react-native-community/blur';
import Video from 'react-native-video';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback, useRef } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width: screenWidth } = Dimensions.get('window');
const MAIN_CARD_ASPECT_RATIO = 16 / 9;
const CAROUSEL_PADDING_LEFT = 20;
const CARD_RIGHT_MARGIN = 10;
const MAIN_CARD_WIDTH = screenWidth - CAROUSEL_PADDING_LEFT - CARD_RIGHT_MARGIN - 20;
const MAIN_CARD_HEIGHT = MAIN_CARD_WIDTH / MAIN_CARD_ASPECT_RATIO;

const sampleVideos = [
  { id: '1', thumbnail: 'https://img.freepik.com/free-photo/children-playing-with-toys_23-2148637591.jpg', type: 'Реклама' },
  { id: '2', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg' },
  { id: '3', thumbnail: 'https://img.freepik.com/free-photo/children-playing-with-toys_23-2148637591.jpg' },
  { id: '4', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg' },
  { id: '5', thumbnail: 'https://img.freepik.com/free-photo/children-playing-with-toys_23-2148637591.jpg' },
  { id: '6', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg' },
];

type RootStackParamList = {
  MainScreen: undefined;
  FullScreenVideo: { videoUrl?: string; thumbnail: string };
  Upgrade: undefined;
};

type MainScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainScreen'>;

type Props = {
  navigation: MainScreenNavigationProp;
};

const MainScreen: React.FC<Props> = ({ navigation }) => {  const [isFocused, setIsFocused] = useState(true);
  const scrollX = useRef(new Animated.Value(0)).current;

  
  
  useFocusEffect(
      useCallback(() => {
        setIsFocused(true);
        return () => setIsFocused(false);
      }, [])
  );

  const otherVideos = sampleVideos.slice(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRange = sampleVideos.map((_, index) => index * (MAIN_CARD_WIDTH + CARD_RIGHT_MARGIN));
  const backgroundColors = ['#F07A3E', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#03A9F4'];

  const interpolatedColor = scrollX.interpolate({
    inputRange,
    outputRange: backgroundColors,
    extrapolate: 'clamp',
  });

  
  return (
      <Animated.View style={[styles.container, { backgroundColor: interpolatedColor }]}>
        <SafeAreaView style={styles.safeArea}>
          <View style={[styles.headerContainer, { backgroundColor: 'transparent' }]}>
            <Text style={styles.headerText}>Ideas of the week</Text>
            <TouchableOpacity style={styles.upgradeButton} onPress={() => navigation.navigate('Upgrade')}>
              <Animated.Text style={[styles.upgradeButtonText, { color: interpolatedColor }]}>UPGRADE</Animated.Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.contentScrollView} showsVerticalScrollIndicator={false}>
            <Animated.FlatList
                data={sampleVideos.slice(0, 7)}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={styles.mainVideoCardWrapper}
                        onPress={() => navigation.navigate('FullScreenVideo', item)}
                    >
                      {!item.videoUrl ? (
                          <Image source={{ uri: item.thumbnail }} style={styles.mainVideoThumbnail} resizeMode="cover" />
                      ) : (
                          <Video
                              source={{ uri: item.videoUrl }}
                              style={styles.mainVideoThumbnail}
                              resizeMode="cover"
                              repeat
                              muted
                              paused={!isFocused || activeIndex !== index}
                              ignoreSilentSwitch="obey"
                          />
                      )}
                      <View style={styles.mainVideoOverlay}>
                        <View style={styles.mainVideoActions}>
                          <View style={styles.mainVideoActivity}>
                            <Text style={styles.playIcon}></Text>
                            <Text style={styles.activityText}>{item.type}</Text>
                          </View>
                          <TouchableOpacity style={styles.bookmarkIcon}>
                            <Text style={{ fontSize: 24 }}></Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                )}
                snapToInterval={MAIN_CARD_WIDTH + CARD_RIGHT_MARGIN}
                decelerationRate="fast"
                contentContainerStyle={{ paddingHorizontal: (screenWidth - MAIN_CARD_WIDTH) / 2 }}
                onMomentumScrollEnd={(event) => {
                  const index = Math.round(event.nativeEvent.contentOffset.x / (MAIN_CARD_WIDTH + CARD_RIGHT_MARGIN));
                  setActiveIndex(index);
                }}
            />

            <View style={styles.searchBarContainer}>
              <Text style={styles.searchBarText}>Search...</Text>
              <TouchableOpacity style={styles.filterButton}><Text></Text></TouchableOpacity>
            </View>

            <View style={styles.categoriesHeader}>
              <Text style={styles.categoriesTitle}>Indoor</Text>
              <TouchableOpacity style={styles.categoriesArrow}><Text></Text></TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalVideoList}>
              {otherVideos.slice(0, 4).map((item) => (
                  <TouchableOpacity
                      key={item.id}
                      style={styles.smallCard}
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate('FullScreenVideo', item)}
                  >
                    <Image source={{ uri: item.thumbnail }} style={styles.smallCardImage} resizeMode="cover" />
                  </TouchableOpacity>
              ))}
            </ScrollView>
          </ScrollView>

          <View style={styles.bottomNavWrapper}>
            <BlurView
                style={styles.bottomNavBar}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor="white">
              {/* Навигационные иконки здесь */}
            </BlurView>
          </View>
        </SafeAreaView>
      </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: 50,
    borderBottomRightRadius: 30,
  },
  headerText: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  upgradeButton: { backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 20, borderRadius: 20 },
  upgradeButtonText: { fontWeight: 'bold', fontSize: 16 },
  contentScrollView: { flex: 1 },
  mainVideoCardWrapper: {
    width: MAIN_CARD_WIDTH,
    height: 470,
    marginRight: CARD_RIGHT_MARGIN,
    marginTop: 10,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#fff',
  },
  mainVideoThumbnail: { width: '100%', height: '100%' },
  mainVideoOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 15, backgroundColor: 'transparent' },
  mainVideoActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mainVideoActivity: { flexDirection: 'row', alignItems: 'center' },
  playIcon: { fontSize: 20, color: '#fff', marginRight: 5 },
  activityText: { fontSize: 16, color: '#fff' },
  bookmarkIcon: { padding: 5 },
  searchBarContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, marginHorizontal: 20, backgroundColor: '#fff', borderRadius: 25, marginTop: 20 },
  searchBarText: { flex: 1, fontSize: 16, color: '#666', paddingLeft: 10 },
  filterButton: { padding: 5 },
  categoriesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, paddingTop: 20, paddingBottom: 0 },
  categoriesTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  categoriesArrow: { padding: 5 },
  horizontalVideoList: { paddingLeft: 15, paddingRight: 10, paddingBottom: 10 },
  smallCard: { width: screenWidth / 4 - 15, height: screenWidth / 4 - 15, borderRadius: 12, marginRight: 10, overflow: 'hidden', backgroundColor: '#fff' },
  smallCardImage: { width: '100%', height: '100%' },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNavWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});

export default MainScreen;