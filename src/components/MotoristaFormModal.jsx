import { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Space, Typography } from 'antd';
import { MaskedInput } from 'antd-mask-input';

import { useEnterToNavigate } from '../hooks/useEnterToNavigate';
import { useDeletarMotorista } from '../hooks/useMotoristas';
import ConfirmationModal from './ConfirmationModal';

const { Option } = Select;
const { Text } = Typography;

const MotoristaFormModal = ({ onCancel, onSave, initialData }) => {
    const [form] = Form.useForm();
    const handleKeyDown = useEnterToNavigate();

    // Hooks para exclusão e estado do modal de confirmação
    const { mutate: deletarMotorista, isLoading: isDeleting } = useDeletarMotorista();
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    // useEffect para atualizar o formulário
    useEffect(() => {
        if (initialData) {
            form.setFieldsValue(initialData);
        } else {
            form.resetFields();
        }
    }, [initialData, form]);

    const handleConfirmDelete = () => {
        deletarMotorista(initialData.id, {
            onSuccess: () => {
                setIsDeleteConfirmOpen(false);
                onCancel();
            },
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
                onFinish={onSave} // onSave será chamado com os dados do formulário
                onKeyDown={handleKeyDown}
            >
                <Form.Item
                    name="nome"
                    label={<Text strong>Nome Completo</Text>}
                    rules={[{ required: true, message: 'Por favor, digite o nome completo!' }]}
                    required={false} // Para remover o asterisco visual
                >
                    <Input placeholder="Digite o nome completo" />
                </Form.Item>

                <Form.Item
                    name="cpf"
                    label={<Text strong>CPF</Text>}
                    rules={[{ required: true, message: 'Por favor, digite o CPF!' }]}
                    required={false}
                >
                    <MaskedInput mask="000.000.000-00" placeholder="000.000.000-00" />
                </Form.Item>

                <Form.Item
                    name="cnh"
                    label={<Text strong>CNH</Text>}
                    rules={[{ required: true, message: 'Por favor, digite o número da CNH!' }]}
                    required={false}
                >
                    <Input placeholder="Número da CNH" />
                </Form.Item>

                <Form.Item
                    name="telefone"
                    label={<Text strong>Telefone</Text>}
                    required={false}
                >
                    <MaskedInput mask="(00) 00000-0000" placeholder="(00) 00000-0000" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label={<Text strong>E-mail</Text>}
                    required={false}
                >
                    <Input placeholder="motorista@email.com" />
                </Form.Item>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
                    <div>
                        {initialData && (
                            <Button
                                danger
                                onClick={() => setIsDeleteConfirmOpen(true)}
                                loading={isDeleting}
                            >
                                Excluir Motorista
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

            <ConfirmationModal
                open={isDeleteConfirmOpen}
                title="Confirmar Exclusão"
                content={`Tem certeza que deseja excluir o motorista "${initialData?.nome}"? Esta ação não pode ser desfeita.`}
                okText="Sim, Excluir"
                cancelText="Cancelar"
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsDeleteConfirmOpen(false)}
            />
        </>
    );
};

export default MotoristaFormModal;