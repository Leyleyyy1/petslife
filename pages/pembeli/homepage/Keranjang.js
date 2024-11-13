import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Keranjang = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Keranjang</Text>

      {}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  text: {
    fontSize: 18,
    color: '#333333',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#6640FD',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Keranjang;