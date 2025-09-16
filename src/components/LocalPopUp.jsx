import { Popup } from "react-leaflet"
import { MapPin } from "lucide-react"

export default function LocalPopUp({ local }) {
    const { rua, bairro, cidade, descricao, data, nome } = local

    return (
        <Popup>
            <div className="flex flex-col gap-2 max-w-xs">
                <h1 className="text-lg font-bold text-gray-800 truncate">{nome}</h1>

                <div className="flex items-center gap-1 text-gray-600 text-sm break-words">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="whitespace-normal">{[rua, bairro, cidade].filter(Boolean).join(", ")}</span>
                </div>

                {local.descricao && <p className="text-gray-700 text-sm max-h-24 overflow-y-auto">{descricao}</p>}

                {local.data && <p className="text-gray-500 text-sm">
                    <span className="font-medium">Data:</span> {data}
                    </p>}

                <div className="flex justify-center mt-2">
                    <button className="px-3 py-1 w-full bg-lilas text-white rounded hover:bg-roxo transition text-sm">
                        Saiba Mais
                    </button>
                </div>
            </div>
        </Popup>
    )
}