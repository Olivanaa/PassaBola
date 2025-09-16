export async function handleCep(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    if (!response.ok) throw new Error("Erro ao buscar CEP")
    const data = await response.json()
    return {
      rua: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      estado: data.uf,
    }
  } catch (err) {
    console.error("Erro no handleCep:", err)
    return null
  }
}