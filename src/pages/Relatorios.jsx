import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ButtonGroup,
  Button,
  Tab,
  Nav,
  Table,
  Badge,
} from "react-bootstrap";
import { Download, User2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { GraphUp, CashStack, Cart, BarChartSteps } from "react-bootstrap-icons";
import iconVendas from "../components/ui/icon-relatorios-vendas.svg";
import iconReal from "../components/ui/icon-relatorios-real.svg";
import iconTicket from "../components/ui/icon-relatorios-ticket.svg";
import iconBarChart from "../components/ui/icon-relatorios-barChart.svg";

import iconEstoqueDanger from "../components/ui/icon-relatorios-estoque.svg";

import iconBox from "../components/ui/icon-box-produtos.svg";

export default function Relatorios() {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const notifyInfo = (msg) => toast.info(msg);

  const [activeKey, setActiveKey] = useState("vendas");

  const vendas = [
    {
      data: "14/01/2024",
      quantidade: 12,
      valorTotal: 2850.9,
    },
    {
      data: "13/01/2024",
      quantidade: 8,
      valorTotal: 1920.5,
    },
    {
      data: "12/01/2024",
      quantidade: 15,
      valorTotal: 3240,
    },
    {
      data: "11/01/2024",
      quantidade: 6,
      valorTotal: 1450.25,
    },
    {
      data: "10/01/2024",
      quantidade: 10,
      valorTotal: 2180.75,
    },
  ];

  const produtos = [
    {
      nome: "Filtro de Óleo Honda CB600",
      descricao: "Filtro de óleo original Honda para CB600",
      categoria: "Filtros",
      estoque: 2,
      estoqueMinimo: 10,
    },
    {
      nome: "Vela NGK Iridium",
      descricao: "Vela de ignição iridium NGK",
      categoria: "Velas",
      estoque: 25,
      estoqueMinimo: 15,
    },
    {
      nome: "Pastilha de Freio Yamaha",
      descricao: "Pastilha de freio original Yamaha",
      categoria: "Freios",
      estoque: 8,
      estoqueMinimo: 5,
    },
    {
      nome: "Corrente DID 520",
      descricao: "Corrente DID 520 para motos esportivas",
      categoria: "Transmissão",
      estoque: 12,
      estoqueMinimo: 5,
    },
    {
      nome: "Corrente DID 520",
      descricao: "Corrente DID 520 para motos esportivas",
      categoria: "Transmissão",
      estoque: 12,
      estoqueMinimo: 5,
    },
    {
      nome: "Corrente DID 520",
      descricao: "Corrente DID 520 para motos esportivas",
      categoria: "Transmissão",
      estoque: 12,
      estoqueMinimo: 5,
    },
  ];

  return (
    <>
      <Container className="mt-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1 text-dark">Relatórios</h2>
            <p className="text-secondary">Análises e indicadores do negócio</p>
          </div>
          <div>
            <Button variant="light" className="border rounded">
              <p className="mb-0 small py-1 text-muted">
                <Download size={16} className="me-2" /> Exportar PDF
              </p>
            </Button>
          </div>
        </div>

        <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
          <Nav
            variant="pills"
            className="mb-3 w-100 justify-content-between rounded align-items-center"
            style={{ backgroundColor: "#e2e4e7ff" }}
          >
            <Nav.Item className="w-25">
              <Nav.Link
                eventKey="vendas"
                className="fw-normal text-center rounded m-1 text-muted"
                style={{ fontSize: "14px" }}
              >
                Vendas
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="w-25">
              <Nav.Link
                eventKey="estoque"
                className="fw-normal text-center rounded m-1 text-muted"
                style={{ fontSize: "14px" }}
              >
                Estoques
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="w-25">
              <Nav.Link
                eventKey="produtos"
                className="fw-normal text-center rounded m-1 text-muted"
                style={{ fontSize: "14px" }}
              >
                Produtos
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="w-25">
              <Nav.Link
                eventKey="clientes"
                className="fw-normal text-center rounded m-1 text-muted"
                style={{ fontSize: "14px" }}
              >
                Clientes
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="vendas">
              <Card.Body>
                <Row className="g-3 mb-4">
                  <Col md={6} lg={4}>
                    <Card className="shadow-sm rounded-3">
                      <Card.Body className="d-flex align-items-start justify-content-between">
                        <div>
                          <h6 className="text-dark fw-semibold small">
                            Vendas Hoje
                          </h6>
                          <h4 className="mb-0 text-dark fw-semibold">12</h4>
                          <p
                            className="mb-0 text-dark fw-normal"
                            style={{ fontSize: "12px" }}
                          >
                            +20% em relação a ontem
                          </p>
                        </div>
                        <div className="d-flex align-items-start">
                          <img src={iconVendas} />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6} lg={4}>
                    <Card className="shadow-sm rounded-3">
                      <Card.Body className="d-flex align-items-start justify-content-between">
                        <div>
                          <h6 className="text-dark fw-semibold small">
                            Receita Hoje
                          </h6>
                          <h4 className="mb-0 text-dark fw-semibold">
                            R$ 2.850,90
                          </h4>
                          <p
                            className="mb-0 text-dark fw-normal"
                            style={{ fontSize: "12px" }}
                          >
                            +15% em relação a ontem
                          </p>
                        </div>
                        <div className="d-flex align-items-start">
                          <img src={iconReal} />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6} lg={4}>
                    <Card className="shadow-sm rounded-3">
                      <Card.Body className="d-flex align-items-start justify-content-between">
                        <div>
                          <h6 className="text-dark fw-semibold small">
                            Ticket Médio
                          </h6>
                          <h4 className="mb-0 text-dark fw-semibold">
                            R$ 237,58
                          </h4>
                          <p
                            className="mb-0 text-dark fw-normal"
                            style={{ fontSize: "12px" }}
                          >
                            -5% em relação a ontem
                          </p>
                        </div>
                        <div className="d-flex align-items-start">
                          <img src={iconTicket} />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row className="g-0">
                  <Card className="shadow-sm border-0 rounded-4">
                    <Card.Body>
                      <div>
                        <div className="d-flex flex-row align-items-center mb-2">
                          <img src={iconBarChart} className="me-2" />
                          <h5 className="fw-semibold text-dark mb-0">
                            Vendas Por Dia
                          </h5>
                        </div>
                        <p className="text-muted small">Últimos 5 dias</p>
                      </div>

                      <Table
                        responsive
                        hover
                        className="align-middle text-nowrap"
                      >
                        <thead>
                          <tr>
                            <th scope="col" className="small text-muted">
                              Data
                            </th>
                            <th
                              scope="col"
                              className="small text-center text-muted"
                            >
                              Quantidade
                            </th>
                            <th
                              scope="col"
                              className="small text-center text-muted"
                            >
                              Valor Total
                            </th>
                            <th
                              scope="col"
                              className="small text-center text-muted"
                            >
                              Ticket Médio
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {vendas.map((venda, index) => (
                            <tr key={index} className="align-middle border-top">
                              <td className="small">{venda.data}</td>
                              <td className="text-center small">
                                {venda.quantidade} venda
                                {venda.quantidade > 1 && "s"}
                              </td>
                              <td className="text-center small fw-semibold">
                                R$ {venda.valorTotal.toFixed(2)}
                              </td>
                              <td className="text-center small">
                                R${" "}
                                {(venda.valorTotal / venda.quantidade).toFixed(
                                  2
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Row>
              </Card.Body>
            </Tab.Pane>

            <Tab.Pane eventKey="estoque">
              <Card className="shadow-sm border-0 rounded-4">
                <Card.Body>
                  <div>
                    <div className="d-flex flex-row align-items-center mb-2">
                      <img src={iconEstoqueDanger} className="me-2" />
                      <h5 className="fw-semibold text-dark mb-0">
                        Produtos com Estoque Baixo
                      </h5>
                    </div>
                    <p className="text-muted small">
                      5 produtos precisam de reposição
                    </p>
                  </div>

                  <Table responsive hover className="align-middle text-nowrap">
                    <thead>
                      <tr>
                        <th scope="col" className="small text-muted">
                          Produto
                        </th>
                        <th scope="col" className="small text-muted">
                          Categoria
                        </th>
                        <th
                          scope="col"
                          className="small text-center text-muted"
                        >
                          Estoque Atual
                        </th>
                        <th
                          scope="col"
                          className="small text-center text-muted"
                        >
                          Estoque Mínimo
                        </th>
                        <th scope="col" className="small text-muted">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {produtos.map((produto, index) => (
                        <tr key={index} className="align-middle border-top">
                          <td className="fw-semibold">{produto.nome}</td>
                          <td className="small">{produto.categoria}</td>
                          <td className="text-center small">
                            {produto.estoque} unidade
                            {produto.estoque > 1 && "s"}
                          </td>
                          <td className="text-center small">
                            {produto.estoqueMinimo} unidade
                            {produto.estoqueMinimo > 1 && "s"}
                          </td>
                          <td>
                            <Badge bg="danger" pill className="px-2 fw-semibold">
                              Crítico
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Tab.Pane>

            <Tab.Pane eventKey="produtos">
              <Card className="shadow-sm border-0 rounded-4">
                <Card.Body>
                  <div>
                    <div className="d-flex flex-row align-items-center mb-2">
                      <img src={iconBox} className="me-2" />
                      <h5 className="fw-semibold text-dark mb-0">
                        Produtos Mais Vendidos
                      </h5>
                    </div>
                    <p className="text-muted small">
                      Ranking dos produtos por quantidade vendida
                    </p>
                  </div>

                  <Table responsive hover className="align-middle text-nowrap">
                    <thead>
                      <tr>
                        <th scope="col" className="small text-muted">
                          Posição
                        </th>
                        <th scope="col" className="small text-muted">
                          Produto
                        </th>
                        <th scope="col" className="small text-muted">
                          Vendas
                        </th>
                        <th scope="col" className="small text-muted">
                          Receita
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="">
                          <Badge
                            bg="light"
                            pill
                            className="text-dark fw-normal small border rounded px-2"
                          >
                            #1
                          </Badge>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">
                            Vela NGK Iridium
                          </p>
                        </td>
                        <td>
                          <p className="small mb-0">45 unidades</p>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">R$ 3.847,50</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="">
                          <Badge
                            bg="light"
                            pill
                            className="text-dark fw-normal small border rounded px-2"
                          >
                            #2
                          </Badge>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">
                            Vela NGK Iridium
                          </p>
                        </td>
                        <td>
                          <p className="small mb-0">45 unidades</p>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">R$ 3.847,50</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="">
                          <Badge
                            bg="light"
                            pill
                            className="text-dark fw-normal small border rounded px-2"
                          >
                            #3
                          </Badge>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">
                            Vela NGK Iridium
                          </p>
                        </td>
                        <td>
                          <p className="small mb-0">45 unidades</p>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">R$ 3.847,50</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="">
                          <Badge
                            bg="light"
                            pill
                            className="text-dark fw-normal small border rounded px-2"
                          >
                            #4
                          </Badge>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">
                            Vela NGK Iridium
                          </p>
                        </td>
                        <td>
                          <p className="small mb-0">45 unidades</p>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">R$ 3.847,50</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="">
                          <Badge
                            bg="light"
                            pill
                            className="text-dark fw-normal small border rounded px-2"
                          >
                            #5
                          </Badge>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">
                            Vela NGK Iridium
                          </p>
                        </td>
                        <td>
                          <p className="small mb-0">45 unidades</p>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">R$ 3.847,50</p>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Tab.Pane>

            <Tab.Pane eventKey="clientes">
              <Card className="shadow-sm border-0 rounded-4">
                <Card.Body>
                  <div>
                    <div className="d-flex flex-row align-items-center mb-2">
                      <User2 className="me-2" />
                      <h5 className="fw-semibold text-dark mb-0">
                        Melhores Clientes
                      </h5>
                    </div>
                    <p className="text-muted small">
                      Clientes por volume de compras
                    </p>
                  </div>

                  <Table responsive hover className="align-middle text-nowrap">
                    <thead>
                      <tr>
                        <th scope="col" className="small text-muted">
                          Posição
                        </th>
                        <th scope="col" className="small text-muted">
                          Cliente
                        </th>
                        <th scope="col" className="small text-muted">
                          Compras
                        </th>
                        <th scope="col" className="small text-muted">
                          Valor Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="">
                          <Badge
                            bg="light"
                            pill
                            className="text-dark fw-normal small border rounded px-2"
                          >
                            #1
                          </Badge>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">
                            Oficina Central LTDA
                          </p>
                        </td>
                        <td>
                          <p className="small mb-0">25 pedidos</p>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">R$ 15.240,50</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="">
                          <Badge
                            bg="light"
                            pill
                            className="text-dark fw-normal small border rounded px-2"
                          >
                            #2
                          </Badge>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">
                            Oficina Central LTDA
                          </p>
                        </td>
                        <td>
                          <p className="small mb-0">25 pedidos</p>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">R$ 15.240,50</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="">
                          <Badge
                            bg="light"
                            pill
                            className="text-dark fw-normal small border rounded px-2"
                          >
                            #3
                          </Badge>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">
                            Oficina Central LTDA
                          </p>
                        </td>
                        <td>
                          <p className="small mb-0">25 pedidos</p>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">R$ 15.240,50</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="">
                          <Badge
                            bg="light"
                            pill
                            className="text-dark fw-normal small border rounded px-2"
                          >
                            #4
                          </Badge>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">
                            Oficina Central LTDA
                          </p>
                        </td>
                        <td>
                          <p className="small mb-0">25 pedidos</p>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">R$ 15.240,50</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="">
                          <Badge
                            bg="light"
                            pill
                            className="text-dark fw-normal small border rounded px-2"
                          >
                            #5
                          </Badge>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">
                            Oficina Central LTDA
                          </p>
                        </td>
                        <td>
                          <p className="small mb-0">25 pedidos</p>
                        </td>
                        <td>
                          <p className="small mb-0 fw-semibold">R$ 15.240,50</p>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
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
