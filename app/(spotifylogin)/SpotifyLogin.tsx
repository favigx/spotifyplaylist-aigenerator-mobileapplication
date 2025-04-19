import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useRouter } from 'expo-router';
import spotifyLogin from '../api/SpotifyLogin';

const SpotifyLogin = ({ setError, setLoading }: any) => {
  const [spotifyLoginUrl, setSpotifyLoginUrl] = useState<string | null>(null);
  const [loadingUrl, setLoadingUrl] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSpotifyLoginUrl = async () => {
      try {
        setLoadingUrl(true);
        const url = await spotifyLogin();
        if (!url) throw new Error('Ingen URL mottogs från servern.');
        setSpotifyLoginUrl(url);
      } catch (err) {
        console.error('Fel vid hämtning av Spotify-login URL:', err);
        setError('Kunde inte hämta Spotify URL. Försök igen senare.');
      } finally {
        setLoadingUrl(false);
      }
    };

    fetchSpotifyLoginUrl();
  }, [setError]);

  const handleSpotifyLogin = async () => {
    if (!spotifyLoginUrl) {
      setError('Spotify-login URL inte tillgänglig. Försök igen senare.');
      return;
    }

    try {
      const result = await WebBrowser.openAuthSessionAsync(
        spotifyLoginUrl,
        'exp://192.168.1.13:8081/--/spotify-callback'
      );

      console.log('Mottagen URI från WebBrowser:', result);

      if (result.type === 'success') {
        router.push('/(generateplaylist)/GeneratePlaylist');
      } else {
        setError('Spotify-login misslyckades.');
      }
    } catch (err) {
      console.error('Fel vid Spotify-login:', err);
      setError('Ett fel uppstod vid inloggning.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        För att du ska kunna skapa spellistor till ditt Spotifykonto måste du logga in på Spotify.
      </Text>
      <Pressable
        style={styles.loginBtn}
        onPress={handleSpotifyLogin}
        disabled={loadingUrl}
      >
        {loadingUrl ? (
          <ActivityIndicator size="small" color="black" />
        ) : (
          <Text style={styles.loginBtnText}>Logga in med Spotify</Text>
        )}
      </Pressable>
      <View style={styles.smallTextContainer}>
        <Text style={styles.smallText}>
          Inloggning till Spotify sker via deras egna hemsida. Den här applikationen sparar inga personliga uppgifter som är kopplat till ditt Spotifykonto. 
          Den här applikationen är skapad med hjälp av Spotifys egna utvecklar-api.
        </Text>
      </View>
    </View>
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 120,
  },
  loginBtn: {
    height: 45,
    width: 380,
    borderRadius: 35,
    backgroundColor: '#32CD32',
    padding: 6,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallTextContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  smallText: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default SpotifyLogin;