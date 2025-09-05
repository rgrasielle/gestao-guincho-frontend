
import { Card, Button, Typography, Space, List } from 'antd';
import StatusTag from '../../components/StatusTag';

const { Text } = Typography;

const RecentCallsList = ({ calls, onShowAll, onShowViewModal }) => {
    return (
        <Card
            title="Chamados Recentes"
            extra={
                <Button type="link" onClick={onShowAll} >
                    Ver Todos
                </Button>}
        >
            <List
                itemLayout="horizontal"
                dataSource={calls}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button
                                type="link"
                                key="list-view-details"
                                onClick={() => onShowViewModal(item.id)}
                            >
                                Ver Detalhes
                            </Button>
                        ]}
                    >
                        <List.Item.Meta
                            title={
                                <Space>
                                    <Text strong>{item.id}</Text>
                                    <StatusTag status={item.status} />
                                    <Text type="secondary">{item.time}</Text>
                                </Space>
                            }
                            description={
                                <div>
                                    <Text strong>{item.clientName}</Text> • {item.car} <br />
                                    <Text type="secondary">{item.address}</Text>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default RecentCallsList;