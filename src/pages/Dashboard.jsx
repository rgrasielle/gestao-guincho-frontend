import React from 'react';
import { Button, Space, Row, Col, Card, Typography, List, Tag } from 'antd';
import {
    PhoneOutlined,
    TruckOutlined,
    DollarOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    ClockCircleOutlined,
    TeamOutlined,
    PlusOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// Componente: StatusTag
const StatusTag = ({ status }) => {
    let color = 'default';
    let text = status;

    switch (status) {
        case 'Aberto':
            color = 'processing';
            break;
        case 'Em andamento':
            color = 'warning';
            break;
        case 'Finalizado':
            color = 'success';
            break;
        default:
            color = 'default';
            break;
    }

    return <Tag color={color}>{text}</Tag>;
};

// Componente: StatisticCard
const StatisticCard = ({ title, value, description, icon }) => {
    return (
        <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={4} style={{ margin: 0 }}>
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

// Componente: RecentCallsList
const RecentCallsList = ({ calls }) => {
    return (
        <Card
            title="Chamados Recentes"
            extra={<Button type="link">Ver Todos</Button>}
        >
            <List
                itemLayout="horizontal"
                dataSource={calls}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button type="link" key="list-loadmore-edit">Ver Detalhes</Button>
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

// Componente: DashboardPage
const DashboardPage = () => {

    // Dados para os cards de estatísticas (de cima)
    const topStats = [
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

    // Dados de exemplo para a lista de chamados recentes
    const recentCalls = [
        {
            id: 'CH001',
            status: 'Aberto',
            time: '15 min',
            clientName: 'João Silva',
            car: 'Honda Civic • ABC-1234',
            address: 'Centro, São Paulo — Vila Olímpia, São Paulo',
            driver: 'Carlos Santos'
        },
        {
            id: 'CH002',
            status: 'Em andamento',
            time: '5 min',
            clientName: 'Maria Santos',
            car: 'Toyota Corolla • XYZ-5678',
            address: 'Ipanema, Rio de Janeiro — Copacabana, Rio de Janeiro',
            driver: '—'
        },
        {
            id: 'CH003',
            status: 'Finalizado',
            time: '2h ago',
            clientName: 'Pedro Oliveira',
            car: 'Ford Focus • DEF-9012',
            address: 'Boa Viagem, Recife — Centro, Recife',
            driver: 'Ana Costa'
        },
    ];

    // Dados para os cards de baixo
    const bottomStats = [
        {
            title: "Motoristas Disponíveis",
            value: "12",
            description: "de 15 motoristas",
            icon: <TeamOutlined style={{ color: '#52c41a', fontSize: 24 }} />
        },
        {
            title: "Guinchos Disponíveis",
            value: "8",
            description: "de 10 guinchos",
            icon: <TruckOutlined style={{ color: '#52c41a', fontSize: 24 }} />
        },
        {
            title: "Chamados Pendentes",
            value: "5",
            description: "aguardando atribuição",
            icon: <ExclamationCircleOutlined style={{ color: '#faad14', fontSize: 24 }} />
        }
    ];

    return (
        <div>
            {/* Linha de botões */}
            <Space size="middle" style={{ marginBottom: 24, width: '100%' }}>
                <Button type="primary" size="large" icon={<PlusOutlined />}>
                    Novo Chamado
                </Button>
                <Button size="large" icon={<TeamOutlined />}>
                    Cadastrar Motorista
                </Button>
                <Button size="large" icon={<TruckOutlined />}>
                    Cadastrar Guincho
                </Button>
                <Button size="large" icon={<DollarOutlined />}>
                    Cadastrar Valores dos Serviços
                </Button>
            </Space>

            {/* Linha de cards de estatísticas (de cima) */}
            <Row gutter={[16, 16]}>
                {topStats.map((stat, index) => (
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

            {/* Seção de Chamados Recentes */}
            <div style={{ marginTop: 24 }}>
                <RecentCallsList calls={recentCalls} />
            </div>

            {/* Nova linha de cards (de baixo) */}
            <div style={{ marginTop: 24 }}>
                <Row gutter={[16, 16]}>
                    {bottomStats.map((stat, index) => (
                        <Col key={index} xs={24} sm={12} md={8}>
                            <StatisticCard
                                title={stat.title}
                                value={stat.value}
                                description={stat.description}
                                icon={stat.icon}
                            />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default DashboardPage;