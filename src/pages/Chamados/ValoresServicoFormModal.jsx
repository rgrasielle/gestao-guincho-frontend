import React from 'react';
import { Form, Input, InputNumber, Select, Button, Space, Row, Col, Typography, Divider, Card } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

const ValoresServicoFormModal = ({ onCancel, onSave }) => {
    const [form] = Form.useForm();

    const getPriceFormatter = (value) => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const getPriceParser = (value) => value.replace(/R\$\s?|(,*)/g, '');

    // Função para lidar com a mudança de valores
    const handleValuesChange = (changedValues, allValues) => {
        // Cálculo do total de Pagamento Quilometragem
        const kmRodados = allValues.kmRodados || 0;
        const valorKm = allValues.valorKm || 0;
        const kmSaida = allValues.kmSaida || 0;
        const valorSaida = allValues.valorSaida || 0;
        const totalPagamento = (kmRodados * valorKm) + (kmSaida * valorSaida);

        // Cálculo do total de Acerto com Motorista
        const acertoKmRodados = allValues.acertoKmRodados || 0;
        const acertoValorKm = allValues.acertoValorKm || 0;
        const acertoKmSaida = allValues.acertoKmSaida || 0;
        const acertoValorSaida = allValues.acertoValorSaida || 0;
        const totalAcerto = (acertoKmRodados * acertoValorKm) + (acertoKmSaida * acertoValorSaida);

        // Atualiza os campos "Total"
        form.setFieldsValue({
            totalPagamento: totalPagamento,
            totalAcerto: totalAcerto,
        });
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={(values) => onSave(values)}
            onReset={onCancel}
            onValuesChange={handleValuesChange}
        >
            {/* Seção de Pagamento de Quilometragem */}
            <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                <Title level={5} style={{ margin: 0 }}>Pagamento Quilometragem</Title>
            </div>
            <Row gutter={16}>
                <Col span={5}>
                    <Form.Item name="kmRodados" label="Quilômetros rodados" style={{ marginBottom: 6 }}>
                        <InputNumber placeholder="0" min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item name="valorKm" label="Valor por KM:" style={{ marginBottom: 6 }}>
                        <InputNumber min={0} formatter={getPriceFormatter} parser={getPriceParser} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item name="kmSaida" label="KM Saída:" style={{ marginBottom: 6 }}>
                        <InputNumber placeholder="0" min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item name="valorSaida" label="Valor Saída:" style={{ marginBottom: 6 }}>
                        <InputNumber min={0} formatter={getPriceFormatter} parser={getPriceParser} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item name="totalPagamento" label="Total:" style={{ marginBottom: 6 }}>
                        <InputNumber
                            min={0}
                            formatter={getPriceFormatter}
                            parser={getPriceParser}
                            style={{
                                width: '100%',
                                backgroundColor: '#f5f5f5', // Fundo cinza para o campo desabilitado
                                color: 'rgba(0, 0, 0, 0.88)', // Cor do texto preta
                                fontWeight: 'bold' // Texto em negrito
                            }}
                            disabled
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Divider />

            {/* Seção Acerto com Motorista */}
            <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                <Title level={5} style={{ margin: 0 }}>Acerto com Motorista</Title>
            </div>
            <Row gutter={16}>
                <Col span={5}>
                    <Form.Item name="acertoKmRodados" label="Quilômetros rodados" style={{ marginBottom: 6 }}>
                        <InputNumber placeholder="0" min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item name="acertoValorKm" label="Valor por KM:" style={{ marginBottom: 6 }}>
                        <InputNumber min={0} formatter={getPriceFormatter} parser={getPriceParser} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item name="acertoKmSaida" label="KM Saída:" style={{ marginBottom: 6 }}>
                        <InputNumber placeholder="0" min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item name="acertoValorSaida" label="Valor Saída:" style={{ marginBottom: 6 }}>
                        <InputNumber min={0} formatter={getPriceFormatter} parser={getPriceParser} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item name="totalAcerto" label="Total:" style={{ marginBottom: 6 }}>
                        <InputNumber
                            min={0}
                            formatter={getPriceFormatter}
                            parser={getPriceParser}
                            style={{
                                width: '100%',
                                backgroundColor: '#f5f5f5', // Fundo cinza para o campo desabilitado
                                color: 'rgba(0, 0, 0, 0.88)', // Cor do texto preta
                                fontWeight: 'bold' // Texto em negrito
                            }}
                            disabled
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Divider />

            {/* Seções Pedágios e Patins lado a lado */}
            <Row gutter={16}>
                <Col span={12}>
                    <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                        <Title level={5} style={{ margin: 0 }}>Pedágios</Title>
                    </div>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="sinistroPedagio" label="Sinistro:" style={{ marginBottom: 6 }}>
                                <Input placeholder="Sinistro" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item name="quantidadePedagio" label="Quantidade:" style={{ marginBottom: 6 }}>
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="valorPedagio" label="Valor:" style={{ marginBottom: 6 }}>
                                <InputNumber min={0} formatter={getPriceFormatter} parser={getPriceParser} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="totalPegadio" label="Total:" style={{ marginBottom: 6 }}>
                                <InputNumber
                                    min={0}
                                    formatter={getPriceFormatter}
                                    parser={getPriceParser}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#f5f5f5', // Fundo cinza para o campo desabilitado
                                        color: 'rgba(0, 0, 0, 0.88)', // Cor do texto preta
                                        fontWeight: 'bold' // Texto em negrito
                                    }}
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                        <Title level={5} style={{ margin: 0 }}>Patins</Title>
                    </div>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="sinistroPatins" label="Sinistro:" style={{ marginBottom: 6 }}>
                                <Input placeholder="Sinistro" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="valorPatins" label="Valor:" style={{ marginBottom: 6 }}>
                                <InputNumber min={0} formatter={getPriceFormatter} parser={getPriceParser} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Divider />

            {/* Seções Hora Parada e Hora Trabalhada lado a lado */}
            <Row gutter={16}>
                <Col span={12}>
                    <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                        <Title level={5} style={{ margin: 0 }}>Hora Parada</Title>
                    </div>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="horasParadas" label="Horas:" style={{ marginBottom: 6 }}>
                                <InputNumber placeholder="0" min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="totalHoraParada" label="Total:" style={{ marginBottom: 6 }}>
                                <InputNumber
                                    min={0}
                                    formatter={getPriceFormatter}
                                    parser={getPriceParser}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#f5f5f5', // Fundo cinza para o campo desabilitado
                                        color: 'rgba(0, 0, 0, 0.88)', // Cor do texto preta
                                        fontWeight: 'bold' // Texto em negrito
                                    }}
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                        <Title level={5} style={{ margin: 0 }}>Hora Trabalhada</Title>
                    </div>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="horasTrabalhadas" label="Horas:" style={{ marginBottom: 6 }}>
                                <InputNumber placeholder="0" min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="totalHoraTrabalhada" label="Total:" style={{ marginBottom: 6 }}>
                                <InputNumber
                                    min={0}
                                    formatter={getPriceFormatter}
                                    parser={getPriceParser}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#f5f5f5', // Fundo cinza para o campo desabilitado
                                        color: 'rgba(0, 0, 0, 0.88)', // Cor do texto preta
                                        fontWeight: 'bold' // Texto em negrito
                                    }}
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Divider />

            {/* Seção de Diárias */}
            <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                <Title level={5} style={{ margin: 0 }}>Diárias</Title>
            </div>
            <Row gutter={16}>
                <Col span={6}>
                    <Form.Item name="sinistroDiarias" label="Sinistro:" style={{ marginBottom: 6 }}>
                        <Input placeholder="Sinistro" />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="entradaDiarias" label="Entrada:" style={{ marginBottom: 6 }}>
                        <Select style={{ width: '100%' }} placeholder="--" >
                            {/* Adicione as opções aqui */}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="saidaDiarias" label="Saída:" style={{ marginBottom: 6 }}>
                        <Select style={{ width: '100%' }} placeholder="--">
                            {/* Adicione as opções aqui */}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="estadiasDiarias" label="Estadias:" style={{ marginBottom: 6 }}>
                        <InputNumber placeholder="0" min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="valorPorDiaDiarias" label="Valor por dia:" style={{ marginBottom: 6 }}>
                        <InputNumber min={0} formatter={getPriceFormatter} parser={getPriceParser} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="totalDiarias" label="Total:" style={{ marginBottom: 6 }}>
                        <InputNumber
                            min={0}
                            formatter={getPriceFormatter}
                            parser={getPriceParser}
                            style={{
                                width: '100%',
                                backgroundColor: '#f5f5f5', // Fundo cinza para o campo desabilitado
                                color: 'rgba(0, 0, 0, 0.88)', // Cor do texto preta
                                fontWeight: 'bold' // Texto em negrito
                            }}
                            disabled
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Divider />

            {/* Seção de Rodas Extras */}
            <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                <Title level={5} style={{ margin: 0 }}>Rodas Extras</Title>
            </div>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="sinistroRodas" label="Sinistro:" style={{ marginBottom: 6 }}>
                        <Input placeholder="Sinistro" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="valorRodas" label="Valor:" style={{ marginBottom: 6 }}>
                        <InputNumber min={0} formatter={getPriceFormatter} parser={getPriceParser} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>

            <Divider />

            {/* Seção de Valor Excedente */}
            <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                <Title level={5} style={{ margin: 0 }}>Valor Excedente</Title>
            </div>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="excedente" label="Excedente:" style={{ marginBottom: 6 }}>
                        <InputNumber min={0} formatter={getPriceFormatter} parser={getPriceParser} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="observacoesExcedente" label="Observações:" style={{ marginBottom: 6 }}>
                        <Input.TextArea placeholder="Observações sobre os valores do serviço..." autoSize={{ minRows: 2, maxRows: 6 }} />
                    </Form.Item>
                </Col>
            </Row>

            <Divider />

            {/* Seção de Valor Final do Serviço */}
            <div style={{ background: '#e6f7ff', padding: '24px 16px', borderRadius: '4px', marginBottom: 24 }}>
                <Title level={4} style={{ margin: 0, marginBottom: 30, color: '#1677ff' }}>Valor Final do Serviço</Title>
                <Row gutter={16} align="middle">
                    <Col span={6}>
                        <Form.Item name="desconto" label="Desconto:" style={{ marginBottom: 6 }}>
                            <InputNumber min={0} formatter={getPriceFormatter} parser={getPriceParser} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="valorFinal" label="Valor Final:" style={{ marginBottom: 6 }}>
                            <InputNumber
                                min={0}
                                formatter={getPriceFormatter}
                                parser={getPriceParser}
                                style={{
                                    width: '100%',
                                    backgroundColor: '#ffffffff', // Fundo cinza para o campo desabilitado
                                    color: 'rgba(0, 0, 0, 0.88)', // Cor do texto preta
                                    fontWeight: 'bold' // Texto em negrito
                                }}
                                disabled
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Title level={2} style={{ margin: 0, color: '#1677ff' }}>R$ 0,00</Title>
                        <Text>Total do Serviço</Text>
                    </Col>
                </Row>
            </div>

            <div style={{ textAlign: 'right', marginTop: 24 }}>
                <Space>
                    <Button onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Salvar Valores
                    </Button>
                </Space>
            </div>
        </Form>
    );
};

export default ValoresServicoFormModal;