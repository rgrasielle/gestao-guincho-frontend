import React from 'react';
import { Card, Button, Typography, Space } from 'antd';
import { TruckOutlined, EditOutlined } from '@ant-design/icons';
import MotoristaGuinchoStatusTag from './MotoristaGuinchoStatusTag';

const { Text } = Typography;

const GuinchoCard = ({ guincho, onEdit }) => {
    return (
        <Card
            hoverable
            style={{ marginBottom: 16, borderRadius: 8, border: '1px solid #f0f0f0' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {/* Informações do Guincho */}
                <div>
                    <Space style={{ marginBottom: 8 }}>
                        <TruckOutlined style={{ marginRight: 4, color: '#1677ff' }} />
                        <Text strong>{guincho.modelo}</Text>
                        <MotoristaGuinchoStatusTag status={guincho.status} />
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

                {/* Botão de Ação */}
                <Button
                    type="default"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(guincho.id)}
                >
                    Editar
                </Button>
            </div>
        </Card>
    );
};

export default GuinchoCard;