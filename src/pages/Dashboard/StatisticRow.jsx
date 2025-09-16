import { Row, Col } from 'antd';
import {
    ExclamationCircleOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    DollarOutlined
} from '@ant-design/icons';
import StatisticCard from './StatisticCard';
import { useChamados } from '../../hooks/useChamados';
import dayjs from 'dayjs';

const StatisticRow = () => {

    // Busca de dados
    const hojeInicio = dayjs().startOf('day').toISOString();
    const hojeFim = dayjs().endOf('day').toISOString();

    // Buscas separadas para cada métrica 
    const { data: abertosData, isLoading: loadingAbertos } = useChamados({ status: 'ABERTO' });
    const { data: emAndamentoData, isLoading: loadingEmAndamento } = useChamados({ status: 'EM_ANDAMENTO' });
    const { data: finalizadosHojeData, isLoading: loadingFinalizados } = useChamados({
        status: 'FINALIZADO',
        dataFechamentoInicio: hojeInicio,
        dataFechamentoFim: hojeFim,
    });

    if (loadingAbertos || loadingEmAndamento || loadingFinalizados) {
        return <p>Carregando estatísticas...</p>;
    }

    // Cálculos
    const totalAbertos = abertosData?.totalElements || 0;
    const totalEmAndamento = emAndamentoData?.totalElements || 0;
    const totalFinalizadosHoje = finalizadosHojeData?.totalElements || 0;

    const receitaDoDia = (finalizadosHojeData?.content || []).reduce((acc, c) => acc + (Number(c.valorFinal) || 0), 0);


    // Montagem dos cards
    const stats = [
        {
            title: "Chamados Abertos",
            value: totalAbertos,
            icon: <ExclamationCircleOutlined style={{ color: '#1677ff', fontSize: 24 }} />
        },
        {
            title: "Em Andamento",
            value: totalEmAndamento,
            icon: <ClockCircleOutlined style={{ color: '#faad14', fontSize: 24 }} />
        },
        {
            title: "Finalizados (Hoje)",
            value: totalFinalizadosHoje,
            icon: <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 24 }} />
        },
        {
            title: "Receita do Dia",
            value: `R$ ${receitaDoDia.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            icon: <DollarOutlined style={{ color: '#1677ff', fontSize: 24 }} />
        }
    ];

    return (
        <Row gutter={[16, 16]}>
            {stats.map((stat, index) => (
                <Col key={index} xs={24} sm={12} md={6}>
                    <StatisticCard {...stat} description=" " />
                </Col>
            ))}
        </Row>
    );
};

export default StatisticRow;