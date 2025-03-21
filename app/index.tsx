import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View style={styles.container}>
      <Image
      source={require("../assets/images/logotype.png")}
      style={styles.image}
      resizeMode='contain'
      />
      <Text style={styles.title}>Skapa spellistor med hjälp av AI</Text>
      <Link href="/email" style={{marginHorizontal: 'auto'}} 
      asChild>
        <Pressable style={styles.registerBtn}>
          <Text style={styles.registerBtnText}>Registrera dig</Text>
          </Pressable>
        </Link>
        <Link href="/logincredentials" style={{marginHorizontal: 'auto'}} 
      asChild>
        <Pressable style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>Logga in</Text>
          </Pressable>
        </Link>

    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    marginTop: 70
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: 200,
    marginBottom: 120
  },
  link: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    padding: 4,
  },
  registerBtn: {
    height: 45,
    width: 400,
    borderRadius: 35,
    backgroundColor: '#32CD32',
    padding: 6,
    marginTop: 230,
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
    width: 400,
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