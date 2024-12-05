import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../FirebaseConfig.js';

const SignIn = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAuthError = (error) => {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'Pengguna tidak ditemukan, silakan periksa kembali email yang Anda masukkan.';
      case 'auth/wrong-password':
        return 'Kata sandi yang Anda masukkan salah.';
      case 'auth/invalid-email':
        return 'Format email tidak valid.';
      default:
        return 'Terjadi kesalahan. Silakan coba lagi.';
    }
  };
  

  const isNotEmpty = (value) => value.trim() !== '';
  const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

  const validateInput = () => {
    const { email, password } = formData;
    return isNotEmpty(email) && isEmailValid(email) && isNotEmpty(password);
  };

  const handleSignIn = async () => {
    setErrorMessage('');
    const { email, password } = formData;

    if (!validateInput()) {
      setErrorMessage('Silakan lengkapi semua kolom yang tersedia dengan benar.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
      navigation.navigate('Homepage');
    } catch (error) {
      setErrorMessage(handleAuthError(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PetsLife</Text>
      <Text style={styles.text1}>Hello, {"\n"}Welcome Back</Text>
      <View style={styles.circleTopLeft} />
      <View style={styles.circleBottomRight} />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#FFFFFF"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#FFFFFF"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleInputChange('password', text)}
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <View style={styles.roleContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.linkText}>Pembeli</Text>
        </TouchableOpacity>
        <Text style={styles.separator}> | </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginPenjual')}>
          <Text style={styles.linkText}>Penjual</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Belum punya akun?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}> Daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    left: -25,
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
    fontSize: 14,
    textAlign: 'left',
    width: '100%',
    marginBottom: 10,
  },
});

export default SignIn;
