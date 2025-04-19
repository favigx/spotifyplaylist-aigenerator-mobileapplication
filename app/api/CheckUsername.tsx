import client from './client';

const checkUsername = (username: string) => {
  return client
    .get(`/user/${username}/check-username`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response && error.response.status === 409) {
        throw new Error('Användarnamnet är redan upptagen.');
      } else {
        throw new Error('Ett fel uppstod vid kontrollen.');
      }
    });
};

export default checkUsername;
