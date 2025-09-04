import { Row, Col } from 'antd';
import { PhoneOutlined, ClockCircleOutlined, CheckCircleOutlined, DollarOutlined } from '@ant-design/icons';
import StatisticCard from './StatisticCard';

const StatisticRow = () => {
    // Dados de exemplo para os cards de estatísticas
    const stats = [
        {
            title: "Total de Chamados",
            value: "127",
            description: "+12% em relação ao mês passado",
            icon: <PhoneOutlined style={{ color: '#1677ff', fontSize: 24 }} />
        },
        {
            title: "Em Andamento",
            value: "23",
            description: "+5% em relação ao mês passado",
            icon: <ClockCircleOutlined style={{ color: '#ffc53d', fontSize: 24 }} />
        },
        {
            title: "Finalizados Hoje",
            value: "8",
            description: "+2% em relação ao mês passado",
            icon: <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 24 }} />
        },
        {
            title: "Receita Mensal",
            value: "R$ 45.320",
            description: "+18% em relação ao mês passado",
            icon: <DollarOutlined style={{ color: '#1677ff', fontSize: 24 }} />
        }
    ];

    return (
        <Row gutter={[16, 16]}>
            {stats.map((stat, index) => (
                <Col key={index} xs={24} sm={12} md={6}>
                    <StatisticCard
                        title={stat.title}
                        value={stat.value}
                        description={stat.description}
                        icon={stat.icon}
                    />
                </Col>
            ))}
        </Row>
    );
};

export default StatisticRow;