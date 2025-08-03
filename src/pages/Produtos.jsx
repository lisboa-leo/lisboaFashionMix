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
import box from "../components/ui/icon-box-produtos.svg";
import danger from "../components/ui/icon-danger.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  buscarProdutoPorId,
  salvarProduto,
  atualizarProduto,
  listarProdutos,
  deletarProduto,
} from "../contexts/services/ProdutoService";

import { listarCategorias } from "../contexts/services/CategoriaService";
import { NumericFormat } from "react-number-format";

export default function Produtos() {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const notifyInfo = (msg) => toast.info(msg);

  const [showModal, setShowModal] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState(null);
  const [produtosList, setProdutosList] = useState([]);
  
  const [categoriasList, setCategoriasList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function carregarCategorias() {
      const response = await listarProdutos();
      const categorias = await listarCategorias();
      setCategoriasList(categorias);
      setProdutosList(response);
    }
    carregarCategorias();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedProduto(null);
  };

  const handleShow = () => {
    setSelectedProduto({
      nome: "",
      descricao: "",
      codigoInterno: "",
      categoria: null,
      preco: 0,
      estoque: { quantidade: 0, estoqueMinimo: 0 },
    });
    setShowModal(true);
  };

  const statusEstoque = (estoque, minimo) =>
    estoque < minimo ? (
      <Badge bg="danger" pill className="px-2">
        <img src={danger} style={{ width: "16px" }} className="me-1" />
        Baixo
      </Badge>
    ) : (
      <Badge bg="success" pill className="px-2">
        OK
      </Badge>
    );

  const filteredProdutos = produtosList.filter((prod) => {
    const termo = searchTerm.toLowerCase();
    return (
      prod.nome.toLowerCase().includes(termo) ||
      prod.codigoInterno.toLowerCase().includes(termo) ||
      (prod.categoria?.nome.toLowerCase() || "").includes(termo)
    );
  });

  const totalPages = Math.ceil(filteredProdutos.length / itemsPerPage);
  const paginatedProdutos = filteredProdutos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEditProduct = async (produtoId) => {
    try {
      const produto = await buscarProdutoPorId(produtoId);
      setSelectedProduto(produto);
      setEditMode(true);
      setShowModal(true);
    } catch (error) {
      notifyError("Erro ao carregar dados do produto.");
    }
  };

  const handleSaveProduct = async () => {
    try {
      if (editMode) {
        const quantidade = selectedProduto.estoque?.quantidade ?? 0;
        const minimo = selectedProduto.estoque?.estoqueMinimo ?? 0;

        const { estoque, estoqueMinimo, ...produtoSemEstoque } =
          selectedProduto;

        await atualizarProduto(
          selectedProduto.idProduto,
          produtoSemEstoque,
          quantidade,
          minimo
        );

        notifySuccess("Produto atualizado com sucesso!");
      } else {
        const quantidade = selectedProduto.estoque?.quantidade ?? 0;
        const minimo = selectedProduto.estoque?.estoqueMinimo ?? 0;

        const { estoque, estoqueMinimo, ...produtoSemEstoque } =
          selectedProduto;

        await salvarProduto(produtoSemEstoque, quantidade, minimo);

        notifySuccess("Produto cadastrado com sucesso!");
      }

      const response = await listarProdutos();
      setProdutosList(response);

      handleClose();
    } catch (error) {
      notifyError("Erro ao salvar produto.");
    }
  };

  const handleInativarProduct = async (produtoId) => {
    try {
      await deletarProduto(produtoId);
      notifySuccess("Produto inativado com sucesso!");

      const response = await listarProdutos();
      setProdutosList(response);

      if (selectedProduto?.id === produtoId) {
        handleClose();
      }
    } catch (error) {
      notifyError("Não foi possível inativar o produto.");
    }
  };

  return (
    <>
      <Container className="mt-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h2 className="fw-bold mb-1 text-dark">Produtos</h2>
            <p className="text-secondary">Gerencie o catálogo de produtos</p>
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
              placeholder="Buscar produtos..."
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
            Novo Produto
          </Button>
        </div>

        <Card className="shadow-sm border-0 rounded-4">
          <Card.Body>
            <div>
              <div className="d-flex flex-row align-items-center">
                <img src={box} className="me-2" />
                <h5 className="fw-semibold text-dark mb-0">
                  Lista de Produtos
                </h5>
              </div>
              <p className="text-muted small">
                {filteredProdutos.length} produto
                {filteredProdutos.length !== 1 && "s"} encontrado
                {filteredProdutos.length !== 1 && "s"}
              </p>
            </div>

            <Table responsive hover className="align-middle text-nowrap">
              <thead>
                <tr>
                  <th className="small text-muted">Produto</th>
                  <th className="small text-muted">Código</th>
                  <th className="small text-muted">Categoria</th>
                  <th className="small text-muted">Preço</th>
                  <th className="small text-muted">Estoque</th>
                  <th className="small text-muted">Status</th>
                  <th className="small text-muted text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProdutos.map((prod, index) => (
                  <tr key={prod.idProduto} className="align-middle border-top">
                    <td>
                      <div className="fw-semibold text-dark">{prod.nome}</div>
                      <small className="text-muted">{prod.descricao}</small>
                    </td>
                    <td className="small">{prod.codigoInterno}</td>
                    <td className="small">{prod.categoria?.nome || ""}</td>
                    <td className="fw-semibold small">
                      R${" "}
                      {prod.preco.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>

                    <td className="small">
                      {prod.estoque.quantidade} un.
                      <br />
                      <small className="text-muted">
                        Mín: {prod.estoque.estoqueMinimo}
                      </small>
                    </td>
                    <td>
                      {statusEstoque(
                        prod.estoque.quantidade,
                        prod.estoque.estoqueMinimo
                      )}
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          size="lg"
                          variant="light"
                          className="border"
                          onClick={() => handleEditProduct(prod.idProduto)}
                        >
                          <Pen size={16} />
                        </Button>
                        <Button
                          size="lg"
                          variant="light"
                          className="border"
                          onClick={() => handleInativarProduct(prod.idProduto)}
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
              {editMode ? "Editar Produto" : "Novo Produto"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <Form>
              <Row className="g-3 justify-content-center">
                <Col md={5}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">Nome</Form.Label>
                    <Form.Control
                      type="text"
                      className="shadow-sm"
                      value={selectedProduto?.nome || ""}
                      onChange={(e) =>
                        setSelectedProduto({
                          ...selectedProduto,
                          nome: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">
                      Código
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="shadow-sm"
                      value={selectedProduto?.codigoInterno || ""}
                      onChange={(e) =>
                        setSelectedProduto({
                          ...selectedProduto,
                          codigoInterno: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">
                      Categoria
                    </Form.Label>
                    <Form.Select
                      value={selectedProduto?.categoria?.idCategoria || ""}
                      onChange={(e) => {
                        const categoriaSelecionada = categoriasList.find(
                          (cat) => cat.idCategoria === parseInt(e.target.value)
                        );

                        setSelectedProduto({
                          ...selectedProduto,
                          categoria: categoriaSelecionada || null,
                        });
                      }}
                    >
                      <option value="">Selecione a categoria</option>
                      {categoriasList.map((cat) => (
                        <option key={cat.idCategoria} value={cat.idCategoria}>
                          {cat.nome}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">Preço</Form.Label>
                    <NumericFormat
                      className="form-control shadow-sm"
                      value={selectedProduto?.preco ?? ""}
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={2}
                      fixedDecimalScale
                      allowNegative={false}
                      onValueChange={(values) => {
                        const { floatValue } = values;
                        setSelectedProduto({
                          ...selectedProduto,
                          preco: floatValue ?? 0,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">
                      Estoque
                    </Form.Label>
                    <Form.Control
                      type="number"
                      className="shadow-sm"
                      value={selectedProduto?.estoque?.quantidade || ""}
                      onChange={(e) =>
                        setSelectedProduto({
                          ...selectedProduto,
                          estoque: {
                            ...selectedProduto.estoque,
                            quantidade: parseInt(e.target.value),
                          },
                        })
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">
                      Estoque Mínimo
                    </Form.Label>
                    <Form.Control
                      type="number"
                      className="shadow-sm"
                      value={selectedProduto?.estoque?.estoqueMinimo || ""}
                      onChange={(e) =>
                        setSelectedProduto({
                          ...selectedProduto,
                          estoque: {
                            ...selectedProduto.estoque,
                            estoqueMinimo: parseInt(e.target.value),
                          },
                        })
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={10}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">
                      Descrição
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      className="shadow-sm"
                      value={selectedProduto?.descricao || ""}
                      onChange={(e) =>
                        setSelectedProduto({
                          ...selectedProduto,
                          descricao: e.target.value,
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
              onClick={handleSaveProduct}
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
