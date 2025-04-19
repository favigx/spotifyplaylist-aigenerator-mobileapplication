import client from './client';
import { getToken } from "../auth/TokenService";
import { jwtDecode } from 'jwt-decode';

const spotifyLogin = (): Promise<string> => {
  return getToken()
    .then((rawToken) => {
      if (!rawToken) {
        throw new Error("Ingen token tillgänglig");
      }

      const token = rawToken.replace(/^token:\s*/, '');

      try {
        const decoded = jwtDecode<{ sub: string }>(token);
        const loggedInUser = decoded.sub;

        return client.get(`/spotify/app/${encodeURIComponent(loggedInUser)}/login`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (e) {
        throw new Error("Ogiltig token eller felaktigt JWT-format");
      }
    })
    .then((response) => {
      return response.data; 
    })
    .catch((error: unknown) => {
      if (error instanceof Error) {
        console.error('SpotifyLogin error:', error.message);
        throw new Error(error.message || 'Ett fel uppstod vid Spotify-login.');
      } else {
        console.error('SpotifyLogin unknown error:', error);
        throw new Error('Ett okänt fel uppstod vid Spotify-login.');
      }
    });
};

export default spotifyLogin;