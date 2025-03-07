import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function UsernameScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleNext = () => {
    router.push("/(register)/password");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.push("/email")}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>

      <Text style={styles.createAccount}>Skapa konto</Text>
      <Text style={styles.title}>Användarnamn</Text>
      <TextInput
        style={styles.input}
        placeholder="Skriv in användarnamn"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Nästa</Text>
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
    top: 50,
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