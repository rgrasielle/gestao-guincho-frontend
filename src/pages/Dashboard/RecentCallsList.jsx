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

    // Pega apenas os últimos 3 chamados (ordenados por data de criação)
    const recentCalls = [...chamados]
        // Ordena diretamente pelo timestamp numérico (o maior é o mais recente)
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 3)
        .map((c) => {
            return {
                id: c.id,
                status: c.status,
                // CORREÇÃO FINAL: Multiplica o timestamp em segundos por 1000 para converter para milissegundos
                timeAgo: c.createdAt ? dayjs(c.createdAt * 1000).fromNow(true) : "—",
                clientName: c.clienteNome || "—",
                car: `${c.veiculoModelo || ""} • ${c.veiculoPlaca || ""}`,
                address: `${c.origemFormatada || "Origem não informada"} → ${c.destinoFormatado || "Destino não informado"}`,
                motoristaNome: c.motoristaNome || "Não atribuído",
                chamadoOriginal: c
            };
        });

    return (
        <Card hoverable
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