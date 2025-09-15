import { Row, Col } from 'antd';
import { TeamOutlined, TruckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import StatisticCard from './StatisticCard';

import { useMotoristas } from '../../hooks/useMotoristas';
import { useGuinchos } from '../../hooks/useGuinchos';
import { useChamados } from '../../hooks/useChamados';

const BottomStatisticRow = () => {
    // Pegando os dados dos hooks
    const { data: motoristas, isLoading: loadingMotoristas, error: errorMotoristas } = useMotoristas();
    const { data: guinchos, isLoading: loadingGuinchos, error: errorGuinchos } = useGuinchos();
    const { data: chamadosData, isLoading: loadingChamados, error: errorChamados } = useChamados();

    // Tratamento de carregamento
    if (loadingMotoristas || loadingGuinchos || loadingChamados) {
        return <p>Carregando estatísticas...</p>;
    }

    // Tratamento de erros
    if (errorMotoristas || errorGuinchos || errorChamados) {
        return <p>Erro ao carregar estatísticas.</p>;
    }

    const chamados = chamadosData?.content || [];

    // Cálculos das estatísticas
    const totalMotoristas = motoristas?.length || 0;
    const totalGuinchos = guinchos?.length || 0;
    const chamadosAbertos = chamados?.filter(c => c.status === "aberto").length || 0;

    // Montagem dos cards
    const bottomStats = [
        {
            title: "Motoristas",
            value: totalMotoristas,
            description: " ",
            icon: <TeamOutlined style={{ color: '#52c41a', fontSize: 24 }} />
        },
        {
            title: "Guinchos",
            value: totalGuinchos,
            description: " ",
            icon: <TruckOutlined style={{ color: '#52c41a', fontSize: 24 }} />
        },
        {
            title: "Chamados Abertos",
            value: chamadosAbertos,
            description: " ",
            icon: <ExclamationCircleOutlined style={{ color: '#faad14', fontSize: 24 }} />
        }
    ];

    return (
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
    );
};

export default BottomStatisticRow;
