import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ActivityIndicator,
  Keyboard,
  Linking,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Vibration,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import generatePlaylist from '../api/GeneratePlaylist';

const GeneratePlaylist = () => {
  const [promptData, setPromptData] = useState({
    playlistName: '',
    prompt: '',
  });

  const [focusedInput, setFocusedInput] = useState<'name' | 'prompt' | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [playlistLink, setPlaylistLink] = useState<string | null>(null);
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const interval = setInterval(pulse, 2000);
    return () => clearInterval(interval);
  }, [scaleAnim]);

  useEffect(() => {
    if (playlistLink) {
      Vibration.vibrate(100);
    }
  }, [playlistLink]);

  const generatePlaylistHandler = async () => {
    setLoading(true);
    setErrorMessage(null);
    setPlaylistLink(null);
    Keyboard.dismiss();

    try {
      const response = await generatePlaylist(promptData);
      setPlaylistLink(response.playlistLink);
    } catch (err: any) {
      setErrorMessage(err.message || 'Ett fel uppstod.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPlaylist = () => {
    if (playlistLink) {
      Linking.openURL(playlistLink).catch((err) => {
        console.error('Failed to open playlist:', err);
        setErrorMessage('Kunde inte öppna spellistan.');
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Använd AI-teknik för att skapa din perfekta spellista</Text>

        <TextInput
          style={[styles.input, focusedInput === 'name' && styles.inputFocused]}
          value={promptData.playlistName}
          onChangeText={(text) => setPromptData({ ...promptData, playlistName: text })}
          maxLength={50}
          onFocus={() => setFocusedInput('name')}
          onBlur={() => setFocusedInput(null)}
        />
        <Text style={[styles.inputLabel, focusedInput === 'name' && styles.labelFocused]}>
          Ange ett namn för den önskade spellistan
        </Text>

        <TextInput
          style={[
            styles.input,
            styles.multilineInput,
            focusedInput === 'prompt' && styles.inputFocused,
          ]}
          value={promptData.prompt}
          onChangeText={(text) => setPromptData({ ...promptData, prompt: text })}
          maxLength={140}
          multiline
          onFocus={() => setFocusedInput('prompt')}
          onBlur={() => setFocusedInput(null)}
        />
        <Text style={[styles.inputLabel, focusedInput === 'prompt' && styles.labelFocused]}>
          Exempel på prompt: Skapa en spellista med 20 låtar som liknar Free Bird av Lynyrd Skynyrd
        </Text>

        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

        <Pressable style={styles.generateBtn} onPress={generatePlaylistHandler}>
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text style={styles.generateBtnText}>Skapa Spellista</Text>
          )}
        </Pressable>

        {playlistLink && (
          <View style={styles.playlistLinkContainer}>
            <Text style={styles.playlistLinkInfo}>
              Spellista skapad
            </Text>
            <Text style={styles.playlistLinkInfo}>
              Tryck på Spotifyikonen för att öppna spellistan
            </Text>
            <Animated.View style={[styles.blinkingButtonContainer, { transform: [{ scale: scaleAnim }] }]}>
              <Pressable style={styles.playlistBtn} onPress={handleOpenPlaylist}>
                <FontAwesome name="spotify" size={75} color="#32CD32" />
              </Pressable>
            </Animated.View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  info: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 60,
    width: '100%',
    color: 'white',
    borderRadius: 4,
    paddingLeft: 15,
    fontSize: 20,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 4,
  },
  inputFocused: {
    borderColor: 'white',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
    marginBottom: 10,
  },
  inputLabel: {
    color: 'grey',
    fontSize: 13,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  labelFocused: {
    color: 'white',
  },
  generateBtn: {
    height: 50,
    width: '100%',
    backgroundColor: '#32CD32',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  generateBtnText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  playlistLinkContainer: {
    marginTop: 40,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
  },
  playlistLinkInfo: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
    maxWidth: 250
  },
  blinkingButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistBtn: {
    height: 80,
    width: 80,
    backgroundColor: '#black',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GeneratePlaylist;