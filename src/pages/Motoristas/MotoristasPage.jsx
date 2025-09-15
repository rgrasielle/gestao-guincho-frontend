import { useState } from 'react';
import { Button, Typography, notification } from 'antd';
import { TeamOutlined } from '@ant-design/icons';

import CustomModal from '../../components/CustomModal';
import MotoristaFormModal from '../../components/MotoristaFormModal';
import DriverList from './DriverList';
import UpdateDriverAvailabilityModal from './UpdateDriverAvailabilityModal';

import {
    useMotoristas,
    useCriarMotorista,
    useAtualizarMotorista,
    useAtualizarDisponibilidade
} from '../../hooks/useMotoristas';

const { Title, Text } = Typography;

const MotoristasPage = () => {
    // Hook para buscar a lista de motoristas
    const { data: drivers, isLoading } = useMotoristas();

    // Hooks para realizar ações (mutações)
    const { mutate: criarMotorista } = useCriarMotorista();
    const { mutate: atualizarMotorista } = useAtualizarMotorista();
    const { mutate: atualizarDisponibilidadeMotorista } = useAtualizarDisponibilidade();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);
    const [modalWidth, setModalWidth] = useState(450);

    const showModal = (title, content, width) => {
        setModalTitle(title);
        setModalContent(content);
        setModalWidth(width);
        setIsModalOpen(true);
    };

    // Função para editar motorista
    const handleEdit = (driverId) => {
        const driverToEdit = (drivers || []).find(d => d.id === driverId);
        showModal(
            'Editar Motorista',
            <MotoristaFormModal
                onCancel={handleCancel}
                onSave={(values) => handleSave({ ...values, id: driverToEdit.id })}
                initialData={driverToEdit}
            />,
            450
        );
    };

    // Função para atualizar disponibilidade
    const handleUpdateAvailability = (driverId) => {
        const driverToUpdate = drivers.find(d => d.id === driverId);
        showModal(
            '',
            <UpdateDriverAvailabilityModal
                onCancel={handleCancel}
                onSave={handleSave}
                initialData={driverToUpdate}
            />,
            400
        );
    };

    const handleSave = (values) => {
        const onSuccess = () => {
            notification.success({ message: 'Motorista salvo com sucesso!' });
            setIsModalOpen(false);
        };

        const onError = (error) => {
            console.error("Erro ao salvar motorista:", error);
            notification.error({ message: 'Erro ao salvar motorista.' });
        };

        if (values.id) {
            if (values.disponibilidade && Object.keys(values).length <= 2) {
                atualizarDisponibilidadeMotorista({ id: values.id, disponibilidade: values.disponibilidade }, { onSuccess, onError });
            } else {
                atualizarMotorista({ id: values.id, dados: values }, { onSuccess, onError });
            }
        } else {
            criarMotorista(values, { onSuccess, onError });
        }
    };

    const handleCancel = () => setIsModalOpen(false);

    return (
        <div style={{ padding: 10, minHeight: '100vh', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Motoristas</Title>
                    <Text type="secondary">Gerencie os motoristas da frota</Text>
                </div>
                <Button
                    type="primary"
                    size="large"
                    icon={<TeamOutlined />}
                    onClick={() => showModal('Cadastrar Motorista', <MotoristaFormModal onCancel={handleCancel} onSave={handleSave} />, 450)}
                >
                    Cadastrar Motorista
                </Button>
            </div>

            <DriverList
                drivers={drivers}
                onEdit={handleEdit}
                onUpdateAvailability={handleUpdateAvailability}
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