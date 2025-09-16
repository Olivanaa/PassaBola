export const isAuthenticated = () => {
    return localStorage.getItem("token") !== null
}

export default function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />
    }

    return children
}
