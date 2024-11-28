import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db } from '../../../FirebaseConfig';  // Pastikan path FirebaseConfig sudah benar
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native'; // Untuk navigasi ke AddProduk

const ViewProduk = () => {
  const [produkList, setProdukList] = useState([]);
  const navigation = useNavigation();  // Hook untuk navigasi

  // Mengambil data produk dari Firestore
  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const produkRef = collection(db, 'products');
        const produkSnapshot = await getDocs(produkRef);
        const produkData = produkSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProdukList(produkData);
      } catch (error) {
        console.error('Error fetching products: ', error);
        Alert.alert('Error', 'Gagal memuat data produk');
      }
    };

    fetchProduk();
  }, []);

  // Render item produk dalam list
  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item.namaProduk}</Text>
      <Text style={styles.productDetails}>Jenis: {item.jenisProduk}</Text>
      <Text style={styles.productDetails}>Harga: Rp {item.hargaProduk}</Text>
      <Text style={styles.productDetails}>Stok: {item.stokProduk}</Text>
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

      {/* Tombol untuk navigasi ke AddProduk */}
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
    marginBottom: 80, // Agar tombol tambah tidak tertutup
  },
  productItem: {
    backgroundColor: '#F5F6FF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#757EFA',
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
