import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  FullScreenVideo: {
    videoUrl: string;
    title: string;
  };
  Upgrade: undefined;
};

type UpgradeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Upgrade'>;

const UpgradeScreen: React.FC = () => {
  const navigation = useNavigation<UpgradeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Upgrade</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.upgradeText}>Премиум функции</Text>
        <View style={styles.featuresContainer}>
          <Text style={styles.featureText}>✨ Без рекламы</Text>
          <Text style={styles.featureText}>🎮 Доступ ко всем играм</Text>
          <Text style={styles.featureText}>📱 Офлайн режим</Text>
          <Text style={styles.featureText}>👨‍👩‍👧‍👦 Семейный доступ</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F07A3E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  upgradeText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  featuresContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
  },
  featureText: {
    color: 'white',
    fontSize: 18,
    marginVertical: 10,
  },
});

export default UpgradeScreen; 