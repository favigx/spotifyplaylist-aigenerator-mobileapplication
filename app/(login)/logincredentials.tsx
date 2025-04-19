import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import loginUser from "../api/Login";
import { jwtDecode } from 'jwt-decode';
import getUserByUsername from '../api/UserDetails';
import { UserDetailInterface } from '../interfaces/UserDetailInterface';

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState<'username' | 'password' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const [user, setUser] = useState<UserDetailInterface | null>(null);

  const handleLogin = async () => {
    setErrorMessage("");
    setLoading(true);

    if (!username || !password) {
      setErrorMessage("Användarnamn och lösenord krävs.");
      setLoading(false);
      return;
    }

    try {
      const userData = { username, password };
      const response = await loginUser(userData);
      console.log("Inloggad, token mottagen:", response);

      const decodedToken = jwtDecode<{ sub: string }>(response);
      const usernameInToken = decodedToken.sub;

      const user = await getUserByUsername(usernameInToken);
      setUser(user);

      if (user.spotifyAccessToken) {
        router.push("/(generateplaylist)/GeneratePlaylist");
      } else {
        router.push("/(spotifylogin)/SpotifyLogin");
      }

    } catch (error: any) {
      const errorMsg = error.response?.data || error.message || "Något gick fel.";
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={() => router.push("/")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>

        <Text style={styles.createAccount}>Logga in</Text>

        <Text style={[styles.title, focusedInput === 'username' && styles.labelFocused]}>
          Användarnamn
        </Text>
        <TextInput
          style={[styles.input, focusedInput === 'username' && styles.inputFocused]}
          placeholderTextColor="gray"
          value={username}
          onChangeText={setUsername}
          onFocus={() => setFocusedInput('username')}
          onBlur={() => setFocusedInput(null)}
        />

        <Text style={[styles.title, focusedInput === 'password' && styles.labelFocused]}>
          Lösenord
        </Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, focusedInput === 'password' && styles.inputFocused]}
            placeholderTextColor="gray"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            secureTextEntry={!showPassword}
            onFocus={() => setFocusedInput('password')}
            onBlur={() => setFocusedInput(null)}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </Pressable>
        </View>

        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, (!username || !password) && styles.disabledButton]}
            onPress={handleLogin}
            disabled={!username || !password || loading}
          >
            <Text style={styles.buttonText}>Logga in</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    color: 'grey',
    fontSize: 24,
    marginBottom: 5,
    fontFamily: 'Arial'
  },
  labelFocused: {
    color: 'white',
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
  inputFocused: {
    borderColor: 'white',
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
    height: 50,
    width: 120,
    borderRadius: 35,
    backgroundColor: 'white',
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
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  }
});