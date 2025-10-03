import { useState } from 'react';
import { Button, Typography, Space, Popover } from 'antd';
import { TruckOutlined, InfoCircleOutlined } from '@ant-design/icons';

import CustomModal from '../../components/CustomModal';
import GuinchoFormModal from '../../components/GuinchoFormModal';
import GuinchoList from './GuinchoList';
import UpdateGuinchoAvailabilityModal from './UpdateGuinchoAvailabilityModal';
import MotoristaGuinchoStatusTag from '../../components/MotoristaGuinchoStatusTag';

// Hooks
import {
    useGuinchos,
    useCriarGuincho,
    useAtualizarGuincho,
    useAtualizarDisponibilidadeGuincho
} from '../../hooks/useGuinchos';

const { Title, Text } = Typography;

const GuinchosPage = () => {

    // --- ESTADOS E HOOKS ---
    const { data: guinchos, isLoading } = useGuinchos();
    const { mutate: criarGuincho } = useCriarGuincho();
    const { mutate: atualizarGuincho } = useAtualizarGuincho();
    const { mutate: atualizarDisponibilidade } = useAtualizarDisponibilidadeGuincho();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);
    const [modalWidth, setModalWidth] = useState(450);

    // --- DADOS DA LEGENDA PARA O POPOVER ---
    const legendItems = [
        { status: 'DISPONIVEL', description: 'Nenhum vínculo atual ou futuro.' },
        { status: 'RESERVADO', description: 'Vinculado a um chamado "Aberto".' },
        { status: 'EM_ATENDIMENTO', description: 'Vinculado a um chamado "Em Andamento".' },
        { status: 'INDISPONIVEL', description: 'Indisponível para novos chamados.' }
    ];

    // Conteúdo JSX para o Popover
    const legendContent = (
        <div style={{ maxWidth: '400px' }}>
            {legendItems.map(item => (
                <div key={item.status} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    <MotoristaGuinchoStatusTag status={item.status} />
                    <Text type="secondary" style={{ marginLeft: '8px', fontSize: '13px' }}>{item.description}</Text>
                </div>
            ))}
        </div>
    );

    // --- FUNÇÕES DE CONTROLE DO MODAL ---
    const handleCancel = () => setIsModalOpen(false);

    const showModal = (title, content, width = 450) => {
        setModalTitle(title);
        setModalContent(content);
        setModalWidth(width);
        setIsModalOpen(true);
    };

    // --- FUNÇÕES DE AÇÃO ---

    // Ação para SALVAR um novo guincho
    const handleSaveNew = (formValues) => {
        criarGuincho(formValues, {
            onSuccess: () => {
                // O hook já mostra a notificação. Aqui, só fechamos o modal.
                handleCancel();
            }
        });
    };

    // Ação para ATUALIZAR um guincho existente
    const handleSaveEdit = (guinchoId, formValues) => {
        atualizarGuincho({ id: guinchoId, dados: formValues }, {
            onSuccess: () => {
                handleCancel();
            }
        });
    };

    // Ação para ATUALIZAR a disponibilidade
    const handleSaveAvailability = (guinchoId, formValues) => {
        atualizarDisponibilidade({ id: guinchoId, disponibilidade: formValues.disponibilidade }, {
            onSuccess: () => {
                handleCancel();
            }
        });
    };

    // --- FUNÇÕES PARA ABRIR OS MODAIS ---
    const handleOpenNewModal = () => {
        showModal(
            'Cadastrar Guincho',
            <GuinchoFormModal onCancel={handleCancel} onSave={handleSaveNew} />
        );
    };

    const handleOpenEditModal = (guinchoId) => {
        const guinchoToEdit = (guinchos || []).find(d => d.id === guinchoId);
        showModal(
            'Editar Guincho',
            <GuinchoFormModal
                onCancel={handleCancel}
                onSave={(values) => handleSaveEdit(guinchoId, values)}
                initialData={guinchoToEdit}
            />
        );
    };

    const handleOpenAvailabilityModal = (guinchoId) => {
        const guinchoToUpdate = (guinchos || []).find(d => d.id === guinchoId);
        showModal(
            'Atualizar Disponibilidade',
            <UpdateGuinchoAvailabilityModal
                onCancel={handleCancel}
                onSave={(values) => handleSaveAvailability(guinchoId, values)}
                initialData={guinchoToUpdate}
            />,
            400
        );
    };

    return (
        <div style={{ padding: 10, minHeight: '100vh', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Guinchos</Title>
                    <Text type="secondary">Gerencie a frota de guinchos</Text>
                </div>
                {/* BOTÕES DO CABEÇALHO AGRUPADOS COM O NOVO ÍCONE DE INFO */}
                <Space size="middle">
                    <Popover content={legendContent} title={<Title level={5} style={{ margin: 0 }}>Legenda de Status</Title>} trigger="hover">
                        <InfoCircleOutlined style={{ fontSize: '24px', color: '#1890ff', cursor: 'pointer' }} />
                    </Popover>
                    <Button
                        type="primary"
                        size="large"
                        icon={<TruckOutlined />}
                        onClick={handleOpenNewModal}
                    >
                        Cadastrar Guincho
                    </Button>
                </Space>
            </div>

            <GuinchoList
                guinchos={guinchos}
                onEdit={handleOpenEditModal}
                onUpdateAvailability={handleOpenAvailabilityModal}
                loading={isLoading}
            />

            <CustomModal
                title={modalTitle}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={modalWidth}
            >
                {modalContent}
            </CustomModal>
        </div>
    );
};

export default GuinchosPage;