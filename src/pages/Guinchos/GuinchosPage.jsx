import { useState } from 'react';
import { Button, Typography, Form, Select } from 'antd';
import { TruckOutlined } from '@ant-design/icons';

import CustomModal from '../../components/CustomModal';
import GuinchoFormModal from '../../components/GuinchoFormModal';

// Componentes exclusivos da página Guinchos
import GuinchoList from './GuinchoList';
import UpdateGuinchoAvailabilityModal from './UpdateGuinchoAvailabilityModal';

const { Title, Text } = Typography;
const { Option } = Select;
const { Item } = Form;

// Exemplo de dados para guinchos
const GuinchosPage = () => {
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

export default GuinchosPage;