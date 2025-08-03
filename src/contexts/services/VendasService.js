import API from "./api.jsx";

export async function salvarVenda(venda) {
  const URL = "/api/vendas";
  try {
    const response = await API.post(URL, venda);
    return response.data;
  } catch (error) {
    console.error("Erro no salvarVenda:", error);
    throw new Error('Erro ao salvar venda');
  }
}