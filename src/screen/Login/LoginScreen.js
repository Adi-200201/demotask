import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { useStore } from '../../store/useStore';

const LoginScreen = () => {
  const setUser = useStore((state) => state.setUser);

  const handleLogin = () => {
    setUser({ id: 1, name: 'John Doe' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} color="#4CAF50" />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    width: '60%',
  },
});


