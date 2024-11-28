import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { db } from '../../../FirebaseConfig';  // Pastikan untuk mengimpor konfigurasi Firebase Anda
import { collection, addDoc } from 'firebase/firestore';  // Mengimpor fungsi untuk menambahkan data ke Firestore

const AddProduk = () => {
  const [namaProduk, setNamaProduk] = useState('');
  const [jenisProduk, setJenisProduk] = useState('');
  const [hargaProduk, setHargaProduk] = useState('');
  const [stokProduk, setStokProduk] = useState('');
  const [deskripsiProduk, setDeskripsiProduk] = useState('');

  // Fungsi untuk mengirim data ke Firestore
  const handleSubmit = async () => {
    if (!namaProduk || !jenisProduk || !hargaProduk || !stokProduk || !deskripsiProduk) {
      Alert.alert('Error', 'Harap lengkapi semua field!');
      return;
    }

    try {
      // Menambahkan data ke Firestore
      await addDoc(collection(db, 'products'), {
        namaProduk,
        jenisProduk,
        hargaProduk: parseFloat(hargaProduk),
        stokProduk: parseInt(stokProduk),
        deskripsiProduk,
        createdAt: new Date(),  // Menambahkan timestamp
      });

      Alert.alert('Sukses', 'Produk berhasil ditambahkan!');
      // Reset form setelah berhasil disimpan
      setNamaProduk('');
      setJenisProduk('');
      setHargaProduk('');
      setStokProduk('');
      setDeskripsiProduk('');
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'Gagal menambahkan produk. Silakan coba lagi.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tambah Produk</Text>

      <Text style={styles.label}>Nama Produk</Text>
      <TextInput
        placeholder="Masukkan nama produk"
        style={styles.input}
        value={namaProduk}
        onChangeText={setNamaProduk}
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Jenis Produk</Text>
      <RNPickerSelect
        onValueChange={(value) => setJenisProduk(value)}
        items={[
          { label: 'Makanan', value: 'Makanan' },
          { label: 'Aksesoris', value: 'Aksesoris' },
          { label: 'Obat', value: 'Obat' },
          { label: 'Perlengkapan', value: 'Perlengkapan' },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: 'Pilih jenis produk', value: null }}
      />

      <Text style={styles.label}>Harga Produk</Text>
      <TextInput
        placeholder="Masukkan harga produk"
        style={styles.input}
        keyboardType="numeric"
        value={hargaProduk}
        onChangeText={setHargaProduk}
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Stok Produk</Text>
      <TextInput
        placeholder="Masukkan stok produk"
        style={styles.input}
        keyboardType="numeric"
        value={stokProduk}
        onChangeText={setStokProduk}
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Deskripsi Produk</Text>
      <TextInput
        placeholder="Masukkan deskripsi produk"
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={4}
        value={deskripsiProduk}
        onChangeText={setDeskripsiProduk}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Tambah Produk</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    textAlign: 'center',
    color: '#757EFA',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#757EFA',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#F5F6FF',
    color: '#333',
  },
  textArea: {
    height: 50,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#757EFA',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    height: 50,
    borderWidth: 1,
    borderColor: '#757EFA',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#F5F6FF',
    fontSize: 16,
    color: '#333',
  },
  inputAndroid: {
    height: 50,
    borderWidth: 1,
    borderColor: '#757EFA',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#F5F6FF',
    fontSize: 16,
    color: '#333',
  },
};

export default AddProduk;
