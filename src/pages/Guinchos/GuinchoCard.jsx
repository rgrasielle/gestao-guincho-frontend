import { Card, Button, Typography, Space, Divider } from 'antd';
import { TruckOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons';
import MotoristaGuinchoStatusTag from '../../components/MotoristaGuinchoStatusTag';

const { Text } = Typography;

const GuinchoCard = ({ guincho, onEdit, onUpdateAvailability }) => {
    return (
        <Card
            hoverable
            style={{ marginBottom: 16, borderRadius: 2, border: '1px solid #f0f0f0' }}
        >
            {/* Informações do Guincho */}
            <div>
                <Space style={{ marginBottom: 20 }} align="center">
                    <TruckOutlined style={{ fontSize: '20px', color: '#1677ff' }} />
                    <Text style={{ fontSize: '18px', fontWeight: 600 }}>{guincho.modelo}</Text>
                    <MotoristaGuinchoStatusTag status={guincho.disponibilidade} />
                </Space>
                <div style={{ marginLeft: 24, marginBottom: 8 }}>
                    <Text>
                        <b>Placa:</b> {guincho.placa}
                    </Text>
                </div>
                <div style={{ marginLeft: 24, marginBottom: 8 }}>
                    <Text>
                        <b>Tipo:</b> {guincho.tipo}
                    </Text>
                </div>
                <div style={{ marginLeft: 24, marginBottom: 8 }}>
                    <Text>
                        <b>Capacidade:</b> {guincho.capacidade} kg
                    </Text>
                </div>
            </div>

            {/* Divisor */}
            <Divider style={{ margin: '16px 0' }} />

            {/* Botões de Ação */}
            <div style={{ textAlign: 'right' }}>
                <Space>
                    <Button
                        type="default"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(guincho.id)}
                    >
                        Editar
                    </Button>
                    <Button
                        type="default"
                        icon={<SyncOutlined />}
                        onClick={() => onUpdateAvailability(guincho.id)}
                    >
                        Atualizar Disponibilidade
                    </Button>
                </Space>
            </div>
        </Card>
    );
};

export default GuinchoCard;