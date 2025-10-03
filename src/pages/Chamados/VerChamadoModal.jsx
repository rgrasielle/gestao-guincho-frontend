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
import { useValoresServico } from '../../hooks/useValoresServico.js';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

// Helper para formatar moeda
const formatCurrency = (value) => {
    if (typeof value !== 'number' && typeof value !== 'string') return "R$ --";
    const numValue = Number(value);
    if (isNaN(numValue)) return "R$ --";
    return numValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// Componente para a seção "Dados do Chamado"
const DadosChamadoContent = ({ chamadoData }) => {

    // Helper para formatar data e hora
    const callDateTime = chamadoData.dataServico && chamadoData.hora
        ? `${dayjs(chamadoData.dataServico).format('DD/MM/YYYY')} às ${dayjs(chamadoData.hora, 'HH:mm:ss').format('HH:mm')}`
        : 'Não informado';

    // Função para formatar o telefone
    const formatPhone = (phone) => {
        if (!phone) return 'Não informado';
        const cleaned = phone.replace(/\D/g, ''); // Remove tudo que não for dígito
        if (cleaned.length === 11) {
            return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
        }
        if (cleaned.length === 10) {
            return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6)}`;
        }
        return phone; // Retorna o original se não for um formato conhecido
    };

    return (
        <>
            {/* Seção de Informações do Cliente */}
            <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 14 }}>
                <Title level={5} style={{ margin: 0 }}><UserOutlined style={{ marginRight: 8 }} />Informações do Cliente</Title>
            </div>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Text strong>Nome:</Text><br />
                    <Text>{chamadoData.clienteNome || 'Não informado'}</Text>
                </Col>
                <Col span={12}>
                    <Text strong>CPF/CNPJ:</Text><br />
                    <Text>{chamadoData.clienteCpfCnpj || 'Não informado'}</Text>
                </Col>
                <Col span={12}>
                    <Text strong>Telefone:</Text><br />
                    <Text>{formatPhone(chamadoData.clienteTelefone)}</Text>
                </Col>
                <Col span={12}>
                    <Text strong>E-mail:</Text><br />
                    <Text>{chamadoData.clienteEmail || 'Não informado'}</Text>
                </Col>
                <Col span={24}>
                    <Text strong>Solicitante:</Text><br />
                    <Text>{chamadoData.clienteSolicitante || 'Não informado'}</Text>
                </Col>
            </Row>

            <Divider />

            {/* Seção de Informações do Veículo */}
            <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 14 }}>
                <Title level={5} style={{ margin: 0 }}><CarOutlined style={{ marginRight: 8 }} />Informações do Veículo</Title>
            </div>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Text strong>Veículo:</Text><br />
                    <Text>{`${chamadoData.veiculoModelo || ''} ${chamadoData.veiculoAno || ''}`.trim() || 'Não informado'}</Text>
                </Col>
                <Col span={8}>
                    <Text strong>Placa:</Text><br />
                    <Text>{chamadoData.veiculoPlaca || 'Não informada'}</Text>
                </Col>
                <Col span={8}>
                    <Text strong>Cor:</Text><br />
                    <Text>{chamadoData.veiculoCor || 'Não informada'}</Text>
                </Col>
                <Col span={24}>
                    <Text strong>Observações do Veículo:</Text><br />
                    <Text>{chamadoData.veiculoObservacoes || 'Nenhuma'}</Text>
                </Col>
            </Row>

            <Divider />

            {/* Seção de Localização */}
            <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 14 }}>
                <Title level={5} style={{ margin: 0 }}><EnvironmentOutlined style={{ marginRight: 8 }} />Localização</Title>
            </div>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Text strong>Origem:</Text><br />
                    <Text>{chamadoData.origemFormatada || 'Não informado'}</Text><br />
                    <Text>CEP: {chamadoData.origemCep || '--'}</Text>
                </Col>
                <Col span={12}>
                    <Text strong>Destino:</Text><br />
                    <Text>{chamadoData.destinoFormatado || 'Não informado'}</Text><br />
                    <Text>CEP: {chamadoData.destinoCep || '--'}</Text>
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
                    <Text>{chamadoData.seguradora}</Text>
                </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 12 }}>
                <Col span={12}>
                    <Text strong>Tipo de Serviço:</Text>
                    <br />
                    <Tag style={{
                        border: '1px solid #d9d9d9',
                        borderRadius: '9px',
                        width: 'fit-content',
                        marginTop: '8px'
                    }}>
                        {chamadoData.tipoServico}
                    </Tag>
                </Col>
                <Col span={12}>
                    <Text strong>Valor total:</Text>
                    <br />
                    <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>{formatCurrency(chamadoData.valorFinal)}</Text>
                </Col>
            </Row>

            <Divider />

            {/* Seção de Informações do Atendimento */}
            <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 14 }}>
                <Title level={5} style={{ margin: 0 }}><ClockCircleOutlined style={{ marginRight: 8 }} />Informações do Atendimento</Title>
            </div>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Text strong>Data e Hora do Serviço:</Text><br />
                    <Text>{callDateTime}</Text>
                </Col>
                <Col span={12}>
                    <Text strong>Motorista:</Text><br />
                    <Text>{chamadoData.motoristaNome || 'Não atribuído'}</Text>
                </Col>
                <Col span={12}>
                    <Text strong>Guincho:</Text><br />
                    <Text>{chamadoData.guinchoDescricao || 'Não atribuído'}</Text>
                </Col>
                <Col span={24}>
                    <Text strong>Observações Gerais:</Text><br />
                    <Text>{chamadoData.observacoes || 'Nenhuma'}</Text>
                </Col>
            </Row>
        </>
    );
};

// Componente para a seção "Valores do Serviço"
const ValoresServicoContent = ({ chamadoId }) => {

    // O hook useValoresServico agora retorna 'data', e não 'valores'
    // Renomeia 'data' para 'valores' para não precisar alterar todo o código abaixo
    const { data: valores, isError } = useValoresServico(chamadoId);

    const formatDate = (dateString) => {
        if (!dateString) return '--';
        return dayjs(dateString).format('DD/MM/YYYY');
    };

    if (isError || !valores) {
        return (
            <div style={{ padding: '20px' }}>
                <Text type="secondary">Nenhum valor de serviço foi configurado para este chamado.</Text>
            </div>
        );
    }

    return (
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
                    <Text strong>{formatCurrency(valores.totalPagamento)}</Text>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Text>Acerto com Motorista:</Text>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Text strong>{formatCurrency(valores.totalAcerto)}</Text>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Text>Pedágios:</Text>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Text strong>
                        {formatCurrency(
                            // Verifica se custosPedagio existe e calcula a soma
                            valores.custosPedagio?.reduce(
                                (acc, pedagio) => acc + (pedagio.quantidadePedagio * pedagio.valorPedagio),
                                0 // O valor inicial da soma é 0
                            )
                        )}
                    </Text>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Text>Patins:</Text>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Text strong>{formatCurrency(valores.valorPatins)}</Text>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Text>Hora Parada:</Text>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Text strong>{formatCurrency(valores.totalHoraParada)}</Text>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Text>Hora Trabalhada:</Text>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Text strong>{formatCurrency(valores.totalHoraTrabalhada)}</Text>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Text>Diárias:</Text>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Text strong>{formatCurrency(valores.totalDiarias)}</Text>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Text>Rodas Extras:</Text>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Text strong>{formatCurrency(valores.valorRodas)}</Text>
                </Col>
            </Row>
            <Row gutter={16} >
                <Col span={12}>
                    <Text >Excedente:</Text>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Text strong>{formatCurrency(valores.excedente)}</Text>
                </Col>
            </Row>
            <Row gutter={16} >
                <Col span={12}>
                    <Text >Desconto:</Text>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Text strong style={{ color: '#f81900ff' }}>{formatCurrency(valores.desconto)}</Text>
                </Col>
            </Row>

            <div style={{ background: '#e6f7ff', padding: '16px', borderRadius: '4px', textAlign: 'right', marginTop: 18 }}>
                <Title level={4} style={{ margin: 0 }}>Total do Serviço: <span style={{ color: '#1890ff' }}>{formatCurrency(valores.total)}</span></Title>
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
                        <Text>{valores.pagamentoKmRodados || '--'}</Text>
                    </Col>
                    <Col span={5}>
                        <Text strong>Valor por KM:</Text>
                        <br />
                        <Text>{formatCurrency(valores.pagamentoValorKm)}</Text>
                    </Col>
                    <Col span={5}>
                        <Text strong>Quantidade Saída:</Text>
                        <br />
                        <Text>{valores.pagamentoQuantidadeSaida || '--'}</Text>
                    </Col>
                    <Col span={5}>
                        <Text strong>Valor Saída:</Text>
                        <br />
                        <Text>{formatCurrency(valores.pagamentoValorSaida)}</Text>
                    </Col>
                    <Col span={5}>
                        <Text strong>Total:</Text>
                        <br />
                        <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>{formatCurrency(valores.totalPagamento)}</Text>
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
                        <Text>{valores.acertoKmRodados || '--'}</Text>
                    </Col>
                    <Col span={5}>
                        <Text strong>Valor por KM:</Text>
                        <br />
                        <Text>{formatCurrency(valores.acertoValorKm)}</Text>
                    </Col>
                    <Col span={5}>
                        <Text strong>Quantidade Saída:</Text>
                        <br />
                        <Text>{valores.acertoQuantidadeSaida || '--'}</Text>
                    </Col>
                    <Col span={5}>
                        <Text strong>Valor Saída:</Text>
                        <br />
                        <Text>{formatCurrency(valores.acertoValorSaida)}</Text>
                    </Col>
                    <Col span={5}>
                        <Text strong>Total:</Text>
                        <br />
                        <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>{formatCurrency(valores.totalAcerto)}</Text>
                    </Col>
                </Row>
            </div>

            {/* Pedágios e Patins */}
            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col span={12}>
                    <div style={{ border: '1px solid #f0f0f0', padding: 16, borderRadius: 4 }}>
                        <Title level={5} style={{ margin: 0, marginBottom: 12 }}>Pedágios</Title>
                        {valores.custosPedagio && valores.custosPedagio.length > 0 ? (
                            valores.custosPedagio.map((pedagio, index) => (
                                <Row key={index} gutter={16} style={{ marginBottom: 8 }}>
                                    <Col span={8}>
                                        <Text strong>Quantidade:</Text><br />
                                        <Text>{pedagio.quantidadePedagio || '--'}</Text>
                                    </Col>
                                    <Col span={8}>
                                        <Text strong>Valor:</Text><br />
                                        <Text>{formatCurrency(pedagio.valorPedagio)}</Text>
                                    </Col>
                                    <Col span={8}>
                                        <Text strong>Total:</Text><br />
                                        <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>
                                            {formatCurrency(pedagio.quantidadePedagio * pedagio.valorPedagio)}
                                        </Text>
                                    </Col>
                                </Row>
                            ))
                        ) : (
                            <Text>Nenhum pedágio registrado.</Text>
                        )}
                    </div>
                </Col>

                <Col span={12}>
                    <div style={{ border: '1px solid #f0f0f0', padding: 16, borderRadius: 4 }}>
                        <Title level={5} style={{ margin: 0, marginBottom: 12 }}>Patins</Title>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Text strong>Valor:</Text>
                                <br />
                                <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>{formatCurrency(valores.valorPatins)}</Text>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Text strong>Descrição:</Text>
                                <br />
                                <Text>{valores.descricaoPatins || '--'}</Text>
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
                            <Col span={8}>
                                <Text strong>Horas:</Text>
                                <br />
                                <Text>{valores.horasParadas || '--'}</Text>
                            </Col>
                            <Col span={8}>
                                <Text strong>Valor por hora:</Text>
                                <br />
                                <Text>{formatCurrency(valores.valorHoraParada)}</Text>
                            </Col>
                            <Col span={8}>
                                <Text strong>Total: </Text>
                                <br />
                                <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>{formatCurrency(valores.totalHoraParada)}</Text>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ border: '1px solid #f0f0f0', padding: 16, borderRadius: 4 }}>
                        <Title level={5} style={{ margin: 0, marginBottom: 12 }}>Hora Trabalhada</Title>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Text strong>Horas:</Text>
                                <br />
                                <Text>{valores.horasTrabalhadas || '--'}</Text>
                            </Col>
                            <Col span={8}>
                                <Text strong>Valor por hora:</Text>
                                <br />
                                <Text>{formatCurrency(valores.valorHoraTrabalhada)}</Text>
                            </Col>
                            <Col span={8}>
                                <Text strong>Total: </Text>
                                <br />
                                <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>{formatCurrency(valores.totalHoraTrabalhada)}</Text>
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
                        <Text strong>Entrada:</Text>
                        <br />
                        <Text>{formatDate(valores.entradaDiarias)}</Text>
                    </Col>
                    <Col span={5}>
                        <Text strong>Saída:</Text>
                        <br />
                        <Text>{formatDate(valores.saidaDiarias)}</Text>
                    </Col>
                    <Col span={5}>
                        <Text strong>Estadias:</Text>
                        <br />
                        <Text>{valores.estadiasDiarias || '--'}</Text>
                    </Col>
                    <Col span={5}>
                        <Text strong>Valor por dia:</Text>
                        <br />
                        <Text>{formatCurrency(valores.valorDiaria)}</Text>
                    </Col>
                    <Col span={5}>
                        <Text strong>Total: </Text>
                        <br />
                        <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>{formatCurrency(valores.totalDiarias)}</Text>
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
                                <Text strong>Valor:</Text>
                                <br />
                                <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>{formatCurrency(valores.valorRodas)}</Text>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Text strong>Descrição:</Text>
                                <br />
                                <Text>{valores.descricaoRodas || '--'}</Text>
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
                                <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>{formatCurrency(valores.excedente)}</Text>
                            </Col>
                            <Col span={24}>
                                <Text strong>Observações:</Text>
                                <br />
                                <Text>{valores.observacoesExcedente || '--'}</Text>
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
                        <Row gutter={48} style={{ marginTop: 12 }}>
                            <Col>
                                <Text>Subtotal:</Text><br />
                                <Text strong>{formatCurrency(valores.subtotal)}</Text>
                            </Col>
                            <Col>
                                <Text>Desconto aplicado:</Text><br />
                                <Text strong style={{ color: '#f81900ff' }}>{formatCurrency(valores.desconto)}</Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{ textAlign: 'right' }}>
                        <Title level={2} style={{ margin: 0, color: '#1677ff' }}>
                            {/* O valor final já vem calculado do backend */}
                            {formatCurrency(valores.total)}
                        </Title>
                        <Text>Total do Serviço</Text>
                    </Col>
                </Row>
            </div>

        </>
    );
};


const VerChamadoModal = ({ chamadoData }) => {

    const { data: chamadoCompleto, isLoading } = useChamadoById(chamadoData.id);

    // Se estiver carregando, mostra um spinner
    if (isLoading) return <div style={{ textAlign: 'center', padding: '50px' }}><Spin tip="Carregando detalhes do chamado..." /></div>;

    // Se a API trouxe dados, usa eles, senão, usa o que veio da lista
    const dados = chamadoCompleto || chamadoData;

    return (
        <Tabs
            defaultActiveKey="1"
            items={[
                {
                    key: '1',
                    label: 'Dados do Serviço',
                    children: <DadosChamadoContent chamadoData={dados} />,
                },
                {
                    key: '2',
                    label: 'Valores do Serviço',
                    children: <ValoresServicoContent chamadoId={dados.id} />,
                },
            ]}
        />
    );
};

export default VerChamadoModal;