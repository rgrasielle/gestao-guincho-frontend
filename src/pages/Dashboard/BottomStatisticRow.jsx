import { Row, Col } from 'antd';
import { TeamOutlined, TruckOutlined, PhoneOutlined, DollarOutlined } from '@ant-design/icons';
import StatisticCard from './StatisticCard';
import { useMotoristas } from '../../hooks/useMotoristas';
import { useGuinchos } from '../../hooks/useGuinchos';
import { useChamados } from '../../hooks/useChamados';
import dayjs from 'dayjs';

const BottomStatisticRow = () => {
    // BUSCA DE DADOS
    const { data: motoristasData, isLoading: loadingMotoristas } = useMotoristas();
    const { data: guinchosData, isLoading: loadingGuinchos } = useGuinchos();

    // Define o intervalo para o mês atual
    const inicioDoMes = dayjs().startOf('month').toISOString();
    const fimDoMes = dayjs().endOf('month').toISOString();

    // Busca o total de chamados criados no mês atual (usando dataAbertura)
    const { data: chamadosMesData, isLoading: loadingChamadosMes } = useChamados({
        dataAberturaInicio: inicioDoMes,
        dataAberturaFim: fimDoMes,
    });

    // Busca os chamados FINALIZADOS no mês atual para calcular a receita (usando dataFechamento)
    const { data: receitaMesData, isLoading: loadingReceitaMes } = useChamados({
        status: 'FINALIZADO',
        dataFechamentoInicio: inicioDoMes,
        dataFechamentoFim: fimDoMes,
    });

    if (loadingMotoristas || loadingGuinchos || loadingChamadosMes || loadingReceitaMes) {
        return <p>Carregando estatísticas...</p>;
    }

    // CÁLCULOS DAS ESTATÍSTICAS

    // Motoristas e Guinchos Disponíveis
    const motoristas = motoristasData || [];
    const totalMotoristas = motoristas.length;
    const motoristasDisponiveis = motoristas.filter(m => m.disponibilidade === 'DISPONIVEL').length;

    const guinchos = guinchosData || [];
    const totalGuinchos = guinchos.length;
    const guinchosDisponiveis = guinchos.filter(g => g.disponibilidade === 'DISPONIVEL').length;

    // Totais do Mês
    const totalChamadosMes = chamadosMesData?.totalElements || 0;
    const receitaTotalMes = (receitaMesData?.content || []).reduce((acc, c) => acc + (Number(c.valorFinal) || 0), 0);

    // MONTAGEM DOS CARDS 
    const bottomStats = [
        {
            title: "Motoristas Disponíveis",
            value: motoristasDisponiveis, // O valor principal é só o número
            description: `de ${totalMotoristas} motoristas`, // A descrição vai aqui
            icon: <TeamOutlined style={{ color: '#52c41a', fontSize: 24 }} />
        },
        {
            title: "Guinchos Disponíveis",
            value: guinchosDisponiveis, // O valor principal é só o número
            description: `de ${totalGuinchos} guinchos`, // A descrição vai aqui
            icon: <TruckOutlined style={{ color: '#52c41a', fontSize: 24 }} />
        },
        {
            title: "Total de Chamados (Mês)",
            value: totalChamadosMes,
            description: " ", // Mantém vazio ou remove se não precisar de uma descrição extra
            icon: <PhoneOutlined style={{ color: '#1677ff', fontSize: 24 }} />
        },
        {
            title: "Receita Total (Mês)",
            value: `R$ ${receitaTotalMes.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            description: " ", // Mantém vazio ou remove
            icon: <DollarOutlined style={{ color: '#1677ff', fontSize: 24 }} />
        }
    ];

    return (
        <Row gutter={[16, 16]} align="stretch">
            {bottomStats.map((stat, index) => (
                <Col key={index} xs={24} sm={12} md={6} style={{ display: 'flex' }}>
                    <StatisticCard
                        title={stat.title}
                        value={stat.value}
                        description={stat.description} // Passa a nova descrição
                        icon={stat.icon}
                    />
                </Col>
            ))}
        </Row>
    );
};

export default BottomStatisticRow;