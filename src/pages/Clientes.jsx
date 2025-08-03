import { useState } from "react";
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
import { Pen, Plus, Trash2Icon, Users2Icon } from "lucide-react";
import box from "../components/ui/icon-box-produtos.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Clientes() {
  const [showModal, setShowModal] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const itemsPerPage = 5;

  const clientes = [
    {
      id_cliente: 1,
      nome: "João Silva",
      cpf_cnpj: "123.456.789-00",
      telefone: "(11) 99999-9999",
      email: "joao@email.com",
    },
    {
      id_cliente: 2,
      nome: "Maria Santos",
      cpf_cnpj: "987.654.321-00",
      telefone: "(11) 88888-8888",
      email: "maria@email.com",
    },
  ];

  const tipoPessoa = (cpf_cnpj) =>
    cpf_cnpj.length !== 14 ? (
      <Badge pill className="px-2 bg-transparent text-muted border rounded">
        Pessoa Juridica
      </Badge>
    ) : (
      <Badge pill className="px-2 bg-transparent text-muted border rounded">
        Pessoa Fisica
      </Badge>
    );

  const filteredCliente = clientes.filter((cliente) => {
    const termo = searchTerm.toLowerCase();
    return (
      cliente.nome.toLowerCase().includes(termo) ||
      cliente.cpf_cnpj.toLowerCase().includes(termo) ||
      cliente.telefone.toLowerCase().includes(termo) ||
      cliente.email.toLowerCase().includes(termo)
    );
  });

  const totalPages = Math.ceil(filteredCliente.length / itemsPerPage);
  const paginatedCliente = filteredCliente.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedCliente(null);
  };
  const handleShow = () => setShowModal(true);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEditCliente = (produto) => {
    setSelectedCliente(produto);
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <>
      <Container className="mt-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h2 className="fw-bold mb-1 text-dark">Clientes</h2>
            <p className="text-secondary">Gerencie seus clientes</p>
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
              placeholder="Buscar clientes..."
              className="border-start-0 shadow-none bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button
            onClick={handleShow}
            className="shadow-sm px-3 py-2 bg-selected-payment d-flex align-items-center"
          >
            <Plus size={14} className="me-2" />
            Novo Cliente
          </Button>
        </div>

        <Card className="shadow-sm border-0 rounded-4">
          <Card.Body>
            <div>
              <div className="d-flex flex-row align-items-center">
                <Users2Icon size={24} className="me-2" />
                <h5 className="fw-semibold text-dark mb-0">
                  Lista de Clientes
                </h5>
              </div>
              <p className="text-muted small">
                {filteredCliente.length} cliente
                {filteredCliente.length !== 1 && "s"} encontrado
                {filteredCliente.length !== 1 && "s"}
              </p>
            </div>

            <Table responsive hover className="align-middle text-nowrap">
              <thead>
                <tr>
                  <th scope="col" className="small text-muted">
                    Cliente
                  </th>
                  <th scope="col" className="small text-center text-muted">
                    Documento
                  </th>
                  <th scope="col" className="small text-center text-muted">
                    Contato
                  </th>
                  <th scope="col" className="small text-center text-muted">
                    Total Compras
                  </th>
                  <th scope="col" className="small text-center text-muted">
                    Última Compra
                  </th>
                  <th scope="col" className="small text-center text-muted">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedCliente.map((cliente, index) => (
                  <tr key={index} className="align-middle border-top">
                    <td className="fw-semibold small">{cliente.nome}</td>
                    <td className="small text-center">
                      <div className="fw-semibold text-dark">
                        {cliente.cpf_cnpj}
                      </div>
                      <small>{tipoPessoa(cliente.cpf_cnpj)}</small>
                    </td>
                    <td className="small text-center">
                      <div className="fw-semibold text-dark">
                        {cliente.telefone}
                      </div>
                      <small>{cliente.email}</small>
                    </td>
                    <td className="small text-center">R$ 2.5698,00</td>
                    <td className="small text-center">14/01/2024</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          size="lg"
                          variant="light"
                          className="border"
                          onClick={() => handleEditCliente(cliente)}
                        >
                          <Pen size={16} />
                        </Button>
                        <Button size="lg" variant="light" className="border">
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
              {editMode ? "Editar Cliente" : "Novo Cliente"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <Form>
              <Row className="g-3 justify-content-center">
                <Col md={10}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">
                      Nome / Razão Social
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="shadow-sm"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-1 g-3 justify-content-center">
                <Col md={5}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">
                      CPF / CNPJ
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="shadow-sm"
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
            <Button className="px-4 bg-selected-payment">
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
