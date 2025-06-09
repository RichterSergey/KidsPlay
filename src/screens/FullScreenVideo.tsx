import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  FullScreenVideo: {
    videoUrl: string;
    title: string;
  };
};

type FullScreenVideoProps = NativeStackScreenProps<RootStackParamList, 'FullScreenVideo'>;

const FullScreenVideo: React.FC<FullScreenVideoProps> = ({ route, navigation }) => {
  const { videoUrl, title } = route.params;
  const [paused, setPaused] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.videoWrapper}>
          <Video
            source={{ uri: videoUrl }}
            style={styles.video}
            resizeMode="cover"
            paused={false}
            controls={true}
          />
        </View>

        <View style={styles.bannerContainer}>
          <Text style={styles.bannerText}>Your last free activity</Text>
          <Text style={styles.bannerSubText}>Unlock more for great time together</Text>
          <TouchableOpacity style={styles.unlockButton}>
            <Text style={styles.unlockButtonText}>UNLOCK ALL</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.descriptionText}>
            Это пример описания для видео. Здесь может быть более подробная информация о видео, 
            инструкции, ссылки или любой другой текст, который должен отображаться под видео.
            Вы можете прокрутить эту область, чтобы увидеть весь контент.
            Добавьте сюда больше текста, чтобы проверить прокрутку. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.closeButtonText}>✖️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    flexGrow: 1,
  },
  videoWrapper: {
    width: '100%',
    height: Dimensions.get('window').height * 0.6,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bannerContainer: {
    backgroundColor: '#FFEB3B',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  bannerSubText: {
    fontSize: 12,
    color: '#000',
    flex: 1,
    marginLeft: 10,
  },
  unlockButton: {
    backgroundColor: '#00BCD4',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  unlockButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  descriptionContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
});

export default FullScreenVideo; 