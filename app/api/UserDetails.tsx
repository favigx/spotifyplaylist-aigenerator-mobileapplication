import { UserDetailInterface } from '../interfaces/UserDetailInterface';
import client from './client';
import { getToken } from '../auth/TokenService';

const getUserByUsername = (username: string): Promise<UserDetailInterface> => {
  return getToken()
    .then((rawToken) => {
      if (!rawToken) {
        throw new Error("Ingen token tillgänglig");
      }

      const token = rawToken.replace(/^token:\s*/, '');

      return client
        .get(`user/${username}/user`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          return response.data as UserDetailInterface;
        });
    })
    .catch(error => {
      throw new Error('Kunde inte hämta användardata: ' + (error instanceof Error ? error.message : 'okänt fel'));
    });
};

export default getUserByUsername;
