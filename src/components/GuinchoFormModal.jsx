import React, { useEffect } from 'react';
import { Form, Input, Select, Button, Space, Typography } from 'antd'; // 👈 Importe Typography
import { TruckOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography; // 👈 Desestruture o componente Text

const GuinchoFormModal = ({ onCancel, onSave, initialData }) => {
    const [form] = Form.useForm();

    // useEffect para atualizar o formulário
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
            initialValues={initialData}
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
                <Input placeholder="ABC-1234" />
            </Form.Item>

            <Form.Item
                name="tipo"
                label={<Text strong>Tipo</Text>}
                rules={[{ required: true, message: 'Por favor, selecione o tipo!' }]}
                required={false}
            >
                <Select placeholder="Selecione o tipo">
                    <Option value="reboque">Reboque</Option>
                    <Option value="plataforma">Plataforma</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="capacidade"
                label={<Text strong>Capacidade (toneladas)</Text>}
                rules={[{ required: true, message: 'Por favor, digite a capacidade!' }]}
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
                    <Option value="disponivel">Disponível</Option>
                    <Option value="em_atendimento">Em Atendimento</Option>
                    <Option value="indisponivel">Indisponível</Option>
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