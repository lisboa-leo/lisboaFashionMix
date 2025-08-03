import { Routes, Route } from "react-router-dom";

// import ProtectedRoute from './components/ProtectedRoute';
import Layout from "./components/Layout";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";

import Login from "./pages/Login";
import Vendas from "./pages/Vendas";
import Produtos from "./pages/Produtos";
import Clientes from "./pages/Clientes";
import Dashboard from "./pages/Dashboard";
import Relatorios from "./pages/Relatorios";

import Categorias from "./pages/SubPages/Categorias";
import Fornecedores from "./pages/SubPages/Fornecedores";

import Usuario from "./pages/System/Usuario";
import Configuracoes from "./pages/System/Configuracoes";
import NovaSenha from "./pages/novaSenha";
import Unauthorized from "./pages/unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import SidebarBootstrap from "./components/sideBarBootStrap";

// import Unauthorized from './pages/Unauthorized';

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed((prev) => !prev);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/nova-senha" element={<NovaSenha />} />

      <Route
        path="/vendas"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "ADMINSTRADOR", "VENDEDOR"]}>
            <Container
              fluid
              className="p-0"
              style={{ backgroundColor: "#f0f2f5" }}
            >
              <Row className="g-0 flex-nowrap">
                <Col xs="auto">
                  <SidebarBootstrap collapsed={collapsed} />
                </Col>
                <Col style={{ flex: 1, overflowX: "hidden", minWidth: 0 }}>
                  <Layout collapsed={collapsed} toggleSidebar={toggleSidebar} />
                  <Vendas />
                </Col>
              </Row>
            </Container>
          </ProtectedRoute>
        }
      />

      <Route
        path="/produtos"
        element={
          <ProtectedRoute
            allowedRoles={["ADMIN", "ADMINSTRADOR", "VENDEDOR", "ESTOQUISTA"]}
          >
            <Container
              fluid
              className="p-0"
              style={{ backgroundColor: "#f0f2f5" }}
            >
              <Row className="g-0 flex-nowrap">
                <Col xs="auto">
                  <SidebarBootstrap collapsed={collapsed} />
                </Col>
                <Col style={{ flex: 1, overflowX: "hidden", minWidth: 0 }}>
                  <Layout collapsed={collapsed} toggleSidebar={toggleSidebar} />
                  <Produtos />
                </Col>
              </Row>
            </Container>
          </ProtectedRoute>
        }
      />

      <Route
        path="/clientes"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "ADMINSTRADOR", "VENDEDOR"]}>
            <Container
              fluid
              className="p-0"
              style={{ backgroundColor: "#f0f2f5" }}
            >
              <Row className="g-0 flex-nowrap">
                <Col xs="auto">
                  <SidebarBootstrap collapsed={collapsed} />
                </Col>
                <Col style={{ flex: 1, overflowX: "hidden", minWidth: 0 }}>
                  <Layout collapsed={collapsed} toggleSidebar={toggleSidebar} />
                  <Clientes />
                </Col>
              </Row>
            </Container>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "ADMINSTRADOR"]}>
            <Container
              fluid
              className="p-0"
              style={{ backgroundColor: "#f0f2f5" }}
            >
              <Row className="g-0 flex-nowrap">
                <Col xs="auto">
                  <SidebarBootstrap collapsed={collapsed} />
                </Col>
                <Col style={{ flex: 1, overflowX: "hidden", minWidth: 0 }}>
                  <Layout collapsed={collapsed} toggleSidebar={toggleSidebar} />
                  <Dashboard />
                </Col>
              </Row>
            </Container>
          </ProtectedRoute>
        }
      />

      <Route
        path="/relatorios"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "ADMINSTRADOR"]}>
            <Container
              fluid
              className="p-0"
              style={{ backgroundColor: "#f0f2f5" }}
            >
              <Row className="g-0 flex-nowrap">
                <Col xs="auto">
                  <SidebarBootstrap collapsed={collapsed} />
                </Col>
                <Col style={{ flex: 1, overflowX: "hidden", minWidth: 0 }}>
                  <Layout collapsed={collapsed} toggleSidebar={toggleSidebar} />
                  <Relatorios />
                </Col>
              </Row>
            </Container>
          </ProtectedRoute>
        }
      />

      <Route
        path="/categorias"
        element={
          <ProtectedRoute
            allowedRoles={["ADMIN", "ADMINSTRADOR", "ESTOQUISTA"]}
          >
            <Container
              fluid
              className="p-0"
              style={{ backgroundColor: "#f0f2f5" }}
            >
              <Row className="g-0 flex-nowrap">
                <Col xs="auto">
                  <SidebarBootstrap collapsed={collapsed} />
                </Col>
                <Col style={{ flex: 1, overflowX: "hidden", minWidth: 0 }}>
                  <Layout collapsed={collapsed} toggleSidebar={toggleSidebar} />
                  <Categorias />
                </Col>
              </Row>
            </Container>
          </ProtectedRoute>
        }
      />

      <Route
        path="/fornecedores"
        element={
          <ProtectedRoute
            allowedRoles={["ADMIN", "ADMINSTRADOR", "ESTOQUISTA"]}
          >
            <Container
              fluid
              className="p-0"
              style={{ backgroundColor: "#f0f2f5" }}
            >
              <Row className="g-0 flex-nowrap">
                <Col xs="auto">
                  <SidebarBootstrap collapsed={collapsed} />
                </Col>
                <Col style={{ flex: 1, overflowX: "hidden", minWidth: 0 }}>
                  <Layout collapsed={collapsed} toggleSidebar={toggleSidebar} />
                  <Fornecedores />
                </Col>
              </Row>
            </Container>
          </ProtectedRoute>
        }
      />

      <Route
        path="/usuarios"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "ADMINSTRADOR"]}>
            <Container
              fluid
              className="p-0"
              style={{ backgroundColor: "#f0f2f5" }}
            >
              <Row className="g-0 flex-nowrap">
                <Col xs="auto">
                  <SidebarBootstrap collapsed={collapsed} />
                </Col>
                <Col style={{ flex: 1, overflowX: "hidden", minWidth: 0 }}>
                  <Layout collapsed={collapsed} toggleSidebar={toggleSidebar} />
                  <Usuario />
                </Col>
              </Row>
            </Container>
          </ProtectedRoute>
        }
      />

      <Route
        path="/configuracoes"
        element={
          <Container
            fluid
            className="p-0"
            style={{ backgroundColor: "#f0f2f5" }}
          >
            <Row className="g-0 flex-nowrap">
              <Col xs="auto">
                <SidebarBootstrap collapsed={collapsed} />
              </Col>
              <Col style={{ flex: 1, overflowX: "hidden", minWidth: 0 }}>
                <Layout collapsed={collapsed} toggleSidebar={toggleSidebar} />
                <Configuracoes />
              </Col>
            </Row>
          </Container>
        }
      />

      {/* <Route
        path="/pos"
        element={
          <ProtectedRoute requiredRole="admin">
            <Layout>
              <Vendas />
            </Layout>
          </ProtectedRoute>
        }
      /> */}

      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;
