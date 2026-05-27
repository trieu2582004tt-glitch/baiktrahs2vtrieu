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
  const getBrightnessLevel = (value: number, isOn: boolean) => {
    if (!isOn) return { label: 'Đã ngắt nguồn 🔌', color: '#888' };
    if (value === 0) return { label: 'Tối đen 🌑 (0%)', color: '#666' };
    if (value <= 30) return { label: 'Sáng mờ 🕯️ (Yếu)', color: '#ff9800' };
    if (value <= 60) return { label: 'Sáng dịu 💡 (Trung bình)', color: '#ffb300' };
    if (value <= 90) return { label: 'Sáng rõ ☀️ (Mạnh)', color: '#4caf50' };
    return { label: 'Cực đại ⚡ (Rất mạnh!)', color: '#e91e63' };
  };

  const level = getBrightnessLevel(brightness, isLightOn);
  const glowSize = 80 + (isLightOn ? (brightness / 100) * 60 : 0);
  const glowOpacity = isLightOn ? (brightness / 100) * 0.6 : 0;
  const bulbScale = 1 + (isLightOn ? (brightness / 100) * 0.15 : 0);
  const dynamicBulbColor = isLightOn
    ? `rgba(255, 235, 59, ${0.4 + (brightness / 100) * 0.6})`
    : '#bbb';

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
      
      {/* Phân loại mức sáng nhận diện */}
      <Text style={styles.infoText}>
        Nhận diện mức sáng:{' '}
        <Text style={[styles.levelText, { color: level.color }]}>
          {level.label}
        </Text>
      </Text>

      {/* Dynamic Bulb Illustration with Glow Effect */}
      <View style={styles.bulbContainer}>
        <View style={styles.bulbWrapper}>
          <View
            style={[
              styles.glowRing,
              {
                width: glowSize,
                height: glowSize,
                borderRadius: glowSize / 2,
                opacity: glowOpacity,
              },
            ]}
          />
          <View
            style={[
              styles.bulb,
              {
                backgroundColor: dynamicBulbColor,
                transform: [{ scale: bulbScale }],
              },
            ]}
          >
            <Text style={styles.bulbEmoji}>{isLightOn ? '💡' : '🔌'}</Text>
          </View>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
  levelText: {
    fontWeight: '700',
  },
  bulbContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  bulbWrapper: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  glowRing: {
    position: 'absolute',
    backgroundColor: '#ffeb3b',
    shadowColor: '#ffeb3b',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 10,
  },
  bulb: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
    backgroundColor: '#bbb',
    zIndex: 2,
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
