import React from 'react';
import { Card, Button, Typography, Space, Tag } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import MotoristaGuinchoStatusTag from './MotoristaGuinchoStatusTag';

const { Text } = Typography;

const DriverCard = ({ driver, onEdit }) => {
    return (
        <Card
            hoverable
            style={{ marginBottom: 16, borderRadius: 8, border: '1px solid #f0f0f0' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {/* Informações do Motorista */}
                <div>
                    <Space style={{ marginBottom: 8 }}>
                        <UserOutlined style={{ marginRight: 4, color: '#1677ff' }} />
                        <Text strong>{driver.nomeCompleto}</Text>
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

                {/* Botão de Ação */}
                <Button
                    type="default"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(driver.id)}
                >
                    Editar
                </Button>
            </div>
        </Card>
    );
};

export default DriverCard;