import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Awalhlm = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PetsLife</Text>
      <Text style={styles.desc}>Helping you{"\n"}to keep your Pets{"\n"}stay Happy!</Text>
      
      <Image 
        source={require('../source/gambar/personwithanimal.png')}
        style={styles.gbrawal} 
      />
      
      <View style={styles.circleTopLeft} />    
      <View style={styles.circleBottomRight} />


      <TouchableOpacity
        style={styles.buttonRight}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    backgroundColor: '#757EFA', 
    paddingTop: 100, 
  },
  title: { 
    fontSize: 24,  
    letterSpacing: 3,
    color: '#FFFFFF', 
    textAlign: 'center', 
  },
  desc: {
    fontSize: 18,
    letterSpacing: 4,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 40,
  },
  gbrawal: {
    position: 'absolute',
    width: 450,
    height: 450,
    marginTop: 220,
    left:-20,
  },
  buttonRight: {
    position: 'absolute',
    top :670,
    backgroundColor: 'rgb(96, 70, 167)',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  circleTopLeft: {
    width: 350,
    height: 350,
    borderRadius: 350,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'absolute',
    top: -100,
    left: -100,
  },
  circleBottomRight: {
    width: 300,
    height: 300,
    borderRadius: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'absolute',
    bottom: 30,
    right: -100,
  },
});

export default Awalhlm;
