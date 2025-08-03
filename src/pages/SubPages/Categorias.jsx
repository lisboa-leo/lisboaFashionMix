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
import "react-toastify/dist/ReactToastify.css";
import IconCategoria from "../../components/ui/icon-categorias-tag.svg";
import {
  alterarCategoria,
  buscarCategoriaPorId,
  cadastrarCategoria,
  deletarCategoria,
  listarCategorias,
} from "../../contexts/services/CategoriaService";
import { set } from "react-hook-form";
import { listarProdutos } from "../../contexts/services/ProdutoService";

export default function Categorias() {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const notifyInfo = (msg) => toast.info(msg);

  const [showModal, setShowModal] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [categoriaList, setCategoriaList] = useState([]);
  const [produtosList, setProdutosList] = useState([]);
  const itemsPerPage = 5;

  const filteredCategoria = categoriaList.filter((categoria) => {
    const termo = searchTerm.toLowerCase();
    return categoria.nome.toLowerCase().includes(termo);
  });

  useEffect(() => {
    async function carregarDados() {
      const categorias = await listarCategorias();
      const produtos = await listarProdutos();

      setCategoriaList(categorias);
      setProdutosList(produtos);
    }

    carregarDados();
  }, []);

  const handleShow = () => {
    setSelectedCategoria({
      nome: "",
    });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedCategoria(null);
  };

  const handleEditCategoria = async (categoriaId) => {
    try {
      const categoria = await buscarCategoriaPorId(categoriaId);

      setSelectedCategoria(categoria);

      setEditMode(true);

      setShowModal(true);
    } catch (error) {
      console.error("Erro ao buscar categoria:", error);
      notifyError("Não foi possível carregar os dados da categoria.");
    }
  };

  const handleSaveCategoria = async () => {
    try {
      if (editMode) {
        await alterarCategoria(
          selectedCategoria.idCategoria,
          selectedCategoria
        );
        notifySuccess("Categoria atualizada com sucesso!");
      } else {
        await cadastrarCategoria(selectedCategoria);
        notifySuccess("Categoria cadastrada com sucesso!");
      }

      const response = await listarCategorias();
      setCategoriaList(response);

      handleClose();
    } catch (error) {
      notifyError("Erro ao salvar categoria.");
    }
  };

  const handleInativarCategoria = async (categoriaId) => {
    try {
      await deletarCategoria(categoriaId);
      notifySuccess("Categoria inativada com sucesso!");

      const response = await listarCategorias();
      setCategoriaList(response);

      if (selectedCategoria?.idCategoria === categoriaId) {
        handleClose();
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        notifyInfo(
          "Não é possível inativar esta categoria, pois existem produtos vinculados."
        );
      } else {
        notifyError("Não foi possível inativar a categoria.");
      }
    }
  };

  const totalPages = Math.ceil(filteredCategoria.length / itemsPerPage);
  const paginatedCategoria = filteredCategoria.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Container className="mt-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h2 className="fw-bold mb-1 text-dark">Categorias</h2>
            <p className="text-secondary">
              Gerencie as categorias dos produtos
            </p>
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
              placeholder="Buscar categorias..."
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
            Nova Categoria
          </Button>
        </div>

        <Card className="shadow-sm border-0 rounded-4">
          <Card.Body>
            <div>
              <div className="d-flex flex-row align-items-center">
                <h5 className="fw-semibold text-dark mb-0">
                  <img src={IconCategoria} className="me-2" />
                  Lista de Categorias
                </h5>
              </div>
              <p className="text-muted small">
                {filteredCategoria.length} categoria
                {filteredCategoria.length !== 1 && "s"} encontrada
                {filteredCategoria.length !== 1 && "s"}
              </p>
            </div>

            <Table
              hover
              responsive
              className="align-middle w-100"
              style={{ tableLayout: "fixed" }}
            >
              <thead>
                <tr>
                  <th className="text-muted small" style={{ width: "100px" }}>
                    Categoria
                  </th>
                  <th
                    className="text-muted small text-start"
                    style={{ width: "100px" }}
                  >
                    Produtos
                  </th>
                  <th
                    className="text-muted small text-start"
                    style={{ width: "160px" }}
                  >
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedCategoria.map((categoria, index) => (
                  <tr key={index} className="border-top">
                    <td
                      className="fw-semibold ps-3 small"
                      style={{
                        width: "200px",
                      }}
                    >
                      {categoria.nome}
                    </td>
                    <td
                      className="text-muted text-start small"
                      style={{ width: "150px" }}
                    >
                      {(() => {
                        const total = produtosList.filter(
                          (prod) =>
                            prod.categoria?.idCategoria ===
                            categoria.idCategoria
                        ).length;
                        return total === 0
                          ? "0 produto"
                          : `${total} produto${total > 1 ? "s" : ""}`;
                      })()}
                    </td>

                    <td className="text-start" style={{ width: "150px" }}>
                      <div className="d-flex justify-content-start gap-2">
                        <Button
                          size="lg"
                          variant="light"
                          className="border"
                          onClick={() =>
                            handleEditCategoria(categoria.idCategoria)
                          }
                        >
                          <Pen size={16} />
                        </Button>
                        <Button
                          size="lg"
                          variant="light"
                          className="border"
                          onClick={() =>
                            handleInativarCategoria(categoria.idCategoria)
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

        <Modal show={showModal} onHide={handleClose} centered size="sm">
          <Modal.Header closeButton>
            <Modal.Title className="fw-semibold">
              {editMode ? "Editar Categoria" : "Nova Categoria"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <Form>
              <Row className="g-3 justify-content-center">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">
                      Nome da Categoria
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="shadow-sm"
                      value={selectedCategoria?.nome || ""}
                      onChange={(e) =>
                        setSelectedCategoria({
                          ...selectedCategoria,
                          nome: e.target.value,
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
              onClick={handleSaveCategoria}
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
