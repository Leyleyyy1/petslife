import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { db } from '../../../FirebaseConfig';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

// Pure function for validating inputs
const isValidInput = (namaProduk, jenisProduk, hargaProduk, stokProduk, deskripsiProduk) => {
  return namaProduk && jenisProduk && hargaProduk && stokProduk && deskripsiProduk;
};

// Pure function for updating an existing product
const updateProductData = async (productId, namaProduk, jenisProduk, hargaProduk, stokProduk, deskripsiProduk, imageUri) => {
  const productRef = doc(db, 'products', productId);
  await updateDoc(productRef, {
    namaProduk,
    jenisProduk,
    hargaProduk: parseFloat(hargaProduk),
    stokProduk: parseInt(stokProduk),
    deskripsiProduk,
    imageUri,
  });
};

// Pure function for adding a new product
const addNewProduct = async (namaProduk, jenisProduk, hargaProduk, stokProduk, deskripsiProduk, imageUri) => {
  await addDoc(collection(db, 'products'), {
    namaProduk,
    jenisProduk,
    hargaProduk: parseFloat(hargaProduk),
    stokProduk: parseInt(stokProduk),
    deskripsiProduk,
    imageUri,
    createdAt: new Date(),
  });
};

// Pure function to fetch product data for editing
const fetchProductData = async (productId, setNamaProduk, setJenisProduk, setHargaProduk, setStokProduk, setDeskripsiProduk, setImageUri) => {
  try {
    const productRef = doc(db, 'products', productId);
    const productSnapshot = await getDoc(productRef);

    if (productSnapshot.exists()) {
      const productData = productSnapshot.data();
      setNamaProduk(productData.namaProduk);
      setJenisProduk(productData.jenisProduk);
      setHargaProduk(productData.hargaProduk.toString());
      setStokProduk(productData.stokProduk.toString());
      setDeskripsiProduk(productData.deskripsiProduk);
      setImageUri(productData.imageUri);
    } else {
      Alert.alert('Error', 'Produk tidak ditemukan.');
    }
  } catch (error) {
    console.error('Error fetching product: ', error);
    Alert.alert('Error', 'Gagal memuat data produk.');
  }
};

const AddProduk = () => {
  const [namaProduk, setNamaProduk] = useState('');
  const [jenisProduk, setJenisProduk] = useState('');
  const [hargaProduk, setHargaProduk] = useState('');
  const [stokProduk, setStokProduk] = useState('');
  const [deskripsiProduk, setDeskripsiProduk] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();
  const productId = route.params?.productId;

  // useEffect to fetch product data if editing
  useEffect(() => {
    if (productId) {
      fetchProductData(productId, setNamaProduk, setJenisProduk, setHargaProduk, setStokProduk, setDeskripsiProduk, setImageUri);
    }
  }, [productId]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!isValidInput(namaProduk, jenisProduk, hargaProduk, stokProduk, deskripsiProduk)) {
      Alert.alert('Error', 'Harap lengkapi semua field!');
      return;
    }

    try {
      if (productId) {
        await updateProductData(productId, namaProduk, jenisProduk, hargaProduk, stokProduk, deskripsiProduk, imageUri);
        Alert.alert('Sukses', 'Produk berhasil diperbarui!');
      } else {
        await addNewProduct(namaProduk, jenisProduk, hargaProduk, stokProduk, deskripsiProduk, imageUri);
        Alert.alert('Sukses', 'Produk berhasil ditambahkan!');
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error saving product: ', error);
      Alert.alert('Error', 'Gagal menyimpan produk. Silakan coba lagi.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{productId ? 'Edit Produk' : 'Tambah Produk'}</Text>

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
        value={jenisProduk}
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

      <Text style={styles.label}>Gambar Produk</Text>
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Pilih Gambar</Text>
      </TouchableOpacity>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>{productId ? 'Simpan Perubahan' : 'Tambah Produk'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    height: 100,
    textAlignVertical: 'top',
  },
  imageButton: {
    backgroundColor: '#757EFA',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 15,
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
    color: '#333',
  },
};

export default AddProduk;
