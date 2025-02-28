import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WardrobeScreen from './screens/WardrobeScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <WardrobeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});