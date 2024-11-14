import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfilPenjual = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil penjual</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProfilPenjual;
