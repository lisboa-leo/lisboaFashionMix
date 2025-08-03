import { Users2Icon } from "lucide-react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import iconProdutos from "../components/ui/icon-box-produtos.svg";
import iconVendas from "../components/ui/icon-relatorios-vendas.svg";
import iconFaturamento from "../components/ui/icon-relatorios-real.svg";

import iconDanger from "../components/ui/icon-relatorios-estoque.svg";

export default function Dashboard() {
  return (
    <>
      <Container className="mt-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h2 className="fw-bold mb-1 text-dark">Relatórios</h2>
            <p className="text-secondary">Análises e indicadores do negócio</p>
          </div>
        </div>

        <Card.Body>
          <Row className="g-3 mb-4">
            <Col md={6} lg={3}>
              <Card className="shadow-sm rounded-3">
                <Card.Body className="d-flex align-items-start justify-content-between">
                  <div>
                    <h6 className="text-dark fw-semibold small">Total de Produtos</h6>
                    <h4 className="mb-0 text-dark fw-semibold">247</h4>
                    <p
                      className="mb-0 text-dark fw-normal"
                      style={{ fontSize: "12px" }}
                    >
                      +20% em relação ao mês ontem
                    </p>
                  </div>
                  <div className="d-flex align-items-start">
                    <img src={iconProdutos} style={{width:"18px"}}/>
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
                    <h4 className="mb-0 text-dark fw-semibold">89</h4>
                    <p
                      className="mb-0 text-dark fw-normal"
                      style={{ fontSize: "12px" }}
                    >
                      +5% em relação ao mês anterior
                    </p>
                  </div>
                  <div className="d-flex align-items-start">
                    <Users2Icon size={18}/>
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
                    <h4 className="mb-0 text-dark fw-semibold">156</h4>
                    <p
                      className="mb-0 text-dark fw-normal"
                      style={{ fontSize: "12px" }}
                    >
                      +23% em relação ao mês anterior
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
                    <h6 className="text-dark fw-semibold small">
                      Faturamento
                    </h6>
                    <h4 className="mb-0 text-dark fw-semibold">R$ 45.280,50</h4>
                    <p
                      className="mb-0 text-dark fw-normal"
                      style={{ fontSize: "12px" }}
                    >
                      +18% em relação ao mês anterior
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
                      12 produtos precisam de reposição
                    </p>
                  </div>

                  <div
                    style={{
                      maxHeight: "350px",
                      overflowY: "auto",
                    }}
                  >
                    <div
                      className="d-flex flex-row justify-content-between align-items-center p-3 alert alert-warning"
                      style={{ backgroundColor: "#fff3cdcc" }}
                    >
                      <div>
                        <h6 className="text-dark fw-semibold small">
                          Filtro de Oleo Honda CB500F
                        </h6>
                        <p className="mb-0 text-muted small">
                          Minino: <span>10 unidades</span>
                        </p>
                      </div>
                      <div>
                        <Badge
                          bg="widht"
                          pill
                          className="px-2 text-warning fw-normal border rounded border-warning"
                        >
                          1 restantes
                        </Badge>
                      </div>
                    </div>
                    <div
                      className="d-flex flex-row justify-content-between align-items-center p-3 alert alert-warning"
                      style={{ backgroundColor: "#fff3cdcc" }}
                    >
                      <div>
                        <h6 className="text-dark fw-semibold small">
                          Filtro de Oleo Honda CB500F
                        </h6>
                        <p className="mb-0 text-muted small">
                          Minino: <span>22 unidades</span>
                        </p>
                      </div>
                      <div>
                        <Badge
                          bg="widht"
                          pill
                          className="px-2 text-warning fw-normal border rounded border-warning"
                        >
                          3 restantes
                        </Badge>
                      </div>
                    </div>
                    <div
                      className="d-flex flex-row justify-content-between align-items-center p-3 alert alert-warning"
                      style={{ backgroundColor: "#fff3cdcc" }}
                    >
                      <div>
                        <h6 className="text-dark fw-semibold small">
                          Filtro de Oleo Honda CB500F
                        </h6>
                        <p className="mb-0 text-muted small">
                          Minino: <span>15 unidades</span>
                        </p>
                      </div>
                      <div>
                        <Badge
                          bg="widht"
                          pill
                          className="px-2 text-warning fw-normal border rounded border-warning"
                        >
                          7 restantes
                        </Badge>
                      </div>
                    </div>
                    <div
                      className="d-flex flex-row justify-content-between align-items-center p-3 alert alert-warning"
                      style={{ backgroundColor: "#fff3cdcc" }}
                    >
                      <div>
                        <h6 className="text-dark fw-semibold small">
                          Filtro de Oleo Honda CB500F
                        </h6>
                        <p className="mb-0 text-muted small">
                          Minino: <span>10 unidades</span>
                        </p>
                      </div>
                      <div>
                        <Badge
                          bg="widht"
                          pill
                          className="px-2 text-warning fw-normal border rounded border-warning"
                        >
                          1 restantes
                        </Badge>
                      </div>
                    </div>
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
