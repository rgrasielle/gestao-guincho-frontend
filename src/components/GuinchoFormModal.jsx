import { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Space, Typography } from 'antd';

import ConfirmationModal from './ConfirmationModal';
import { useEnterToNavigate } from '../hooks/useEnterToNavigate';
import { useDeletarGuincho } from '../hooks/useGuinchos';

const { Option } = Select;
const { Text } = Typography;

const GuinchoFormModal = ({ onCancel, onSave, initialData }) => {

    const [form] = Form.useForm();
    const handleKeyDown = useEnterToNavigate();

    const { mutate: deletarGuincho, isLoading: isDeleting } = useDeletarGuincho();

    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    // Preenche ou reseta o formulário ao abrir o modal
    useEffect(() => {
        if (initialData) {
            form.setFieldsValue(initialData);
        } else {
            form.resetFields();
        }
    }, [initialData, form]);

    // NOVO: Função que será chamada ao confirmar a exclusão
    const handleConfirmDelete = () => {
        deletarGuincho(initialData.id, {
            onSuccess: () => {
                setIsDeleteConfirmOpen(false); // Fecha o modal de confirmação
                onCancel(); // Fecha o modal principal (GuinchoForm)
            },
            // A notificação de erro já é exibida pelo hook.
            // Aqui, apenas garantimos que o modal de confirmação seja fechado.
            onError: () => {
                setIsDeleteConfirmOpen(false);
            }
        });
    };

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                onFinish={onSave}
                onKeyDown={handleKeyDown}
            >
                <Form.Item
                    name="modelo"
                    label={<Text strong>Modelo</Text>}
                    rules={[{ required: true, message: 'Por favor, digite o modelo do guincho!' }]}
                    required={false}
                >
                    <Input placeholder="Ex: Ford F-4000" />
                </Form.Item>

                <Form.Item
                    name="placa"
                    label={<Text strong>Placa</Text>}
                    rules={[{ required: true, message: 'Por favor, digite a placa!' }]}
                    required={false}
                >
                    <Input placeholder="ABC1234" />
                </Form.Item>

                <Form.Item
                    name="tipo"
                    label={<Text strong>Tipo</Text>}
                    required={false}
                >
                    <Input placeholder="Ex: Reboque, Plataforma..." />
                </Form.Item>

                <Form.Item
                    name="capacidade"
                    label={<Text strong>Capacidade (toneladas)</Text>}
                    required={false}
                >
                    <Input placeholder="Ex: 3.5" />
                </Form.Item>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
                    <div>
                        {initialData && (
                            <Button
                                danger
                                onClick={() => setIsDeleteConfirmOpen(true)}
                                loading={isDeleting}
                            >
                                Excluir Guincho
                            </Button>
                        )}
                    </div>
                    <Space>
                        <Button onClick={onCancel}>
                            Cancelar
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Salvar
                        </Button>
                    </Space>
                </div>
            </Form>

            {/* Modal de confirmação */}
            <ConfirmationModal
                open={isDeleteConfirmOpen}
                title="Confirmar Exclusão"
                content={`Tem certeza que deseja excluir o guincho "${initialData?.modelo} - ${initialData?.placa}"? Esta ação não pode ser desfeita.`}
                okText="Sim, Excluir"
                cancelText="Cancelar"
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsDeleteConfirmOpen(false)}
            />
        </>
    );
};

export default GuinchoFormModal;