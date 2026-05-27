import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface LightControlProps {
  isLightOn: boolean;
  brightness: number;
  onToggleLight: () => void;
  onIncreaseBrightness: () => void;
  onDecreaseBrightness: () => void;
}

export const LightControl: React.FC<LightControlProps> = ({
  isLightOn,
  brightness,
  onToggleLight,
  onIncreaseBrightness,
  onDecreaseBrightness,
}) => {
  return (
    <View style={styles.childContainer}>
      <Text style={styles.headerText}>===== COMPONENT CON =====</Text>

      {/* Displays received info */}
      <Text style={styles.infoText}>
        Trạng thái nhận được:{' '}
        <Text style={isLightOn ? styles.textOn : styles.textOff}>
          {isLightOn ? 'BẬT' : 'TẮT'}
        </Text>
      </Text>
      <Text style={styles.infoText}>Độ sáng nhận được: {brightness}%</Text>

      {/* Simple Bulb Illustration */}
      <View style={styles.bulbContainer}>
        <View style={[styles.bulb, isLightOn ? styles.bulbOn : styles.bulbOff]}>
          <Text style={styles.bulbEmoji}>{isLightOn ? '💡' : '🔌'}</Text>
        </View>
      </View>

      {/* Control Buttons */}
      <TouchableOpacity style={styles.button} onPress={onToggleLight}>
        <Text style={styles.buttonText}>{isLightOn ? 'Tắt Đèn' : 'Bật Đèn'}</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.buttonAdjust, (!isLightOn || brightness <= 0) && styles.buttonDisabled]}
          onPress={onDecreaseBrightness}
          disabled={!isLightOn || brightness <= 0}
        >
          <Text style={styles.buttonText}>Giảm độ sáng (-10)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonAdjust, (!isLightOn || brightness >= 100) && styles.buttonDisabled]}
          onPress={onIncreaseBrightness}
          disabled={!isLightOn || brightness >= 100}
        >
          <Text style={styles.buttonText}>Tăng độ sáng (+10)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  childContainer: {
    marginTop: 20,
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
  infoText: {
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
  bulbContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  bulb: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
  },
  bulbOn: {
    backgroundColor: '#ffeb3b',
  },
  bulbOff: {
    backgroundColor: '#bbb',
  },
  bulbEmoji: {
    fontSize: 36,
  },
  button: {
    backgroundColor: '#0d72d0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonAdjust: {
    flex: 0.48,
    backgroundColor: '#0d72d0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
});

export default LightControl;
