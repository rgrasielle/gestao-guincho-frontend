import { Form, InputNumber, Button, Space, Typography } from 'antd';
import { DollarOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ValoresFormModal = ({ onCancel, onSave }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        console.log('Valores configurados:', values);
        onSave(values);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            onReset={onCancel}
        >
            <Form.Item
                name="valorKm"
                label={<Text strong>Valor por KM (R$)</Text>}
                rules={[{ required: true, message: 'Por favor, digite o valor por KM!' }]}
                required={false}
            >
                <InputNumber
                    min={0}
                    step={0.01}
                    formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/R\$\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                />
            </Form.Item>

            <Form.Item
                name="valorSaida"
                label={<Text strong>Valor da Saída (R$)</Text>}
                rules={[{ required: true, message: 'Por favor, digite o valor da saída!' }]}
                required={false}
            >
                <InputNumber
                    min={0}
                    step={0.01}
                    formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/R\$\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                />
            </Form.Item>

            <Form.Item
                name="acertoMotoristaKm"
                label={<Text strong>Acerto Motorista - Valor por KM (R$)</Text>}
                rules={[{ required: true, message: 'Por favor, digite o valor do acerto por KM!' }]}
                required={false}
            >
                <InputNumber
                    min={0}
                    step={0.01}
                    formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/R\$\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                />
            </Form.Item>

            <Form.Item
                name="acertoMotoristaSaida"
                label={<Text strong>Acerto Motorista - Valor da Saída (R$)</Text>}
                rules={[{ required: true, message: 'Por favor, digite o valor do acerto da saída!' }]}
                required={false}
            >
                <InputNumber
                    min={0}
                    step={0.01}
                    formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/R\$\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                />
            </Form.Item>

            <Form.Item
                name="valorHoraParada"
                label={<Text strong>Valor da Hora Parada (R$)</Text>}
                rules={[{ required: true, message: 'Por favor, digite o valor da hora parada!' }]}
                required={false}
            >
                <InputNumber
                    min={0}
                    step={0.01}
                    formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/R\$\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                />
            </Form.Item>

            <Form.Item
                name="valorHoraTrabalhada"
                label={<Text strong>Valor da Hora Trabalhada (R$)</Text>}
                rules={[{ required: true, message: 'Por favor, digite o valor da hora trabalhada!' }]}
                required={false}
            >
                <InputNumber
                    min={0}
                    step={0.01}
                    formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/R\$\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                />
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

export default ValoresFormModal;