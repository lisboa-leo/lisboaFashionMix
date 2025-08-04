import { Users2Icon } from "lucide-react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import iconProdutos from "../components/ui/icon-box-produtos.svg";
import iconVendas from "../components/ui/icon-relatorios-vendas.svg";
import iconFaturamento from "../components/ui/icon-relatorios-real.svg";

import iconDanger from "../components/ui/icon-relatorios-estoque.svg";
import { listarProdutos } from "../contexts/services/ProdutoService";
import { useEffect, useState } from "react";
import { listarClientes } from "../contexts/services/ClienteService";
import { listarVendas } from "../contexts/services/VendasService";

export default function Dashboard() {
  const [produtos, setProdutos] = useState([]);
  const [crescimentoProdutos, setCrescimentoProdutos] = useState(null);

  const [clientes, setClientes] = useState([]);
  const [crescimentoClientes, setCrescimentoClientes] = useState(null);

  const [vendas, setVendas] = useState([]);
  const [crescimentoVendas, setCrescimentoVendas] = useState(null);

  const [faturamento, setFaturamento] = useState(0);
  const [crescimentoFaturamento, setCrescimentoFaturamento] = useState(null);

  const [produtosComEstoqueBaixo, setProdutosComEstoqueBaixo] = useState([]);

  useEffect(() => {
    const agora = new Date();
    const mesAtual = agora.getMonth();
    const anoAtual = agora.getFullYear();

    const carregarProdutos = async () => {
      try {
        const resposta = await listarProdutos();
        setProdutos(resposta);

        const atual = resposta.filter((p) => ehMesAtual(p.dataCadastro)).length;
        const anterior = resposta.filter((p) =>
          ehMesAnterior(p.dataCadastro)
        ).length;

        let crescimento = 0;
        if (anterior === 0 && atual > 0) crescimento = 100;
        else if (anterior === 0 && atual === 0) crescimento = 0;
        else crescimento = ((atual - anterior) / anterior) * 100;

        setCrescimentoProdutos(Math.round(crescimento));

        const estoqueBaixo = resposta.filter(
          (p) =>
            p.estoque &&
            typeof p.estoque.quantidade === "number" &&
            typeof p.estoque.estoqueMinimo === "number" &&
            p.estoque.quantidade < p.estoque.estoqueMinimo
        );
        setProdutosComEstoqueBaixo(estoqueBaixo);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };

    const ehMesAnterior = (data) => {
      const d = new Date(data);
      const m = d.getMonth();
      const y = d.getFullYear();
      return (
        (m === mesAtual - 1 && y === anoAtual) ||
        (mesAtual === 0 && m === 11 && y === anoAtual - 1)
      );
    };

    const ehMesAtual = (data) => {
      const d = new Date(data);
      return d.getMonth() === mesAtual && d.getFullYear() === anoAtual;
    };

    const carregarClientes = async () => {
      try {
        const resposta = await listarClientes();
        setClientes(resposta);

        const atual = resposta.filter((c) => ehMesAtual(c.dataCriacao)).length;
        const anterior = resposta.filter((c) =>
          ehMesAnterior(c.dataCriacao)
        ).length;

        let crescimento = 0;
        if (anterior === 0 && atual > 0) crescimento = 100;
        else if (anterior === 0 && atual === 0) crescimento = 0;
        else crescimento = ((atual - anterior) / anterior) * 100;

        setCrescimentoClientes(Math.round(crescimento));
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      }
    };

    const carregarVendas = async () => {
      try {
        const resposta = await listarVendas();
        setVendas(resposta);

        const vendasAtual = resposta.filter((v) => ehMesAtual(v.dataVenda));
        const vendasAnterior = resposta.filter((v) =>
          ehMesAnterior(v.dataVenda)
        );

        const totalAtual = vendasAtual.length;
        const totalAnterior = vendasAnterior.length;

        let crescimento = 0;
        if (totalAnterior === 0 && totalAtual > 0) crescimento = 100;
        else if (totalAnterior === 0 && totalAtual === 0) crescimento = 0;
        else crescimento = ((totalAtual - totalAnterior) / totalAnterior) * 100;

        setCrescimentoVendas(Math.round(crescimento));

        const faturamentoAtual = vendasAtual.reduce(
          (acc, v) => acc + v.valorTotal,
          0
        );
        const faturamentoAnterior = vendasAnterior.reduce(
          (acc, v) => acc + v.valorTotal,
          0
        );
        setFaturamento(faturamentoAtual);

        let crescimentoFat = 0;
        if (faturamentoAnterior === 0 && faturamentoAtual > 0)
          crescimentoFat = 100;
        else if (faturamentoAnterior === 0 && faturamentoAtual === 0)
          crescimentoFat = 0;
        else
          crescimentoFat =
            ((faturamentoAtual - faturamentoAnterior) / faturamentoAnterior) *
            100;

        setCrescimentoFaturamento(Math.round(crescimentoFat));
      } catch (error) {
        console.error("Erro ao carregar vendas:", error);
      }
    };

    carregarClientes();
    carregarVendas();
    carregarProdutos();
  }, []);

  return (
    <>
      <Container className="mt-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h2 className="fw-bold mb-1 text-dark">Dashboard</h2>
            <p className="text-secondary">Visao geral do sistema de gestao</p>
          </div>
        </div>

        <Card.Body>
          <Row className="g-3 mb-4">
            <Col md={6} lg={3}>
              <Card className="shadow-sm rounded-3">
                <Card.Body className="d-flex align-items-start justify-content-between">
                  <div>
                    <h6 className="text-dark fw-semibold small">
                      Total de Produtos
                    </h6>
                    <h4 className="mb-0 text-dark fw-semibold">
                      {produtos.length}
                    </h4>
                    <p
                      className="mb-0 text-dark fw-normal"
                      style={{ fontSize: "12px" }}
                    >
                      {crescimentoProdutos > 0 ? (
                        <>+{crescimentoProdutos}% em relação ao mês anterior</>
                      ) : crescimentoProdutos < 0 ? (
                        <>{crescimentoProdutos}% em relação ao mês anterior</>
                      ) : (
                        <>Sem variação</>
                      )}
                    </p>
                  </div>
                  <div className="d-flex align-items-start">
                    <img src={iconProdutos} style={{ width: "18px" }} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="shadow-sm rounded-3">
                <Card.Body className="d-flex align-items-start justify-content-between">
                  <div>
                    <h6 className="text-dark fw-semibold small">
                      Clientes Ativos
                    </h6>
                    <h4 className="mb-0 text-dark fw-semibold">
                      {clientes.length}
                    </h4>
                    <p
                      className="mb-0 text-dark fw-normal"
                      style={{ fontSize: "12px" }}
                    >
                      {crescimentoClientes > 0 ? (
                        <>+{crescimentoClientes}% em relação ao mês anterior</>
                      ) : crescimentoClientes < 0 ? (
                        <>{crescimentoClientes}% em relação ao mês anterior</>
                      ) : (
                        <>Sem variação</>
                      )}
                    </p>
                  </div>
                  <div className="d-flex align-items-start">
                    <Users2Icon size={18} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="shadow-sm rounded-3">
                <Card.Body className="d-flex align-items-start justify-content-between">
                  <div>
                    <h6 className="text-dark fw-semibold small">
                      Vendas do Mês
                    </h6>
                    <h4 className="mb-0 text-dark fw-semibold">
                      {vendas.length}
                    </h4>
                    <p
                      className="mb-0 text-dark fw-normal"
                      style={{ fontSize: "12px" }}
                    >
                      {crescimentoVendas > 0 ? (
                        <>+{crescimentoVendas}% em relação ao mês anterior</>
                      ) : crescimentoVendas < 0 ? (
                        <>{crescimentoVendas}% em relação ao mês anterior</>
                      ) : (
                        <>Sem variação</>
                      )}
                    </p>
                  </div>
                  <div className="d-flex align-items-start">
                    <img src={iconVendas} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="shadow-sm rounded-3">
                <Card.Body className="d-flex align-items-start justify-content-between">
                  <div>
                    <h6 className="text-dark fw-semibold small">Faturamento</h6>
                    <h4 className="mb-0 text-dark fw-semibold">
                      R${" "}
                      {faturamento.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </h4>
                    <p
                      className="mb-0 text-dark fw-normal"
                      style={{ fontSize: "12px" }}
                    >
                      {crescimentoFaturamento > 0 ? (
                        <>
                          +{crescimentoFaturamento}% em relação ao mês anterior
                        </>
                      ) : crescimentoFaturamento < 0 ? (
                        <>
                          {crescimentoFaturamento}% em relação ao mês anterior
                        </>
                      ) : (
                        <>Sem variação</>
                      )}
                    </p>
                  </div>
                  <div className="d-flex align-items-start">
                    <img src={iconFaturamento} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="shadow-sm border-0 rounded-4">
                <Card.Body>
                  <div>
                    <div className="d-flex flex-row align-items-center mb-2">
                      <img
                        src={iconVendas}
                        className="me-2"
                        style={{ width: "24px" }}
                      />
                      <h5 className="fw-semibold text-dark mb-0">
                        Vendas Recentes
                      </h5>
                    </div>
                    <p className="text-muted" style={{ fontSize: "12px" }}>
                      Últimas transacoes realizadas
                    </p>
                  </div>

                  <div
                    style={{
                      maxHeight: "350px",
                      overflowY: "auto",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center border rounded p-3 alert alert-light">
                      <div>
                        <h6 className="fw-semibold mb-2 text-dark">
                          Cupom venda: <span className="small">#0121</span>
                        </h6>
                        <p className="text-muted small mb-0">
                          14/01/2025 17:22:22
                        </p>
                      </div>
                      <div>
                        <h5 className="text-dark fw-semibold small mb-2">
                          R$ 2.500,00
                        </h5>
                        <div>
                          <Badge
                            bg="widht"
                            pill
                            className="px-2 text-success fw-normal border rounded border-success"
                          >
                            Finalizada
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center border rounded p-3 alert alert-light">
                      <div>
                        <h6 className="fw-semibold mb-2 text-dark">
                          Cupom venda: <span className="small">#0121</span>
                        </h6>
                        <p className="text-muted small mb-0">
                          14/01/2025 17:22:22
                        </p>
                      </div>
                      <div>
                        <h5 className="text-dark fw-semibold small mb-2">
                          R$ 2.500,00
                        </h5>
                        <div>
                          <Badge
                            bg="widht"
                            pill
                            className="px-2 text-success fw-normal border rounded border-success"
                          >
                            Finalizada
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center border rounded p-3 alert alert-light">
                      <div>
                        <h6 className="fw-semibold mb-2 text-dark">
                          Cupom venda: <span className="small">#0121</span>
                        </h6>
                        <p className="text-muted small mb-0">
                          14/01/2025 17:22:22
                        </p>
                      </div>
                      <div>
                        <h5 className="text-dark fw-semibold small mb-2">
                          R$ 2.500,00
                        </h5>
                        <div>
                          <Badge
                            bg="widht"
                            pill
                            className="px-2 text-success fw-normal border rounded border-success"
                          >
                            Finalizada
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center border rounded p-3 alert alert-light">
                      <div>
                        <h6 className="fw-semibold mb-2 text-dark">
                          Cupom venda: <span className="small">#0121</span>
                        </h6>
                        <p className="text-muted small mb-0">
                          14/01/2025 17:22:22
                        </p>
                      </div>
                      <div>
                        <h5 className="text-dark fw-semibold small mb-2">
                          R$ 2.500,00
                        </h5>
                        <div>
                          <Badge
                            bg="widht"
                            pill
                            className="px-2 text-success fw-normal border rounded border-success"
                          >
                            Finalizada
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="shadow-sm border-0 rounded-4">
                <Card.Body>
                  <div>
                    <div className="d-flex flex-row align-items-center mb-2">
                      <img src={iconDanger} className="me-2" />
                      <h5 className="fw-semibold text-dark mb-0">
                        Estoque Baixo
                      </h5>
                    </div>
                    <p className="text-muted" style={{ fontSize: "12px" }}>
                      {produtosComEstoqueBaixo.length} produtos precisam de
                      reposição
                    </p>
                  </div>

                  <div style={{ maxHeight: "350px", overflowY: "auto" }}>
                    {produtosComEstoqueBaixo.map((produto, index) => (
                      <div
                        key={index}
                        className="d-flex flex-row justify-content-between align-items-center p-3 alert alert-warning"
                        style={{ backgroundColor: "#fff3cdcc" }}
                      >
                        <div>
                          <h6 className="text-dark fw-semibold small">
                            {produto.nome}
                          </h6>
                          <p className="mb-0 text-muted small">
                            Mínimo:{" "}
                            <span>
                              {produto.estoque.estoqueMinimo} unidades
                            </span>
                          </p>
                        </div>
                        <div>
                          <Badge
                            bg="width"
                            pill
                            className="px-2 text-warning fw-normal border rounded border-warning"
                          >
                            {produto.estoque.quantidade} restantes
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Container>
    </>
  );
}
