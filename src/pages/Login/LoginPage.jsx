import { Card, Form, Input, Button, Typography, Layout, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useLogin } from "../../hooks/useUsers";
import { useEnterToNavigate } from "../../hooks/useEnterToNavigate";

const { Title, Text } = Typography;
const { Content } = Layout;

export default function LoginPage() {

    const navigate = useNavigate();
    const { login } = useAuth();
    const handleKeyDown = useEnterToNavigate();

    const { mutate: loginUser, isPending } = useLogin();

    const onFinish = (values) => {
        loginUser(values, {
            onSuccess: (data) => {
                // 'data' é a resposta da API (ex: { token: '...' })
                login(data.data.token);
                notification.success({ // Usando notification para padronizar
                    message: 'Login realizado com sucesso!',
                    description: 'Você será redirecionado para o dashboard.',
                    placement: 'topRight',
                });
            },
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
                            <Title level={3} style={{ margin: 0, color: '#1677ff' }}>Gestão Guincho</Title>
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

                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: '100%' }}
                                loading={isPending}
                            >
                                Entrar
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="link"
                                style={{ width: '100%', marginTop: '8px', color: '#1677ff' }}
                                onClick={() => navigate("/register")}
                            >
                                Criar conta
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Content>
        </Layout>
    );
}
