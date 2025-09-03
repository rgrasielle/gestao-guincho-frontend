import React, { useState } from 'react';
import { Button, Typography, Space, Row, Col, Card, Tag, Empty, Form, Select, Divider } from 'antd';
import { TruckOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons';

import CustomModal from '../components/CustomModal';
import GuinchoFormModal from '../components/GuinchoFormModal';
import UpdateGuinchoAvailabilityModal from '../components/UpdateGuinchoAvailabilityModal';

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

// Componente: GuinchoCard
const GuinchoCard = ({ guincho, onEdit, onUpdateAvailability }) => {
    return (
        <Card
            hoverable
            style={{ marginBottom: 16, borderRadius: 8, border: '1px solid #f0f0f0' }}
        >
            <div>
                <Space style={{ marginBottom: 8 }}>
                    <TruckOutlined style={{ marginRight: 4, color: '#1677ff' }} />
                    <Text strong>{guincho.modelo}</Text>
                    <MotoristaGuinchoStatusTag status={guincho.disponibilidade} />
                </Space>
                <div style={{ marginLeft: 24, marginBottom: 8 }}>
                    <Text>
                        <b>Placa:</b> {guincho.placa}
                    </Text>
                </div>
                <div style={{ marginLeft: 24, marginBottom: 8 }}>
                    <Text>
                        <b>Tipo:</b> {guincho.tipo}
                    </Text>
                </div>
                <div style={{ marginLeft: 24, marginBottom: 8 }}>
                    <Text>
                        <b>Capacidade:</b> {guincho.capacidade} kg
                    </Text>
                </div>
            </div>

            {/* Divisor */}
            <Divider style={{ margin: '16px 0' }} />

            {/* Botões de Ação */}
            <div style={{ textAlign: 'right' }}>
                <Space>
                    <Button
                        type="default"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(guincho.id)}
                    >
                        Editar
                    </Button>
                    <Button
                        type="default"
                        icon={<SyncOutlined />}
                        onClick={() => onUpdateAvailability(guincho.id)}
                    >
                        Atualizar Disponibilidade
                    </Button>
                </Space>
            </div>
        </Card>
    );
};

// Componente: GuinchoList
const GuinchoList = ({ guinchos, onEdit, onUpdateAvailability }) => {
    if (!guinchos || guinchos.length === 0) {
        return <Empty description="Nenhum guincho cadastrado." />;
    }
    return (
        <Row gutter={[16, 16]}>
            {guinchos.map((guincho) => (
                <Col key={guincho.id} xs={24} sm={24} md={12} lg={12}>
                    <GuinchoCard
                        guincho={guincho}
                        onEdit={onEdit}
                        onUpdateAvailability={onUpdateAvailability}
                    />
                </Col>
            ))}
        </Row>
    );
};

// Exemplo de dados para guinchos
const Guinchos = () => {
    const [guinchos, setGuinchos] = useState([
        { id: 1, modelo: 'Volvo FH 540', placa: 'ABC-1234', tipo: 'Guincho Pesado', capacidade: 15000, disponibilidade: 'Disponível' },
        { id: 2, modelo: 'Ford Cargo 816', placa: 'DEF-5678', tipo: 'Guincho Leve', capacidade: 3500, disponibilidade: 'Em Atendimento' },
        { id: 3, modelo: 'Mercedes Atego', placa: 'GHI-9012', tipo: 'Guincho Médio', capacidade: 8000, disponibilidade: 'Indisponível' },
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

    // Função para editar guincho
    const handleEdit = (guinchoId) => {
        const guinchoToEdit = guinchos.find(d => d.id === guinchoId);  // passa os dados do guincho para o modal
        showModal('Editar Guincho', <GuinchoFormModal onCancel={handleCancel} onSave={handleSave} initialData={guinchoToEdit} />, 450);
    };

    // Função para atualizar disponibilidade
    const handleUpdateAvailability = (guinchoId) => {
        const guinchoToUpdate = guinchos.find(d => d.id === guinchoId);
        showModal('', <UpdateGuinchoAvailabilityModal onCancel={handleCancel} onSave={handleSave} initialData={guinchoToUpdate} />, 400);
    };

    const handleSave = (values) => {
        console.log('Dados salvos:', values);
        if (values.id) {
            setGuinchos(prevGuinchos => prevGuinchos.map(guincho => guincho.id === values.id ? values : guincho));
        } else {
            const newGuincho = { ...values, id: guinchos.length + 1 };
            setGuinchos(prevGuinchos => [...prevGuinchos, newGuincho]);
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
                    <Title level={2} style={{ margin: 0 }}>Guinchos</Title>
                    <Text type="secondary">Gerencie a frota de guinchos</Text>
                </div>
                <Button
                    type="primary"
                    size="large"
                    icon={<TruckOutlined />}
                    onClick={() => showModal('Cadastrar Guincho', <GuinchoFormModal onCancel={handleCancel} onSave={handleSave} />, 450)}
                >
                    Cadastrar Guincho
                </Button>
            </div>

            <GuinchoList
                guinchos={guinchos}
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

export default Guinchos;