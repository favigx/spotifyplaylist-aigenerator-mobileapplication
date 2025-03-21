import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import loginUser from "../api/Login"; 

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMessage(""); 
    setLoading(true);

    if (!username || !password) {
      setErrorMessage("Användarnamn och lösenord krävs.");
      setLoading(false);
      return;
    }

    try {
      const userData = { username, password }; // Skapa objekt för att skicka till backend
      const response = await loginUser(userData); // Anropa loginUser för att logga in
      console.log("Inloggad, token mottagen:", response);
      router.push("./index"); // Navigera till en annan skärm efter lyckad inloggning
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.push("/")}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>

      <Text style={styles.createAccount}>Logga in</Text>
      <Text style={styles.title}>Användarnamn</Text>
      <TextInput
        style={styles.input}
        placeholder="Skriv in ditt användarnamn"
        placeholderTextColor="gray"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.title}>Lösenord</Text>
      <TextInput
        style={styles.input}
        placeholder="Skriv in ditt lösenord"
        placeholderTextColor="gray"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, !username || !password ? styles.disabledButton : null]}
          onPress={handleLogin}
          disabled={!username || !password || loading}
        >
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
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
  disabledButton: {
    backgroundColor: 'darkgray',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }, 
});
