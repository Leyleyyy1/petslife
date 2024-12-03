import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { db } from '../../../FirebaseConfig'; // Pastikan path FirebaseConfig sudah benar
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'; // Menggunakan onSnapshot
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Untuk ikon

const ViewProduk = () => {
  const [produkList, setProdukList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const produkRef = collection(db, 'products');

    // Menggunakan onSnapshot untuk sinkronisasi real-time
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

    // Membersihkan listener saat komponen di-unmount
    return () => unsubscribe();
  }, []);

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
      {/* Menambahkan elemen Image untuk menampilkan gambar produk */}
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
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash-outline" size={24} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Produk</Text>

      <FlatList
        data={produkList}
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
