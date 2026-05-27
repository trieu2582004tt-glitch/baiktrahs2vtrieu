import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import LightControl from './LightControl';

export const ParentControl: React.FC = () => {
  const [isLightOn, setIsLightOn] = useState<boolean>(false);
  const [brightness, setBrightness] = useState<number>(50);

  const handleToggleLight = () => {
    setIsLightOn((prev) => !prev);
  };

  const handleIncreaseBrightness = () => {
    if (isLightOn) {
      setBrightness((prev) => Math.min(prev + 10, 100));
    }
  };

  const handleDecreaseBrightness = () => {
    if (isLightOn) {
      setBrightness((prev) => Math.max(prev - 10, 0));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>HỆ THỐNG ĐIỀU KHIỂN ĐÈN THÔNG MINH</Text>

      <View style={styles.parentContainer}>
        <Text style={styles.headerText}>===== COMPONENT CHA =====</Text>
        <Text style={styles.statusText}>
          Trạng thái đèn:{' '}
          <Text style={isLightOn ? styles.textOn : styles.textOff}>
            {isLightOn ? 'BẬT' : 'TẮT'}
          </Text>
        </Text>
        <Text style={styles.statusText}>Độ sáng hiện tại: {brightness}%</Text>
      </View>

      <LightControl
        isLightOn={isLightOn}
        brightness={brightness}
        onToggleLight={handleToggleLight}
        onIncreaseBrightness={handleIncreaseBrightness}
        onDecreaseBrightness={handleDecreaseBrightness}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#d12e6a',
    textAlign: 'center',
    marginBottom: 20,
  },
  parentContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#d12e6a',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#d12e6a',
    textAlign: 'center',
    marginBottom: 12,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  textOn: {
    color: 'green',
    fontWeight: 'bold',
  },
  textOff: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default ParentControl;
