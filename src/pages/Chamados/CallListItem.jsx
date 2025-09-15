import { Card, Button, Typography, Space, Tag, Divider } from 'antd';
import {
    PhoneOutlined,
    UserOutlined,
    CarOutlined,
    GlobalOutlined,
    EnvironmentOutlined,
    CalendarOutlined,
    DollarOutlined,
    EditOutlined,
    EyeOutlined,
    SyncOutlined
} from '@ant-design/icons';
import StatusTag from '../../components/StatusTag';
import dayjs from 'dayjs';

const { Text, Title } = Typography;

const CallListItem = ({ call, onShowValuesModal, onShowEditModal, onShowViewModal, onShowUpdateStatusModal }) => {

    // Helper para formatar moeda
    const formatCurrency = (value) => {
        if (typeof value !== 'number') return "R$ --";
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // Helper para formatar o telefone
    const formatPhone = (phone) => {
        if (!phone) return '';
        const cleaned = phone.replace(/\D/g, ''); // Remove tudo que não for dígito
        if (cleaned.length === 11) {
            return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
        }
        if (cleaned.length === 10) {
            return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6)}`;
        }
        return phone; // Retorna o original se não for um formato conhecido
    };

    // Variáveis de formatação
    const vehicleDescription = `${call.veiculoModelo || ''} ${call.veiculoAno || ''} • ${call.veiculoPlaca || ''}`;
    const callDateTime = call.dataServico && call.hora
        ? `${dayjs(call.dataServico).format('DD/MM/YYYY')} às ${dayjs(call.hora, 'HH:mm:ss').format('HH:mm')}`
        : 'Data não informada';

    return (
        <Card hoverable style={{ marginBottom: 16 }}>
            {/* NOVO: Container principal para todas as informações (antes do divisor) */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    {/* Coluna 1: Dados do Cliente e Veículo (sem alterações) */}
                    <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Space>
                            <Title level={5} style={{ color: '#1677ff', margin: 0, marginBottom: 6, fontWeight: 'bold' }}>{`CH${String(call.id).padStart(3, '0')}`}</Title>
                            <StatusTag status={call.status} />
                        </Space>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <UserOutlined style={{ marginRight: 8 }} />
                            <Text strong>{call.clienteNome || 'Cliente não informado'}</Text>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <PhoneOutlined style={{ marginRight: 8 }} />
                            <Text>{formatPhone(call.clienteTelefone)}</Text>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <CarOutlined style={{ marginRight: 8 }} />
                            <Text>{vehicleDescription}</Text>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <GlobalOutlined style={{ marginRight: 8 }} />
                            <Text><strong>Sinistro:</strong> {call.sinistro}</Text>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <GlobalOutlined style={{ marginRight: 8 }} />
                            <Text><strong>Seguradora:</strong> {call.seguradora}</Text>
                        </div>
                    </div>

                    {/* Coluna 2: Origem, Destino e Datas (sem alterações) */}
                    <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div>
                            <Space align="center">
                                <EnvironmentOutlined />
                                <Text><strong>Origem:</strong></Text>
                            </Space>
                            <div style={{ paddingLeft: '24px' }}>
                                <Text>{call.origemFormatada}</Text>
                            </div>
                        </div>
                        <div>
                            <Space align="center">
                                <EnvironmentOutlined />
                                <Text><strong>Destino:</strong></Text>
                            </Space>
                            <div style={{ paddingLeft: '24px' }}>
                                <Text>{call.destinoFormatado}</Text>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                            <CalendarOutlined style={{ marginRight: 8 }} />
                            <Text strong>{callDateTime}</Text>
                        </div>
                        {call.tipoServico && <Tag style={{ border: '1px solid #d9d9d9', borderRadius: '9px', width: 'fit-content' }}>{call.tipoServico}</Tag>}
                    </div>

                    {/* Coluna 3: Motorista, Guincho e Valor (sem os botões) */}
                    <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                        <div>
                            <Text>Motorista:</Text><br />
                            <Text strong>{call.motoristaNome || 'Não atribuído'}</Text>
                        </div>
                        <div>
                            <Text>Guincho:</Text><br />
                            <Text strong>{call.guinchoDescricao || 'Não atribuído'}</Text>
                        </div>
                        <Title level={5} style={{ color: '#1677ff', margin: '8px 0' }}>{formatCurrency(call.valorFinal)}</Title>
                    </div>
                </div>
            </div>

            {/* DIVISOR: Adicionado para separar as informações das ações */}
            <Divider style={{ margin: '16px 0' }} />

            {/* NOVO: Container para os botões de ação, alinhado à direita */}
            <div style={{ textAlign: 'right' }}>
                <Space wrap>
                    <Button icon={<EyeOutlined />} onClick={() => onShowViewModal(call.id)}>Ver</Button>
                    <Button icon={<EditOutlined />} onClick={() => onShowEditModal(call.id)}>Editar</Button>
                    <Button
                        icon={<DollarOutlined />}
                        onClick={() => onShowValuesModal(call.id)}
                        style={{
                            backgroundColor: '#52c41a',
                            borderColor: '#52c41a',
                            color: 'white'
                        }}
                    >
                        Registrar Valores
                    </Button>
                    <Button
                        type="primary"
                        icon={<SyncOutlined />}
                        onClick={() => onShowUpdateStatusModal(call.id)}
                    >
                        Atualizar Status
                    </Button>
                </Space>
            </div>
        </Card>
    );
};

export default CallListItem;