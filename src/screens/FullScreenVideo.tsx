import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../theme/theme';

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
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  videoWrapper: {
    width: '100%',
    height: Dimensions.get('window').height * 0.6,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    backgroundColor: 'rgba(241, 239, 240, 0.5)',
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.sm,
    zIndex: 10,
    ...theme.shadows.small,
  },
  closeButtonText: {
    color: theme.colors.text.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  bannerContainer: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...theme.shadows.small,
  },
  bannerText: {
    ...theme.typography.h3,
    fontWeight: 'bold',
    color: theme.colors.surface,
  },
  bannerSubText: {
    ...theme.typography.caption,
    color: theme.colors.surface,
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  unlockButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.medium,
  },
  unlockButtonText: {
    color: theme.colors.surface,
    fontWeight: 'bold',
    fontSize: theme.typography.body.fontSize,
  },
  descriptionContainer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
    marginTop: theme.spacing.md,
  },
  titleText: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.sm,
    color: theme.colors.text.primary,
  },
  descriptionText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    lineHeight: theme.typography.body.lineHeight * 1.2,
  },
});

export default FullScreenVideo; 