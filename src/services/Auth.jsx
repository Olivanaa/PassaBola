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

export default function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />
    }

    return children
}
