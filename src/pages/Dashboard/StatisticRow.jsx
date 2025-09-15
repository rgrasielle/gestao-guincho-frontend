import { Row, Col } from 'antd';
import {
    PhoneOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    DollarOutlined
} from '@ant-design/icons';
import StatisticCard from './StatisticCard';
import { useChamados } from '../../hooks/useChamados';

const StatisticRow = () => {
    // Pegando os dados de chamados pelo hook
    const { data, isLoading, error } = useChamados();

    // Tratamento de carregamento
    if (isLoading) {
        return <p>Carregando estatísticas...</p>;
    }

    if (error) {
        return <p>Erro ao carregar estatísticas.</p>;
    }

    // A lista de chamados está em data.content
    const chamados = data?.content || [];

    // Cálculos das estatísticas
    const totalChamados = chamados.length;
    const emAndamento = chamados.filter(c => c.status === "EM_ANDAMENTO").length;
    const finalizados = chamados.filter(c => c.status === "FINALIZADO").length;
    const receitaTotal = chamados.reduce((acc, c) => acc + (Number(c.valorFinal) || 0), 0);

    // Montagem dos cards
    const stats = [
        {
            title: "Total de Chamados",
            value: totalChamados,
            description: " ",
            icon: <PhoneOutlined style={{ color: '#1677ff', fontSize: 24 }} />
        },
        {
            title: "Em Andamento",
            value: emAndamento,
            description: " ",
            icon: <ClockCircleOutlined style={{ color: '#ffc53d', fontSize: 24 }} />
        },
        {
            title: "Finalizados",
            value: finalizados,
            description: " ",
            icon: <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 24 }} />
        },
        {
            title: "Receita Total",
            value: `R$ ${receitaTotal.toLocaleString("pt-BR")}`,
            description: " ",
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
