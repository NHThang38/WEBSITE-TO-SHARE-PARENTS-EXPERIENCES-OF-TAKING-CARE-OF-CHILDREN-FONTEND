import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(false)
    const [like,setLike] = useState(false);
    return (
        <AuthContext.Provider value={{ auth, setAuth,loading,setLoading,like,setLike }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;