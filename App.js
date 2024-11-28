import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Awalhlm from './pages/Awalhlm';
import SignIn from './pages/pembeli/autentifikasi/SignIn';
import SignUp from './pages/pembeli/autentifikasi/SignUp';
import Homepage from './pages/pembeli/homepage/Homepage';
import LoginPenjual from './pages/penjual/LoginPenjual';
import Keranjang from './pages/pembeli/homepage/Keranjang';
import ProfilPembeli from './pages/pembeli/homepage/ProfilPembeli';
import HomeSeller from './pages/penjual/HomeSeller';
import RiwayatPenjualan from './pages/penjual/RiwayatPenjualan';
import ProfilPenjual from './pages/penjual/ProfilPenjual';
import Pesanan from './pages/penjual/Pesanan';
import AddProduk from './pages/penjual/manageProduk/AddProduk';
import ViewProduk from './pages/penjual/manageProduk/ViewProduk';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Awal">
        <Stack.Screen name="Awalhlm" component={Awalhlm} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
        <Stack.Screen name="LoginPenjual" component={LoginPenjual} options={{ headerShown: false }} />
        <Stack.Screen name="Keranjang" component={Keranjang} options={{ headerShown: false }} />
        <Stack.Screen name="ProfilPembeli" component={ProfilPembeli} options={{ headerShown: false }} />
        <Stack.Screen name="HomeSeller" component={HomeSeller} options={{ headerShown: false }} />
        <Stack.Screen name="RiwayatPenjualan" component={RiwayatPenjualan} options={{ headerShown: false }} />
        <Stack.Screen name="ProfilPenjual" component={ProfilPenjual} options={{ headerShown: false }} />
        <Stack.Screen name="Pesanan" component={Pesanan} options={{ headerShown: false }} />
        <Stack.Screen name="AddProduk" component={AddProduk} options={{ headerShown: false }} />
        <Stack.Screen name="ViewProduk" component={ViewProduk} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
