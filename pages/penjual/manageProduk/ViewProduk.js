import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image, TextInput } from 'react-native';
import { db } from '../../../FirebaseConfig';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Pure function untuk menyaring produk berdasarkan pencarian
const filterProducts = (products, searchQuery) =>
  products.filter((product) => product.namaProduk.toLowerCase().includes(searchQuery.toLowerCase()));

// Pure function untuk menangani konfirmasi hapus produk
const confirmDelete = (id, handleDelete) => {
  Alert.alert(
    'Konfirmasi Hapus',
    'Apakah Anda yakin ingin menghapus produk ini?',
    [
      { text: 'Batal' },
      { text: 'Hapus', onPress: () => handleDelete(id) },
    ]
  );
};

// Higher-order function untuk mengambil data produk dari Firestore
const useProdukData = (setProdukList) => {
  useEffect(() => {
    const produkRef = collection(db, 'products');
    const unsubscribe = onSnapshot(
      produkRef,
      (snapshot) => {
        const produkData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProdukList(produkData);
      },
      (error) => {
        console.error('Error fetching products: ', error);
        Alert.alert('Error', 'Gagal memuat data produk.');
      }
    );
    return () => unsubscribe();
  }, [setProdukList]);
};

const ViewProduk = () => {
  const [produkList, setProdukList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  // Menggunakan custom hook untuk mengambil data produk
  useProdukData(setProdukList);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      Alert.alert('Sukses', 'Produk berhasil dihapus.');
    } catch (error) {
      console.error('Error deleting product: ', error);
      Alert.alert('Error', 'Gagal menghapus produk.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      {item.imageUri && (
        <Image source={{ uri: item.imageUri }} style={styles.productImage} />
      )}
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.namaProduk}</Text>
        <Text style={styles.productDetails}>Jenis: {item.jenisProduk}</Text>
        <Text style={styles.productDetails}>Harga: Rp {item.hargaProduk}</Text>
        <Text style={styles.productDetails}>Stok: {item.stokProduk}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddProduk', { productId: item.id })}
        >
          <Ionicons name="create-outline" size={24} color="#757EFA" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => confirmDelete(item.id, handleDelete)}>
          <Ionicons name="trash-outline" size={24} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Menggunakan fungsi map, filter dan spread operator dalam FP
  const filteredProdukList = filterProducts(produkList, searchQuery); // Menggunakan filter dengan FP

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Produk</Text>

      {/* Menambahkan komponen Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Cari produk..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Rendering daftar produk dengan menggunakan fungsi renderItem */}
      <FlatList
        data={filteredProdukList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddProduk')}
      >
        <Text style={styles.addButtonText}>Tambah Produk</Text>
      </TouchableOpacity>
    </View>
  );
};

// Style untuk tampilan
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
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#757EFA',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#F5F6FF',
    color: '#333',
  },
  productList: {
    marginBottom: 80,
  },
  productItem: {
    backgroundColor: '#F5F6FF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#757EFA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 70,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productDetails: {
    fontSize: 14,
    color: '#555',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#757EFA',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 50,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ViewProduk;
