import { Tag } from 'antd';

const StatusTag = ({ status }) => {
    let color = 'default';
    let text = status;

    // Lógica para determinar a cor com base no status vindo do back-end
    switch (status) {
        case 'ABERTO':
            color = 'processing'; // Azul do Ant Design
            text = 'Aberto';
            break;
        case 'EM_ANDAMENTO':
            color = 'warning'; // Amarelo/Laranja
            text = 'Em Andamento';
            break;
        case 'FINALIZADO':
            color = 'success'; // Verde
            text = 'Finalizado';
            break;
        default:
            color = 'default'; // Cinza
            text = status || 'Indefinido'; // Garante que não apareça vazio
            break;
    }

    return <Tag color={color}>{text}</Tag>;
};

export default StatusTag;