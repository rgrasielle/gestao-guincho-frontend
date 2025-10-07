import { useState } from 'react';
import { Button, Space, Typography, notification } from 'antd';
import {
    TruckOutlined,
    DollarOutlined,
    TeamOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import CustomModal from '../../components/CustomModal';
import MotoristaFormModal from '../../components/MotoristaFormModal';
import GuinchoFormModal from '../../components/GuinchoFormModal';
import ValoresFixosFormModal from './ValoresFixosFormModal ';
import VerChamadoModal from '../Chamados/VerChamadoModal';
import StatisticRow from './StatisticRow';
import BottomStatisticRow from './BottomStatisticRow';
import RecentCallsList from './RecentCallsList';

// Hooks
import { useValoresFixos, useAtualizarValoresFixos } from '../../hooks/useValoresFixos';
import { useCriarMotorista } from '../../hooks/useMotoristas';
import { useCriarGuincho } from '../../hooks/useGuinchos';
import { useChamados } from '../../hooks/useChamados';

const { Title, Text } = Typography;

const DashboardPage = () => {

    const navigate = useNavigate();

    const { data: chamadosData } = useChamados();
    const recentCallsList = chamadosData?.content || [];

    // Estado 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);
    const [modalWidth, setModalWidth] = useState(520);
    const [isValoresFixosHovered, setIsValoresFixosHovered] = useState(false);

    // Hooks
    const { data: valoresFixosData, isLoading: isLoadingValoresFixos } = useValoresFixos();

    // Hooks de mutação
    const { mutate: salvarValores } = useAtualizarValoresFixos();
    const { mutate: criarMotorista } = useCriarMotorista();
    const { mutate: criarGuincho } = useCriarGuincho();

    // Funções para controlar o modal
    const showModal = (title, contentComponent, width = 450) => {
        setModalTitle(title);
        setModalContent(contentComponent);
        setModalWidth(width);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setModalWidth(450); // Reseta para o padrão ao fechar
    };

    // Função de salvar
    const handleSaveMotorista = (values) => {
        // A função mutate agora só precisa dos dados.
        // O hook 'useCriarMotorista' já cuida da notificação e de atualizar a lista.
        criarMotorista(values, {
            onSuccess: () => {
                // A única coisa que a página precisa fazer é fechar o modal.
                setIsModalOpen(false);
            }
        });
    };

    const handleSaveGuincho = (values) => {
        criarGuincho(values, {
            onSuccess: () => {
                setIsModalOpen(false);
            }
        });
    };

    const handleSaveValoresFixos = (values) => {
        salvarValores(values, {
            onSuccess: () => {
                setIsModalOpen(false);
            }
        });
    };

    // Função para abrir ChamadoForm
    const handleNewCallClick = () => navigate('/chamadoform');

    // Função para abrir VerChamadoModal em Ver Detalhes
    const handleShowViewModal = (chamadoId) => {
        const chamadoCompleto = recentCallsList.find(c => c.id === chamadoId);
        if (!chamadoCompleto) {
            notification.error({ message: "Chamado não encontrado!" });
            return;
        }
        showModal(
            `Chamado CH${String(chamadoCompleto.id).padStart(3, '0')}`,
            <VerChamadoModal chamadoData={chamadoCompleto} onCancel={handleCancel} />,
            750
        );
    };

    const valoresFixosButtonStyle = {
        backgroundColor: '#faad14',
        borderColor: '#faad14',
        color: '#fff',
        transition: 'background-color 0.3s',
    };

    const valoresFixosButtonHoverStyle = {
        backgroundColor: '#f8bb43ff',
        borderColor: '#f8bb43ff',
    };

    const semiBoldStyle = { fontWeight: 400 };

    return (
        <div>
            {/* Linha de botões */}
            <Space size="middle" style={{ marginBottom: 24, width: '100%' }}>
                <Button
                    type="primary"
                    size="large" icon={<PlusOutlined />}
                    onClick={handleNewCallClick}
                    style={semiBoldStyle}>
                    Novo Chamado
                </Button>

                <Button
                    size="large"
                    icon={<DollarOutlined />}
                    disabled={isLoadingValoresFixos}
                    onMouseEnter={() => setIsValoresFixosHovered(true)}
                    onMouseLeave={() => setIsValoresFixosHovered(false)}
                    style={{
                        ...semiBoldStyle,
                        ...valoresFixosButtonStyle,
                        ...(isValoresFixosHovered ? valoresFixosButtonHoverStyle : {})
                    }}
                    onClick={() => showModal(
                        "Configurar Valores Fixos",
                        <ValoresFixosFormModal
                            onCancel={handleCancel}
                            onSave={handleSaveValoresFixos}
                            initialData={valoresFixosData}
                        />
                    )}
                >
                    Configurar Valores Fixos
                </Button>

                <Button
                    size="large"
                    icon={<TeamOutlined />}
                    onClick={() => showModal("Cadastrar Motorista", <MotoristaFormModal onCancel={handleCancel} onSave={handleSaveMotorista} />)}
                    style={semiBoldStyle}
                >
                    Cadastrar Motorista
                </Button>

                <Button
                    size="large"
                    icon={<TruckOutlined />}
                    onClick={() => showModal("Cadastrar Guincho", <GuinchoFormModal onCancel={handleCancel} onSave={handleSaveGuincho} />)}
                    style={semiBoldStyle}
                >
                    Cadastrar Guincho
                </Button>
            </Space>

            {/* Cards do topo */}
            <StatisticRow />

            {/* Chamados recentes */}
            <div style={{ marginTop: 24 }}>
                <RecentCallsList
                    onShowViewModal={(id) => handleShowViewModal(id)}
                    onShowAll={() => navigate('/chamados')}
                />
            </div>

            {/* Cards de baixo */}
            <div style={{ marginTop: 24 }}>
                <BottomStatisticRow />
            </div>


            {/* Modal */}
            <CustomModal
                title={modalTitle}
                open={isModalOpen}
                onCancel={handleCancel}
                width={modalWidth}
                onOk={null} // Salvar está dentro do formulário/modal
            >
                {modalContent}
            </CustomModal>
        </div >
    );
};

export default DashboardPage;