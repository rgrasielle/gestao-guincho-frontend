import { Form, Select, Button, Space, Typography } from 'antd';
import { SyncOutlined, UserOutlined } from '@ant-design/icons';
import MotoristaGuinchoStatusTag from '../../components/MotoristaGuinchoStatusTag';

const { Title, Text } = Typography;
const { Item } = Form;
const { Option } = Select;

const UpdateDriverAvailabilityModal = ({ onCancel, onSave, initialData }) => {
    const [form] = Form.useForm();

    // Use uma verificação defensiva para evitar o erro se initialData for undefined
    const driverData = initialData || {};

    // Função chamada ao submeter o formulário
    const handleFinish = (values) => {
        onSave({ ...values, id: driverData.id });
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={initialData}>
            <Title level={4} style={{ margin: 0, marginBottom: 8 }}>
                <SyncOutlined style={{ marginRight: 8 }} />
                Atualizar Disponibilidade
            </Title>
            <Text type="secondary">Altere a disponibilidade do motorista:</Text>

            <div style={{ marginTop: 24, marginBottom: 24 }}>
                <div style={{ background: '#fbfcfc', padding: '16px', borderRadius: '4px' }}>
                    <Space size="large">
                        <UserOutlined style={{ marginRight: 4, color: '#1677ff', fontSize: 24 }} />
                        <div>
                            <Text strong>{driverData.nomeCompleto}</Text>
                            <br />
                            <Text>CNH: {driverData.cnh}</Text>
                        </div>
                    </Space>
                </div>
            </div>

            <div style={{ marginTop: 24, marginBottom: 24 }}>
                <Text strong style={{ marginBottom: 8, display: 'block' }}>
                    Disponibilidade Atual
                </Text>
                <MotoristaGuinchoStatusTag status={driverData.disponibilidade} />
            </div>

            <Item
                name="disponibilidade"
                label={<Text strong>Nova Disponibilidade</Text>}
                rules={[{ required: true, message: 'Por favor, selecione uma nova disponibilidade!' }]}
                required={false}
            >
                <Select placeholder="Selecione a nova disponibilidade">
                    <Option value="Disponível">Disponível</Option>
                    <Option value="Em Atendimento">Em Atendimento</Option>
                    <Option value="Indisponível">Indisponível</Option>
                </Select>
            </Item>

            <div style={{ textAlign: 'right', marginTop: 24 }}>
                <Space>
                    <Button onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Atualizar Disponibilidade
                    </Button>
                </Space>
            </div>
        </Form>
    );
};

export default UpdateDriverAvailabilityModal;