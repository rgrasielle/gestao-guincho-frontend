import React from 'react';
import { Form, Input, InputNumber, Select, Button, Space, Row, Col, Typography, Divider } from 'antd';
import { DatePicker, TimePicker } from 'antd'; // Importe os componentes DatePicker e TimePicker

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const EditarChamadoFormModal = ({ onCancel, onSave, chamadoData }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onSave(values);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={chamadoData}
            onFinish={handleFinish}
        >
            {/* Dados do Cliente */}
            <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                <Title level={5} style={{ margin: 0 }}>Dados do Cliente</Title>
            </div>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="nomeCliente" label="Nome (Segurado)">
                        <Input placeholder="Nome completo" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="cpfCnpj" label="CPF/CNPJ">
                        <Input placeholder="000.000.000-00" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="telefoneCliente" label="Telefone">
                        <Input placeholder="(11) 99999-9999" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="emailCliente" label="E-mail">
                        <Input placeholder="cliente@email.com" />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name="solicitante" label="Solicitante">
                <Input placeholder="Nome do solicitante" />
            </Form.Item>
            <Form.Item name="observacoesGerais" label="Campo de Observações">
                <TextArea placeholder="Observações gerais do chamado..." autoSize={{ minRows: 2, maxRows: 6 }} />
            </Form.Item>

            <Divider />

            {/* Dados do Veículo */}
            <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                <Title level={5} style={{ margin: 0 }}>Dados do Veículo</Title>
            </div>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="modelo" label="Modelo">
                        <Input placeholder="Ex: Honda Civic" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="ano" label="Ano">
                        <Input placeholder="2020" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="cor" label="Cor">
                        <Input placeholder="Branco" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="placa" label="Placa">
                        <Input placeholder="ABC-1234" />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name="observacoesVeiculo" label="Observações">
                <TextArea placeholder="Observações sobre o veículo..." autoSize={{ minRows: 2, maxRows: 6 }} />
            </Form.Item>

            <Divider />

            {/* Origem e Destino */}
            <Row gutter={16}>
                <Col span={12}>
                    <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                        <Title level={5} style={{ margin: 0 }}>Origem</Title>
                    </div>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="cepOrigem" label="CEP">
                                <Input placeholder="00000-000" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="cidadeOrigem" label="Cidade">
                                <Input placeholder="Cidade" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="estadoOrigem" label="Estado">
                                <Input placeholder="UF" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="bairroOrigem" label="Bairro">
                                <Input placeholder="Bairro" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={18}>
                            <Form.Item name="logradouroOrigem" label="Logradouro">
                                <Input placeholder="Rua, Avenida..." />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="numeroOrigem" label="Número">
                                <Input placeholder="Nº" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                        <Title level={5} style={{ margin: 0 }}>Destino</Title>
                    </div>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="cepDestino" label="CEP">
                                <Input placeholder="00000-000" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="cidadeDestino" label="Cidade">
                                <Input placeholder="Cidade" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="estadoDestino" label="Estado">
                                <Input placeholder="UF" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="bairroDestino" label="Bairro">
                                <Input placeholder="Bairro" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={18}>
                            <Form.Item name="logradouroDestino" label="Logradouro">
                                <Input placeholder="Rua, Avenida..." />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="numeroDestino" label="Número">
                                <Input placeholder="Nº" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Divider />

            {/* Dados do Serviço */}
            <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                <Title level={5} style={{ margin: 0 }}>Dados do Serviço</Title>
            </div>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="seguradora" label="Seguradora">
                        <Select placeholder="Selecione a seguradora">
                            <Option value="bradesco">Bradesco Seguros</Option>
                            <Option value="porto">Porto Seguro</Option>
                            <Option value="allianz">Allianz Seguros</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="sinistro" label="Sinistro">
                        <Input placeholder="Número do sinistro" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="data" label="Data do Acionamento">
                        <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="hora" label="Hora">
                        <TimePicker format="HH:mm" style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="tipoServico" label="Tipo de Serviço">
                        <Select placeholder="Selecione o tipo de serviço">
                            <Option value="socorro">Socorro Mecânico</Option>
                            <Option value="reboque">Reboque</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="guincho" label="Veículo (Atribuir Guincho)">
                        <Select placeholder="Selecione o guincho">
                            <Option value="guincho01">Guincho 01 - ABC-5678</Option>
                            <Option value="guincho02">Guincho 02 - DEF-1234</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name="motorista" label="Prestador (Motorista Responsável)">
                <Select placeholder="Selecione o motorista">
                    <Option value="carlos">Carlos Santos</Option>
                    <Option value="ana">Ana Costa</Option>
                    <Option value="pedro">Pedro Oliveira</Option>
                </Select>
            </Form.Item>

            {/* Botões de Ação */}
            <div style={{ textAlign: 'right', marginTop: 24 }}>
                <Space>
                    <Button onClick={onCancel}>Cancelar</Button>
                    <Button type="primary" htmlType="submit">
                        Salvar Alterações
                    </Button>
                </Space>
            </div>
        </Form>
    );
};

export default EditarChamadoFormModal;