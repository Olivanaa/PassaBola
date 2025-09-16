export function formatDate(dateString) {
    if (!dateString) return ""

    const parts = dateString.split("-")
    if (parts.length !== 3) return dateString

    const [year, month, day] = parts
    return `${day}/${month}/${year}`
}

export function formatTelefone(telefone) {
    if (telefone.length === 11) {
        return `(${telefone.substring(0, 2)}) ${telefone.substring(2, 7)}-${telefone.substring(7)}`
    }
    if (telefone.length === 10){
        return `(${telefone.substring(0, 2)}) ${telefone.substring(2, 6)}-${telefone.substring(6)}`
    }
    return telefone
}