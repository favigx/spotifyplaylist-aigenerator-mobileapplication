import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useRegister from "../contexts/RegisterContext";
import registerUser from "../api/register";

export default function PasswordScreen() {
  const { user, setUser } = useRegister();
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleRegister = async () => {
    if (user.password !== confirmPassword) {
      setErrorMessage("Lösenorden matchar inte!");
      return;
    }

    try {
      await registerUser(user);
      setUser({ email: "", username: "", password: "" });
      router.push("/(register)/confirmation");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Registrering misslyckades. Ett okänt fel inträffade.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.push("/username")}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>

      <Text style={styles.createAccount}>Skapa konto</Text>
      <Text style={styles.title}>Lösenord</Text>
      <TextInput
        style={styles.input}
        placeholder="Skriv in lösenord"
        placeholderTextColor="gray"
        secureTextEntry
        value={user.password}
        onChangeText={(password) => setUser({ ...user, password })}
      />

      <Text style={styles.title}>Bekräfta lösenord</Text>
      <TextInput
        style={styles.input}
        placeholder="Bekräfta lösenord"
        placeholderTextColor="gray"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Nästa</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1C",
    padding: 20,
    paddingTop: 150,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
  },
  createAccount: {
    color: "white",
    fontSize: 15,
    position: "absolute",
    top: 60,
    alignSelf: "center",
  },
  title: {
    color: "white",
    fontSize: 25,
    marginBottom: 5,
  },
  input: {
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 20,
    width: "100%",
    paddingLeft: 10,
    color: "white",
    fontSize: 20,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    position: "absolute",
    top: 370,
    left: 20,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    height: 45,
    width: 100,
    borderRadius: 35,
    backgroundColor: "#32CD32",
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});