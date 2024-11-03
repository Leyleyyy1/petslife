import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../FirebaseConfig';  // Sesuaikan path import ini dengan konfigurasi Anda

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    try {
      // Gunakan Firebase Auth untuk login
      await signInWithEmailAndPassword(auth, email, password);
      // Jika login berhasil, navigasikan ke halaman utama
      navigation.navigate('Homepage');
    } catch (error) {
      // Set pesan kesalahan jika login gagal
      if (error.message.includes('auth/invalid-email')) {
        setErrorMessage('Format email tidak valid.');
      } else if (error.message.includes('auth/user-not-found')) {
        setErrorMessage('Pengguna tidak ditemukan, silakan periksa kembali email yang Anda masukkan.');
      } else if (error.message.includes('auth/wrong-password')) {
        setErrorMessage('Kata sandi yang Anda masukkan salah.');
      } else {
        setErrorMessage('Terjadi kesalahan. Silakan coba lagi.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PetsLife</Text>
      <Text style={styles.text1}>Hello, {"\n"}Welcome Back</Text>
      <View style={styles.circleTopLeft} />
      <View style={styles.circleBottomRight} />

      {/* Input fields */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#FFFFFF"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#FFFFFF"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Error message */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Role selection between Buyer and Seller */}
      <View style={styles.roleContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.linkText}>Pembeli</Text>
        </TouchableOpacity>
        <Text style={styles.separator}> | </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginPenjual')}>
          <Text style={styles.linkText}>Penjual</Text>
        </TouchableOpacity>
      </View>

      {/* Login button */}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Footer for account registration */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Belum punya akun?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}> Daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
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
  },
  text1: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left',
    marginTop: 40,
    marginBottom: 40,
    marginLeft: -80,
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
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#FFFFFF',
  },
  linkText: {
    color: '#230086',
    textDecorationLine: 'underline',
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
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  separator: {
    color: '#FFFFFF',
    fontSize: 16,
    marginHorizontal: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignIn;
