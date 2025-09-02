import React from 'react';
import { Tag } from 'antd';

const MotoristaGuinchoStatusTag = ({ status }) => {
    let color = 'default';
    let text = status;

    // Lógica para determinar a cor e o texto com base no status
    switch (status) {
        case 'Disponível':
            color = 'success'; // Verde para disponível
            break;
        case 'Em Atendimento':
            color = 'warning'; // Amarelo para em atendimento
            break;
        case 'Indisponível':
            color = 'error'; // Vermelho para indisponível
            break;
        default:
            color = 'default';
            break;
    }

    return <Tag color={color}>{text}</Tag>;
};

export default MotoristaGuinchoStatusTag;