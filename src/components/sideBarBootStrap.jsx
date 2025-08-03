import { NavLink, useLocation } from "react-router-dom";
import {
  People,
} from "react-bootstrap-icons";
import logo from "../components/img/logo/logov3.png";
import Dashboard from "./ui/icon-sideBar-dashboard.svg";
import Vendas from "./ui/icon-sideBar-vendas.svg";
import Produtos from "./ui/icon-sideBar-produtos.svg";
import Clientes from "./ui/icon-sideBar-usuarios.svg";
import Relatorios from "./ui/icon-sideBar-relatorios.svg";
import Categorias from "./ui/icon-sideBar-categorias.svg";
import Fornecedores from "./ui/icon-sideBar-fornecedores.svg";
import { LogOut } from "lucide-react";

export default function SidebarBootstrap({ collapsed }) {
  const location = useLocation();
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  const role = usuario?.perfil?.toUpperCase() || "";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const renderNavItem = (to, label, Icon) => (
    <NavLink
      to={to}
      className={() =>
        `nav-link-custom d-flex align-items-center gap-2 px-3 py-2 ${
          collapsed ? "justify-content-center" : ""
        }`
      }
    >
      {typeof Icon === "string" ? (
        <img
          src={Icon}
          alt={label}
          style={{ width: collapsed ? "24px" : "22px", height: "auto" }}
        />
      ) : (
        <Icon size={collapsed ? 22 : 18} className="icon-white" />
      )}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );

  const rolesPrincipal = ["ADMIN", "ADMINISTRADOR"];
  const rolesVendas = ["ADMIN", "ADMINISTRADOR", "VENDEDOR"];
  const rolesProdutos = ["ADMIN", "ADMINISTRADOR", "VENDEDOR", "ESTOQUISTA"];
  const rolesClientes = ["ADMIN", "ADMINISTRADOR", "VENDEDOR"];
  const rolesRelatorios = ["ADMIN", "ADMINISTRADOR"];
  const rolesCatalogo = ["ADMIN", "ADMINISTRADOR", "ESTOQUISTA"];
  const rolesSistema = ["ADMIN", "ADMINISTRADOR"];

  const canSeePrincipal = rolesPrincipal.includes(role);
  const canSeeVendas = rolesVendas.includes(role);
  const canSeeProdutos = rolesProdutos.includes(role);
  const canSeeClientes = rolesClientes.includes(role);
  const canSeeRelatorios = rolesRelatorios.includes(role);
  const canSeeCatalogo = rolesCatalogo.includes(role);
  const canSeeSistema = rolesSistema.includes(role);

  return (
    <div
      className="d-flex flex-column vh-100 sidebar-custom shadow"
      style={{
        width: collapsed ? "80px" : "240px",
        transition: "width 0.3s",
        backgroundColor: "#1B2428",
        color: "#fff",
      }}
    >
      <div className="p-3 border-bottom d-flex justify-content-center align-items-center logo-area">
        <img
          src={logo}
          alt="Logo"
          style={{
            width: collapsed ? "60px" : "150px",
            height: "auto",
            transition: "all 0.3s",
          }}
        />
      </div>

      <div className="flex-grow-1 overflow-auto">
        <div className="pt-2">
          {!collapsed && <div className="section-title">Principal</div>}

          {canSeePrincipal && renderNavItem("/dashboard", "Dashboard", Dashboard)}
          {canSeeVendas && renderNavItem("/vendas", "Vendas", Vendas)}
          {canSeeProdutos && renderNavItem("/produtos", "Produtos", Produtos)}
          {canSeeClientes && renderNavItem("/clientes", "Clientes", Clientes)}
          {canSeeRelatorios && renderNavItem("/relatorios", "Relatórios", Relatorios)}

          {!collapsed && canSeeCatalogo && (
            <div className="section-title mt-4">Catálogo</div>
          )}

          {canSeeCatalogo && renderNavItem("/categorias", "Categorias", Categorias)}
          {canSeeCatalogo && renderNavItem("/fornecedores", "Fornecedores", Fornecedores)}

          {!collapsed && canSeeSistema && (
            <div className="section-title mt-4">Sistema</div>
          )}
          {canSeeSistema && renderNavItem("/usuarios", "Usuários", People)}
          {/* {canSeeSistema && renderNavItem("/configuracoes", "Configurações", Configuracoes)} */}
        </div>
      </div>

      <div
        className={`border-top p-3 d-flex align-items-center ${
          collapsed ? "justify-content-center" : ""
        }`}
        style={{ cursor: "pointer" }}
        onClick={handleLogout}
      >
        <LogOut size={collapsed ? 22 : 18} />
        {!collapsed && <p className="p-1 mb-0 ms-2">Sair</p>}
      </div>
    </div>
  );
}
