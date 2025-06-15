import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native';
import Video from 'react-native-video';
import { theme } from '../theme/theme';

interface VideoCardProps {
  videoUrl?: string;
  title?: string;
  onPress: () => void;
  cardWidth?: number;
  isPlaying?: boolean;
  showTitle?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoUrl, title, onPress, cardWidth, isPlaying = false, showTitle = true }) => {
  return (
      <TouchableOpacity
          style={[
            styles.container,
            cardWidth ? { width: cardWidth } : {},
            theme.shadows.medium
          ]}
          onPress={onPress}
      >
        <View style={styles.videoContainer}>
          {videoUrl ? (
              <Video
                  source={{ uri: videoUrl }}
                  style={styles.video}
                  resizeMode="cover"
                  paused={!isPlaying}
                  muted={true}
              />
          ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>No Video</Text>
              </View>
          )}
        </View>
        {showTitle && !!title && (
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
        )}
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    margin: theme.spacing.sm,
    overflow: 'hidden',
  },
  videoContainer: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: theme.borderRadius.md,
    borderTopRightRadius: theme.borderRadius.md,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  title: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    ...theme.typography.body,
    color: theme.colors.text.primary,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default VideoCard;
