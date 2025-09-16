// Em StatusTag.jsx
import { Tag } from 'antd';

const StatusTag = ({ status }) => {
    let tagColor = '';
    let textColor = '';
    let text = status;

    // Paleta de cores para os status

    // Aberto
    const blueLight = '#e6f7ff';
    const blueDark = '#1890ff';

    // Em andamento
    const orangeLight = '#fffbe6';
    const orangeDark = '#faad14';

    // Finalizado
    const greenLight = '#dcfce7';
    const greenDark = '#166534';

    // Default
    const grayLight = '#f0f0f0';
    const grayDark = '#595959';

    switch (status) {
        case 'ABERTO':
            tagColor = blueLight;
            textColor = blueDark;
            text = 'Aberto';
            break;
        case 'EM_ANDAMENTO':
            tagColor = orangeLight;
            textColor = orangeDark;
            text = 'Em Andamento';
            break;
        case 'FINALIZADO':
            tagColor = greenLight;
            textColor = greenDark;
            text = 'Finalizado';
            break;
        default:
            tagColor = grayLight;
            textColor = grayDark;
            text = status || 'Indefinido';
            break;
    }

    return (
        <Tag
            style={{
                backgroundColor: tagColor,
                color: textColor,
                borderColor: tagColor, // Para que a borda seja da mesma cor do fundo
                borderRadius: '16px', // Borda arredondada
                padding: '2px 12px', // Mais espaçamento interno para ficar parecido com a imagem
                fontWeight: 600, // Deixa o texto em negrito
                fontSize: '13px', // Ajuste o tamanho da fonte se necessário
            }}
        >
            {text}
        </Tag>
    );
};

export default StatusTag;