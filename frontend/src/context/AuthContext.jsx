import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(()=>{
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (data) => {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user",JSON.stringify(data.user));
        setUser(data.user);
    };

    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("user")
        setUser(null);
    }

    const value = {
        user, login, logout, isAuthenticated: !!user
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}