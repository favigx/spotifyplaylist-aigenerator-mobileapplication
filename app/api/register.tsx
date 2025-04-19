import { RegisterUserInterface } from "../interfaces/RegisterUserInterface";
import client from './client';

const registerUser = (userData: RegisterUserInterface) => {
  return client
    .post('/user/register/app', userData)
    .then((response) => {
      console.log("Server Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.error("Error response:", error.response.data);
        throw new Error(error.response.data || "Fel vid registrering.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        throw new Error("Ingen svar från servern.");
      } else {
        console.error("Error", error.message);
        throw new Error(error.message || "Ett okänt fel inträffade.");
      }
    });
};

export default registerUser;
