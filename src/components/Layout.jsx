import { Navbar, Container } from "react-bootstrap";

export default function Layout({ collapsed, toggleSidebar }) {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");

  const nome = usuario?.nome || "Usuário";
  const cargo = usuario?.perfil || "Cargo";

  const hora = new Date().getHours();

  let saudacao = "Olá";
  if (hora >= 5 && hora < 12) saudacao = "Bom dia";
  else if (hora >= 12 && hora < 18) saudacao = "Boa tarde";
  else saudacao = "Boa noite";

  return (
    <Navbar
      className="shadow-sm px-3"
      style={{
        height: "64px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e5e5",
      }}
    >
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        <div className="d-flex align-items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="toggle-btn d-flex align-items-center justify-content-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-panel-left toggle-icon"
            >
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M9 3v18"></path>
            </svg>
            <span className="visually-hidden">Toggle Sidebar</span>
          </button>

          <div>
            <p className="mb-0 fw-semibold small">LISBOA FASHION MIX</p>
            <p className="mb-0">
              {saudacao}, {nome}!
            </p>
          </div>
        </div>
        <div>
          <p className="mb-0 small">{cargo}</p>
        </div>
      </Container>
    </Navbar>
  );
}
