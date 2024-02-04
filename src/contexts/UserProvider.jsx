import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const createUser = (newUserQuery) => {
        setUser(newUserQuery);
    };

    return (
        <UserContext.Provider value={{ user, createUser }}>
            {children}
        </UserContext.Provider>
    );
}