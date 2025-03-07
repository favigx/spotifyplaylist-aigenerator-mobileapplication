import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Ikonbibliotek för tillbakaknappen

export default function UsernameScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleNext = () => {
    router.push("/(register)/confirmation");
  };

  return (
    <View style={styles.container}>
      {/* Tillbakaknapp */}
      <Pressable style={styles.backButton} onPress={() => router.push("/")}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>

      <Text style={styles.createAccount}>Logga in</Text>
      <Text style={styles.title}>Användarnamn</Text>
      <TextInput
        style={styles.input}
        placeholder="Skriv in ditt användarnamn"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
      />
       <Text style={styles.title}>Lösenord</Text>
       <TextInput
        style={styles.input}
        placeholder="Skriv in ditt lösenord"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Logga in</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    padding: 20,
    paddingTop: 150
  },
  backButton: {
    position: "absolute",
    top: 50, // Justera positionen efter behov
    left: 20,
    padding: 10,
  },
  createAccount: {
    color: 'white',
    fontSize: 15,
    position: "absolute",
    top: 60,
    alignSelf: "center",
  },
  title: {
    color: 'white',
    fontSize: 25,
    marginBottom: 5,
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    paddingLeft: 10,
    color: 'white',
    fontSize: 20,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    height: 45,
    width: 100,
    borderRadius: 35,
    backgroundColor: 'grey',
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }, 
});
