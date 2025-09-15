import { useEffect } from 'react';
import { Form, Input, Select, Button, Space, Typography } from 'antd';
import { MaskedInput } from 'antd-mask-input';

import { useEnterToNavigate } from '../hooks/useEnterToNavigate';

const { Option } = Select;
const { Text } = Typography;

const MotoristaFormModal = ({ onCancel, onSave, initialData }) => {
    const [form] = Form.useForm();

    const handleKeyDown = useEnterToNavigate();

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

export default MotoristaFormModal;