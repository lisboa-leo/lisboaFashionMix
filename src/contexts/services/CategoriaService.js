import API from "./api.jsx";

export async function listarCategorias() {
  let URL = "categoria/listarCategorias";
  try {
    const response = await API.get(URL,);
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function buscarCategoriaPorId(id) {
  let URL = `categoria/buscarCategoria/${id}`;
  try {
    const response = await API.get(URL);
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function cadastrarCategoria(categoria) {
  let URL = "categoria/cadastrarCategoria";
  try {
    const response = await API.post(URL, categoria);
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function alterarCategoria(id, categoria) {
  let URL = `categoria/alterarCategoria/${id}`;
  try {
    const response = await API.put(URL, categoria);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Erro ao editar categoria');
  }
}

export async function deletarCategoria(id) {
  let URL = `categoria/deletarCategoria/${id}`;
  console.log(URL)
  try {
    const response = await API.delete(URL);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Erro ao deletar categoria');
  }
}
