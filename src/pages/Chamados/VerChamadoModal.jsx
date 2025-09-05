import { Tabs, Spin, Typography, Row, Col, Divider, Tag } from 'antd';
import {
    UserOutlined,
    CarOutlined,
    FileTextOutlined,
    EnvironmentOutlined,
    ClockCircleOutlined,
    DollarOutlined
} from '@ant-design/icons';

import { useChamadoById } from '../../hooks/useChamados';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Componente para a seção "Dados do Chamado"
const DadosChamadoContent = ({ chamadoData }) => (
    <>
        {/* Seção de Informações do Cliente */}
        <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 14 }}>
            <Title level={5} style={{ margin: 0 }}><UserOutlined style={{ marginRight: 8 }} />Informações do Cliente</Title>
        </div>
        <Row gutter={16}>
            <Col span={12}>
                <Text strong>Nome:</Text>
                <br />
                <Text>{chamadoData.clientName}</Text>
            </Col>
            <Col span={12}>
                <Text strong>CPF:</Text>
                <br />
                <Text>123.456.789-00</Text>
            </Col>
        </Row>
        <div style={{ marginTop: 12 }}>
            <Row gutter={16}>
                <Col span={12}>
                    <Text strong>Telefone:</Text>
                    <br />
                    <Text>{chamadoData.phone}</Text>
                </Col>
            </Row>
        </div>

        <Divider />

        {/* Seção de Informações do Veículo */}
        <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 14 }}>
            <Title level={5} style={{ margin: 0 }}><CarOutlined style={{ marginRight: 8 }} />Informações do Veículo</Title>
        </div>
        <Row gutter={16}>
            <Col span={12}>
                <Text strong>Veículo:</Text>
                <br />
                <Text>{chamadoData.car.split(' • ')[0]}</Text>
            </Col>
            <Col span={12}>
                <Text strong>Placa:</Text>
                <br />
                <Text>{chamadoData.car.split(' • ')[1]}</Text>
            </Col>
        </Row>

        <Divider />

        {/* Seção de Informações do Sinistro */}
        <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 14 }}>
            <Title level={5} style={{ margin: 0 }}><FileTextOutlined style={{ marginRight: 8 }} />Informações do Sinistro</Title>
        </div>
        <Row gutter={16}>
            <Col span={12}>
                <Text strong>Número do Sinistro:</Text>
                <br />
                <Text>{chamadoData.sinistro}</Text>
            </Col>
            <Col span={12}>
                <Text strong>Seguradora:</Text>
                <br />
                <Text>{chamadoData.insurance}</Text>
            </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 12 }}>
            <Col span={12}>
                <Text strong>Tipo de Serviço:</Text>
                <br />
                <Tag>{chamadoData.serviceType}</Tag>
            </Col>
            <Col span={12}>
                <Text strong>Valor:</Text>
                <br />
                <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>{chamadoData.price}</Text>
            </Col>
        </Row>

        <Divider />

        {/* Seção de Localização */}
        <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 14 }}>
            <Title level={5} style={{ margin: 0 }}><EnvironmentOutlined style={{ marginRight: 8 }} />Localização</Title>
        </div>
        <div style={{ marginBottom: 12 }}>
            <Text strong>Origem:</Text>
            <br />
            <Text>{chamadoData.origin}</Text>
        </div>
        <div style={{ marginBottom: 12 }}>
            <Text strong>Destino:</Text>
            <br />
            <Text>{chamadoData.destination}</Text>
        </div>

        <Divider />

        {/* Seção de Informações do Atendimento */}
        <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 14 }}>
            <Title level={5} style={{ margin: 0 }}><ClockCircleOutlined style={{ marginRight: 8 }} />Informações do Atendimento</Title>
        </div>
        <Row gutter={16}>
            <Col span={12}>
                <Text strong>Data de Acionamento:</Text>
                <br />
                <Text>{chamadoData.date.split(' ')[0]}</Text>
            </Col>
            <Col span={12}>
                <Text strong>Hora de Acionamento:</Text>
                <br />
                <Text>{chamadoData.date.split(' ')[2]}</Text>
            </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 12 }}>
            <Col span={12}>
                <Text strong>Motorista:</Text>
                <br />
                <Text>{chamadoData.driver}</Text>
            </Col>
            <Col span={12}>
                <Text strong>Guincho:</Text>
                <br />
                <Text>{chamadoData.truck}</Text>
            </Col>
        </Row>
    </>
);

