import { createBrowserRouter } from "react-router-dom"
import Layout from "../pages/Layout"
import PaginaNaoEncontrada from "../pages/PaginaNaoEncontrada"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Cadastro from "../pages/Cadastro"
import PrivateRoute from "../services/Auth"
import Eventos from "../pages/Eventos"
import Perfil from "../pages/Perfil"
import Mapa from "../pages/Mapa"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <PaginaNaoEncontrada />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "cadastro",
                element: <Cadastro />
            },
            {
                path: "evento",
                element: <PrivateRoute>
                    <Eventos />
                </PrivateRoute>
            },
            {
                path: "perfil",
                element: <PrivateRoute>
                    <Perfil />
                </PrivateRoute>
            },
            {
                path: "mapa",
                element: <PrivateRoute>
                    <Mapa />
                </PrivateRoute>
            },

        ]
    },
])