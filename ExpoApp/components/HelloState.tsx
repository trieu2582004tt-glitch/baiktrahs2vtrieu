import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

interface ChildProps {
  name: string;
  age: string;
  onUpdateParent: (newName: string, newAge: string) => void;
}

const ChildComponent: React.FC<ChildProps> = ({ name, age, onUpdateParent }) => {
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');

  const handleSendToParent = () => {
    onUpdateParent(childName, childAge);
  };

  return (
    <View style={styles.childContainer}>
      <View style={styles.childBox}>
        <Text style={styles.childText}>Name nhận từ cha: {name}</Text>
      </View>
      <View style={styles.childBox}>
        <Text style={styles.childText}>Age nhận từ cha: {age}</Text>
      </View>

      <TextInput
        style={styles.childInput}
        placeholder="Nhập tên mới cho cha"
        placeholderTextColor="#777"
        value={childName}
        onChangeText={setChildName}
      />

      <TextInput
        style={styles.childInput}
        placeholder="Nhập tuổi mới cho cha"
        placeholderTextColor="#777"
        keyboardType="numeric"
        value={childAge}
        onChangeText={setChildAge}
      />

      <TouchableOpacity style={styles.childButton} onPress={handleSendToParent}>
        <Text style={styles.childButtonText}>Truyền dữ liệu lên cha</Text>
      </TouchableOpacity>
    </View>
  );
};

const HelloState = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = () => {
    const trimmedName = name.trim();
    const trimmedAge = age.trim();

    if (!trimmedName || !trimmedAge) {
      setResult('Vui lòng nhập tên và tuổi');
      return;
    }

    setResult(`Tên: ${trimmedName}\nTuổi: ${trimmedAge}`);
  };

  const handleUpdateParent = (newName: string, newAge: string) => {
    setName(newName);
    setAge(newAge);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>HelloState</Text>

      <TextInput
        style={styles.input}
        placeholder="nhập tên của bạn"
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="nhập tuổi của bạn"
        placeholderTextColor="#777"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>in kết quả</Text>
      </TouchableOpacity>

      {result ? (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      ) : null}

      <ChildComponent
        name={name}
        age={age}
        onUpdateParent={handleUpdateParent}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#d12e6a',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d12e6a',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    fontSize: 16,
    color: '#111',
  },
  button: {
    backgroundColor: '#0d72d0',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  resultBox: {
    marginTop: 22,
    padding: 16,
    backgroundColor: '#eef6ff',
    borderRadius: 16,
  },
  resultText: {
    fontSize: 18,
    color: '#111',
    lineHeight: 26,
  },
  childContainer: {
    marginTop: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#d12e6a',
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  childBox: {
    borderWidth: 1,
    borderColor: '#d12e6a',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    backgroundColor: '#fff',
  },
  childText: {
    fontSize: 16,
    color: '#0d72d0',
  },
  childInput: {
    borderWidth: 1,
    borderColor: '#d12e6a',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    fontSize: 16,
    color: '#111',
  },
  childButton: {
    backgroundColor: '#0d72d0',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  childButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default HelloState;

