import { Card, Form, Input, Button, Typography, Layout, App as AntApp } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useRegister } from "../../hooks/useUsers";
import { useEnterToNavigate } from "../../hooks/useEnterToNavigate";

const { Title, Text } = Typography;
const { Content } = Layout;

export default function RegisterPage() {

    const navigate = useNavigate();
    const handleKeyDown = useEnterToNavigate();
    const { login } = useAuth();

    const { mutate: registerUser, isPending } = useRegister();

    const { notification } = AntApp.useApp();

    const onFinish = (values) => {
        if (values.password !== values.confirmPassword) {
            // 3. Agora, esta 'notification' vai funcionar!
            notification.error({
                message: 'Erro',
                description: 'As senhas não coincidem!',
                placement: 'topRight'
            });
            return;
        }

        registerUser(values, {
            onSuccess: (data) => {
                login(data.data.token);
                notification.success({
                    message: 'Cadastro realizado com sucesso!',
                    placement: 'topRight'
                });
            },
            // Erros da API, como "usuário já existe",
            // serão capturados pelo nosso hook useApiMutation.
        });
    };

    return (
        <Layout style={{ minHeight: '100vh', background: '#ffffffff' }}>
            <Content style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '24px'
            }}>
                <Card
                    title={
                        <div style={{ textAlign: 'center' }}>
                            <Title level={3} style={{ margin: 0, color: '#1677ff' }}>Cadastro</Title>
                        </div>
                    }
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}

                >
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        onKeyDown={handleKeyDown}
                    >
                        <Form.Item
                            label={<Text strong>Usuário</Text>}
                            name="username"
                            rules={[{ required: true, message: "Digite seu usuário!" }]}
                            required={false}
                        >
                            <Input placeholder="Digite seu usuário" />
                        </Form.Item>

                        <Form.Item
                            label={<Text strong>Senha</Text>}
                            name="password"
                            rules={[{ required: true, message: "Digite sua senha!" }]}
                            required={false}
                        >
                            <Input.Password placeholder="Digite sua senha" />
                        </Form.Item>

                        <Form.Item
                            label={<Text strong>Confirmar Senha</Text>}
                            name="confirmPassword"
                            rules={[{ required: true, message: "Confirme sua senha!" }]}
                            required={false}
                        >
                            <Input.Password placeholder="Digite novamente sua senha" />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: '100%' }}
                                loading={isPending}
                            >
                                Cadastrar
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="link"
                                style={{ width: '100%', marginTop: '8px', color: '#1677ff' }}
                                onClick={() => navigate("/login")}
                            >
                                Já tenho conta
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Content>
        </Layout>
    );
}
