import { Tag } from 'antd';

const MotoristaGuinchoStatusTag = ({ status }) => {
    let tagColor = '';
    let textColor = '';
    let text = status;

    // Paleta de cores para os status

    // Disponível
    const greenLight = '#dcfce7';
    const greenDark = '#166534';

    // Em atendimento
    const orangeLight = '#fffbe6';
    const orangeDark = '#faad14';

    // Indisponível
    const redLight = '#fee2e2';
    const redDark = '#991b3b';

    // Reservado
    const blueLight = '#e6f7ff';
    const blueDark = '#096dd9';

    // Default
    const grayLight = '#f0f0f0';
    const grayDark = '#595959';

    switch (status) {
        case 'DISPONIVEL':
            tagColor = greenLight;
            textColor = greenDark;
            text = 'Disponível';
            break;
        case 'EM_ATENDIMENTO':
            tagColor = orangeLight;
            textColor = orangeDark;
            text = 'Em Atendimento';
            break;
        case 'INDISPONIVEL':
            tagColor = redLight;
            textColor = redDark;
            text = 'Indisponível';
            break;
        case 'RESERVADO':
            tagColor = blueLight;
            textColor = blueDark;
            text = 'Reservado';
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
                borderColor: tagColor,
                borderRadius: '16px',
                padding: '2px 12px',
                fontWeight: 600,
                fontSize: '13px',
            }}
        >
            {text}
        </Tag>
    );
};

export default MotoristaGuinchoStatusTag;