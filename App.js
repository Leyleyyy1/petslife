import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Awalhlm from './pages/Awalhlm';
import SignIn from './pages/pembeli/autentifikasi/SignIn';
import SignUp from './pages/pembeli/autentifikasi/SignUp';
import Homepage from './pages/pembeli/homepage/Homepage';
import LoginPenjual from './pages/penjual/LoginPenjual';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
