import { Card, Input, Select, Button, Typography, Space, Row, Col } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

import { useMotoristas } from '../../hooks/useMotoristas';
import { useSeguradoras, useTiposServico } from '../../hooks/useChamados';

const { Option } = Select;
const { Text } = Typography;

const Filters = ({ onFilterChange, showMoreFilters, setShowMoreFilters, filters, buscaValue }) => {

    const { data: seguradorasUnicas, isLoading: loadingSeguradoras } = useSeguradoras();
    const { data: tiposDeServicoUnicos, isLoading: loadingTipos } = useTiposServico();
    const { data: motoristas, isLoading: loadingMotoristas } = useMotoristas();

    const handleToggleFilters = () => {
        setShowMoreFilters(!showMoreFilters);
    };

    // Função para notificar a página pai sobre a mudança de um filtro
    const handleSelectChange = (value, fieldName) => {
        onFilterChange(fieldName, value);
    };

    // Função para o campo de busca de texto
    const handleInputChange = (event) => {
        onFilterChange('busca', event.target.value);
    };

    return (
        <Card style={{ marginBottom: 24 }} title="Filtros">
            {/* Linha 1 de Filtros */}
            <Row gutter={[16, 16]} align="bottom">
                <Col xs={24} sm={12} md={6}>
                    <Text strong style={{ marginBottom: 8, display: 'block' }}>Buscar</Text>
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Código, Sinistro, Placa ou Cliente"
                        onChange={handleInputChange}
                        value={buscaValue}
                    />
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <Text strong style={{ marginBottom: 8, display: 'block' }}>Status</Text>
                    <Select
                        style={{ width: '100%' }}
                        onChange={(value) => handleSelectChange(value, 'status')}
                        value={filters.status || 'todos'}
                    >
                        <Option value="todos">Todos</Option>
                        <Option value="em_andamento">Em Andamento</Option>
                        <Option value="aberto">Aberto</Option>
                        <Option value="finalizado">Finalizado</Option>
                    </Select>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <Text strong style={{ marginBottom: 8, display: 'block' }}>Tipo de Serviço</Text>
                    <Select
                        style={{ width: '100%' }}
                        loading={loadingTipos}
                        onChange={(value) => handleSelectChange(value, 'tipoServico')}
                        value={filters.tipoServico || 'todos'}
                    >
                        <Option value="todos">Todos</Option>
                        {(tiposDeServicoUnicos || []).map(tipo => (
                            <Option key={tipo} value={tipo}>{tipo}</Option>
                        ))}
                    </Select>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <Text strong style={{ marginBottom: 8, display: 'block', visibility: 'hidden' }}>Ações</Text>
                    <Button
                        type="default"
                        icon={<FilterOutlined />}
                        style={{ width: '100%' }}
                        onClick={handleToggleFilters}
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
                        <Select
                            style={{ width: '100%' }}
                            loading={loadingSeguradoras}
                            onChange={(value) => handleSelectChange(value, 'seguradora')}
                            value={filters.seguradora || 'todas'}
                        >
                            <Option value="todas">Todas</Option>
                            {(seguradorasUnicas || []).map(seg => (
                                <Option key={seg} value={seg}>{seg}</Option>
                            ))}
                        </Select>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Text strong style={{ marginBottom: 8, display: 'block' }}>Motorista</Text>
                        <Select
                            style={{ width: '100%' }}
                            loading={loadingMotoristas}
                            onChange={(value) => handleSelectChange(value, 'motoristaId')}
                            value={filters.motoristaId || 'todos'}
                        >
                            <Option value="todos">Todos</Option>
                            {(motoristas || []).map(motorista => (
                                <Option key={motorista.id} value={motorista.id}>{motorista.nome}</Option>
                            ))}
                        </Select>
                    </Col>


                    <Col xs={24} sm={12} md={6}>
                        <Text strong>Data Início</Text>
                        <DatePicker
                            placeholder="dd/mm/aaaa"
                            format="DD/MM/YYYY"
                            style={{ width: '100%' }}
                            onChange={(date) => onFilterChange('dataServicoInicio', date ? date.format('YYYY-MM-DD') : null)}
                            value={filters.dataServicoInicio ? dayjs(filters.dataServicoInicio, 'YYYY-MM-DD') : null}
                        />
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Text strong>Data Fim</Text>
                        <DatePicker
                            placeholder="dd/mm/aaaa"
                            format="DD/MM/YYYY"
                            style={{ width: '100%' }}
                            onChange={(date) => onFilterChange('dataServicoFim', date ? date.format('YYYY-MM-DD') : null)}
                            value={filters.dataServicoFim ? dayjs(filters.dataServicoFim, 'YYYY-MM-DD') : null}
                        />
                    </Col>
                </Row>
            )}
        </Card>
    );
};

export default Filters;