import { LoginUserInterface } from "../interfaces/LoginUserInterface";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveToken } from "../auth/TokenService";

const loginUser = async (userData: LoginUserInterface) => {
  try {
    const response = await fetch("https://sea-turtle-app-le797.ondigitalocean.app/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const responseText = await response.text();
    console.log("Server Response:", responseText);

    if (!response.ok) {
      throw new Error(responseText);
    }
    try {
      const parsedResponse = JSON.parse(responseText);

      if (parsedResponse.token) {
        await saveToken(parsedResponse.token);
        console.log("Saved token", responseText);
      }

      return parsedResponse;
    } catch (e) {
      throw new Error("Svaret från servern är inte ett giltigt JSON-format.");
    }
  } catch (error) {
    throw error;
  }
};

export default loginUser;
