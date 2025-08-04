import API from "./api.jsx";

export async function listarClientes() {
  const URL = "cliente/listarCliente";
  try {
    const response = await API.get(URL);
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function buscarClientePorId(id) {
  const URL = `cliente/buscarCliente/${id}`;
  try {
    const response = await API.get(URL);
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function buscarClientePorCpfCnpj(cpfCnpj) {
  const URL = `cliente/buscarPorCpfCnpj/${cpfCnpj}`;
  try {
    const response = await API.get(URL);
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function cadastrarCliente(cliente) {
  const URL = "cliente/cadastrarCliente";
  try {
    const response = await API.post(URL, cliente);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao cadastrar cliente");
  }
}

export async function editarCliente(id, cliente) {
  const URL = `cliente/alterarCliente/${id}`;
  try {
    const response = await API.put(URL, cliente);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao editar cliente");
  }
}

export async function deletarCliente(id) {
  const URL = `cliente/deletarCliente/${id}`;
  try {
    const response = await API.delete(URL);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao deletar cliente");
  }
}
