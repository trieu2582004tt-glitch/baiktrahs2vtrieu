import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Vibration } from 'react-native';
import LightControl from './LightControl';

interface LogItem {
  id: string;
  time: string;
  action: string;
}

export const ParentControl: React.FC = () => {
  const [isLightOn, setIsLightOn] = useState<boolean>(false);
  const [brightness, setBrightness] = useState<number>(50);
  const [logs, setLogs] = useState<LogItem[]>([]);

  const addLog = (action: string) => {
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];
    setLogs((prev) => [
      { id: Math.random().toString(), time: timeString, action },
      ...prev.slice(0, 4), // Keep last 5 actions
    ]);
  };

  const handleToggleLight = () => {
    setIsLightOn((prev) => {
      const nextState = !prev;
      addLog(nextState ? 'Đã bật đèn 💡' : 'Đã tắt đèn 🔌');
      Vibration.vibrate(50);
      return nextState;
    });
  };

  const handleIncreaseBrightness = () => {
    if (isLightOn) {
      setBrightness((prev) => {
        const nextVal = Math.min(prev + 10, 100);
        addLog(`Tăng độ sáng lên ${nextVal}% 📈`);
        Vibration.vibrate(50);
        return nextVal;
      });
    }
  };

  const handleDecreaseBrightness = () => {
    if (isLightOn) {
      setBrightness((prev) => {
        const nextVal = Math.max(prev - 10, 0);
        addLog(`Giảm độ sáng xuống ${nextVal}% 📉`);
        Vibration.vibrate(50);
        return nextVal;
      });
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

      {/* Lịch sử nhật ký nhận diện hệ thống */}
      <View style={styles.logContainer}>
        <Text style={styles.logHeader}>NHẬT KÝ HỆ THỐNG (NHẬN DIỆN THỜI GIAN THỰC)</Text>
        {logs.length === 0 ? (
          <Text style={styles.logEmpty}>Chưa ghi nhận hoạt động nào.</Text>
        ) : (
          logs.map((item) => (
            <View key={item.id} style={styles.logRow}>
              <Text style={styles.logTime}>[{item.time}]</Text>
              <Text style={styles.logAction}>{item.action}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
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
  logContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: '#1e1e1e',
  },
  logHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#00ffcc',
    marginBottom: 10,
    textAlign: 'center',
  },
  logEmpty: {
    color: '#aaa',
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 14,
  },
  logRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  logTime: {
    color: '#888',
    marginRight: 8,
    fontSize: 14,
    fontFamily: 'monospace',
  },
  logAction: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ParentControl;

