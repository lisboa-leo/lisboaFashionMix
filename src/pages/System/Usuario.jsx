import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Table,
  Badge,
  InputGroup,
  FormControl,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { Pen, Plus, Trash2Icon } from "lucide-react";
import userConfig from "../../components/ui/icon-usuario-userConfig.svg";
import email from "../../components/ui/icon-fornecedor-email.svg";
import userPerfil from "../../components/ui/icon-usuario-perfil.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { buscarUsuarioId, cadastrarUsuario, editarUsuario, inativarUsuario, listarUsuarios } from "../../contexts/services/usuarioService";

export default function Usuario() {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const notifyInfo = (msg) => toast.info(msg);

  const [showModal, setShowModal] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [usuariosList, setUsuariosList] = useState([]);

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedUsuario(null);
  };

  const handleShow = () => {
    setSelectedUsuario({
      nome: "",
      email: "",
      nomeUsuario: "",
      senha: "",
      perfil: "",
    });
    setShowModal(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function carregarUsuarios() {
      const response = await listarUsuarios();
      setUsuariosList(response);
    }

    carregarUsuarios();
  }, []);

  const statusUsuario = (status) => {
    if (status === "ATIVO") {
      return (
        <Badge bg="success" pill className="px-2 fw-normal">
          Ativo
        </Badge>
      );
    } else if (status === "ALTERARSENHA") {
      return (
        <Badge bg="warning" pill className="px-2 fw-normal">
          Alterar Senha
        </Badge>
      );
    } else {
      return (
        <Badge bg="light" pill className="px-2 text-dark border fw-normal">
          Inativo
        </Badge>
      );
    }
  };

  const perfilUsuario = (perfil) => {
    if (perfil == "ADMIN") {
      return (
        <Badge pill className="px-2 fw-semibold">
          <img src={userPerfil} className="me-1" />
          ADMIN
        </Badge>
      );
    } else if (perfil == "ADMINISTRADOR") {
      return (
        <Badge bg="info" pill className="px-2 fw-semibold">
          <img src={userPerfil} className="me-1" />
          ADMINISTRADOR
        </Badge>
      );
    } else if (perfil == "VENDEDOR") {
      return (
        <Badge bg="secondary" pill className="px-2 fw-semibold">
          <img src={userPerfil} className="me-1" />
          VENDEDOR
        </Badge>
      );
    } else if (perfil == "ESTOQUISTA") {
      return (
        <Badge bg="warning" pill className="px-2 fw-semibold">
          <img src={userPerfil} className="me-1" />
          ESTOQUISTA
        </Badge>
      );
    } else {
      return (
        <Badge bg="dark" pill className="px-2 fw-semibold">
          <img src={userPerfil} className="me-1" />
          Perfil Desconhecido
        </Badge>
      );
    }
  };

  const filteredUsuario = usuariosList.filter((user) => {
    const termo = searchTerm.toLowerCase();
    return (
      user.nome.toLowerCase().includes(termo) ||
      user.email.toLowerCase().includes(termo) ||
      user.perfil.toLowerCase().includes(termo) ||
      user.statusUsuario.toLowerCase().includes(termo)
    );
  });

  const totalPages = Math.ceil(filteredUsuario.length / itemsPerPage);
  const paginatedUsuario = filteredUsuario.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEditUsuario = async (usuarioId) => {
    try {
      const usuario = await buscarUsuarioId(usuarioId);

      setSelectedUsuario(usuario);

      setEditMode(true);

      setShowModal(true);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      notifyError("Não foi possível carregar os dados do usuário.");
    }
  };

  const handleSaveUsuario = async () => {
    try {
      if (editMode) {
        await editarUsuario(selectedUsuario.idUsuario, selectedUsuario);
        notifySuccess("Usuário atualizado com sucesso!");
      } else {
        await cadastrarUsuario(selectedUsuario);
        notifySuccess("Usuário cadastrado com sucesso!");
      }

      const response = await listarUsuarios();
      setUsuariosList(response);

      handleClose();
    } catch (error) {
      notifyError("Erro ao salvar o usuário.");
    }
  };

  const handleInativarUsuario = async (usuarioId) => {
    try {
      await inativarUsuario(usuarioId);

      notifySuccess("Usuário inativado com sucesso!");

      const response = await listarUsuarios();
      setUsuariosList(response);

      if (selectedUsuario?.idUsuario === usuarioId) {
        handleClose();
      }
    } catch (error) {
      console.error("Erro ao inativar usuário:", error);
      notifyError("Não foi possível inativar o usuário.");
    }
  };

  return (
    <>
      <Container className="mt-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h2 className="fw-bold mb-1 text-dark">Usuários</h2>
            <p className="text-secondary">Gerencie os usuários do sistema</p>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div
            onFocusCapture={() => setIsFocused(true)}
            onBlurCapture={() => setIsFocused(false)}
            className={`w-50 rounded input-group shadow-sm ${
              isFocused ? "border border-primary" : ""
            }`}
          >
            <span className="input-group-text bg-transparent border-end-0">
              <Search size={16} className="text-muted" />
            </span>
            <FormControl
              placeholder="Buscar usuários..."
              className="border-start-0 shadow-none bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button
            onClick={handleShow}
            className="shadow-sm px-3 py-2 bg-selected-payment d-flex align-items-center"
          >
            <Plus size={14} className="me-1" />
            Novo Usuário
          </Button>
        </div>

        <Card className="shadow-sm border-0 rounded-4">
          <Card.Body>
            <div>
              <div className="d-flex flex-row align-items-center">
                <img src={userConfig} className="me-1" />
                <h5 className="fw-semibold text-dark mb-0">
                  Lista de Usuários
                </h5>
              </div>
              <p className="text-muted small">
                {paginatedUsuario.length} usuário
                {paginatedUsuario.length !== 1 && "s"} encontrado
                {paginatedUsuario.length !== 1 && "s"}
              </p>
            </div>

            <Table responsive hover className="align-middle text-nowrap">
              <thead>
                <tr>
                  <th scope="col" className="small text-muted">
                    Nome Usuário
                  </th>
                  <th scope="col" className="small text-muted">
                    Usuário
                  </th>
                  <th scope="col" className="small text-muted">
                    Perfil
                  </th>
                  <th scope="col" className="small text-muted">
                    Status
                  </th>
                  <th scope="col" className="small text-muted">
                    Último Acesso
                  </th>
                  <th scope="col" className="small text-muted">
                    Data de Cadastro
                  </th>
                  <th scope="col" className="small text-muted text-center">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsuario.map((user, index) => (
                  <tr key={index} className="align-middle border-top">
                    <td>
                      <div className="fw-semibold text-dark">{user.nome}</div>
                      <div className="d-flex">
                        <img src={email} className="me-1" />
                        <p className="text-muted small mb-0">{user.email}</p>
                      </div>
                    </td>
                    <td>{user.nomeUsuario}</td>
                    <td>{perfilUsuario(user.perfil)}</td>
                    <td>{statusUsuario(user.statusUsuario)}</td>
                    <td className="text-muted small">
                      {new Date(user.ultimoAcesso).toLocaleString("pt-BR")}
                    </td>
                    <td className="text-muted small">
                      {new Date(user.dataCriacao).toLocaleString("pt-BR")}
                    </td>
                    <td className="text-center ">
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          size="lg"
                          variant="light"
                          className="border"
                          onClick={() => handleEditUsuario(user.idUsuario)}
                        >
                          <Pen size={16} />
                        </Button>
                        <Button
                          size="lg"
                          variant="light"
                          className="border"
                          onClick={() => handleInativarUsuario(user.idUsuario)}
                        >
                          <Trash2Icon size={16} style={{ color: "#E22A1B" }} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <span className="text-muted small">
                Página {currentPage} de {totalPages}
              </span>
              <div className="d-flex gap-2">
                <Button
                  size="sm"
                  variant="outline-secondary"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Anterior
                </Button>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Próxima
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleClose} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title className="fw-semibold">
              {editMode ? "Editar Usuário" : "Novo Usuário"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <Form>
              <Row className="g-3 justify-content-center">
                <Col md={5}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">
                      Nome Completo
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="shadow-sm"
                      value={selectedUsuario?.nome || ""}
                      onChange={(e) =>
                        setSelectedUsuario({
                          ...selectedUsuario,
                          nome: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">Email</Form.Label>
                    <Form.Control
                      type="text"
                      className="shadow-sm"
                      value={selectedUsuario?.email || ""}
                      onChange={(e) =>
                        setSelectedUsuario({
                          ...selectedUsuario,
                          email: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-1 g-3 justify-content-center">
                <Col md={5}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">Usuario</Form.Label>
                    <Form.Control
                      type="text"
                      className="shadow-sm"
                      value={selectedUsuario?.nomeUsuario || ""}
                      onChange={(e) =>
                        setSelectedUsuario({
                          ...selectedUsuario,
                          nomeUsuario: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                {!editMode && (
                  <Col md={5}>
                    <Form.Group>
                      <Form.Label className="fw-semibold small">
                        Senha
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="shadow-sm"
                        value={selectedUsuario?.senha || ""}
                        onChange={(e) =>
                          setSelectedUsuario({
                            ...selectedUsuario,
                            senha: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                )}

                <Col md={5}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">
                      Perfil de Acesso
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={selectedUsuario?.perfil || ""}
                      onChange={(e) =>
                        setSelectedUsuario({
                          ...selectedUsuario,
                          perfil: e.target.value,
                        })
                      }
                    >
                      <option value="">Selecione o perfil</option>
                      <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                      <option value="VENDEDOR">VENDEDOR</option>
                      <option value="ESTOQUISTA">ESTOQUISTA</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} className="px-4">
              Cancelar
            </Button>
            <Button
              className="px-4 bg-selected-payment"
              onClick={handleSaveUsuario}
            >
              {editMode ? "Atualizar" : "Salvar"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
