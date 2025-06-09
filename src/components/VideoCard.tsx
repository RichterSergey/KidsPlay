import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Video from 'react-native-video';

interface VideoCardProps {
  videoUrl: string;
  title: string;
  onPress: () => void;
  cardWidth?: number;
  isPlaying?: boolean;
  showTitle?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoUrl, title, onPress, cardWidth, isPlaying = false, showTitle = true }) => {
  return (
    <TouchableOpacity style={[styles.container, cardWidth ? { width: cardWidth } : {}]} onPress={onPress}>
      <View style={styles.videoContainer}>
        <Video
          source={{ uri: videoUrl }}
          style={styles.video}
          resizeMode="cover"
          paused={!isPlaying}
          muted={true}
        />
      </View>
      {showTitle && <Text style={styles.title}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  videoContainer: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  title: {
    padding: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default VideoCard; 