import { RegisterUserInterface } from "../interfaces/RegisterUserInterface";

const registerUser = async (userData: RegisterUserInterface) => {
  try {
    const response = await fetch("https://sea-turtle-app-le797.ondigitalocean.app/user/app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(responseText);
    }

    return JSON.parse(responseText);
  } catch (error) {
    throw error;
  }
};

export default registerUser;