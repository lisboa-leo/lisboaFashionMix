import { useEffect, useState } from "react";
import { Button, Form, Row, Col, Card, InputGroup } from "react-bootstrap";
import { salvarVenda } from "../contexts/services/VendasService";
import {
  Search,
  Minus,
  Plus,
  Trash2,
  CreditCard,
  Banknote,
  Smartphone,
} from "lucide-react";
import { listarProdutos } from "../contexts/services/ProdutoService";
import InputMask from "react-input-mask";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { NumericFormat } from "react-number-format";
import { buscarClientePorCpfCnpj } from "../contexts/services/ClienteService";

export default function Vendas() {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const notifyInfo = (msg) => toast.info(msg);

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  const [codigo, setCodigo] = useState("");
  const [cpfNaNota, setCpfNaNota] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [cart, setCart] = useState([]);
  const [multiPagamentos, setMultiPagamentos] = useState(false);
  const [pagamentos, setPagamentos] = useState([]);
  const [novoPagamento, setNovoPagamento] = useState({
    tipoPagamento: "cash",
    valor: 0,
  });

  const [cpf, setCpf] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [pagamentoMultiplo, setPagamentoMultiplo] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.qtd * item.preco, 0);

  const paymentIcons = { cash: Banknote, card: CreditCard, pix: Smartphone };

  const paymentLabels = { cash: "Dinheiro", card: "Cartão", pix: "PIX" };

  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    const buscarCliente = async () => {
      const somenteNumeros = cpfCnpj.replace(/\D/g, "");

      if (!somenteNumeros || somenteNumeros.trim() === "") {
        setClienteSelecionado(null);
        return;
      }

      try {
        const cliente = await buscarClientePorCpfCnpj(somenteNumeros);
        setClienteSelecionado(cliente);
      } catch (error) {
        setClienteSelecionado(null);
        notifyError("Cliente não encontrado.");
      }
    };

    if (cpfNaNota) {
      buscarCliente();
    } else {
      setClienteSelecionado(null);
    }
  }, [cpfCnpj, cpfNaNota]);

  const handleCpfCnpjChange = (e) => {
    const valor = e.target.value;

    if (/[.\-\/]/.test(valor)) {
      notifyError("Não use pontos, traços ou barras. Digite apenas números.");
      return;
    }

    setCpfCnpj(valor);
  };

  const carregarProdutos = async () => {
    try {
      const data = await listarProdutos();
      console.log("Produtos recebidos:", data);
      setProdutos(data);
    } catch (err) {
      console.error("Erro ao buscar produtos", err);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const buscarSugestoes = (valor) => {
    setCodigo(valor);
    const filtrados = produtos.filter((prod) => {
      const nome = prod.nome ? prod.nome.toLowerCase() : "";
      const codigo = prod.codigoInterno ? prod.codigoInterno.toLowerCase() : "";
      return (
        nome.includes(valor.toLowerCase()) ||
        codigo.includes(valor.toLowerCase())
      );
    });
    setSugestoes(filtrados);
  };

  const buscarProduto = (codigoDigitado) =>
    produtos.find((p) => p.codigoInterno === codigoDigitado);

  const adicionarProduto = (e) => {
    e.preventDefault();
    const codigoTrim = codigo.trim();
    if (!codigoTrim) return;

    const produto = buscarProduto(codigoTrim);

    if (!produto) {
      notifyInfo("Produto não encontrado.");
      setCodigo("");
      return;
    }

    const quantidadeEstoque = produto.estoque?.quantidade ?? 0;
    console.log("Quantidade " + quantidadeEstoque);

    if (quantidadeEstoque <= 0) {
      notifyInfo("Produto sem estoque disponível.");
      setCodigo("");
      return;
    }

    const existente = cart.find((item) => item.idProduto === produto.idProduto);

    if (existente) {
      if (existente.qtd + 1 > quantidadeEstoque) {
        notifyInfo("Quantidade solicitada maior que o estoque disponível.");
        setCodigo("");
        return;
      }
      setCart(
        cart.map((item) =>
          item.idProduto === produto.idProduto
            ? { ...item, qtd: item.qtd + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...produto, qtd: 1 }]);
    }

    setCodigo("");
  };

  const removerProduto = (idProduto) => {
    setCart(cart.filter((item) => item.idProduto !== idProduto));
  };

  const alterarQuantidade = (idProduto, novaQtd) => {
    if (novaQtd <= 0) {
      removerProduto(idProduto);
      return;
    }

    const produto = produtos.find((p) => p.idProduto === idProduto);
    if (!produto) {
      notifyError("Produto não encontrado no estoque.");
      return;
    }

    const quantidadeEstoque = produto.estoque?.quantidade ?? 0;

    if (novaQtd > quantidadeEstoque) {
      notifyInfo(
        `Quantidade solicitada (${novaQtd}) maior que o estoque disponível (${quantidadeEstoque}).`
      );
      return;
    }

    setCart(
      cart.map((item) =>
        item.idProduto === idProduto ? { ...item, qtd: novaQtd } : item
      )
    );
  };

  const finalizarVenda = async () => {
    for (const item of cart) {
      const produtoEstoque =
        produtos.find((p) => p.idProduto === item.idProduto)?.estoque
          ?.quantidade ?? 0;
      if (item.qtd > produtoEstoque) {
        notifyError(
          `Produto "${item.nome}" com quantidade (${item.qtd}) maior que o estoque disponível (${produtoEstoque}).`
        );
        return;
      }
    }

    try {
      let pagamentosFinal = [];

      if (!pagamentoMultiplo) {
        pagamentosFinal = [
          {
            tipoPagamento:
              paymentMethod.toUpperCase() === "CASH"
                ? "DINHEIRO"
                : paymentMethod.toUpperCase() === "CARD"
                ? "CARTAO"
                : "PIX",
            valor: total,
          },
        ];
      } else {
        const totalPago = pagamentos.reduce((acc, p) => acc + p.valor, 0);
        if (totalPago < total) {
          notifyInfo("O valor total ainda não foi pago.");
          return;
        }
        pagamentosFinal = pagamentos.map((p) => ({
          tipoPagamento:
            p.tipoPagamento.toUpperCase() === "CASH"
              ? "DINHEIRO"
              : p.tipoPagamento.toUpperCase() === "CARD"
              ? "CARTAO"
              : "PIX",
          valor: p.valor,
        }));
      }

      const vendaDTO = {
        idUsuario: usuarioLogado?.idUsuario || 0,
        idCliente:
          cpfNaNota && clienteSelecionado ? clienteSelecionado.idCliente : null,
        itens: cart.map((item) => ({
          idProduto: item.idProduto,
          quantidade: item.qtd,
          precoUnitario: item.preco,
        })),
        pagamentos: pagamentosFinal,
      };

      await salvarVenda(vendaDTO);

      notifySuccess("Venda finalizada com sucesso!");
      setCart([]);
      setCpf("");
      setCpfNaNota(false);
      setPagamentos([]);
      setPagamentoMultiplo(false);
      setPaymentMethod("cash");
    } catch (error) {
      console.error(error);
      notifyError("Erro ao finalizar a venda.");
    }
    carregarProdutos();
  };

  return (
    <Row className="g-4 p-4">
      <Col md={8}>
        <Card className="shadow-sm border-0 rounded-4 p-3 bg-white mb-4">
          <Card.Body>
            <h5 className="mb-4 fw-bold d-flex align-items-center text-dark">
              <Search className="me-2" />
              Buscar Produtos
            </h5>

            <Form onSubmit={adicionarProduto}>
              <InputGroup
                onFocusCapture={() => setIsFocused(true)}
                onBlurCapture={() => setIsFocused(false)}
                className={`mb-3 shadow-sm grupo-busca rounded input-group shadow-sm ${
                  isFocused ? "border border-primary" : ""
                }`}
              >
                <Form.Control
                  placeholder="Digite o código ou nome do produto..."
                  value={codigo}
                  onChange={(e) => buscarSugestoes(e.target.value)}
                  list="listaProdutos"
                  className=" shadow-none"
                />
                <datalist id="listaProdutos">
                  {sugestoes.map((prod) => (
                    <option key={prod.id} value={prod.codigoInterno}>
                      {prod.nome} - {prod.codigoInterno}
                    </option>
                  ))}
                </datalist>
              </InputGroup>
            </Form>

            <div className="bg-light p-3 rounded-3">
              <Form.Check
                type="switch"
                id="cpf-na-nota"
                label="CPF na Nota?"
                checked={cpfNaNota}
                onChange={() => setCpfNaNota(!cpfNaNota)}
                className="fw-semibold"
              />
              {cpfNaNota && (
                <>
                  <Form.Control
                    required
                    type="text"
                    placeholder="CPF ou CNPJ"
                    value={cpfCnpj}
                    className="mt-2 w-50"
                    onChange={handleCpfCnpjChange}
                  />
                  {cpfCnpj && !clienteSelecionado && (
                    <small className="text-danger">
                      Cliente não encontrado para este CPF/CNPJ.
                    </small>
                  )}
                </>
              )}
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="shadow-sm border-0 rounded-4 p-2 bg-white">
          <Card.Body>
            <h5 className="mb-3 fw-bold d-flex align-items-center text-dark">
              <i className="bi bi-cart3 me-2 fs-5" />
              Carrinho{" "}
              <span className="text-muted ms-1">({cart.length} itens)</span>
            </h5>

            {cart.length === 0 ? (
              <div className="p-2 border rounded text-muted text-center mb-4">
                Nenhum item no carrinho.
              </div>
            ) : (
              <div
                className="mb-3"
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {cart.map((item) => (
                  <div
                    key={item.idProduto}
                    className="border rounded-3 p-2 d-flex justify-content-between align-items-center mb-2"
                  >
                    <div>
                      <div className="fw-semibold">{item.nome}</div>
                      <div className="d-flex align-items-center mt-3">
                        <Button
                          size="sm"
                          variant="light"
                          onClick={() =>
                            alterarQuantidade(item.idProduto, item.qtd - 1)
                          }
                          className="border me-2"
                        >
                          <Minus size={12} />
                        </Button>
                        <span>{item.qtd}</span>
                        <Button
                          size="sm"
                          variant="light"
                          onClick={() =>
                            alterarQuantidade(item.idProduto, item.qtd + 1)
                          }
                          className="border ms-2"
                          disabled={item.qtd >= (item.estoque?.quantidade ?? 0)} // <-- aqui
                          style={
                            item.qtd >= (item.estoque?.quantidade ?? 0)
                              ? { cursor: "not-allowed", opacity: 0.5 }
                              : {}
                          }
                        >
                          <Plus size={12} />
                        </Button>
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold">
                        R$ {(item.qtd * item.preco).toFixed(2)}
                      </div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="mt-3"
                        onClick={() => removerProduto(item.idProduto)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <hr />

            <div className="mb-4">
              <h6 className="fw-bold mb-3 text-dark d-flex align-items-center">
                <i className="bi bi-wallet2 me-2"></i> Pagamento
              </h6>

              <Col md={12} className="mb-3">
                <Form.Check
                  type="switch"
                  id="pagamentoMultiploSwitch"
                  label="Pagamento com mais de uma forma?"
                  checked={pagamentoMultiplo}
                  onChange={() => setPagamentoMultiplo(!pagamentoMultiplo)}
                />
              </Col>

              {pagamentoMultiplo ? (
                <>
                  <div className="d-flex gap-2 align-items-center mb-3">
                    <Form.Select
                      className="w-25"
                      value={novoPagamento.tipoPagamento}
                      onChange={(e) =>
                        setNovoPagamento({
                          ...novoPagamento,
                          tipoPagamento: e.target.value,
                        })
                      }
                    >
                      <option value="cash">Dinheiro</option>
                      <option value="card">Cartão</option>
                      <option value="pix">PIX</option>
                    </Form.Select>

                    <NumericFormat
                      className="form-control w-25"
                      value={novoPagamento.valor}
                      placeholder="Valor"
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={2}
                      fixedDecimalScale
                      allowNegative={false}
                      onValueChange={(values) => {
                        const { floatValue } = values;
                        setNovoPagamento({
                          ...novoPagamento,
                          valor: floatValue ?? 0,
                        });
                      }}
                    />

                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        const totalPago = pagamentos.reduce(
                          (acc, p) => acc + p.valor,
                          0
                        );
                        const valorRestante = total - totalPago;

                        if (!novoPagamento.valor || novoPagamento.valor <= 0) {
                          notifyInfo("Digite um valor válido.");
                          return;
                        }

                        if (novoPagamento.valor > valorRestante) {
                          notifyInfo(
                            "Valor informado excede o valor restante."
                          );
                          return;
                        }

                        const existe = pagamentos.find(
                          (p) => p.tipoPagamento === novoPagamento.tipoPagamento
                        );
                        let novoArray = [];

                        if (existe) {
                          novoArray = pagamentos.map((p) =>
                            p.tipoPagamento === novoPagamento.tipoPagamento
                              ? { ...p, valor: p.valor + novoPagamento.valor }
                              : p
                          );
                        } else {
                          novoArray = [...pagamentos, { ...novoPagamento }];
                        }

                        setPagamentos(novoArray);
                        setNovoPagamento({ tipoPagamento: "cash", valor: 0 });
                      }}
                    >
                      <Plus size={18} className="me-1" /> Adicionar
                    </Button>
                  </div>

                  {pagamentos.length > 0 && (
                    <>
                      <Card className="border-light shadow-sm mb-3">
                        <Card.Body className="p-2">
                          {pagamentos.map((p, i) => {
                            const Icon = paymentIcons[p.tipoPagamento];
                            return (
                              <div
                                key={i}
                                className="d-flex justify-content-between align-items-center border-bottom py-2"
                              >
                                <div className="d-flex align-items-center gap-2">
                                  <Icon size={18} />
                                  <span>
                                    {paymentLabels[p.tipoPagamento]} –{" "}
                                    <strong>R$ {p.valor.toFixed(2)}</strong>
                                  </span>
                                </div>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => {
                                    setPagamentos(
                                      pagamentos.filter((_, idx) => idx !== i)
                                    );
                                    setMultiPagamentos(
                                      pagamentos.length - 1 > 1
                                    );
                                  }}
                                >
                                  Remover
                                </Button>
                              </div>
                            );
                          })}
                        </Card.Body>
                      </Card>

                      <div className="fw-semibold text-dark">
                        <div>
                          Total Pago:{" "}
                          <span className="text-success">
                            R$
                            {pagamentos
                              .reduce((acc, p) => acc + p.valor, 0)
                              .toFixed(2)}
                          </span>
                        </div>
                        <div>
                          Falta Pagar:{" "}
                          <span className="text-danger">
                            R$
                            {Math.max(
                              0,
                              total -
                                pagamentos.reduce((acc, p) => acc + p.valor, 0)
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-between gap-2 mb-3">
                    {["cash", "card", "pix"].map((method) => {
                      const Icon = paymentIcons[method];
                      return (
                        <button
                          key={method}
                          onClick={() => setPaymentMethod(method)}
                          type="button"
                          className={`flex-grow-1 text-center py-3 rounded-3 border ${
                            paymentMethod === method
                              ? "bg-selected-payment text-white border-dark"
                              : "bg-white text-dark border-secondary-subtle"
                          }`}
                          style={{
                            transition: "all 0.2s ease-in-out",
                            fontSize: "0.9rem",
                          }}
                        >
                          <div className="mb-1 d-flex justify-content-center">
                            <Icon className="fs-5" />
                          </div>
                          <span className="fw-semibold">
                            {paymentLabels[method]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <div className="bg-light p-3 rounded-3 text-center mb-4">
              <h6 className="mb-1 fw-semibold text-dark">Total:</h6>
              <h4 className="text-success fw-bold">R$ {total.toFixed(2)}</h4>
            </div>

            <div className="d-grid gap-2">
              <Button
                variant="success"
                size="lg"
                disabled={cart.length === 0}
                onClick={finalizarVenda}
              >
                Finalizar Venda
              </Button>
              <Button
                variant="outline-danger"
                size="lg"
                onClick={() => setCart([])}
                disabled={cart.length === 0}
              >
                Cancelar Venda
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
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
    </Row>
  );
}
