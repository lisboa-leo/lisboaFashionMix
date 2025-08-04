import API from "./api.jsx";

export async function listarVendas() {
  const URL = "/api/vendas/listarVendas";
  try {
    const response = await API.get(URL);
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

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