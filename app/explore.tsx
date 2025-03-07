import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function EmailScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleNext = () => {
    router.push("/username");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-adress</Text>
      <TextInput
        style={styles.input}
        placeholder="Skriv in din e-postadress"
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
    backgroundColor: 'black',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 25,
    marginBottom: 5,
    marginTop: 10,
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
    justifyContent: 'flex-end',  // Detta gör att knappen hamnar längst ned
    alignItems: 'center',       // Horisontellt centrerad
    marginTop: 20,
  },
  button: {
    height: 45,
    width: 100,  // Större bredd på knappen
    borderRadius: 35,
    backgroundColor: 'grey',  // Grön bakgrundsfärg
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
