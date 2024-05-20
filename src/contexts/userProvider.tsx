import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  username: string;
  password: string;
  identificacion: string;
}

interface UserContextData {
  user: User;
  createUser: (user: User) => void;
}

const UserContext = createContext<UserContextData>({
  user: {
    username: "",
    password: "",
    identificacion: "",
  },
  createUser: () => {},
});

export const useUserContext = () => {
  return useContext(UserContext);
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>({ username: "", password: "", identificacion: "" });

  const createUser = (newUser: User) => {
    setUser(newUser);
  };

  return <UserContext.Provider value={{ user, createUser }}>{children}</UserContext.Provider>;
};
