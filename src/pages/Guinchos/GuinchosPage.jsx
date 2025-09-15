import { useState } from 'react';
import { Button, Typography, Form, Select, notification } from 'antd';
import { TruckOutlined } from '@ant-design/icons';

import CustomModal from '../../components/CustomModal';
import GuinchoFormModal from '../../components/GuinchoFormModal';
import GuinchoList from './GuinchoList';
import UpdateGuinchoAvailabilityModal from './UpdateGuinchoAvailabilityModal';

// Hooks
import {
    useGuinchos,
    useCriarGuincho,
    useAtualizarGuincho,
    useAtualizarDisponibilidadeGuincho
} from '../../hooks/useGuinchos';

const { Title, Text } = Typography;

// Exemplo de dados para guinchos
const GuinchosPage = () => {

    // Hook que retorna lista e mutations
    const { data: guinchos, isLoading } = useGuinchos();
    const { mutate: criarGuincho } = useCriarGuincho();
    const { mutate: atualizarGuincho } = useAtualizarGuincho();
    const { mutate: atualizarDisponibilidadeGuincho } = useAtualizarDisponibilidadeGuincho();

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
        // Usamos 'guinchos || []' para garantir que não quebre se os dados ainda não chegaram
        const guinchoToEdit = (guinchos || []).find(d => d.id === guinchoId);
        showModal(
            'Editar Guincho',
            <GuinchoFormModal
                onCancel={handleCancel}
                onSave={(values) => handleSave({ ...values, id: guinchoToEdit.id })}
                initialData={guinchoToEdit}
            />,
            450
        );
    };

    // Função para atualizar disponibilidade
    const handleUpdateAvailability = (guinchoId) => {
        const guinchoToUpdate = (guinchos || []).find(d => d.id === guinchoId);
        showModal(
            'Atualizar Disponibilidade',
            <UpdateGuinchoAvailabilityModal onCancel={handleCancel} onSave={handleSave} initialData={guinchoToUpdate} />,
            400
        );
    };

    const handleSave = (values) => {
        const onSuccess = () => {
            notification.success({ message: 'Operação realizada com sucesso!' });
            setIsModalOpen(false);
        };
        const onError = (error) => {
            console.error("Erro ao salvar guincho:", error);
            notification.error({ message: 'Ocorreu um erro na operação.' });
        };

        if (values.id) {
            // Atualização
            if (values.disponibilidade && Object.keys(values).length <= 2) {
                atualizarDisponibilidadeGuincho({ id: values.id, disponibilidade: values.disponibilidade }, { onSuccess, onError });
            } else {
                atualizarGuincho({ id: values.id, dados: values }, { onSuccess, onError });
            }
        } else {
            criarGuincho(values, { onSuccess, onError });
        }
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