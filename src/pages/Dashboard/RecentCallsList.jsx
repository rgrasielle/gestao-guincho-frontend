
import { Card, Button, Typography, Space, List } from 'antd';
import StatusTag from '../../components/StatusTag';
import { useChamados } from '../../hooks/useChamados';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';

// Configura o dayjs para usar o plugin e a localização
dayjs.extend(relativeTime);
dayjs.locale('pt-br');

const { Text } = Typography;

const RecentCallsList = ({ onShowAll, onShowViewModal }) => {
    const { data, isLoading, error } = useChamados();

    // A lista de chamados está dentro de data.content
    const chamados = data?.content || [];

    if (isLoading) {
        return <Card title="Chamados Recentes">Carregando...</Card>;
    }

    if (error) {
        return <Card title="Chamados Recentes">Erro ao carregar chamados.</Card>;
    }

    // Pegamos apenas os últimos 3 chamados (ordenados por data de criação, se tiver campo `createdAt`)
    const recentCalls = [...chamados]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Verifique se seu DTO possui o campo 'createdAt'
        .slice(0, 3)
        .map((c) => ({
            id: c.id,
            status: c.status,
            // NOVO: Calcula o tempo relativo a partir de agora
            timeAgo: c.createdAt ? dayjs(c.createdAt).fromNow(true) : "—", // O 'true' remove o "há"
            clientName: c.clienteNome || "—",
            car: `${c.veiculoModelo || ""} • ${c.veiculoPlaca || ""}`,
            // NOVO: Adicionamos origem e destino juntos para o endereço
            address: `${c.origemFormatada} → ${c.destinoFormatado}`,
            motoristaNome: c.motoristaNome || "Não atribuído",
            chamadoOriginal: c
        }));

    return (
        <Card
            title="Chamados Recentes"
            extra={
                <Button type="link" onClick={onShowAll}>
                    Ver Todos
                </Button>
            }
        >
            <List
                itemLayout="horizontal"
                dataSource={recentCalls}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button
                                type="link"
                                key="list-view-details"
                                onClick={() => onShowViewModal(item.id)}
                            >
                                Ver Detalhes
                            </Button>,
                        ]}
                    >
                        <List.Item.Meta
                            title={
                                <Space>
                                    <Text strong>{`CH${String(item.id).padStart(3, '0')}`}</Text>
                                    <StatusTag status={item.status} />
                                    <Text type="secondary">{item.timeAgo}</Text>
                                </Space>
                            }
                            description={
                                <>
                                    <Text strong>{item.clientName}</Text> • {item.car} <br />
                                    <Text type="secondary">{item.address}</Text> <br />
                                    <Text type="secondary">Motorista: {item.motoristaNome}</Text>
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};


export default RecentCallsList;