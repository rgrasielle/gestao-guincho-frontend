import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

// Provider que envolve toda a aplicação
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const navigate = useNavigate();

    // Quando tiver token, decodifica para pegar info do usuário
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({ username: decoded.sub });
                // Se tiver roles, por exemplo:
                // setUser({ username: decoded.sub, roles: decoded.roles });
            } catch (err) {
                console.error("Token inválido", err);
                setToken(null);
                setUser(null);
                localStorage.removeItem("token");
            }
        } else {
            setUser(null);
        }
    }, [token]);

    // Login: salvar token e estado
    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        navigate("/dashboard");
    };

    // Logout: remover token e estado
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
