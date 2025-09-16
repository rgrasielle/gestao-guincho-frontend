import { useCallback, useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, Button, Space, Row, Col, Typography, Divider, DatePicker, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { useValoresFixos } from '../../hooks/useValoresFixos';
import { useValoresServico } from '../../hooks/useValoresServico';
import { useEnterToNavigate } from '../../hooks/useEnterToNavigate';

const { Title, Text } = Typography;
const { Option } = Select;

const ValoresServicoFormModal = ({ chamadoId, onCancel, onSave }) => {
    const [form] = Form.useForm();
    const [subtotal, setSubtotal] = useState(0);
    const [totalFinal, setTotalFinal] = useState(0);

    // Helper para formatar a moeda
    const formatCurrency = (value) => {
        const numValue = Number(value);
        if (isNaN(numValue)) return "R$ --";
        return numValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const { valores: valoresDoServico, isLoading: loadingServico, salvarValores } = useValoresServico(chamadoId);
    const { data: valoresFixos, isLoading: loadingFixos } = useValoresFixos();
    const handleKeyDown = useEnterToNavigate();

    const getPriceFormatter = (value) => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const getPriceParser = (value) => value.replace(/R\$\s?|(,*)/g, '');

    // Função para calcular totais quando algum valor mudar
    const handleValuesChange = useCallback((_changedValues, allValues) => {
        // Garante que valores nulos ou vazios sejam tratados como 0 para os cálculos
        const getNum = (value) => Number(value) || 0;

        // --- 1. Cálculo do Pagamento de Quilometragem ---
        const pagamentoKmRodados = getNum(allValues.pagamentoKmRodados);
        const pagamentoValorKm = getNum(allValues.pagamentoValorKm);
        const pagamentoQuantidadeSaida = getNum(allValues.pagamentoQuantidadeSaida);
        const pagamentoValorSaida = getNum(allValues.pagamentoValorSaida);
        const totalPagamento = (pagamentoKmRodados * pagamentoValorKm) + (pagamentoQuantidadeSaida * pagamentoValorSaida);

        // --- 2. Cálculo do Acerto com Motorista ---
        const acertoKmRodados = getNum(allValues.acertoKmRodados);
        const acertoValorKm = getNum(allValues.acertoValorKm);
        const acertoQuantidadeSaida = getNum(allValues.acertoQuantidadeSaida);
        const acertoValorSaida = getNum(allValues.acertoValorSaida);
        const totalAcerto = (acertoKmRodados * acertoValorKm) + (acertoQuantidadeSaida * acertoValorSaida);

        // --- 3. Cálculo de Pedágios ---
        const totalPedagio = (allValues.custosPedagio || []).reduce((acc, custo) => {
            const qtd = getNum(custo?.quantidadePedagio);
            const vlr = getNum(custo?.valorPedagio);
            return acc + (qtd * vlr);
        }, 0);

        // --- 4. Patins ---
        const valorPatins = getNum(allValues.valorPatins);

        // --- 5. Hora Parada ---
        const horasParadas = getNum(allValues.horasParadas);
        const valorHoraParada = getNum(allValues.valorHoraParada);
        const totalHoraParada = horasParadas * valorHoraParada;

        // --- 6. Hora Trabalhada ---
        const horasTrabalhadas = getNum(allValues.horasTrabalhadas);
        const valorHoraTrabalhada = getNum(allValues.valorHoraTrabalhada);
        const totalHoraTrabalhada = horasTrabalhadas * valorHoraTrabalhada;

        // --- 7. Diárias ---
        const estadiasDiarias = getNum(allValues.estadiasDiarias);
        const valorDiaria = getNum(allValues.valorDiaria);
        const totalDiarias = estadiasDiarias * valorDiaria;

        // --- 8. Rodas Extras ---
        const valorRodas = getNum(allValues.valorRodas);

        // --- 9. Excedentes ---
        const excedente = getNum(allValues.excedente);

        // --- 10. Valor Final ---
        const subTotalServico = totalPagamento + totalAcerto + totalPedagio + valorPatins +
            totalHoraParada + totalHoraTrabalhada + totalDiarias +
            valorRodas + excedente;

        const desconto = getNum(allValues.desconto);
        const valorFinal = subTotalServico - desconto;

        // Atualiza campos no formulário
        form.setFieldsValue({
            totalPagamento,
            totalAcerto,
            totalPedagio,
            valorPatins,
            totalHoraParada,
            totalHoraTrabalhada,
            totalDiarias,
            valorRodas,
            excedente,
            valorFinal,
        });

        // Atualiza estados para exibição
        setSubtotal(subTotalServico);
        setTotalFinal(valorFinal);
    }, [form]);


    // useEffect para inicializar o formulário
    useEffect(() => {
        form.resetFields();
        if (valoresDoServico && valoresFixos) { // LIMPA O FORMULÁRIO: Garante que dados de um chamado anterior não apareçam.

            // VERIFICA O CARREGAMENTO: Se os dados (fixos ou do serviço) ainda estiverem carregando,
            // o hook para por aqui para evitar preencher o form antes da hora.
            if (loadingServico || loadingFixos) {
                return;
            }

            // DEFINE VALORES INICIAIS: Preenche com dados do serviço (se existirem)
            // ou com os valores fixos padrão (se for um novo registro de valores).
            const initialFormValues = {
                ...(valoresDoServico || {}), // Usa os valores do serviço se existirem, senão um objeto vazio para não dar erro
                pagamentoValorKm: valoresDoServico?.pagamentoValorKm ?? valoresFixos?.valorQuilometragemPorKm ?? 0,
                pagamentoValorSaida: valoresDoServico?.pagamentoValorSaida ?? valoresFixos?.valorQuilometragemSaida ?? 0,
                acertoValorKm: valoresDoServico?.acertoValorKm ?? valoresFixos?.valorMotoristaPorKm ?? 0,
                acertoValorSaida: valoresDoServico?.acertoValorSaida ?? valoresFixos?.valorMotoristaSaida ?? 0,
                valorHoraParada: valoresDoServico?.valorHoraParada ?? valoresFixos?.valorHoraParada ?? 0,
                valorHoraTrabalhada: valoresDoServico?.valorHoraTrabalhada ?? valoresFixos?.valorHoraTrabalhada ?? 0,
                // Ajuste importante: mapear os pedágios para os nomes corretos do form
                custosPedagio: valoresDoServico?.custosPedagio?.map(p => ({
                    quantidadePedagio: p.quantidadePedagio ?? p.quantidade ?? 0,
                    valorPedagio: p.valorPedagio ?? p.valor ?? 0,
                })) || [],
                entradaDiarias: valoresDoServico?.entradaDiarias ? dayjs(valoresDoServico.entradaDiarias) : null,
                saidaDiarias: valoresDoServico?.saidaDiarias ? dayjs(valoresDoServico.saidaDiarias) : null,
                estadiasDiarias: valoresDoServico?.estadiasDiarias || 0,
                valorDiaria: valoresDoServico?.valorDiaria ?? valoresFixos?.valorDiaria ?? 0,
            };

            form.setFieldsValue(initialFormValues);
            handleValuesChange({}, initialFormValues);

        }
    }, [chamadoId, valoresDoServico, valoresFixos, loadingServico, loadingFixos, form, handleValuesChange]);


    // Função para lidar com o envio do formulário
    const handleFinish = async (values) => {
        try {
            const payload = {
                ...values,
                entradaDiarias: values.entradaDiarias ? values.entradaDiarias.toDate() : null,
                saidaDiarias: values.saidaDiarias ? values.saidaDiarias.toDate() : null,
                estadiasDiarias: values.estadiasDiarias ? Number(values.estadiasDiarias) : 0,
                custosPedagio: values.custosPedagio?.map(item => ({
                    quantidadePedagio: Number(item.quantidadePedagio || 0),
                    valorPedagio: Number(item.valorPedagio || 0),
                })) || [],

            };

            await salvarValores(payload);
            message.success('Valores salvos com sucesso!');

            if (onSave) onSave(payload);   // <-- aqui usa o onSave
            onCancel()
        } catch {
            message.error('Erro ao salvar os valores.');
        }
    };

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                onReset={onCancel}
                onValuesChange={handleValuesChange}
                onKeyDown={handleKeyDown}
            >

                {/* Seção de Pagamento de Quilometragem */}
                <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                    <Title level={5} style={{ margin: 0 }}>Pagamento Quilometragem</Title>
                </div>
                <Row gutter={16}>
                    <Col span={5}>
                        <Form.Item name="pagamentoKmRodados" label="Quilômetros rodados" style={{ marginBottom: 6 }}>
                            <InputNumber placeholder="0" min={0} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item name="pagamentoValorKm" label="Valor por KM:" style={{ marginBottom: 6 }}>
                            <InputNumber min={0} formatter={getPriceFormatter} parser={getPriceParser} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item name="pagamentoQuantidadeSaida" label="Quantidade Saída:" style={{ marginBottom: 6 }}>
                            <InputNumber placeholder="0" min={0} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item name="pagamentoValorSaida" label="Valor Saída:" style={{ marginBottom: 6 }}>
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
                                    backgroundColor: '#f5f5f5',
                                    color: 'rgba(0, 0, 0, 0.88)',
                                    fontWeight: 'bold'
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
                        <Form.Item name="acertoQuantidadeSaida" label="Quantidade saída:" style={{ marginBottom: 6 }}>
                            <InputNumber placeholder="0" min={0} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item name="acertoValorSaida" label="Valor saída:" style={{ marginBottom: 6 }}>
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
                                    backgroundColor: '#f5f5f5',
                                    color: 'rgba(0, 0, 0, 0.88)',
                                    fontWeight: 'bold'
                                }}
                                disabled
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Divider />

                {/* Seções Pedágios e Patins lado a lado */}
                <Row gutter={16}>
                    {/* Pedágios */}
                    <Col span={12}>
                        <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                            <Title level={5} style={{ margin: 0 }}>Pedágios</Title>
                        </div>

                        <Form.List name="custosPedagio">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'quantidadePedagio']}
                                                label="Qtd."
                                                style={{ flex: 1 }}
                                            >
                                                <InputNumber placeholder="Qtd." min={1} style={{ width: '100%' }} />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'valorPedagio']}
                                                label="Valor Unitário (R$)"
                                                style={{ flex: 2 }}
                                            >
                                                <InputNumber
                                                    min={0}
                                                    formatter={getPriceFormatter}
                                                    parser={getPriceParser}
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Item>
                                            <Button
                                                type="text"
                                                danger
                                                onClick={() => remove(name)}
                                                icon={<MinusCircleOutlined />}
                                                style={{ marginTop: '8px' }}
                                            />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Adicionar Pedágio
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <Form.Item name="totalPedagio" label="Total Pedágios:">
                            <InputNumber
                                disabled
                                style={{ width: '100%', fontWeight: 'bold', backgroundColor: '#f5f5f5', color: 'rgba(0, 0, 0, 0.88)' }}
                                formatter={getPriceFormatter}
                                parser={getPriceParser}
                            />
                        </Form.Item>
                    </Col>

                    {/* Patins */}
                    <Col span={12}>
                        <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                            <Title level={5} style={{ margin: 0 }}>Patins</Title>
                        </div>
                        <Form.Item name="valorPatins" label="Valor:">
                            <InputNumber min={0} formatter={getPriceFormatter} parser={getPriceParser} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="descricaoPatins" label="Descrição:">
                            <Input placeholder="Descrição do custo" />
                        </Form.Item>
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
                            <Col span={8}>
                                <Form.Item name="horasParadas" label="Horas:" style={{ marginBottom: 6 }}>
                                    <InputNumber placeholder="0" min={0} style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="valorHoraParada" label="Valor p/ hora:" style={{ marginBottom: 6 }}>
                                    <InputNumber
                                        min={0}
                                        formatter={getPriceFormatter}
                                        parser={getPriceParser}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="totalHoraParada" label="Total:" style={{ marginBottom: 6 }}>
                                    <InputNumber
                                        min={0}
                                        formatter={getPriceFormatter}
                                        parser={getPriceParser}
                                        style={{
                                            width: '100%',
                                            backgroundColor: '#f5f5f5',
                                            color: 'rgba(0, 0, 0, 0.88)',
                                            fontWeight: 'bold'
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
                            <Col span={8}>
                                <Form.Item name="horasTrabalhadas" label="Horas:" style={{ marginBottom: 6 }}>
                                    <InputNumber placeholder="0" min={0} style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="valorHoraTrabalhada" label="Valor p/ hora:" style={{ marginBottom: 6 }}>
                                    <InputNumber
                                        min={0}
                                        formatter={getPriceFormatter}
                                        parser={getPriceParser}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="totalHoraTrabalhada" label="Total:" style={{ marginBottom: 6 }}>
                                    <InputNumber
                                        min={0}
                                        formatter={getPriceFormatter}
                                        parser={getPriceParser}
                                        style={{
                                            width: '100%',
                                            backgroundColor: '#f5f5f5',
                                            color: 'rgba(0, 0, 0, 0.88)',
                                            fontWeight: 'bold'
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
                    <Col span={8}>
                        <Form.Item name="entradaDiarias" label="Entrada:">
                            <DatePicker
                                format="DD/MM/YYYY"
                                style={{ width: '100%' }}
                                placeholder="Selecione a data"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="saidaDiarias" label="Saída:">
                            <DatePicker
                                format="DD/MM/YYYY"
                                style={{ width: '100%' }}
                                placeholder="Selecione a data"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="estadiasDiarias" label="Diárias:" style={{ marginBottom: 6 }}>
                            <InputNumber placeholder="0" min={0} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="valorDiaria" label="Valor por diária:" style={{ marginBottom: 6 }}>
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
                                    backgroundColor: '#f5f5f5',
                                    color: 'rgba(0, 0, 0, 0.88)',
                                    fontWeight: 'bold'
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
                        <Form.Item name="valorRodas" label="Valor:" style={{ marginBottom: 6 }}>
                            <InputNumber min={0} formatter={getPriceFormatter} parser={getPriceParser} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="descricaoRodas" label="Descrição:" style={{ marginBottom: 6 }}>
                            <Input placeholder="Descrição do custo" />
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
                    <Row gutter={16} align="middle" justify="space-between">
                        <Col>
                            <Row gutter={48}>
                                <Col>
                                    <Space direction="vertical" size={9}>
                                        <Text>Subtotal:</Text>
                                        <Text strong>{formatCurrency(subtotal)}</Text>
                                    </Space>
                                </Col>

                                <Col>
                                    <Form.Item name="desconto" label="Desconto:" style={{ marginBottom: 0 }}>
                                        <InputNumber min={0} formatter={getPriceFormatter} parser={getPriceParser} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>

                        </Col>
                        <Col style={{ textAlign: 'right' }}>
                            <Title level={2} style={{ margin: 0, color: '#1677ff' }}>
                                {formatCurrency(totalFinal)}
                            </Title>
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
            </Form >
        </>
    );
};

export default ValoresServicoFormModal;