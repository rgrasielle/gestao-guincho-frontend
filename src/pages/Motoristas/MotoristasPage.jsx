import { useState } from 'react';
import { Button, Typography, Form, Select } from 'antd';
import { TeamOutlined } from '@ant-design/icons';

import CustomModal from '../../components/CustomModal';
import MotoristaFormModal from '../../components/MotoristaFormModal';

// Componentes exclusivos da página Motoristas
import DriverList from './DriverList';
import UpdateDriverAvailabilityModal from './UpdateDriverAvailabilityModal';

const { Title, Text } = Typography;
const { Option } = Select;
const { Item } = Form;


const MotoristasPage = () => {
    const [drivers, setDrivers] = useState([
        { id: 1, nomeCompleto: 'João Silva Santos', cpf: '123.456.789-00', cnh: '12345678901', telefone: '(11) 99999-9999', email: 'joao@email.com', disponibilidade: 'Disponível' },
        { id: 2, nomeCompleto: 'Maria Oliveira', cpf: '987.654.321-00', cnh: '10987654321', telefone: '(11) 88888-5678', email: 'maria@email.com', disponibilidade: 'Em Atendimento' },
        { id: 3, nomeCompleto: 'Pedro Costa', cpf: '456.789.123-00', cnh: '999997777-9012', telefone: '(11) 77777-9012', email: 'pedro@email.com', disponibilidade: 'Indisponível' },
    ]);

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
        showModal('Editar Motorista', <MotoristaFormModal onCancel={handleCancel} onSave={handleSave} initialData={driverToEdit} />, 450);
    };

    // Função para atualizar disponibilidade
    const handleUpdateAvailability = (driverId) => {
        const driverToUpdate = drivers.find(d => d.id === driverId);
        showModal('', <UpdateDriverAvailabilityModal onCancel={handleCancel} onSave={handleSave} initialData={driverToUpdate} />, 400);
    };

    const handleSave = (values) => {
        console.log('Dados salvos:', values);
        if (values.id) {
            // Lógica para atualização
            setDrivers(prevDrivers => prevDrivers.map(driver => driver.id === values.id ? values : driver));
        } else {
            // Lógica para novo motorista
            const newDriver = { ...values, id: drivers.length + 1 };
            setDrivers(prevDrivers => [...prevDrivers, newDriver]);
        }
        setIsModalOpen(false);
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