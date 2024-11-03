import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const Homepage = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Greeting */}
      <Text style={styles.title}>Hello, Human!</Text>

      {/* Notification */}
      <View style={styles.notificationBox}>
        <Text style={styles.notificationText}>
        Belanja perlengkapan hewan <Text style={styles.highlight}>lebih mudah, langsung dari rumah!</Text>
        </Text>
        <Image source={require('../../../source/gambar/kucing.png')} style={styles.kucing} />
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        placeholderTextColor="#B0B0B0"
      />

      {/* Category */}
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

      {/* Product List */}
      <View style={styles.productRow}>
        {/* Product 1 */}
        <TouchableOpacity style={styles.productBox}>
          <Image source={require('../../../source/gambar/rcktn.png')} style={styles.productImage} />
          <Text style={styles.productTitle}>Royal Canin Kitten 1 kg</Text>
          <Text style={styles.productPrice}>Rp 250.000</Text>
        </TouchableOpacity>

        {/* Product 2 */}
        <TouchableOpacity style={styles.productBox}>
          <Image source={require('../../../source/gambar/rckper.png')} style={styles.productImage} />
          <Text style={styles.productTitle}>Royal Canin Persian 1 kg</Text>
          <Text style={styles.productPrice}>Rp 270.000</Text>
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
    overflow: 'hidden', // Tambahkan ini untuk memastikan konten tidak keluar dari kotak
},
  notificationText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    marginLeft : 10,
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
    // Hilangkan flexWrap jika sudah ada di sini
   },
  categoryButton: {
    backgroundColor: '#E0E7FF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginRight: 10,
        // marginBottom: 10, // Hapus jika ada untuk menghindari jarak vertikal
    },

  categoryText: {
    color: '#333333',
    fontSize: 14,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productBox: {
    backgroundColor: '#FFFFFF',
    padding: 0,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
    marginTop :20,
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
    marginLeft: 0,  // Ubah marginLeft menjadi 0
    marginRight: 0, // Tambahkan marginRight menjadi 0 untuk menghindari jarak dari sisi kanan
    marginTop: 0,   // Tambahkan marginTop menjadi 0 jika perlu
    marginBottom: 0, // Tambahkan marginBottom menjadi 0 jika perlu
    resizeMode: 'cover', // Ganti dengan 'cover' agar gambar tetap proporsional
},

});

export default Homepage;
