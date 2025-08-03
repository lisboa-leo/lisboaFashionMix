import API from "./api.jsx";

export async function listarProdutos() {
  const URL = "produto/listarProdutos";
  try {
    const response = await API.get(URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    return false;
  }
}

export async function buscarProdutoPorId(id) {
  const URL = `produto/buscarProduto/${id}`;
  try {
    const response = await API.get(URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return false;
  }
}

export async function salvarProduto(produto, quantidade, estoqueMinimo) {
  const URL = `produto/salvarProduto?quantidade=${quantidade}&estoqueMinimo=${estoqueMinimo}`;
  try {
    const response = await API.post(URL, produto);
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar produto:", error);
    return false;
  }
}

export async function atualizarProduto(id, produto, quantidade, estoqueMinimo) {
  const URL = `produto/atualizarProduto/${id}?quantidade=${quantidade}&estoqueMinimo=${estoqueMinimo}`;
  try {
    const response = await API.put(URL, produto);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return false;
  }
}

export async function deletarProduto(id) {
  const URL = `produto/deletarProduto/${id}`;
  try {
    const response = await API.delete(URL);
    return response.status === 204; 
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return false;
  }
}
