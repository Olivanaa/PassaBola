import { useEffect, useState } from "react"
import { MapPin, Calendar, User, Star, Cake, Mail, Phone, Edit } from "lucide-react"
import avatar from "../assets/avatar.png"
import { formatDate, formatTelefone } from "../utils/DataFormato"
import { getLoggedUser, fetchLoggedUser } from "../services/Auth"
import { useNavigate } from "react-router-dom"

export default function Perfil() {
    const navigate = useNavigate()

    const [usuario, setUsuario] = useState(getLoggedUser())

    useEffect(() => {
        const loadUser = async () => {
            try {
                const updatedUser = await fetchLoggedUser(usuario.id)
                setUsuario(updatedUser)
                localStorage.setItem("usuario", JSON.stringify(updatedUser))
            } catch (err) {
                console.error("Erro ao carregar usuário:", err)
            }
        }
        loadUser()
    }, [])

    const handleCancelarInscricao = async (inscricao) => {
        try {
            const eventoResponse = await fetch(`http://localhost:3000/eventos/${inscricao.eventoId}`)
            const evento = await eventoResponse.json()

            const eventoAtualizado = {
                ...evento,
                vagas: evento.vagas + 1,
                ocupadas: evento.ocupadas - 1,
                inscritos: evento.inscritos.map((i) =>
                    i.usuarioId === usuario.id
                        ? { ...i, status: "Cancelado" }
                        : i
                ),
                inscritosHistorico: [
                    ...(evento.inscritosHistorico),
                    {
                        data: new Date().toISOString().split("T")[0],
                        total: evento.inscritos.length - 1
                    }
                ]
            }

            await fetch(`http://localhost:3000/eventos/${evento.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(eventoAtualizado),
            })


            if (!eventoResponse.ok) {
                throw new Error("Erro ao atualizar o evento");
            }

            const inscricoesAtualizadas = usuario.inscricoes.map((i) =>
                i.eventoId === evento.id ? { ...i, status: "Cancelado" } : i
            )

            const usuarioAtualizado = {
                ...usuario,
                inscricoes: inscricoesAtualizadas,
            }

            const usuarioResponse = await fetch(
                `http://localhost:3000/usuarios/${usuario.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(usuarioAtualizado),
                }
            )

            if (!usuarioResponse.ok) {
                throw new Error("Erro ao atualizar usuário");
            }

            setUsuario(usuarioAtualizado)
        } catch (err) {
            console.error("Erro ao cancelar inscrição:", err)
        }
    }
    
    return (
        <main className="bg-gradient-to-r from-lilas/40 via-verde/10 to-lilas/20 px-4 py-8 md:p-10 flex justify-center items-start">
            <div className="w-full max-w-5xl bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col">
                <div className="bg-gradient-to-r from-lilas/20 to-verde/10 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="relative">
                            <img
                                src={avatar}
                                alt="Avatar"
                                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-2xl"
                            />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">{usuario.nome}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-4">
                                <span className="bg-lilas/20 text-[#521852] px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                    <User className="w-4 h-4 mr-1" /> {usuario.posicao || "Posição não informada"}
                                </span>
                                <span className="bg-[#22C55E]/20 text-[#1c6d3a] px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                    <Star className="w-4 h-4 mr-1" /> {usuario.nivel || "Nível não informado"}
                                </span>
                                <span className="bg-[#F472B6]/20 text-[#920b51] px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                    <Cake className="w-4 h-4 mr-1" /> {usuario.idade} anos
                                </span>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                                <span className="text-gray-600 hover:text-roxo transition flex items-center">
                                    <Mail className="w-5 h-5 mr-2" /> {usuario.email}
                                </span>
                                <span className="text-gray-600 hover:text-roxo transition flex items-center">
                                    <Phone className="w-5 h-5 mr-2" /> {formatTelefone(usuario.telefone)}
                                </span>
                            </div>
                            <div className="flex justify-center md:justify-end">
                                <button className="bg-roxo/10 text-roxo hover:bg-roxo/20 transition px-4 py-2 rounded-lg flex items-center">
                                    <Edit className="w-4 h-4 mr-2" /> Editar Perfil
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Inscrições em Eventos</h2>
                    {usuario.inscricoes?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {usuario.inscricoes.map((evento) => {
                                const isCancelado = evento.status === "Cancelado"
                                const statusColor = isCancelado ? "bg-gray-500" :
                                    evento.status === "Confirmada" ? "bg-verde" :
                                        evento.status === "Lista de Espera" ? "bg-verdeLimao" : "bg-gray-10"
                                return (
                                    <div
                                        key={evento.eventoId}
                                        className={`rounded-xl p-4 transition-all flex flex-col h-full relative overflow-hidden
                                            ${isCancelado
                                                ? "bg-gray-100 border border-gray-300"
                                                : "bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:shadow-lg hover:border-lilas/30"
                                            }`}
                                    >
                                        <div className={`absolute top-0 right-0 ${statusColor} text-white text-xs px-2 py-1 rounded-bl-lg`}>
                                            {evento.status}
                                        </div>
                                        <h3 className="font-bold text-gray-800 text-lg mb-2 pr-10">{evento.nomeEvento}</h3>
                                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                                            <Calendar className="w-4 h-4 text-roxo" />
                                            <span className="text-sm">{formatDate(evento.dataEvento)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 mb-3">
                                            <MapPin className="w-4 h-4 text-roxo" />
                                            <span className="text-sm">{evento.local}</span>
                                        </div>
                                        <div className="mt-auto pt-3">
                                            <button
                                                onClick={() => handleCancelarInscricao(evento)}
                                                disabled={isCancelado}
                                                className={`w-full py-2 rounded-lg text-sm font-medium transition-all
                                                ${isCancelado
                                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                        : "bg-roxo text-white hover:bg-lilas hover:shadow-md"
                                                    }`}
                                            >
                                                {isCancelado ? "Inscrição Cancelada" : "Cancelar Inscrição"}
                                            </button>
                                        </div>
                                        {isCancelado && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-full h-px bg-gray-400 rotate-12 transform"></div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-gray-50 rounded-lg">
                            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-500">Nenhuma inscrição em eventos.</p>
                            <button 
                                onClick={() => navigate("/evento")}
                                className="mt-4 bg-roxo text-white px-4 py-2 rounded-lg hover:bg-lilas transition">
                                    Explorar Eventos
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}