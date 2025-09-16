import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

const StatisticCard = ({ title, value, description, icon }) => {
    return (
        <Card hoverable style={{ height: '100%', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={5} style={{ margin: 0 }}>
                    {title}
                </Title>
                {icon}
            </div>
            <Title level={2} style={{ margin: '12px 0 4px 0' }}>
                {value}
            </Title>
            <Text type="secondary">{description}</Text>
        </Card>
    );
};

export default StatisticCard;