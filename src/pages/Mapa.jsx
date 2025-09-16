import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Funnel, X } from "lucide-react"
import L from "leaflet"
import LocalPopUp from "../components/LocalPopUp"
import UserLocation from "../components/UserLocation"

import markerShadow from "leaflet/dist/images/marker-shadow.png"

const iconRoxo = new L.Icon({
    iconUrl: '/location-pin-roxo.png',
    shadowUrl: markerShadow,
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const iconAzul = new L.Icon({
    iconUrl: '/location-pin-azul.png',
    shadowUrl: markerShadow,
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const iconVerde = new L.Icon({
    iconUrl: '/location-pin-verde.png',
    shadowUrl: markerShadow,
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const iconRosa = new L.Icon({
    iconUrl: '/location-pin-rosa.png',
    shadowUrl: markerShadow,
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const iconLaranja = new L.Icon({
    iconUrl: '/location-pin-laranja.png',
    shadowUrl: markerShadow,
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const iconAmarelo = new L.Icon({
    iconUrl: '/location-pin-amarelo.png',
    shadowUrl: markerShadow,
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})



const iconesPorTipo = {
    evento: iconRoxo,
    quadra: iconAzul,
    escolinha: iconVerde,
    clube: iconRosa,
    academia: iconLaranja
}

const faixasEtaria = [
    "Mirim",
    "Sub-11",
    "Sub-13",
    "Sub-15",
    "Sub-17",
    "Sub-20",
    "Adulto"
]

const niveis = ["Iniciante", "Intermediário", "Avançado", "Profissional"]

const tipos = [
    "Evento",
    "Quadra",
    "Escolinha",
    "Clube",
    "Academia"
]

export default function Mapa() {
    const [locais, setLocais] = useState([])
    const [busca, setBusca] = useState("")
    const [showFilters, setShowFilters] = useState(false)
    const [center, setCenter] = useState([-23.5505, -46.6333])
    const [tipo, setTipo] = useState("Todos")
    const [faixaEtaria, setFaixaEtaria] = useState("Todas")
    const [custo, setCusto] = useState("Todos")
    const [nivel, setNivel] = useState("Todos")

    useEffect(() => {
        async function fetchLocais() {
            try {
                const res = await fetch("http://localhost:3000/locais")

                const data = await res.json()
                console.log(data)

                setLocais(data)
            } catch (err) {
                console.error("Erro ao buscar locais:", err)
            }
        }

        fetchLocais()
    }, [])

    const locaisFiltrados = locais.filter((l) => {
        const matchBusca = l.nome.toLowerCase().includes(busca.toLowerCase())
        const matchTipo = tipo === "Todos" || l.tipo.toLowerCase() === tipo.toLowerCase()
        const matchFaixa = faixaEtaria === "Todas" || l.faixaEtaria.find(f => f.toLowerCase() === faixaEtaria.toLowerCase())
        const matchCusto = custo === "Todos" || l.custo.toLowerCase() === custo.toLowerCase()
        const matchNivel = nivel === "Todos" || l.nivel.toLowerCase() === nivel.toLowerCase()
        return matchBusca && matchTipo && matchFaixa && matchCusto && matchNivel
    })

    function limparFiltros() {
        setTipo("Todos")
        setFaixaEtaria("Todas")
        setCusto("Todos")
        setNivel("Todos")
        setBusca("")
    }

    return (
        <main className="relative w-full h-screen">
            <div className="absolute top-4 left-15 z-50 flex bg-white shadow-md rounded-lg overflow-hidden w-80">
                <input
                    type="text"
                    placeholder="Buscar por locais, eventos..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="flex-1 px-3 py-2 focus:outline-none text-sm"
                />
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-3 bg-lilas text-white hover:bg-roxo transition"
                >
                    {showFilters ? <X className="w-5 h-5" /> : <Funnel className="w-5 h-5" />}
                </button>
            </div>
            {showFilters && (
                <div className="absolute top-20 left-15 z-50 w-72 bg-white shadow-xl rounded-xl p-5 flex flex-col gap-4 transition-all duration-200">
                    <div className="flex items-center justify-between mb-2 border-b pb-2">
                        <h2 className="text-lg font-bold text-gray-800">Filtros</h2>
                        <button
                            onClick={limparFiltros}
                            className="text-sm text-gray-500 hover:text-gray-700 underline"
                        >
                            Limpar
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">Tipo</label>
                        <select
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                        >
                            <option value="Todos">Todos</option>
                            {tipos.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">Faixa Etária</label>
                        <select
                            value={faixaEtaria}
                            onChange={(e) => setFaixaEtaria(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                        >
                            <option value="Todas">Todas</option>
                            {faixasEtaria.map((f) => (
                                <option key={f} value={f}>
                                    {f}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">Custo</label>
                        <select
                            value={custo}
                            onChange={(e) => setCusto(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                        >
                            <option>Todos</option>
                            <option>Gratuito</option>
                            <option>Pago</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">Nível</label>
                        <select
                            value={nivel}
                            onChange={(e) => setNivel(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                        >
                            <option value="Todos">Todos</option>
                            {niveis.map((n) => (
                                <option key={n} value={n}>
                                    {n}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
            <MapContainer
                center={center}
                zoom={14}
                className="h-full w-full z-0"
                scrollWheelZoom={false}
                dragging={true}
                touchZoom={true}
            >
                <UserLocation />
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://www.carto.com/">CARTO</a>'
                    subdomains={["a", "b", "c", "d"]}
                />
                {locaisFiltrados.map((local) => (
                    <Marker
                        key={local.id}
                        position={local.pos}
                        icon={iconesPorTipo[local.tipo.toLowerCase()]}
                    >
                        <LocalPopUp local={local} />
                    </Marker>
                ))}
            </MapContainer>
            <div className="absolute bottom-20 right-10 bg-white p-5 rounded-lg shadow-md z-50">
                <h3 className="font-bold mb-2">Legenda</h3>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 bg-[#A263E6] rounded-full"></div>
                    <span>Evento</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 bg-[#639AE6] rounded-full"></div>
                    <span>Quadra</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#63E6BE] rounded-full"></div>
                    <span>Escolinha</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#EF8962] rounded-full"></div>
                    <span>Clube</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#EF62C7] rounded-full"></div>
                    <span>Academia</span>
                </div>
            </div>
        </main>
    )
}
