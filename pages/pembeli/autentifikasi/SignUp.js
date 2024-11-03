import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../FirebaseConfig.js';

const SignUp = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    setErrorMessage('');

    if (!fullName || !email || !password) {
      setErrorMessage('Silakan lengkapi semua kolom yang tersedia.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);
      navigation.navigate('SignIn');
    } catch (error) {
      // Atur pesan error yang lebih baku
      if (error.message.includes('auth/invalid-email')) {
        setErrorMessage('Format email tidak valid.');
      } else if (error.message.includes('auth/email-already-in-use')) {
        setErrorMessage('Email ini sudah terdaftar, gunakan email lain.');
      } else if (error.message.includes('auth/weak-password')) {
        setErrorMessage('Kata sandi terlalu lemah, gunakan kata sandi yang lebih kuat.');
      } else {
        setErrorMessage('Terjadi kesalahan. Silakan coba lagi.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PetsLife</Text>
      <Text style={styles.text1}>Create New {"\n"}Account</Text>
      <View style={styles.circleTopLeft} />
      <View style={styles.circleBottomRight} />

      <TextInput
        style={styles.input}
        placeholder="Nama Lengkap"
        placeholderTextColor="#FFFFFF"
        value={fullName}
        onChangeText={setFullName}
      />
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
      
      {/* Tampilkan pesan error jika ada */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Sudah punya akun?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.linkText}> Login</Text>
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
    marginLeft: -140,
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
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'left',
    width: '100%',
    marginBottom: 10,
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
});

export default SignUp;
