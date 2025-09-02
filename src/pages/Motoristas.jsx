import React, { useState } from 'react';
import { Layout, Button, Typography, Space, Row, Col, Card, Tag, Empty, Form, Input, Select } from 'antd';
import { UserOutlined, EditOutlined, TeamOutlined, PlusOutlined } from '@ant-design/icons';
import CustomModal from '../components/CustomModal';
import MotoristaFormModal from '../components/MotoristaFormModal';

const { Title, Text } = Typography;
const { Option } = Select;
const { Item } = Form;

// Componente: DriverStatusTag
const MotoristaGuinchoStatusTag = ({ status }) => {
    let color = 'default';
    let text = status;
    switch (status) {
        case 'Disponível':
            color = 'success';
            break;
        case 'Em Atendimento':
            color = 'warning';
            break;
        case 'Indisponível':
            color = 'error';
            break;
        default:
            color = 'default';
            break;
    }
    return <Tag color={color}>{text}</Tag>;
};

// Componente: DriverCard
const DriverCard = ({ driver, onEdit }) => {
    return (
        <Card
            hoverable
            style={{ marginBottom: 16, borderRadius: 8, border: '1px solid #f0f0f0' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <Space style={{ marginBottom: 8 }}>
                        <UserOutlined style={{ marginRight: 4, color: '#1677ff' }} />
                        <Text strong>{driver.nomeCompleto}</Text>
                        <MotoristaGuinchoStatusTag status={driver.disponibilidade} />
                    </Space>
                    <div style={{ marginLeft: 24, marginBottom: 8 }}>
                        <Text>
                            <b>CPF:</b> {driver.cpf}
                        </Text>
                    </div>
                    <div style={{ marginLeft: 24, marginBottom: 8 }}>
                        <Text>
                            <b>CNH:</b> {driver.cnh}
                        </Text>
                    </div>
                    <div style={{ marginLeft: 24, marginBottom: 8 }}>
                        <Text>
                            <b>Telefone:</b> {driver.telefone}
                        </Text>
                    </div>
                    <div style={{ marginLeft: 24, marginBottom: 8 }}>
                        <Text>
                            <b>E-mail:</b> {driver.email}
                        </Text>
                    </div>
                </div>
                <Button
                    type="default"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(driver.id)}
                >
                    Editar
                </Button>
            </div>
        </Card>
    );
};

// Componente: DriverList
const DriverList = ({ drivers, onEdit }) => {
    if (!drivers || drivers.length === 0) {
        return <Empty description="Nenhum motorista cadastrado." />;
    }
    return (
        <Row gutter={[16, 16]}>
            {drivers.map((driver) => (
                <Col key={driver.id} xs={24} sm={24} md={12} lg={12}>
                    <DriverCard driver={driver} onEdit={onEdit} />
                </Col>
            ))}
        </Row>
    );
};

const Motoristas = () => {
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

    const handleEdit = (driverId) => {
        const driverToEdit = drivers.find(d => d.id === driverId);
        // 👈 AQUI: passamos os dados do motorista para o modal
        showModal('Editar Motorista', <MotoristaFormModal onCancel={handleCancel} onSave={handleSave} initialData={driverToEdit} />, 450);
    };

    const handleSave = (values) => {
        console.log('Dados salvos:', values);
        if (values.id) {
            setDrivers(prevDrivers => prevDrivers.map(driver => driver.id === values.id ? values : driver));
        } else {
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

            <DriverList drivers={drivers} onEdit={handleEdit} />

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

export default Motoristas;