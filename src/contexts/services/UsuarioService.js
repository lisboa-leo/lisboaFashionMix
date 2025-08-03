import API from "./api.jsx";

export async function listarUsuarios() {
  let URL = "usuario/listarUsuario";
  try {
    const response = await API.get(URL,);
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function buscarUsuarioId(id) {
  let URL = `usuario/buscarUsuario/${id}`;
  try {
    const response = await API.get(URL);
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function editarUsuario(id, usuario) {
  let URL = `usuario/alterarUsuario/${id}`;
  try {
    const response = await API.put(URL, usuario);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Erro ao editar perfil do usuario');
  }
}

export async function cadastrarUsuario(usuario) {
  let URL = "usuario/cadastrarUsuario";
  try {
    const response = await API.post(URL, usuario);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Erro ao cadastrar usuario');
  }
}

export async function inativarUsuario(id) {
  let URL = `usuario/inativarUsuario/${id}`;
  try {
    const response = await API.put(URL);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Erro ao editar inativar perfil do usuario');
  }
}

export async function login(nomeUsuario, senha) {
  let URL = "usuario/login";
  try {
    const response = await API.post(URL, { nomeUsuario, senha });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Usuário ou senha inválidos");
  }
}

export async function alterarSenha(idUsuario, novaSenha) {
  const URL = `usuario/novaSenha/${idUsuario}`;
  try {
    const response = await API.put(URL, JSON.stringify(novaSenha), {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao alterar senha");
  }
}
