import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, User, MapPinHouse, Calendar, Phone } from "lucide-react"
import ilustracao from "../assets/ilustracao.png"
import { handleCep } from "../utils/Cep"

const niveis = ["Iniciante", "Intermediário", "Avançado", "Profissional"]
const posicoes = [
    "Goleira",
    "Zagueira Central",
    "Lateral Direita",
    "Lateral Esquerda",
    "Volante",
    "Meia Ofensiva",
    "Meia Defensiva",
    "Atacante",
    "Ponta Direita",
    "Ponta Esquerda",
    "Centroavante",
]

export default function Cadastro() {

    const navigate = useNavigate()

    const [nome, setNome] = useState("")
    const [nascimento, setNascimento] = useState("")
    const [telefone, setTelefone] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const [CEP, setCEP] = useState("")
    const [cepErro, setCepErro] = useState("")
    const [logradouro, setLogradouro] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")

    const [posicao, setPosicao] = useState("")
    const [nivel, setNivel] = useState("")

    const [erro, setErro] = useState("")

    const calcularIdade = (dataNascimento) => {
        const hoje = new Date()
        const nascimento = new Date(dataNascimento)
        let idade = hoje.getFullYear() - nascimento.getFullYear()
        const mes = hoje.getMonth() - nascimento.getMonth()

        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--
        }
        return idade
    }


    const handleRegister = async (e) => {
        e.preventDefault();
        if (
            !nome ||
            !nascimento ||
            !telefone ||
            !email ||
            !senha ||
            !posicao ||
            !nivel ||
            !CEP ||
            !logradouro ||
            !bairro ||
            !cidade ||
            !estado
        ) {
            setErro("Por favor, preencha todos os campos obrigatórios")
            return
        }

        setErro("")

        const usuario = {
            nome: nome,
            nascimento: nascimento,
            idade: calcularIdade(nascimento),
            telefone: telefone,
            email: email,
            senha: senha,
            posicao: posicao,
            nivel: nivel,
            role: "user",
            endereco: {
                cep: CEP,
                logradouro: logradouro,
                numero: numero,
                complemento: complemento,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
            },
            inscricoes: [],
            documentos: []
        }
        console.log("Cadastro:", usuario)

        try {
            const response = await fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(usuario),
            })
            if (!response.ok) {
                throw new Error("Erro ao cadastrar usuário")
            }

            const data = await response.json()
            console.log("Usuário cadastrado com sucesso:", data)

            alert("Cadastro realizado com sucesso!")
            navigate("/login")
        } catch (error) {
            console.error(error)
            setErro("Erro ao cadastrar usuário. Tente novamente mais tarde.")
        }
    }

    const buscarEndereco = async (cep) => {
        if (cep.length < 8) {
            setCepErro("CEP inválido")
            return
        }
        const resultado = await handleCep(cep)
        if (resultado.erro) {
            setCepErro("CEP inválido")
            return
        }
        setCepErro("")
        setLogradouro(resultado.rua)
        setBairro(resultado.bairro)
        setCidade(resultado.cidade)
        setEstado(resultado.estado)
    }

    return (
        <main className="bg-gradient-to-r from-lilas/40 via-verde/10 to-lilas/20 p-10">
            <div className="w-full mx-auto flex items-center justify-center">
                <div className="flex flex-col lg:flex-row w-full lg:min-h-[500] max-w-screen-xl bg-white shadow-2xl rounded-lg overflow-hidden">
                    <div className="lg:w-1/2 flex flex-col justify-center p-6 sm:p-12">
                        <h1 className="text-2xl font-bold mb-6 text-center">Cadastre-se</h1>
                        <form className="flex flex-col gap-4 text-gray-400" onSubmit={handleRegister}>
                            {erro && (
                                <p className="text-red-500 text-sm text-center">{erro}</p>
                            )}

                            <div className="relative flex flex-col focus-within:text-gray-900">
                                <label className="text-sm font-medium mb-1">
                                    Nome completo
                                </label>
                                <User className="w-5 h-5 absolute left-3 top-9 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Digite seu nome completo"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                />
                            </div>
                            <div className="relative flex flex-col focus-within:text-gray-900">
                                <label className="text-sm font-medium mb-1">
                                    Data de nascimento
                                </label>
                                <Calendar className="w-5 h-5 absolute left-3 top-9 text-gray-400" />
                                <input
                                    id="data-nascimento"
                                    type="date"
                                    value={nascimento}
                                    onChange={(e) => setNascimento(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                />
                            </div>

                            <div className="relative flex flex-col focus-within:text-gray-900">
                                <label className="text-sm font-medium mb-1">
                                    Telefone
                                </label>
                                <Phone className="w-5 h-5 absolute left-3 top-9 text-gray-400" />
                                <input
                                    type="tel"
                                    placeholder="Digite seu telefone"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                />
                            </div>

                            <div className="border rounded-xl shadow-sm p-4 bg-gray-50">
                                <div className="flex items-center gap-2 mb-3">
                                    <MapPinHouse className="w-5 h-5 text-gray-400" />
                                    <h3 className="text-sm font-semibold text-gray-400">Endereço</h3>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                                    <div className="col-span-1 lg:col-span-12 focus-within:text-gray-900">
                                        <label className="block text-sm font-medium mb-1">CEP</label>
                                        <input
                                            type="text"
                                            placeholder="Digite seu CEP"
                                            value={CEP}
                                            onChange={(e) => setCEP(e.target.value)}
                                            onBlur={async () => {
                                                if (CEP.trim() !== "") {
                                                    await buscarEndereco(CEP)
                                                }
                                            }}
                                            maxLength={8}
                                            className="px-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                        />
                                        {cepErro && (
                                            <p className="text-red-500 text-sm mt-1">{cepErro}</p>
                                        )}
                                    </div>
                                    <div className="col-span-1 lg:col-span-8">
                                        <input
                                            type="text"
                                            placeholder="Rua"
                                            value={logradouro}
                                            onChange={(e) => setLogradouro(e.target.value)}
                                            className="px-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                        />
                                    </div>
                                    <div className="col-span-1 lg:col-span-4">
                                        <input
                                            type="text"
                                            placeholder="Número"
                                            value={numero}
                                            onChange={(e) => setNumero(e.target.value)}
                                            className="px-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                        />
                                    </div>
                                    <div className="col-span-1 lg:col-span-5">
                                        <input
                                            type="text"
                                            placeholder="Complemento"
                                            value={complemento}
                                            onChange={(e) => setComplemento(e.target.value)}
                                            className="px-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                        />
                                    </div>
                                    <div className="col-span-1 lg:col-span-7">
                                        <input
                                            type="text"
                                            placeholder="Bairro"
                                            value={bairro}
                                            onChange={(e) => setBairro(e.target.value)}
                                            className="px-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                        />
                                    </div>
                                    <div className="col-span-1 lg:col-span-7">
                                        <input
                                            type="text"
                                            placeholder="Cidade"
                                            value={cidade}
                                            onChange={(e) => setCidade(e.target.value)}
                                            className="px-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                        />
                                    </div>
                                    <div className="col-span-1 lg:col-span-5">
                                        <input
                                            type="text"
                                            placeholder="Estado"
                                            value={estado}
                                            onChange={(e) => setEstado(e.target.value)}
                                            className="px-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="relative flex flex-col focus-within:text-gray-900">
                                <label className="text-sm font-medium mb-1">
                                    Posição
                                </label>
                                <select
                                    value={posicao}
                                    onChange={(e) => setPosicao(e.target.value)}
                                    className="px-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                >
                                    <option value="">Selecione sua posição</option>
                                    {posicoes.map((p) => (
                                        <option key={p} value={p}>
                                            {p}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative flex flex-col focus-within:text-gray-900">
                                <label className="text-sm font-medium mb-1">
                                    Nível
                                </label>
                                <select
                                    value={nivel}
                                    onChange={(e) => setNivel(e.target.value)}
                                    className="px-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                >
                                    <option value="">Selecione seu nível</option>
                                    {niveis.map((n) => (
                                        <option key={n} value={n}>
                                            {n}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative flex flex-col focus-within:text-gray-900">
                                <label className="text-sm font-medium mb-1">
                                    Email
                                </label>
                                <Mail className="w-5 h-5 absolute left-3 top-9 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Digite seu email"
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
                                    placeholder="Digite uma senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-lilas hover:bg-roxo cursor-pointer text-white py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition"
                            >
                                Cadastrar
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