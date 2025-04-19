import client from './client';

const checkEmail = (email: string) => {
  return client
    .get(`/user/${email}/check-email`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response && error.response.status === 409) {
        throw new Error('E-posten är redan upptagen.');
      } else {
        throw new Error('Ett fel uppstod vid kontrollen.');
      }
    });
};

export default checkEmail;
