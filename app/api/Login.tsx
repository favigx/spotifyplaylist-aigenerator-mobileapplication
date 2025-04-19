import { LoginUserInterface } from "../interfaces/LoginUserInterface";
import { saveToken } from "../auth/TokenService";
import client from './client';

const loginUser = (userData: LoginUserInterface) => {
  return client
    .post('/user/login', userData)
    .then(async (response) => {
      console.log("Server Response:", response.data);

      await saveToken(response.data);
      console.log("Saved token", response.data);

      return response.data;  
    })
    .catch((error) => {
      if (error.response) {
        console.error("Error response:", error.response.data);
        throw new Error(error.response.data || "Fel vid inloggning.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        throw new Error("Ingen svar från servern.");
      } else {
        console.error("Error", error.message);
        throw new Error(error.message || "Ett okänt fel inträffade.");
      }
    });
};

export default loginUser;