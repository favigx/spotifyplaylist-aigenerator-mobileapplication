import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useRegister from "../contexts/RegisterContext";
import checkUsername from "../api/CheckUsername";

export default function UsernameScreen() {
  const { user, setUser } = useRegister();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleNext = async () => {
    setErrorMessage("");
    setLoading(true);

    try {
      await checkUsername(user.username);
      router.push("/(register)/password");
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={() => router.push("/email")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>

        <Text style={[styles.createAccount, isFocused && styles.focusedTitle]}>Skapa konto</Text>
        <Text style={[styles.title, isFocused && styles.focusedTitle]}>Användarnamn</Text>
        <TextInput
          style={[styles.input, isFocused && styles.focusedInput]}
          placeholderTextColor="gray"
          value={user.username}
          onChangeText={(username) => setUser({ ...user, username })}
          keyboardType="default"
          autoCapitalize="words"
          autoComplete="username"
         
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <View style={styles.buttonWrapper}>
          <Pressable
            style={[styles.button, !user.username ? styles.disabledButton : null]}
            onPress={handleNext}
            disabled={!user.username || loading}
          >
            <Text style={styles.buttonText}>Nästa</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1C",
    padding: 20,
    paddingTop: 150,
    justifyContent: "flex-start",
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
    color: 'grey',
    fontSize: 24,
    marginBottom: 5,
    fontFamily: 'Arial'
  },
  focusedTitle: {
    color: 'white',
  },
  input: {
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 10,
    width: "100%",
    paddingLeft: 10,
    color: "white",
    fontSize: 20,
  },
  focusedInput: {
    borderColor: "white",
    color: "white",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  buttonWrapper: {
    marginTop: 20,
    marginBottom: 550,
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    width: "100%",
  },
  button: {
    height: 45,
    width: 100,
    borderRadius: 35,
    backgroundColor: "white",
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "darkgray",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});