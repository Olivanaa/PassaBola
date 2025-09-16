import { Navigate } from "react-router-dom"

export const isAuthenticated = () => {
    return localStorage.getItem("token") !== null
}

export const getLoggedUser = () => {
    const usuario = localStorage.getItem("usuario")
    return usuario ? JSON.parse(usuario) : null
}

export const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    window.location.href = "/"
}

export const fetchLoggedUser = async (userId) => {
    const response = await fetch(`http://localhost:3000/usuarios/${userId}`)
    if (!response.ok) throw new Error("Erro ao buscar usuário")
    return await response.json()
}

export default function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />
    }

    return children
}
