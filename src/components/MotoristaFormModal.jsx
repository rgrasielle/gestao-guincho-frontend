import { useEffect } from 'react';
import { Form, Input, Select, Button, Space, Typography } from 'antd';

const { Option } = Select;
const { Text } = Typography;

const MotoristaFormModal = ({ onCancel, onSave, initialData }) => {
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
            onFinish={onSave} // onSave será chamado com os dados do formulário
        >
            <Form.Item
                name="nomeCompleto"
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
                <Input placeholder="000.000.000-00" />
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
                rules={[{ required: true, message: 'Por favor, digite o telefone!' }]}
                required={false}
            >
                <Input placeholder="(11) 99999-9999" />
            </Form.Item>

            <Form.Item
                name="email"
                label={<Text strong>E-mail</Text>}
                rules={[{ required: true, message: 'Por favor, digite o e-mail!' }]}
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
                    <Option value="Disponível">Disponível</Option>
                    <Option value="Em Atendimento">Em Atendimento</Option>
                    <Option value="Indisponível">Indisponível</Option>

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