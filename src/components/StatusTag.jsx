import { Tag } from 'antd';

const StatusTag = ({ status }) => {
    let color = 'default';
    let text = status;

    // Lógica para determinar a cor e o texto com base no status
    switch (status) {
        case 'Aberto':
            color = 'processing'; // Ou uma cor hexadecimal, como #1677ff
            break;
        case 'Em andamento':
            color = 'warning'; // Ou uma cor hexadecimal, como #ffc53d
            break;
        case 'Finalizado':
            color = 'success'; // Ou uma cor hexadecimal, como #52c41a
            break;
        default:
            color = 'default';
            break;
    }

    return <Tag color={color}>{text}</Tag>;
};

export default StatusTag;