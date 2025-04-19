import { View, Text, StyleSheet, Image, Pressable, ImageBackground } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {
  return (
    <ImageBackground
      source={require('../assets/images/pexels-photo-3807729.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/images/logotype.png")}
          style={styles.image}
          resizeMode='contain'
        />
        <Text style={styles.title}>PROMPTPLAYLIST</Text>

        <Link href="/email" style={{ marginHorizontal: 'auto' }} asChild>
          <Pressable style={styles.registerBtn}>
            <Text style={styles.registerBtnText}>Registrera dig</Text>
          </Pressable>
        </Link>

        <Link href="/logincredentials" style={{ marginHorizontal: 'auto' }} asChild>
          <Pressable style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>Logga in</Text>
          </Pressable>
        </Link>
      </View>
    </ImageBackground>
  )
}

export default index

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(28,28,28,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    marginTop: 200
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: 250,
    marginBottom: 300,
    fontFamily: 'Futura',
  },
  registerBtn: {
    height: 45,
    width: 370,
    borderRadius: 35,
    backgroundColor: '#32CD32',
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerBtnText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
  },
  loginBtn: {
    height: 45,
    width: 370,
    borderRadius: 35,
    backgroundColor: 'black',
    padding: 6,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
  loginBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
  }
})