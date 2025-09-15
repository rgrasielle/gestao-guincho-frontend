import { useEffect } from 'react';
import { Form, Input, Select, Button, Space, Typography } from 'antd';

import { useEnterToNavigate } from '../hooks/useEnterToNavigate';

const { Option } = Select;
const { Text } = Typography;

const GuinchoFormModal = ({ onCancel, onSave, initialData }) => {
    const [form] = Form.useForm();

    const handleKeyDown = useEnterToNavigate();

    // Preenche ou reseta o formulário ao abrir o modal
    useEffect(() => {
        if (initialData) {
            form.setFieldsValue(initialData);
        } else {
            form.resetFields();
        }
    }, [initialData, form]);

    return (
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

            <Form.Item
                name="disponibilidade"
                label={<Text strong>Disponibilidade</Text>}
                rules={[{ required: true, message: 'Por favor, selecione a disponibilidade!' }]}
                required={false}
            >
                <Select placeholder="Selecione a disponibilidade">
                    <Option value="DISPONIVEL">Disponível</Option>
                    <Option value="EM_ATENDIMENTO">Em Atendimento</Option>
                    <Option value="INDISPONIVEL">Indisponível</Option>

                </Select>
            </Form.Item>

            <Form.Item style={{ textAlign: 'right', marginTop: 24 }}>
                <Space>
                    <Button onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Salvar
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default GuinchoFormModal;