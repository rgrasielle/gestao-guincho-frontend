import React, { useState } from 'react';
import { Card, Input, Select, Button, Typography, Space, Divider, Pagination as AntdPagination, Row, Col, Tag, DatePicker } from 'antd';
import {
    SearchOutlined,
    PhoneOutlined,
    CarOutlined,
    GlobalOutlined,
    EnvironmentOutlined,
    CalendarOutlined,
    FilterOutlined // 👈 Importe o novo ícone
} from '@ant-design/icons';

const { Option } = Select;
const { Text, Title } = Typography;

// Componente: StatusTag
const StatusTag = ({ status }) => {
    let color = 'default';
    let text = status;

    switch (status) {
        case 'Em Andamento':
            color = 'processing';
            break;
        case 'Aguardando':
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

// Componente: Filters (CORRIGIDO)
const Filters = () => {
    const [showMoreFilters, setShowMoreFilters] = useState(false); // 👈 Adicionado o estado

    const handleToggleFilters = () => {
        setShowMoreFilters(!showMoreFilters); // 👈 Adicionada a função
    };

    return (
        <Card style={{ marginBottom: 24 }} title="Filtros">
            <Row gutter={[16, 16]} align="bottom">
                <Col xs={24} sm={12} md={6}>
                    <Text strong style={{ marginBottom: 8, display: 'block' }}>Buscar</Text>
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Código, placa, cliente..."
                        style={{ width: '100%' }}
                    />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Text strong style={{ marginBottom: 8, display: 'block' }}>Status</Text>
                    <Select defaultValue="todos" style={{ width: '100%' }}>
                        <Option value="todos">Todos</Option>
                        <Option value="em_andamento">Em Andamento</Option>
                        <Option value="aguardando">Aguardando</Option>
                        <Option value="finalizado">Finalizado</Option>
                    </Select>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Text strong style={{ marginBottom: 8, display: 'block' }}>Tipo de Serviço</Text>
                    <Select defaultValue="todos" style={{ width: '100%' }}>
                        <Option value="todos">Todos</Option>
                        <Option value="socorro">Socorro Mecânico</Option>
                        <Option value="reboque">Reboque</Option>
                    </Select>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Text strong style={{ marginBottom: 8, display: 'block', visibility: 'hidden' }}>Ações</Text>
                    <Button
                        type="default"
                        icon={<FilterOutlined />}
                        style={{ width: '100%' }}
                        onClick={handleToggleFilters} // 👈 Adicionado o evento de clique
                    >
                        Mais Filtros
                    </Button>
                </Col>
            </Row>

            {showMoreFilters && (
                <Row gutter={[16, 16]} style={{ marginTop: 16 }} align="bottom">
                    <Col xs={24} sm={12} md={6}>
                        <Text strong style={{ marginBottom: 8, display: 'block' }}>Seguradora</Text>
                        <Select defaultValue="todas" style={{ width: '100%' }}>
                            <Option value="todas">Todas</Option>
                            <Option value="porto_seguro">Porto Seguro</Option>
                            <Option value="bradesco">Bradesco Seguros</Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Text strong style={{ marginBottom: 8, display: 'block' }}>Motorista</Text>
                        <Select defaultValue="todos" style={{ width: '100%' }}>
                            <Option value="todos">Todos</Option>
                            <Option value="carlos_santos">Carlos Santos</Option>
                            <Option value="maria_oliveira">Maria Oliveira</Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Text strong style={{ marginBottom: 8, display: 'block' }}>Data Início</Text>
                        <DatePicker placeholder="dd/mm/aaaa" format="DD/MM/YYYY" style={{ width: '100%' }} />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Text strong style={{ marginBottom: 8, display: 'block' }}>Data Fim</Text>
                        <DatePicker placeholder="dd/mm/aaaa" format="DD/MM/YYYY" style={{ width: '100%' }} />
                    </Col>
                </Row>
            )}
        </Card>
    );
};

// Componente: CallListItem
const CallListItem = ({ call }) => {
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
                        <Button>Ver</Button>
                        <Button type="primary">Editar</Button>
                    </Space>
                </div>
            </div>
        </Card>
    );
};

// Componente: CallsList
const CallsList = ({ calls }) => {
    return (
        <div>
            {calls.map((call, index) => (
                <CallListItem key={index} call={call} />
            ))}
        </div>
    );
};

// Componente: CallsPage
const CallsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalCallsCount = 127;
    const pageSize = 3;

    const allCalls = [
        { id: 'CH001', status: 'Em Andamento', clientName: 'João Silva', phone: '(11) 9999-9999', car: 'Honda Civic 2020 • ABC-1234', sinistro: 'SIN2024001', insurance: 'Porto Seguro', origin: 'Rua das Flores, 123 - Centro, São Paulo/SP', destination: 'Av. Paulista, 500 - Bela Vista, São Paulo/SP', date: '2024-01-15 às 14:30', serviceType: 'Reboque', driver: 'Carlos Santos', truck: 'Guincho 01 - ABC-5678', price: 'R$ 280,00' },
        { id: 'CH002', status: 'Aguardando', clientName: 'Maria Santos', phone: '(21) 8888-8888', car: 'Toyota Corolla 2019 • XYZ-5678', sinistro: 'SIN2024002', insurance: 'Bradesco Seguros', origin: 'Rua de Ipanema, 200 - Ipanema, Rio de Janeiro/RJ', destination: 'Rua Barata Ribeiro, 100 - Copacabana, Rio de Janeiro/RJ', date: '2024-01-15 às 15:45', serviceType: 'Socorro Mecânico', driver: '—', truck: '—', price: 'R$ 150,00' },
        { id: 'CH003', status: 'Finalizado', clientName: 'Pedro Oliveira', phone: '(81) 7777-7777', car: 'Ford Focus 2018 • DEF-9012', sinistro: 'SIN2024003', insurance: 'Allianz Seguros', origin: 'Av. Boa Viagem, 300 - Boa Viagem, Recife/PE', destination: 'Rua do Carmo, 50 - Centro, Recife/PE', date: '2024-01-14 às 09:15', serviceType: 'Reboque', driver: 'Ana Costa', truck: 'Guincho 02 - DEF-1234', price: 'R$ 320,00' },
    ];

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentCalls = allCalls.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Filters />
            <CallsList calls={currentCalls} />
            <div style={{ textAlign: 'right', marginTop: 24 }}>
                <AntdPagination
                    total={totalCallsCount}
                    pageSize={pageSize}
                    current={currentPage}
                    onChange={handlePageChange}
                    showTotal={(total, range) => `Mostrando ${range[0]}-${range[1]} de ${total} chamados`}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};

export default CallsPage;