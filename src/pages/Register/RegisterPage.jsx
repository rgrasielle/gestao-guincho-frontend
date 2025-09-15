import { useState } from "react";
import { Card, Form, Input, Button, Typography, message, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/useAuth";

const { Title, Text } = Typography;
const { Content } = Layout;

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const onFinish = async (values) => {
        if (values.password !== values.confirmPassword) {
            message.error("As senhas não coincidem!");
            return;
        }

        try {
            setLoading(true);
            const response = await api.post("/auth/register", values);
            login(response.data.token); // salva token e redireciona para /dashboard
            message.success("Cadastro realizado com sucesso!");
        } catch (error) {
            message.error(error.response?.data?.message || "Erro no cadastro");
        } finally {
            setLoading(false);
        }
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
                    <Form layout="vertical" onFinish={onFinish}>
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
                                loading={loading}
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
