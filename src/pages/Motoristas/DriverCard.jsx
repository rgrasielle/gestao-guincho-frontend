import { Card, Button, Typography, Space, Divider } from 'antd';
import { UserOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons';
import MotoristaGuinchoStatusTag from '../../components/MotoristaGuinchoStatusTag';

const { Text } = Typography;

const DriverCard = ({ driver, onEdit, onUpdateAvailability }) => {
    return (
        <Card
            hoverable
            style={{ marginBottom: 16, borderRadius: 8, border: '1px solid #f0f0f0' }}
        >

            <div>
                <Space style={{ marginBottom: 20 }} align="center">
                    <UserOutlined style={{ fontSize: '20px', color: '#1677ff' }} />
                    <Text style={{ fontSize: '18px', fontWeight: 600 }}>{driver.nome}</Text>
                    <MotoristaGuinchoStatusTag status={driver.disponibilidade} />
                </Space>
                <div style={{ marginLeft: 24, marginBottom: 8 }}>
                    <Text>
                        <b>CPF:</b> {driver.cpf}
                    </Text>
                </div>
                <div style={{ marginLeft: 24, marginBottom: 8 }}>
                    <Text>
                        <b>CNH:</b> {driver.cnh}
                    </Text>
                </div>
                <div style={{ marginLeft: 24, marginBottom: 8 }}>
                    <Text>
                        <b>Telefone:</b> {driver.telefone}
                    </Text>
                </div>
                <div style={{ marginLeft: 24, marginBottom: 8 }}>
                    <Text>
                        <b>E-mail:</b> {driver.email}
                    </Text>
                </div>
            </div>

            <Divider style={{ margin: '16px 0' }} />

            {/* Botões de Ação */}
            <div style={{ textAlign: 'right' }}>
                <Space>
                    <Button
                        type="default"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(driver.id)}
                    >
                        Editar
                    </Button>
                    <Button
                        type="default"
                        icon={<SyncOutlined />}
                        onClick={() => onUpdateAvailability(driver.id)}
                    >
                        Atualizar Disponibilidade
                    </Button>
                </Space>
            </div>
        </Card>
    );
};

export default DriverCard;