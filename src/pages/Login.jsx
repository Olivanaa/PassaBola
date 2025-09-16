import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ilustracao from "../assets/ilustracao2.png"
import { Mail, Lock } from "lucide-react"

export default function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [erro, setErro] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()

        if (!email || !senha) {
            setErro("Por favor, preencha todos os campos")
            return
        }

        setErro("")

        try {
            const response = await fetch(`http://localhost:3000/usuarios?email=${email}&senha=${senha}`)
            const data = await response.json()

            if (data.length === 0) {
                setErro("Email ou senha incorretos")
                return
            }

            const usuario = data[0]
            console.log("Usuário logado:", usuario)

            const token = btoa(`${usuario.email}:${usuario.senha}`)
            localStorage.setItem("token", token)
            localStorage.setItem("usuario", JSON.stringify(usuario))

            navigate("/perfil")

        } catch (error) {
            console.error("Erro ao fazer login:", error)
            setErro("Erro ao tentar logar. Tente novamente mais tarde.")
        }
    }

    return (
        <main className="bg-gradient-to-r from-lilas/40 via-verde/10 to-lilas/20 p-10">
            <div className="w-full mx-auto flex items-center justify-center">
                <div className="flex flex-col lg:flex-row w-full lg:min-h-[500] max-w-screen-xl bg-white shadow-2xl rounded-lg overflow-hidden">
                    <div className="lg:w-1/2 flex flex-col justify-center p-6 sm:p-12">
                        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                        <form className="flex flex-col gap-4 text-gray-400" onSubmit={handleLogin}>
                            {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

                            <div className="relative flex flex-col focus-within:text-gray-900">
                                <label className="text-sm font-medium mb-1">
                                    E-mail
                                </label>
                                <Mail className="w-5 h-5 absolute left-3 top-9 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                />
                            </div>
                            <div className="relative flex flex-col focus-within:text-gray-900">
                                <label className="text-sm font-medium mb-1">
                                    Senha
                                </label>
                                <Lock className="w-5 h-5 absolute left-3 top-9 text-gray-400" />
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-lilas hover:bg-roxo cursor-pointer text-white py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition"
                            >
                                Entrar
                            </button>
                        </form>
                    </div>
                    <div className="lg:w-1/2 hidden lg:flex justify-center items-center bg-verde/20">
                        <img src={ilustracao} alt="Mulheres jogando futebol" className="w-full max-w-md" />
                    </div>
                </div>
            </div>
        </main>
    )
}