import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function ConfirmationScreen() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/(login)/logincredentials");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.createAccount}>Konto skapat</Text>
      <Text style={styles.title}>Registrering lyckades</Text>
      <Text style={styles.title}>Gå vidare till logga in</Text>
      
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
  createAccount: {
    color: 'white',
    fontSize: 15,
    position: "absolute",
    top: 60,
    alignSelf: "center",
  },
  title: {
    color: 'white',
    fontSize: 35,
    marginBottom: 5,
    textAlign: 'center',
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 20,
    fontFamily: 'Arial'
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
    backgroundColor: '#32CD32',
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