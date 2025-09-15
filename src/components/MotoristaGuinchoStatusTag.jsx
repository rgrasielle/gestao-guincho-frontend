import { Tag } from 'antd';

const MotoristaGuinchoStatusTag = ({ status }) => {
    let color = 'default';
    let text = status;

    // Lógica para determinar a cor com base no status vindo do back-end
    switch (status) {
        case 'DISPONIVEL':
            color = 'success'; // Verde
            text = 'Disponível'; // Mantemos o texto bonito para o usuário
            break;
        case 'EM_ATENDIMENTO': // Nomes de ENUM com mais de uma palavra geralmente usam _
            color = 'warning'; // Amarelo/Laranja
            text = 'Em Atendimento';
            break;
        case 'INDISPONIVEL':
            color = 'error'; // Vermelho
            text = 'Indisponível';
            break;
        default:
            color = 'default'; // Cinza
            break;
    }

    return <Tag color={color}>{text}</Tag>;
};

export default MotoristaGuinchoStatusTag;