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
import truck from "../../components/ui/icon-fornecedor-truck.svg";
import email from "../../components/ui/icon-fornecedor-email.svg";
import phone from "../../components/ui/icon-fornecedor-phone.svg";
import location from "../../components/ui/icon-fornecedor-location.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  buscarFornecedorId,
  cadastrarFornecedor,
  editarFornecedor,
  inativarFornecedor,
  listarFornecedores,
} from "../../contexts/services/FornecedorService";

export default function Fornecedores() {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const notifyInfo = (msg) => toast.info(msg);

  const [showModal, setShowModal] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [selectedFornecedor, setSelectedFornecedor] = useState(null);
  const [fornecedoresList, setFornecedoresList] = useState([]);

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedFornecedor(null);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function carregarFornecedores() {
      const response = await listarFornecedores();
      setFornecedoresList(response);

      console.log(response);
    }

    carregarFornecedores();
  }, []);

  const handleShow = () => {
    setSelectedFornecedor({
      nome: "",
      cnpj: "",
      telefone: "",
      email: "",
      endereco: "",
    });
    setShowModal(true);
  };

  const statusFornecedor = (status) =>
    status === "ATIVO" ? (
      <Badge bg="success" pill className="px-2 fw-normal">
        Ativo
      </Badge>
    ) : (
      <Badge bg="light" pill className="px-2 text-dark border  fw-normal">
        Inativo
      </Badge>
    );

  const filteredFornecedores = fornecedoresList.filter((fornecedor) => {
    const termo = searchTerm.toLowerCase();
    return (
      fornecedor.nome.toLowerCase().includes(termo) ||
      fornecedor.cnpj.toLowerCase().includes(termo) ||
      fornecedor.telefone.toLowerCase().includes(termo) ||
      fornecedor.email.toLowerCase().includes(termo)
    );
  });

  const totalPages = Math.ceil(filteredFornecedores.length / itemsPerPage);
  const paginatedFornecedor = filteredFornecedores.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEditFornecedor = async (fornecedorId) => {
    try {
      const fornecedor = await buscarFornecedorId(fornecedorId);

      setSelectedFornecedor(fornecedor);

      setEditMode(true);

      setShowModal(true);
    } catch (error) {
      console.error("Erro ao buscar fornecedor:", error);
      notifyError("Não foi possível carregar os dados do fornecedor.");
    }
  };

  const handleSaveFornecedor = async () => {
    try {
      if (editMode) {
        await editarFornecedor(
          selectedFornecedor.idFornecedor,
          selectedFornecedor
        );
        notifySuccess("Fornecedor atualizado com sucesso!");
      } else {
        await cadastrarFornecedor(selectedFornecedor);
        notifySuccess("Fornecedor cadastrado com sucesso!");
      }

      const response = await listarFornecedores();
      setFornecedoresList(response);

      handleClose();
    } catch (error) {
      notifyError("Erro ao salvar o fornecedor.");
    }
  };

  const handleInativarFornecedor = async (fornecedorId) => {
    try {
      await inativarFornecedor(fornecedorId);

      notifySuccess("Fornecedor inativado com sucesso!");

      const response = await listarFornecedores();
      setFornecedoresList(response);

      if (selectedFornecedor?.idFornecedor === fornecedorId) {
        handleClose();
      }
    } catch (error) {
      console.error("Erro ao inativar fornecedor:", error);
      notifyError("Não foi possível inativar o fornecedor.");
    }
  };

  return (
    <>
      <Container className="mt-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h2 className="fw-bold mb-1 text-dark">Fornecedores</h2>
            <p className="text-secondary">Gerencie seus fornecedores</p>
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
              placeholder="Buscar fornecedores..."
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
            Novo Fornecedor
          </Button>
        </div>

        <Card className="shadow-sm border-0 rounded-4">
          <Card.Body>
            <div>
              <div className="d-flex flex-row align-items-center">
                <img src={truck} className="me-1" />
                <h5 className="fw-semibold text-dark mb-0">
                  Lista de Fornecedores
                </h5>
              </div>
              <p className="text-muted small">
                {paginatedFornecedor.length} fornecedore
                {paginatedFornecedor.length !== 1 && "s"} encontrado
                {paginatedFornecedor.length !== 1 && "s"}
              </p>
            </div>

            <Table responsive hover className="align-middle text-nowrap">
              <thead>
                <tr>
                  <th scope="col" className="small text-muted">
                    Fornecedor
                  </th>
                  <th scope="col" className="small text-muted">
                    CNPJ
                  </th>
                  <th scope="col" className="small text-muted">
                    Contato
                  </th>
                  <th scope="col" className="small text-muted">
                    Status
                  </th>
                  <th scope="col" className="small text-muted text-center">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedFornecedor.map((fornecedor, index) => (
                  <tr key={index} className="align-middle border-top">
                    <td>
                      <div className="fw-semibold text-dark">
                        {fornecedor.nome}
                      </div>
                      <div className="d-flex">
                        <img src={location} className="me-1" />
                        <p className="text-muted small mb-0">
                          {fornecedor.endereco}
                        </p>
                      </div>
                    </td>
                    <td className="small">{fornecedor.cnpj}</td>
                    <td className="small">
                      <div>
                        <div className="d-flex">
                          <img src={phone} className="me-1" />
                          <p className="text-muted small mb-0">
                            {fornecedor.telefone}
                          </p>
                        </div>
                        <div className="d-flex">
                          <img src={email} className="me-1" />
                          <p className="text-muted small mb-0">
                            {fornecedor.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>{statusFornecedor(fornecedor.statusFornecedor)}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          size="lg"
                          variant="light"
                          className="border"
                          onClick={() =>
                            handleEditFornecedor(fornecedor.idFornecedor)
                          }
                        >
                          <Pen size={16} />
                        </Button>
                        <Button
                          size="lg"
                          variant="light"
                          className="border"
                          onClick={() =>
                            handleInativarFornecedor(fornecedor.idFornecedor)
                          }
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
              {editMode ? "Editar Fornecedor" : "Novo Fornecedor"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <Form>
              <Row className="g-3 justify-content-center">
                <Col md={10}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">Nome</Form.Label>
                    <Form.Control
                      type="text"
                      className="shadow-sm"
                      value={selectedFornecedor?.nome || ""}
                      onChange={(e) =>
                        setSelectedFornecedor({
                          ...selectedFornecedor,
                          nome: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-1 g-3 justify-content-center">
                <Col md={5}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">CNPJ</Form.Label>
                    <Form.Control
                      type="text"
                      className="shadow-sm"
                      value={selectedFornecedor?.cnpj || ""}
                      onChange={(e) =>
                        setSelectedFornecedor({
                          ...selectedFornecedor,
                          cnpj: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">
                      Telefone
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="shadow-sm"
                      value={selectedFornecedor?.telefone || ""}
                      onChange={(e) =>
                        setSelectedFornecedor({
                          ...selectedFornecedor,
                          telefone: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-1 g-3 justify-content-center">
                <Col md={10}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">Email</Form.Label>
                    <Form.Control
                      type="text"
                      className="shadow-sm"
                      value={selectedFornecedor?.email || ""}
                      onChange={(e) =>
                        setSelectedFornecedor({
                          ...selectedFornecedor,
                          email: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-1 g-3 justify-content-center">
                <Col md={10}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">
                      Endereço
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="shadow-sm"
                      value={selectedFornecedor?.endereco || ""}
                      onChange={(e) =>
                        setSelectedFornecedor({
                          ...selectedFornecedor,
                          endereco: e.target.value,
                        })
                      }
                    />
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
              onClick={handleSaveFornecedor}
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
