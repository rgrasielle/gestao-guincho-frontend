import { Card, Button, Typography, Space, Divider } from 'antd';
import {
    PhoneOutlined,
    CarOutlined,
    GlobalOutlined,
    EnvironmentOutlined,
    CalendarOutlined,
    DollarOutlined,
    EditOutlined,
    EyeOutlined
} from '@ant-design/icons';
import StatusTag from './StatusTag';

const { Text } = Typography;

const CallListItem = ({ call, onShowValuesModal, onShowEditModal, onShowViewModal }) => {
    return (
        <Card style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, marginRight: 24 }}>
                    <Space style={{ marginBottom: 8 }}>
                        <Text strong>{call.id}</Text>
                        <StatusTag status={call.status} />
                    </Space>
                    <div style={{ marginBottom: 8 }}>
                        <Text strong>{call.clientName}</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                        <PhoneOutlined style={{ marginRight: 8, color: '#1677ff' }} />
                        <Text>{call.phone}</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                        <CarOutlined style={{ marginRight: 8, color: '#1677ff' }} />
                        <Text>{call.car}</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                        <GlobalOutlined style={{ marginRight: 8, color: '#1677ff' }} />
                        <Text strong>Sinistro: </Text>
                        <Text>{call.sinistro}</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <GlobalOutlined style={{ marginRight: 8, color: '#1677ff' }} />
                        <Text strong>Seguradora: </Text>
                        <Text>{call.insurance}</Text>
                    </div>
                </div>
                <Divider type="vertical" style={{ height: 'auto', margin: '0 24px' }} />
                <div style={{ flex: 1, marginRight: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                        <EnvironmentOutlined style={{ marginRight: 8, color: '#1677ff' }} />
                        <Text strong>Origem:</Text>
                    </div>
                    <div style={{ marginLeft: 24, marginBottom: 8 }}>
                        <Text>{call.origin}</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                        <EnvironmentOutlined style={{ marginRight: 8, color: '#1677ff' }} />
                        <Text strong>Destino:</Text>
                    </div>
                    <div style={{ marginLeft: 24, marginBottom: 8 }}>
                        <Text>{call.destination}</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                        <CalendarOutlined style={{ marginRight: 8, color: '#1677ff' }} />
                        <Text>{call.date}</Text>
                    </div>
                    <Button type="default" style={{ marginTop: 8 }}>{call.serviceType}</Button>
                </div>
                <Divider type="vertical" style={{ height: 'auto', margin: '0 24px' }} />
                <div style={{ flex: 1, textAlign: 'right' }}>
                    <div style={{ marginBottom: 8 }}>
                        <Text>Motorista:</Text>
                        <br />
                        <Text strong>{call.driver}</Text>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                        <Text>Guincho:</Text>
                        <br />
                        <Text strong>{call.truck}</Text>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <Text strong>{call.price}</Text>
                    </div>

                    <Space>
                        <Button icon={<EyeOutlined />} onClick={() => onShowViewModal(call.id)}>Ver</Button>
                        <Button icon={<EditOutlined />} onClick={() => onShowEditModal(call.id)}>Editar</Button>
                        <Button
                            type="primary"
                            icon={<DollarOutlined />}
                            onClick={() => onShowValuesModal(call.id)}
                        >
                            Valores
                        </Button>
                    </Space>
                </div>
            </div>
        </Card>
    );
};

export default CallListItem;