import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { db } from '../../../FirebaseConfig'; // Pastikan path benar
import { collection, onSnapshot } from 'firebase/firestore'; // Menggunakan onSnapshot

const Homepage = ({ navigation }) => {
  const [produkList, setProdukList] = useState([]);

  useEffect(() => {
    const produkRef = collection(db, 'products');

    // Sinkronisasi data produk real-time
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
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hello, Human!</Text>

      <View style={styles.notificationBox}>
        <Text style={styles.notificationText}>
          Belanja perlengkapan hewan <Text style={styles.highlight}>lebih mudah, langsung dari rumah!</Text>
        </Text>
        <Image source={require('../../../source/gambar/kucing.png')} style={styles.kucing} />
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        placeholderTextColor="#B0B0B0"
      />

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Category</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryButtons}>
        {["Makanan", "Obat", "Aksesoris", "Mainan"].map((category) => (
          <TouchableOpacity key={category} style={styles.categoryButton}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bagian Produk */}
      <View style={styles.productRow}>
        {produkList.map((item) => (
          <TouchableOpacity key={item.id} style={styles.productBox}>
            <Image source={{ uri: item.imageUri }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.namaProduk}</Text>
            <Text style={styles.productPrice}>Rp {item.hargaProduk}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Keranjang')}>
          <Image source={require('../../../source/gambar/keranjang.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../../source/gambar/homeicon.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfilPembeli')}>
          <Image source={require('../../../source/gambar/user.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
    paddingBottom: 60, // Memberikan ruang ekstra untuk bottomNav
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
    marginTop: 40,
  },
  notificationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#757EFA',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  notificationText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 10,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#230086',
  },
  searchBar: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    color: '#333333',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  viewAllText: {
    color: '#6640FD',
    fontWeight: '600',
  },
  categoryButtons: {
    flexDirection: 'row',
  },
  categoryButton: {
    backgroundColor: '#E0E7FF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginRight: 10,
  },
  categoryText: {
    color: '#333333',
    fontSize: 14,
  },
  productRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productBox: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  productImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#FF0000',
  },
  kucing: {
    width: 190,
    height: 150,
    resizeMode: 'cover',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    position: 'absolute', // Menetapkan posisi di bawah
    bottom: 0, // Menetapkan posisi bawah
    left: 0,
    right: 0,
    zIndex: 1, // Pastikan berada di atas konten lainnya
  },
  icon: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
  },
});

export default Homepage;
