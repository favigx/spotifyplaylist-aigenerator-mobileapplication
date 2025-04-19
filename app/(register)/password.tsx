import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Pressable, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useRegister from "../contexts/RegisterContext";
import registerUser from "../api/register";

export default function PasswordScreen() {
  const { user, setUser } = useRegister();
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [focus, setFocus] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

  const isFormValid =
    user.email &&
    user.username &&
    user.password &&
    confirmPassword &&
    user.password === confirmPassword;

  const handleRegister = () => {
    setLoading(true);
    setErrorMessage("");

    if (!isFormValid) {
      setErrorMessage("Alla fält måste fyllas i och lösenorden måste matcha.");
      setLoading(false);
      return;
    }

    registerUser(user)
      .then(() => {
        setUser({ email: "", username: "", password: "" });
        router.push("/(register)/confirmation");
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Registrering misslyckades. Ett okänt fel inträffade.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={() => router.push("/username")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>

        <Text style={[styles.createAccount, focus && styles.focusedTitle]}>Skapa konto</Text>

        <Text style={[styles.title, focus === "password" && styles.focusedTitle]}>Lösenord</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, focus === "password" && styles.focusedInput]}
            placeholder="Skriv in lösenord"
            placeholderTextColor="gray"
            secureTextEntry={!isPasswordVisible}
            value={user.password}
            onChangeText={(password) => setUser({ ...user, password })}
            onFocus={() => setFocus("password")}
            onBlur={() => setFocus("")}
          />
          <Pressable
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </Pressable>
        </View>

        <Text style={[styles.title, focus === "confirmPassword" && styles.focusedTitle]}>Bekräfta lösenord</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, focus === "confirmPassword" && styles.focusedInput]}
            placeholder="Bekräfta lösenord"
            placeholderTextColor="gray"
            secureTextEntry={!isConfirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => setFocus("confirmPassword")}
            onBlur={() => setFocus("")}
          />
          <Pressable
            style={styles.eyeIcon}
            onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
          >
            <Ionicons
              name={isConfirmPasswordVisible ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </Pressable>
        </View>

        <View style={styles.matchContainer}>
          {user.password && confirmPassword ? (
            <Text style={user.password === confirmPassword ? styles.match : styles.noMatch}>
              {user.password === confirmPassword ? "✔ Lösenorden matchar" : "✘ Lösenorden matchar inte"}
            </Text>
          ) : null}
        </View>

        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <View style={styles.buttonWrapper}>
          <Pressable
            style={[styles.button, !isFormValid || loading ? styles.disabledButton : null]}
            onPress={handleRegister}
            disabled={!isFormValid || loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="black" />
            ) : (
              <Text style={styles.buttonText}>Nästa</Text>
            )}
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "relative",
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
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  matchContainer: {
    minHeight: 20,
    justifyContent: "center",
  },
  match: {
    color: "lime",
    fontSize: 14,
    marginBottom: 10,
  },
  noMatch: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  buttonWrapper: {
    marginTop: 20,
    marginBottom: 450,
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
    backgroundColor: "darkgrey",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});