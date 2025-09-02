import React from 'react';
import { Layout, Button, Typography, Row, Col, Card, Form, Input, Select, DatePicker, TimePicker } from 'antd';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const ChamadoForm = () => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        console.log('Dados do chamado:', values);
        // Lógica para salvar o chamado
    };

    return (
        <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            <Header style={{ background: '#fff', padding: '0 24px', height: 64, borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="/dashboard" style={{ marginRight: 16 }}>
                            <Button type="link" icon={<LeftOutlined />}>
                                Voltar
                            </Button>
                        </Link>
                        <Title level={4} style={{ margin: 0 }}>
                            Novo Chamado
                        </Title>
                    </div>
                    <Button type="primary" size="large">
                        Salvar Chamado
                    </Button>
                </div>
            </Header>

            <Content style={{ margin: 24, padding: 24, background: '#f0f2f5' }}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                >
                    {/* Seção 1: Dados do Cliente */}
                    <Card style={{ marginBottom: 24 }} title={<Title level={4}>Dados do Cliente</Title>}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name={['cliente', 'nome']} label={<Text strong>Nome (Segurado)</Text>}>
                                    <Input placeholder="Nome completo" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['cliente', 'cpfCnpj']} label={<Text strong>CPF/CNPJ</Text>}>
                                    <Input placeholder="000.000.000-00" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name={['cliente', 'telefone']} label={<Text strong>Telefone</Text>}>
                                    <Input placeholder="(11) 9999-9999" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['cliente', 'email']} label={<Text strong>E-mail</Text>}>
                                    <Input placeholder="cliente@email.com" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name={['cliente', 'solicitante']} label={<Text strong>Solicitante</Text>}>
                                    <Input placeholder="Nome do solicitante" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item name={['cliente', 'observacoes']} label={<Text strong>Campo de Observações</Text>}>
                                    <Input.TextArea placeholder="Observações gerais do chamado..." autoSize={{ minRows: 2, maxRows: 6 }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    {/* Seção 2: Dados do Veículo */}
                    <Card style={{ marginBottom: 24 }} title={<Title level={4}>Dados do Veículo</Title>}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name={['veiculo', 'modelo']} label={<Text strong>Modelo</Text>}>
                                    <Input placeholder="Ex: Honda Civic" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['veiculo', 'ano']} label={<Text strong>Ano</Text>}>
                                    <Input placeholder="2020" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name={['veiculo', 'cor']} label={<Text strong>Cor</Text>}>
                                    <Input placeholder="Branco" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['veiculo', 'placa']} label={<Text strong>Placa</Text>}>
                                    <Input placeholder="ABC-1234" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item name={['veiculo', 'observacoes']} label={<Text strong>Observações</Text>}>
                                    <Input.TextArea placeholder="Observações sobre o veículo..." autoSize={{ minRows: 2, maxRows: 6 }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    {/* Seção 3: Origem e Destino */}
                    <Row gutter={24} style={{ marginBottom: 24 }}>
                        <Col span={12}>
                            <Card title={<Title level={4}>Origem</Title>}>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item name={['origem', 'cep']} label={<Text strong>CEP</Text>}>
                                            <Input placeholder="00000-000" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name={['origem', 'cidade']} label={<Text strong>Cidade</Text>}>
                                            <Input placeholder="Cidade" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name={['origem', 'estado']} label={<Text strong>Estado</Text>}>
                                            <Input placeholder="UF" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item name={['origem', 'bairro']} label={<Text strong>Bairro</Text>}>
                                            <Input placeholder="Bairro" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={18}>
                                        <Form.Item name={['origem', 'logradouro']} label={<Text strong>Logradouro</Text>}>
                                            <Input placeholder="Rua, Avenida..." />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item name={['origem', 'numero']} label={<Text strong>Número</Text>}>
                                            <Input placeholder="Nº" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title={<Title level={4}>Destino</Title>}>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item name={['destino', 'cep']} label={<Text strong>CEP</Text>}>
                                            <Input placeholder="00000-000" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name={['destino', 'cidade']} label={<Text strong>Cidade</Text>}>
                                            <Input placeholder="Cidade" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name={['destino', 'estado']} label={<Text strong>Estado</Text>}>
                                            <Input placeholder="UF" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item name={['destino', 'bairro']} label={<Text strong>Bairro</Text>}>
                                            <Input placeholder="Bairro" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={18}>
                                        <Form.Item name={['destino', 'logradouro']} label={<Text strong>Logradouro</Text>}>
                                            <Input placeholder="Rua, Avenida..." />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item name={['destino', 'numero']} label={<Text strong>Número</Text>}>
                                            <Input placeholder="Nº" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>

                    {/* Seção de Dados do Serviço */}
                    <Card style={{ marginBottom: 24 }} title={<Title level={4}>Dados do Serviço</Title>}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name={['servico', 'seguradora']} label={<Text strong>Seguradora</Text>}>
                                    <Select placeholder="Selecione a seguradora" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['servico', 'sinistro']} label={<Text strong>Sinistro</Text>}>
                                    <Input placeholder="Número do sinistro" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name={['servico', 'dataAcionamento']} label={<Text strong>Data do Acionamento</Text>}>
                                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['servico', 'horaAcionamento']} label={<Text strong>Hora</Text>}>
                                    <TimePicker format="HH:mm" style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name={['servico', 'tipoServico']} label={<Text strong>Tipo de Serviço</Text>}>
                                    <Select placeholder="Selecione o tipo de serviço" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['servico', 'guincho']} label={<Text strong>Veículo (Atribuir Guincho)</Text>}>
                                    <Select placeholder="Selecione o guincho" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name={['servico', 'motorista']} label={<Text strong>Prestador (Motorista Responsável)</Text>}>
                                    <Select placeholder="Selecione o motorista" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    {/* Botões de Ação */}
                    <div style={{ textAlign: 'right', marginTop: 24 }}>
                        <Button style={{ marginRight: 8 }}>Cancelar</Button>
                        <Button type="primary" htmlType="submit">
                            Salvar Chamado
                        </Button>
                    </div>
                </Form>
            </Content>
        </Layout>
    );
};

export default ChamadoForm;