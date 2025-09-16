import { useEffect } from 'react';
import { Form, InputNumber, Button, Space, Typography } from 'antd';
import { useEnterToNavigate } from '../../hooks/useEnterToNavigate';

const { Text } = Typography;

// Preenche ou reseta o formulário ao abrir o modal
const ValoresFixosFormModal = ({ onCancel, onSave, initialData }) => {
    const [form] = Form.useForm();

    const handleKeyDown = useEnterToNavigate();

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue(initialData);
        } else {
            form.resetFields();
        }
    }, [initialData, form]);

    const handleFinish = (values) => {
        onSave(values);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            onKeyDown={handleKeyDown}
        >

            <Form.Item
                name="valorQuilometragemPorKm"
                label={<Text strong>Quilometragem - Valor por KM (R$)</Text>}
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
                name="valorQuilometragemSaida"
                label={<Text strong>Quilometragem - Valor da Saída (R$)</Text>}
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
                name="valorMotoristaPorKm"
                label={<Text strong>Acerto Motorista - Valor por KM (R$)</Text>}
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
                name="valorMotoristaSaida"
                label={<Text strong>Acerto Motorista - Valor da Saída (R$)</Text>}
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
                name="valorDiaria"
                label={<Text strong>Valor da Diária (R$)</Text>}
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

export default ValoresFixosFormModal;