// Componente para a seção "Valores do Serviço"
const ValoresServicoContent = ({ chamadoData }) => (
    <>
        {/* Seção de Resumo Financeiro */}
        <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 18 }}>
            <Title level={5} style={{ margin: 0 }}><DollarOutlined style={{ marginRight: 8 }} />Resumo Financeiro</Title>
        </div>
        <Row gutter={16}>
            <Col span={12}>
                <Text>Pagamento Quilometragem:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
                <Text strong>R$ 62,50</Text>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col span={12}>
                <Text>Acerto com Motorista:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
                <Text strong>R$ 30,00</Text>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col span={12}>
                <Text>Pedágios:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
                <Text strong>R$ 45,00</Text>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col span={12}>
                <Text>Patins:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
                <Text strong>R$ 0,00</Text>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col span={12}>
                <Text>Hora Parada:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
                <Text strong>R$ 80,00</Text>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col span={12}>
                <Text>Hora Trabalhada:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
                <Text strong>R$ 120,00</Text>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col span={12}>
                <Text>Diárias:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
                <Text strong>R$ 120,00</Text>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col span={12}>
                <Text>Rodas Extras:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
                <Text strong>R$ 0,00</Text>
            </Col>
        </Row>
        <Row gutter={16} >
            <Col span={12}>
                <Text >Excedente:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
                <Text strong>R$ 50,00</Text>
            </Col>
        </Row>

        <div style={{ background: '#e6f7ff', padding: '16px', borderRadius: '4px', textAlign: 'right', marginTop: 18 }}>
            <Title level={4} style={{ margin: 0 }}>Total do Serviço: <span style={{ color: '#1890ff' }}>{chamadoData.price}</span></Title>
        </div>

        <Divider />

        {/* Seção de Detalhamento Financeiro */}
        <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
            <Title level={5} style={{ margin: 0 }}>
                <DollarOutlined style={{ marginRight: 8 }} />
                Detalhamento dos Valores
            </Title>
        </div>

        {/* Pagamento Quilometragem */}
        <div style={{ marginBottom: 24, border: '1px solid #f0f0f0', padding: 16, borderRadius: 4 }}>
            <Title level={5} style={{ margin: 0, marginBottom: 12 }}>Pagamento Quilometragem</Title>
            <Row gutter={16}>
                <Col span={4}>
                    <Text strong>Quilômetros rodados:</Text>
                    <br />
                    <Text>{chamadoData.valores?.quilometragemRodada || '15 km'}</Text>
                </Col>
                <Col span={5}>
                    <Text strong>Valor por KM:</Text>
                    <br />
                    <Text>{chamadoData.valores?.valorPorKm || 'R$ 2,50'}</Text>
                </Col>
                <Col span={5}>
                    <Text strong>KM Saída:</Text>
                    <br />
                    <Text>{chamadoData.valores?.kmSaida || '10 km'}</Text>
                </Col>
                <Col span={5}>
                    <Text strong>Valor Saída:</Text>
                    <br />
                    <Text>{chamadoData.valores?.valorSaidaKm || 'R$ 25,00'}</Text>
                </Col>
                <Col span={5}>
                    <Text strong>Total:</Text>
                    <br />
                    <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>{chamadoData.valores?.totalQuilometragem || 'R$ 62,50'}</Text>
                </Col>
            </Row>
        </div>

        {/* Acerto com Motorista */}
        <div style={{ marginBottom: 24, border: '1px solid #f0f0f0', padding: 16, borderRadius: 4 }}>
            <Title level={5} style={{ margin: 0, marginBottom: 12 }}>Acerto com Motorista</Title>
            <Row gutter={16}>
                <Col span={4}>
                    <Text strong>Quilômetros rodados:</Text>
                    <br />
                    <Text>{chamadoData.valores?.acertoKmRodado || '12 km'}</Text>
                </Col>
                <Col span={5}>
                    <Text strong>Valor por KM:</Text>
                    <br />
                    <Text>{chamadoData.valores?.acertoValorPorKm || 'R$ 1,50'}</Text>
                </Col>
                <Col span={5}>
                    <Text strong>KM Saída:</Text>
                    <br />
                    <Text>{chamadoData.valores?.acertoKmSaida || '8 km'}</Text>
                </Col>
                <Col span={5}>
                    <Text strong>Valor Saída:</Text>
                    <br />
                    <Text>{chamadoData.valores?.acertoValorSaida || 'R$ 12,00'}</Text>
                </Col>
                <Col span={5}>
                    <Text strong>Total:</Text>
                    <br />
                    <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>{chamadoData.valores?.totalAcerto || 'R$ 30,00'}</Text>
                </Col>
            </Row>
        </div>

        {/* Pedágios e Patins */}
        <Row gutter={24} style={{ marginBottom: 24 }}>
            <Col span={12}>
                <div style={{ border: '1px solid #f0f0f0', padding: 16, borderRadius: 4 }}>
                    <Title level={5} style={{ margin: 0, marginBottom: 12 }}>Pedágios</Title>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Text strong>Sinistro:</Text>
                            <br />
                            <Text>{chamadoData.sinistro}</Text>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Text strong>Quantidade:</Text>
                            <br />
                            <Text>{chamadoData.valores?.pedagiosQuantidade || '3'}</Text>
                        </Col>
                        <Col span={8}>
                            <Text strong>Valor:</Text>
                            <br />
                            <Text>{chamadoData.valores?.pedagiosValorUnitario || 'R$ 15,00'}</Text>
                        </Col>
                        <Col span={8}>
                            <Text strong>Total:</Text>
                            <br />
                            <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>{chamadoData.valores?.pedagiosTotal || 'R$ 45,00'}</Text>
                        </Col>
                    </Row>
                </div>
            </Col>

            <Col span={12}>
                <div style={{ border: '1px solid #f0f0f0', padding: 16, borderRadius: 4 }}>
                    <Title level={5} style={{ margin: 0, marginBottom: 12 }}>Patins</Title>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Text strong>Sinistro:</Text>
                            <br />
                            <Text>{chamadoData.sinistro}</Text>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Text strong>Valor:</Text>
                            <br />
                            <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>{chamadoData.valores?.patinsValor || 'R$ 0,00'}</Text>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>

        {/* Hora Parada e Hora Trabalhada */}
        <Row gutter={24} style={{ marginBottom: 24 }}>
            <Col span={12}>
                <div style={{ border: '1px solid #f0f0f0', padding: 16, borderRadius: 4 }}>
                    <Title level={5} style={{ margin: 0, marginBottom: 12 }}>Hora Parada</Title>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Text strong>Horas:</Text>
                            <br />
                            <Text>{chamadoData.valores?.horaParadaHoras || '2 horas'}</Text>
                        </Col>
                        <Col span={12}>
                            <Text strong>Total: </Text>
                            <br />
                            <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>{chamadoData.valores?.horaParadaTotal || 'R$ 80,00'}</Text>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col span={12}>
                <div style={{ border: '1px solid #f0f0f0', padding: 16, borderRadius: 4 }}>
                    <Title level={5} style={{ margin: 0, marginBottom: 12 }}>Hora Trabalhada</Title>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Text strong>Horas:</Text>
                            <br />
                            <Text>{chamadoData.valores?.horaTrabalhadaHoras || '4 horas'}</Text>
                        </Col>
                        <Col span={12}>
                            <Text strong>Total: </Text>
                            <br />
                            <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>{chamadoData.valores?.horaTrabalhadaTotal || 'R$ 120,00'}</Text>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>

        {/* Diárias */}
        <div style={{ marginBottom: 24, border: '1px solid #f0f0f0', padding: 16, borderRadius: 4 }}>
            <Title level={5} style={{ margin: 0, marginBottom: 12 }}>Diárias</Title>
            <Row gutter={16}>
                <Col span={4}>
                    <Text strong>Sinistro:</Text>
                    <br />
                    <Text>{chamadoData.sinistro}</Text>
                </Col>
                <Col span={4}>
                    <Text strong>Entrada:</Text>
                    <br />
                    <Text>{chamadoData.valores?.diariasEntrada || '08:00'}</Text>
                </Col>
                <Col span={4}>
                    <Text strong>Saída:</Text>
                    <br />
                    <Text>{chamadoData.valores?.diariasSaida || '18:00'}</Text>
                </Col>
                <Col span={4}>
                    <Text strong>Estadias:</Text>
                    <br />
                    <Text>{chamadoData.valores?.diariasEstadias || '2 dias'}</Text>
                </Col>
                <Col span={4}>
                    <Text strong>Valor por dia:</Text>
                    <br />
                    <Text>{chamadoData.valores?.diariasValorPorDia || 'R$ 60,00'}</Text>
                </Col>
                <Col span={4}>
                    <Text strong>Total: </Text>
                    <br />
                    <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>{chamadoData.valores?.diariasTotal || 'R$ 120,00'}</Text>
                </Col>
            </Row>
        </div>

        {/* Rodas Extras e Valor excedente */}
        <Row gutter={24} style={{ marginBottom: 24 }}>
            <Col span={12}>
                <div style={{ border: '1px solid #f0f0f0', padding: 16, borderRadius: 4 }}>
                    <Title level={5} style={{ margin: 0, marginBottom: 12 }}>Rodas Extras</Title>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Text strong>Sinistro:</Text>
                            <br />
                            <Text>{chamadoData.sinistro}</Text>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Text strong>Valor:</Text>
                            <br />
                            <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>{chamadoData.valores?.rodasExtrasValor || 'R$ 0,00'}</Text>
                        </Col>
                    </Row>
                </div>
            </Col>

            <Col span={12}>
                <div style={{ border: '1px solid #f0f0f0', padding: 16, borderRadius: 4 }}>
                    <Title level={5} style={{ margin: 0, marginBottom: 12 }}>Valor excedente</Title>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Text strong>Excedente:</Text>
                            <br />
                            <Text style={{ color: '#1890ff', fontWeight: 'bold' }}> {chamadoData.valores?.excedenteValor || 'R$ 50,00'}</Text>
                        </Col>
                        <Col span={24}>
                            <Text strong>Observações:</Text>
                            <br />
                            <Text>{chamadoData.valores?.observacoes || 'Serviço realizado conforme especificações'}</Text>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>

        <Divider />

        {/* Valor Final do Serviço */}
        <div style={{ background: '#e6f7ff', padding: '24px 16px', borderRadius: '4px', marginBottom: 24 }}>
            <Row align="middle" justify="space-between">
                <Col>
                    <Title level={4} style={{ margin: 0, color: '#1677ff', marginBottom: 20 }}>
                        Valor Final do Serviço
                    </Title>
                    <Row gutter={48}> {/* Aumentei o gutter para empurrar "Valor final" mais para a direita */}
                        <Col>
                            <Text>Desconto aplicado:</Text>
                            <br />
                            <Text strong>{chamadoData.valores?.descontoAplicado || 'R$ 0,00'}</Text>
                        </Col>
                        <Col>
                            <Text>Valor final:</Text>
                            <br />
                            <Text strong>{chamadoData.valores?.valorFinal || chamadoData.price}</Text>
                        </Col>
                    </Row>
                </Col>
                <Col style={{ textAlign: 'right' }}>
                    <Title level={2} style={{ margin: 0, color: '#1677ff' }}>
                        {chamadoData.price}
                    </Title>
                    <Text>Total do Serviço</Text>
                </Col>
            </Row>
        </div>
    </>
);

const VerChamadoModal = ({ chamadoData }) => {

    const { data: chamadoCompleto, isLoading } = useChamadoById(chamadoData.id);

    // Se estiver carregando, mostra um spinner
    if (isLoading) return <Spin tip="Carregando detalhes do chamado..." />;

    // Se a API trouxe dados, usa eles; senão, usa o que veio da lista
    const dados = chamadoCompleto || chamadoData;

    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Dados do Chamado" key="1">
                <DadosChamadoContent chamadoData={dados} />
            </TabPane>
            <TabPane tab="Valores do Serviço" key="2">
                <ValoresServicoContent chamadoData={dados} />
            </TabPane>
        </Tabs>
    );
};
export default VerChamadoModal;