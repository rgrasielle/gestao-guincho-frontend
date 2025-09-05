import { useState } from 'react';
import { Button, Typography, Form, Select } from 'antd';
import { TruckOutlined } from '@ant-design/icons';

import CustomModal from '../../components/CustomModal';
import GuinchoFormModal from '../../components/GuinchoFormModal';

// Componentes exclusivos da página Guinchos
import GuinchoList from './GuinchoList';
import UpdateGuinchoAvailabilityModal from './UpdateGuinchoAvailabilityModal';

import { useGuinchos } from '../../hooks/useGuinchos';

const { Title, Text } = Typography;
const { Option } = Select;
const { Item } = Form;

// Exemplo de dados para guinchos
const GuinchosPage = () => {

    // Hook que retorna lista e mutations
    const { guinchos, isLoading, criarGuincho, atualizarGuincho, atualizarDisponibilidadeGuincho } = useGuinchos();

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
        const guinchoToEdit = guinchos.find(d => d.id === guinchoId);
        showModal(
            'Editar Guincho',
            <GuinchoFormModal onCancel={handleCancel} onSave={handleSave} initialData={guinchoToEdit} />,
            450
        );
    };

    // Função para atualizar disponibilidade
    const handleUpdateAvailability = (guinchoId) => {
        const guinchoToUpdate = guinchos.find(d => d.id === guinchoId);
        showModal(
            'Atualizar Disponibilidade',
            <UpdateGuinchoAvailabilityModal onCancel={handleCancel} onSave={handleSave} initialData={guinchoToUpdate} />,
            400
        );
    };

    const handleSave = (values) => {
        if (values.id) {
            // Se tiver id, decide se é atualização completa ou apenas disponibilidade
            if (values.disponibilidade && !values.modelo) {
                atualizarDisponibilidadeGuincho.mutate(values);
            } else {
                atualizarGuincho.mutate({ id: values.id, dados: values });
            }
        } else {
            criarGuincho.mutate(values);
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => setIsModalOpen(false);

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
                loading={isLoading} // mostra spinner se estiver carregando
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