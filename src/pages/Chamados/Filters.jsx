import React, { useState } from 'react';
import { Card, Input, Select, Button, Typography, Space, Row, Col } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';

const { Option } = Select;
const { Text } = Typography;

const Filters = () => {
    const [showMoreFilters, setShowMoreFilters] = useState(false);

    const handleToggleFilters = () => {
        setShowMoreFilters(!showMoreFilters);
    };

    return (
        <Card style={{ marginBottom: 24 }} title="Filtros">
            {/* Linha 1 de Filtros */}
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
                        onClick={handleToggleFilters} // 👈 CORRIGIDO: Agora o evento de clique está correto
                    >
                        Mais Filtros
                    </Button>
                </Col>
            </Row>

            {/* Linha 2 de Filtros (Renderização Condicional) */}
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

export default Filters;