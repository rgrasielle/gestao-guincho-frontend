import { Form, Select, Button, Space, Typography, Tag } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import StatusTag from '../../components/StatusTag';

const { Title, Text } = Typography;
const { Item } = Form;
const { Option } = Select;

const UpdateCallStatusModal = ({ onCancel, onSave, chamadoData }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onSave(chamadoData.id, values.newStatus);
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Title level={4} style={{ margin: 0, marginBottom: 8 }}>
                <SyncOutlined style={{ marginRight: 8 }} />
                Atualizar Status do Chamado
            </Title>
            <Text type="secondary">Altere o status do chamado {chamadoData.id}</Text>

            <div style={{ marginTop: 24, marginBottom: 24 }}>
                <Text strong style={{ marginBottom: 8, display: 'block' }}>
                    Status Atual
                </Text>
                <StatusTag status={chamadoData.status} />
            </div>

            <Item
                name="newStatus"
                label={<Text strong>Novo Status</Text>}
                rules={[{ required: true, message: 'Por favor, selecione um novo status!' }]}
                required={false}
            >
                <Select placeholder="Selecione o novo status">
                    <Option value="ABERTO">Aberto</Option>
                    <Option value="EM_ANDAMENTO">Em andamento</Option>
                    <Option value="FINALIZADO">Finalizado</Option>
                </Select>
            </Item>

            <div style={{ textAlign: 'right', marginTop: 24 }}>
                <Space>
                    <Button onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Atualizar Status
                    </Button>
                </Space>
            </div>
        </Form>
    );
};

export default UpdateCallStatusModal;