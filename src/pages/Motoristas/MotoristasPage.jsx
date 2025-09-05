import { useState } from 'react';
import { Button, Typography, Form, Select } from 'antd';
import { TeamOutlined } from '@ant-design/icons';

import CustomModal from '../../components/CustomModal';
import MotoristaFormModal from '../../components/MotoristaFormModal';

// Componentes exclusivos da página Motoristas
import DriverList from './DriverList';
import UpdateDriverAvailabilityModal from './UpdateDriverAvailabilityModal';

import { useMotoristas } from '../../hooks/useMotoristas';

const { Title, Text } = Typography;
const { Option } = Select;
const { Item } = Form;


const MotoristasPage = () => {

    const { drivers, isLoading, criarMotorista, atualizarMotorista, atualizarDisponibilidadeMotorista } = useMotoristas();

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
        const driverToEdit = drivers.find(d => d.id === driverId);
        showModal(
            'Editar Motorista',
            <MotoristaFormModal
                onCancel={handleCancel}
                onSave={handleSave}
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

    const handleSave = async (values) => {
        try {
            if (values.id) {
                // Atualização
                if (values.disponibilidade) {
                    // Atualização de disponibilidade
                    await atualizarDisponibilidadeMotorista(values.id, values.disponibilidade);
                } else {
                    await atualizarMotorista(values.id, values);
                }
            } else {
                // Novo motorista
                await criarMotorista(values);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Erro ao salvar motorista:', error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

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