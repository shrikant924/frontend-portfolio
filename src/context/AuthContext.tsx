import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        setIsLoggedIn(!!sessionStorage.getItem("token"));
    }, [])

    const login = (token: string) => {
        sessionStorage.setItem("token", token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)!;