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
import { ToastContainer, toast } from "react-toastify";
import InputMask from "react-input-mask";
import "react-toastify/dist/ReactToastify.css";
import {
  listarClientes,
  buscarClientePorId,
  cadastrarCliente,
  editarCliente,
  deletarCliente,
} from "../contexts/services/ClienteService";
import { listarVendas } from "../contexts/services/VendasService";

export default function Cliente() {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const [clientes, setClientes] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const validarCpfCnpj = (valor) => {
    const somenteNumeros = valor.replace(/\D/g, "");
    if (!/^\d+$/.test(somenteNumeros)) {
      return {
        valido: false,
        mensagem: "CPF/CNPJ deve conter somente números.",
      };
    }
    if (somenteNumeros.length !== 11 && somenteNumeros.length !== 14) {
      return {
        valido: false,
        mensagem: "CPF deve ter 11 dígitos e CNPJ 14 dígitos, sem símbolos.",
      };
    }
    return { valido: true };
  };

  const itemsPerPage = 5;

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedCliente(null);
  };

  const handleShow = () => {
    setSelectedCliente({
      nome: "",
      cpfCnpj: "",
      email: "",
      telefone: "",
    });
    setShowModal(true);
  };

  const loadClientes = async () => {
    const response = await listarClientes();
    setClientes(response);
  };

  const loadVendas = async () => {
    try {
      const response = await listarVendas();
      setVendas(response);
    } catch (err) {
      notifyError("Erro ao carregar vendas.");
    }
  };

  useEffect(() => {
    loadClientes();
    loadVendas();
  }, []);

  const filteredClientes = clientes.filter((c) => {
    const termo = searchTerm.toLowerCase();
    return (
      c.nome?.toLowerCase().includes(termo) ||
      c.email?.toLowerCase().includes(termo) ||
      c.cpfCnpj?.toLowerCase().includes(termo)
    );
  });

  const totalPages = Math.ceil(filteredClientes.length / itemsPerPage);
  const paginatedClientes = filteredClientes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleEdit = async (id) => {
    try {
      const cliente = await buscarClientePorId(id);
      setSelectedCliente(cliente);
      setEditMode(true);
      setShowModal(true);
    } catch (err) {
      notifyError("Erro ao buscar cliente.");
    }
  };

  const handleSave = async () => {
    const { valido, mensagem } = validarCpfCnpj(selectedCliente.cpfCnpj || "");
    if (!valido) {
      notifyError(mensagem);
      return;
    }

    try {
      if (editMode) {
        await editarCliente(selectedCliente.idCliente, selectedCliente);
        notifySuccess("Cliente atualizado com sucesso!");
      } else {
        await cadastrarCliente(selectedCliente);
        notifySuccess("Cliente cadastrado com sucesso!");
      }
      await loadClientes();
      handleClose();
    } catch (err) {
      notifyError("Erro ao salvar cliente.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletarCliente(id);
      notifySuccess("Cliente deletado com sucesso!");
      await loadClientes();
    } catch (err) {
      notifyError("Erro ao deletar cliente.");
    }
  };

  const formatarCpfCnpj = (valor) => {
    if (!valor) return "";

    const apenasNumeros = valor.replace(/\D/g, "");

    if (apenasNumeros.length === 11) {
      return apenasNumeros.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4"
      );
    } else if (apenasNumeros.length === 14) {
      return apenasNumeros.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
    }

    return valor;
  };

  const tipoPessoa = (cpf_cnpj) =>
    cpf_cnpj.length == 14 ? (
      <Badge pill className="px-2 bg-transparent text-muted border rounded">
        Pessoa Juridica
      </Badge>
    ) : (
      <Badge pill className="px-2 bg-transparent text-muted border rounded">
        Pessoa Fisica
      </Badge>
    );

  return (
    <>
      <Container className="mt-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h2 className="fw-bold mb-1 text-dark">Clientes</h2>
            <p className="text-secondary">Gerencie os clientes do sistema</p>
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
            <Plus size={14} className="me-1" />
            Novo Cliente
          </Button>
        </div>

        <Card className="shadow-sm border-0 rounded-4">
          <Card.Body>
            <h5 className="fw-semibold text-dark mb-2">Lista de Clientes</h5>
            <p className="text-muted small">
              {paginatedClientes.length} cliente
              {paginatedClientes.length !== 1 && "s"} encontrado
              {paginatedClientes.length !== 1 && "s"}
            </p>

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
                    Valor Total Compras
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
                {paginatedClientes.map((cliente) => {
                  console.log("Cliente ID:", cliente.idCliente);

                  const comprasCliente = vendas.filter((venda) => {
                    const clienteVendaId = venda.cliente?.idCliente;
                    console.log(
                      "Venda cliente id:",
                      clienteVendaId,
                      " vs Cliente id:",
                      cliente.idCliente
                    );

                    return Number(clienteVendaId) === Number(cliente.idCliente);
                  });

                  console.log("Vendas desse cliente:", comprasCliente);

                  const totalCompras = comprasCliente.length;

                  const valorTotalCompras = comprasCliente.reduce(
                    (acc, venda) => acc + Number(venda.valorTotal || 0),
                    0
                  );

                  const ultimaCompra = comprasCliente.sort(
                    (a, b) => new Date(b.dataVenda) - new Date(a.dataVenda)
                  )[0];

                  return (
                    <tr key={cliente.idCliente}>
                      <td>{cliente.nome}</td>
                      <td className="small text-center">
                        <div className="fw-semibold text-dark">
                          {formatarCpfCnpj(cliente.cpfCnpj)}
                        </div>
                        <small>{tipoPessoa(cliente.cpfCnpj)}</small>
                      </td>
                      <td className="text-center">{cliente.telefone}</td>
                      <td className="text-center">
                        {valorTotalCompras.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                      <td className="text-center">{totalCompras}</td>
                      <td className="text-center">
                        {ultimaCompra
                          ? new Date(
                              ultimaCompra.dataVenda
                            ).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant="light"
                            className="border"
                            onClick={() => handleEdit(cliente.idCliente)}
                          >
                            <Pen size={16} />
                          </Button>
                          <Button
                            variant="light"
                            className="border"
                            onClick={() => handleDelete(cliente.idCliente)}
                          >
                            <Trash2Icon
                              size={16}
                              style={{ color: "#E22A1B" }}
                            />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
          <Modal.Body>
            <Form>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedCliente?.nome || ""}
                      onChange={(e) =>
                        setSelectedCliente({
                          ...selectedCliente,
                          nome: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={selectedCliente?.email || ""}
                      onChange={(e) =>
                        setSelectedCliente({
                          ...selectedCliente,
                          email: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="g-3 mt-1">
                <Col md={6}>
                  <Form.Label>CPF ou CNPJ</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedCliente?.cpfCnpj || ""}
                    onChange={(e) =>
                      setSelectedCliente({
                        ...selectedCliente,
                        cpfCnpj: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Telefone</Form.Label>
                    <InputMask
                      mask="(99) 9 9999-9999"
                      value={selectedCliente?.telefone || ""}
                      onChange={(e) =>
                        setSelectedCliente({
                          ...selectedCliente,
                          telefone: e.target.value,
                        })
                      }
                    >
                      {(inputProps) => (
                        <Form.Control type="text" {...inputProps} />
                      )}
                    </InputMask>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-selected-payment">
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
