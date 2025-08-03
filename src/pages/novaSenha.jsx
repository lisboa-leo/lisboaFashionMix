import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../components/img/logo/logov3.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { alterarSenha } from "../contexts/services/usuarioService";
import "./style.css";

export default function NovaSenha() {
  const location = useLocation();
  const navigate = useNavigate();
  const usuario = location.state?.usuario;

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmaSenha, setShowConfirmaSenha] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (novaSenha !== confirmaSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    try {
      await alterarSenha(usuario.idUsuario, novaSenha);

      alert("Senha alterada com sucesso!");

      const perfil = usuario.perfil?.toLowerCase();

      if (perfil === "admin" || perfil === "administrador") {
        navigate("/dashboard");
      } else if (perfil === "vendedor") {
        navigate("/vendas");
      } else if (perfil === "estoquista") {
        navigate("/produtos");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setErro(error.message || "Erro ao alterar senha");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-login">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-start mb-3">
          <h3 className="h4 fw-semibold mb-1">Acesso ao Sistema</h3>
          <p className="text-muted small mb-0">Nova senha</p>
        </div>

        {erro && <div className="alert alert-danger">{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label fw-semibold small">
              Nova Senha
            </label>
            <input
              type={showNovaSenha ? "text" : "password"}
              className="form-control"
              id="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="Digite sua nova Senha"
              required
            />
            <span
              onClick={() => setShowNovaSenha(!showNovaSenha)}
              style={{
                position: "absolute",
                right: "10px",
                top: "38px",
                cursor: "pointer",
                color: "#666",
                userSelect: "none",
              }}
              aria-label={showNovaSenha ? "Ocultar senha" : "Mostrar senha"}
              role="button"
            >
              {showNovaSenha ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </span>
          </div>

          <div className="mb-3 position-relative">
            <label
              htmlFor="newPassword2"
              className="form-label fw-semibold small"
            >
              Confirme sua Senha
            </label>
            <input
              type={showConfirmaSenha ? "text" : "password"}
              className="form-control"
              id="newPassword2"
              value={confirmaSenha}
              onChange={(e) => setConfirmaSenha(e.target.value)}
              placeholder="Confirme a sua senha"
              required
            />
            <span
              onClick={() => setShowConfirmaSenha(!showConfirmaSenha)}
              style={{
                position: "absolute",
                right: "10px",
                top: "38px",
                cursor: "pointer",
                color: "#666",
                userSelect: "none",
              }}
              aria-label={showConfirmaSenha ? "Ocultar senha" : "Mostrar senha"}
              role="button"
            >
              {showConfirmaSenha ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </span>
          </div>

          <button
            type="submit"
            className="btn w-100 text-light fw-semibold small"
            style={{ backgroundColor: "hsl(222.2 47.4% 11.2%)" }}
          >
            Salvar
          </button>

          <div className="text-center">
            <img
              src={logo}
              alt="Logo"
              className="mt-3"
              style={{ maxWidth: "100px" }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
