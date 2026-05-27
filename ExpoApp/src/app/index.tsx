import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ParentControl from '../../components/ParentControl';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ParentControl />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
