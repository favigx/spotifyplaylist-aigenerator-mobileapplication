import React, { createContext, useContext, useState } from "react";
import { RegisterUserInterface } from "../interfaces/RegisterUserInterface";

interface RegisterContextType {
  user: RegisterUserInterface;
  setUser: (user: RegisterUserInterface) => void;
}

const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

export const RegisterProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<RegisterUserInterface>({
    email: "",
    username: "",
    password: "",
  });

  return (
    <RegisterContext.Provider value={{ user, setUser }}>
      {children}
    </RegisterContext.Provider>
  );
};

const useRegister = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("useRegister måste användas inom en RegisterProvider");
  }
  return context;
};

export default useRegister;