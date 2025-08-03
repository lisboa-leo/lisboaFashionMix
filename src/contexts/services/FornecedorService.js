import API from "./api.jsx";

export async function listarFornecedores() {
  let URL = "fornecedor/listarFornecedor";
  try {
    const response = await API.get(URL,);
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function buscarFornecedorId(id) {
  let URL = `fornecedor/buscarFornecedor/${id}`;
  try {
    const response = await API.get(URL);
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function editarFornecedor(id, fornecedor) {
  let URL = `fornecedor/editarFornecedor/${id}`;
  try {
    const response = await API.put(URL, fornecedor);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Erro ao editar perfil do fornecedor');
  }
}

export async function cadastrarFornecedor(fornecedor) {
  let URL = "fornecedor/cadastrarFornecedor";
  try {
    const response = await API.post(URL, fornecedor);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Erro ao cadastrar fornecedor');
  }
}

export async function inativarFornecedor(id) {
  let URL = `fornecedor/inativarFornecedor/${id}`;
  try {
    const response = await API.put(URL);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Erro ao inativar perfil do fornecedor');
  }
}