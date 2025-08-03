import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../contexts/services/usuarioService";
import logo from "../components/img/logo/logov3.png";
import { Alert } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./style.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const usuario = await login(username, password);

      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

      if (usuario.statusUsuario === "ALTERARSENHA") {
        navigate("/nova-senha", { state: { usuario } });
        return;
      }

      const perfil = usuario.perfil?.toLowerCase();

      if (perfil === "admin" || perfil === "administrador") {
        navigate("/dashboard");
      } else if (perfil === "vendedor") {
        navigate("/vendas");
      } else if (perfil === "estoquista") {
        navigate("/produtos");
      } else {
        setErro("Perfil de usuário desconhecido.");
      }
    } catch (error) {
      setErro("Usuário ou senha inválidos");
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
          <p className="text-muted small mb-0">
            Digite suas credenciais para continuar
          </p>
        </div>

        {erro && <Alert variant="danger">{erro}</Alert>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold small">
              Usuário
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              required
            />
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label fw-semibold small">
              Senha
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "38px",
                cursor: "pointer",
                color: "#666",
                userSelect: "none",
              }}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              role="button"
            >
              {showPassword ? (
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
            Entrar
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
