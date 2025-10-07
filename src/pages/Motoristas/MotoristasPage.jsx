import { useState } from 'react';
import { Button, Typography, Space, Popover } from 'antd';
import { TeamOutlined, InfoCircleOutlined } from '@ant-design/icons';

import CustomModal from '../../components/CustomModal';
import MotoristaFormModal from '../../components/MotoristaFormModal';
import DriverList from './DriverList';
import UpdateDriverAvailabilityModal from './UpdateDriverAvailabilityModal';
import MotoristaGuinchoStatusTag from '../../components/MotoristaGuinchoStatusTag';

import {
    useMotoristas,
    useCriarMotorista,
    useAtualizarMotorista,
    useAtualizarDisponibilidade
} from '../../hooks/useMotoristas';

const { Title, Text } = Typography;

const MotoristasPage = () => {

    // --- ESTADOS E HOOKS ---
    const { data: drivers, isLoading } = useMotoristas();
    const { mutate: criarMotorista } = useCriarMotorista();
    const { mutate: atualizarMotorista } = useAtualizarMotorista();
    const { mutate: atualizarDisponibilidadeMotorista } = useAtualizarDisponibilidade();

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

    // Ação para SALVAR um novo motorista
    const handleSaveNew = (formValues) => {
        criarMotorista(formValues, {
            onSuccess: () => {
                // O hook já mostra a notificação e atualiza a lista.
                // Aqui, só precisamos fechar o modal.
                handleCancel();
            }
        });
    };

    // Ação para ATUALIZAR um motorista existente
    const handleSaveEdit = (driverId, formValues) => {
        atualizarMotorista({ id: driverId, dados: formValues }, {
            onSuccess: () => {
                handleCancel();
            }
        });
    };

    // Ação para ATUALIZAR a disponibilidade
    const handleSaveAvailability = (driverId, formValues) => {
        atualizarDisponibilidadeMotorista({ id: driverId, disponibilidade: formValues.disponibilidade }, {
            onSuccess: () => {
                handleCancel();
            }
        });
    };

    // --- FUNÇÕES PARA ABRIR OS MODAIS ---
    const handleOpenNewModal = () => {
        showModal(
            'Cadastrar Motorista',
            <MotoristaFormModal onCancel={handleCancel} onSave={handleSaveNew} />
        );
    };

    const handleOpenEditModal = (driverId) => {
        const driverToEdit = (drivers || []).find(d => d.id === driverId);
        showModal(
            'Editar Motorista',
            <MotoristaFormModal
                onCancel={handleCancel}
                onSave={(values) => handleSaveEdit(driverId, values)}
                initialData={driverToEdit}
            />
        );
    };

    const handleOpenAvailabilityModal = (driverId) => {
        const driverToUpdate = (drivers || []).find(d => d.id === driverId);
        showModal(
            'Atualizar Disponibilidade',
            <UpdateDriverAvailabilityModal
                onCancel={handleCancel}
                onSave={(values) => handleSaveAvailability(driverId, values)}
                initialData={driverToUpdate}
            />,
            400
        );
    };

    return (
        <div style={{ padding: 10, minHeight: '100vh', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Motoristas</Title>
                    <Text type="secondary">Gerencie os motoristas da frota</Text>
                </div>
                {/* BOTÕES DO CABEÇALHO AGRUPADOS COM O NOVO ÍCONE DE INFO */}
                <Space size="middle">
                    <Popover content={legendContent} title={<Title level={5} style={{ margin: 0 }}>Legenda de Status</Title>} trigger="hover">
                        <InfoCircleOutlined style={{ fontSize: '24px', color: '#1890ff', cursor: 'pointer' }} />
                    </Popover>
                    <Button
                        type="primary"
                        size="large"
                        icon={<TeamOutlined />}
                        onClick={handleOpenNewModal}
                    >
                        Cadastrar Motorista
                    </Button>
                </Space>
            </div>

            <DriverList
                drivers={drivers}
                onEdit={handleOpenEditModal}
                onUpdateAvailability={handleOpenAvailabilityModal}
                isLoading={isLoading}
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

export default MotoristasPage;