import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { launchImageLibrary } from 'react-native-image-picker';

const ManageProduk = () => {
  const [namaProduk, setNamaProduk] = useState('');
  const [jenisProduk, setJenisProduk] = useState('');
  const [hargaProduk, setHargaProduk] = useState('');
  const [stokProduk, setStokProduk] = useState('');
  const [deskripsiProduk, setDeskripsiProduk] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handleUploadImage = () => {
    launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image Picker Error: ', response.errorMessage);
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = () => {
    if (!namaProduk || !jenisProduk || !hargaProduk || !stokProduk || !deskripsiProduk || !imageUri) {
      Alert.alert('Error', 'Harap lengkapi semua field dan upload gambar!');
      return;
    }
    console.log({
      namaProduk,
      jenisProduk,
      hargaProduk,
      stokProduk,
      deskripsiProduk,
      imageUri,
    });
    Alert.alert('Sukses', 'Produk berhasil ditambahkan!');
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

      <Text style={styles.label}>Upload Gambar</Text>
      <TouchableOpacity style={styles.imageUploader} onPress={handleUploadImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imageUploaderText}>Klik untuk upload gambar</Text>
        )}
      </TouchableOpacity>

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
  imageUploader: {
    height: 80,
    borderWidth: 1,
    borderColor: '#757EFA',
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6FF',
  },
  imageUploaderText: {
    color: '#777',
    fontSize: 14,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
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

export default ManageProduk;
