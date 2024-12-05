import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { db } from '../../FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const LoginPenjual = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Pure Function untuk memproses autentikasi
  const authenticateAdmin = (admins, email, password) => {
    return admins
      .map(admin => ({ ...admin, email: admin.email.toLowerCase() })) // HOF: Normalize email
      .filter(admin => admin.email && admin.password) // HOF: Filter valid data
      .some(admin => admin.email === email.toLowerCase() && admin.password === password); // HOF: Check credentials
  };

  // Pure Function dengan rekursi untuk menghitung panjang dokumen
  const countDocuments = (docs, count = 0) => {
    if (docs.length === 0) return count;
    return countDocuments(docs.slice(1), count + 1); // Rekursi
  };

  const handleLogin = async () => {
    try {
      const adminCollection = collection(db, 'admin');
      const snapshot = await getDocs(adminCollection);

      // Membuat array admin menggunakan spread operator
      const admins = [...snapshot.docs.map(doc => doc.data())]; // HOF: map

      const totalAdmins = countDocuments(admins); // Rekursi dipanggil
      console.log(`Total Admins: ${totalAdmins}`);

      // Function Composition: Proses autentikasi
      const isAuthenticated = authenticateAdmin(admins, email, password);

      if (isAuthenticated) {
        navigation.navigate('HomeSeller');
      } else {
        Alert.alert('Login Gagal', 'Email atau password salah');
      }
    } catch (error) {
      console.error('Error logging in: ', error);
      Alert.alert('Error', 'Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PetsLife</Text>
      <Text style={styles.subtitle}>Seller</Text>

      <Image 
        source={require('../../source/gambar/Seller.png')} 
        style={styles.gbrseller} 
      />

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#FFFFFF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#FFFFFF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Lupa Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.circleTopLeft} />
      <View style={styles.circleBottomRight} />
    </View>
  );
};

const styles = StyleSheet.create({
  // Gaya tetap seperti semula
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#757EFA',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    letterSpacing: 3,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  gbrseller: {
    width: 200,
    height: 200,
    resizeMode: 'contain', 
    marginBottom: 40, 
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingHorizontal: 15,
    marginBottom: 20,
    color: '#FFFFFF',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#6640FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    marginTop: 20,
  },
  forgotPasswordText: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  circleTopLeft: {
    width: 350,
    height: 350,
    borderRadius: 350,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'absolute',
    top: -100,
    left: -100,
  },
  circleBottomRight: {
    width: 300,
    height: 300,
    borderRadius: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'absolute',
    bottom: 30,
    right: -100,
    pointerEvents: 'none',
  },
});

export default LoginPenjual;
