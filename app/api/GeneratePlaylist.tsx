import PrompInterface from '../interfaces/PromptInterface';
import client from './client';
import { getToken } from "../auth/TokenService";
import { jwtDecode } from 'jwt-decode';

interface PlaylistResponse {
  playlistLink: string;
}

const generatePlaylist = (promptData: PrompInterface): Promise<PlaylistResponse> => {
  return getToken()
    .then((rawToken) => {
      if (!rawToken) {
        throw new Error("Ingen token tillgänglig");
      }

      const token = rawToken.replace(/^token:\s*/, '');

      try {
        const decoded = jwtDecode<{ sub: string }>(token);
        const loggedInUser = decoded.sub;
        const encodedLoggedInUser = encodeURIComponent(loggedInUser);

        return client
          .post(`/ai/${encodedLoggedInUser}/generate-playlist`, promptData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
          .then((response) => {
            console.log("Server Response:", response.data);
            
            const playlistCreatedRegex = /spotify:playlist:[^\s]+/;
            const match = response.data.match(playlistCreatedRegex);

            if (match && match[0]) {
              return { playlistLink: match[0] };
            } else {
              throw new Error("Kunde inte extrahera spellista-länken från svaret.");
            }
          })
          .catch((error) => {
            if (error.response) {
              console.error("Error response:", error.response.data);
              throw new Error(error.response.data || "Fel vid generering.");
            } else if (error.request) {
              console.error("No response received:", error.request);
              throw new Error("Ingen svar från servern.");
            } else {
              console.error("Error", error.message);
              throw new Error(error.message || "Ett okänt fel inträffade.");
            }
          });
      } catch (e) {
        console.error('Token decoding error:', e);
        throw new Error("Ogiltig token eller felaktigt JWT-format");
      }
    })
    .catch((error: unknown) => {
      if (error instanceof Error) {
        console.error('GeneratePlaylist error:', error.message);
        throw new Error(error.message || 'Ett fel uppstod vid generering av spellista.');
      } else {
        console.error('GeneratePlaylist unknown error:', error);
        throw new Error('Ett okänt fel uppstod vid generering av spellista.');
      }
    });
};

export default generatePlaylist;
