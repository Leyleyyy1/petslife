import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo Icons

const HomeSeller = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome, Seller!</Text>

      <View style={styles.notificationBox}>
        <Image source={require('../../source/gambar/Seller.png')} style={styles.productIcon} />
      </View>

      <View style={styles.managementContainer}>
        <TouchableOpacity 
          style={styles.managementBox} 
          onPress={() => navigation.navigate('ViewProduk')}
        >
          <Ionicons name="pricetag" size={45} color="#333333" style={styles.managementIcon} />
          <Text style={styles.managementText}>Produk</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.managementBox} 
          onPress={() => navigation.navigate('Pesanan')}
        >
          <Ionicons name="receipt" size={45} color="#333333" style={styles.managementIcon} />
          <Text style={styles.managementText}>Pesanan</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.managementContainer}>
        <TouchableOpacity 
          style={styles.managementBox} 
          onPress={() => navigation.navigate('RiwayatPenjualan')}
        >
          <Ionicons name="stats-chart" size={45} color="#333333" style={styles.managementIcon} />
          <Text style={styles.managementText}>Riwayat</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.managementBox} 
          onPress={() => navigation.navigate('ProfilPenjual')}
        >
          <Ionicons name="person-circle" size={45} color="#333333" style={styles.managementIcon} />
          <Text style={styles.managementText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flexGrow: 1,padding: 20,backgroundColor: '#F5F7FA',
  },
  title: {fontSize: 28,fontWeight: 'bold',color: '#2C2E3A',marginBottom: 25,
    marginTop: 40,
  },
  notificationBox: {flexDirection: 'column', justifyContent: 'center',
    alignItems: 'center', backgroundColor: '#757EFA',borderRadius: 12,padding: 15,
    marginBottom: 25,
  
  },
  notificationText: {marginTop: 10,fontSize: 18,fontWeight: 'bold',
    color: '#FFFFFF',
  },
  managementContainer: {flexDirection: 'row',justifyContent: 'space-between',marginBottom: 10,
  },
  managementBox: {backgroundColor: '#FFFFFF',padding: 40,borderRadius: 10,width: '48%',
    alignItems: 'center',shadowColor: '#000',shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  managementIcon: {
    marginBottom: 50,

  },
  managementText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333333',
  },
  productIcon: {
    width: 150,
    height: 150,
  }
});

export default HomeSeller;
