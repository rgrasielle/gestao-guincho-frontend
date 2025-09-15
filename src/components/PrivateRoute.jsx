import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { jwtDecode } from "jwt-decode";

export default function PrivateRoute({ children }) {
    const { token, logout } = useAuth();

    if (!token) {
        // Se não tiver token, redireciona para login
        return <Navigate to="/login" replace />;
    }

    try {
        // Decodifica o token para pegar a expiração
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // tempo atual em segundos

        if (decoded.exp < currentTime) {
            // Token expirou → limpa o estado e redireciona
            logout();
            return <Navigate to="/login" replace />;
        }
    } catch {
        // Token inválido → limpa o estado e redireciona
        logout();
        return <Navigate to="/login" replace />;
    }

    // Token válido → permite acesso
    return children;
}
