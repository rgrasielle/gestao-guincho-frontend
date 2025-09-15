import { useState, useContext } from 'react';
import { Modal, Form, Input, Button, Divider, Typography, notification, Space } from 'antd';
import { LockOutlined, DeleteOutlined, UserOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/AuthContext';
import { useChangePassword, useDeleteAccount } from '../hooks/useUsers';

const { Title, Text } = Typography;

const ProfileModal = ({ open, onCancel }) => {
    const [form] = Form.useForm();
    const { user, logout } = useContext(AuthContext);

    // NOVO: Estado para controlar qual tela é exibida
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    const { mutate: changePassword, isLoading: isChangingPassword } = useChangePassword();
    const { mutate: deleteAccount, isLoading: isDeletingAccount } = useDeleteAccount();

    const handlePasswordChange = (values) => {
        changePassword(values, {
            onSuccess: () => {
                notification.success({ message: 'Senha alterada com sucesso!' });
                form.resetFields();
                setIsEditingPassword(false); // Volta para a tela de visualização
            },
            onError: (error) => {
                notification.error({
                    message: 'Erro ao alterar a senha',
                    description: error.response?.data?.message || 'Verifique sua senha atual e tente novamente.',
                });
            }
        });
    };

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: 'Você tem certeza que deseja apagar sua conta?',
            icon: <DeleteOutlined style={{ color: 'red' }} />,
            content: 'Esta ação é irreversível.',
            okText: 'Sim, apagar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                deleteAccount();
            },
        });
    };

    // Função para fechar o modal e resetar a visualização
    const handleCancel = () => {
        setIsEditingPassword(false);
        onCancel();
    };

    return (
        <Modal
            title={<Title level={4} style={{ margin: 0 }}>Meu Perfil</Title>}
            open={open}
            onCancel={handleCancel}
            footer={null}
        >
            {/* RENDERIZAÇÃO CONDICIONAL */}
            {isEditingPassword ? (
                // --- TELA 2: FORMULÁRIO DE ALTERAÇÃO DE SENHA ---
                <div>
                    <Button
                        type="text"
                        icon={<LeftOutlined />}
                        onClick={() => setIsEditingPassword(false)}
                        style={{ paddingLeft: 0, marginBottom: 16 }}
                    >
                        Voltar
                    </Button>
                    <Title level={5}>Alterar Senha</Title>
                    <Form form={form} layout="vertical" onFinish={handlePasswordChange}>
                        <Form.Item name="currentPassword" label="Senha Atual" rules={[{ required: true, message: 'Por favor, insira sua senha atual!' }]}>
                            <Input.Password prefix={<LockOutlined />} placeholder="Senha Atual" />
                        </Form.Item>
                        <Form.Item name="newPassword" label="Nova Senha" rules={[{ required: true, message: 'Por favor, insira a nova senha!' }]}>
                            <Input.Password prefix={<LockOutlined />} placeholder="Nova Senha" />
                        </Form.Item>
                        <Form.Item name="confirmPassword" label="Confirmar Nova Senha" dependencies={['newPassword']} rules={[/*...*/]}>
                            <Input.Password prefix={<LockOutlined />} placeholder="Confirmar Nova Senha" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={isChangingPassword}>
                                Salvar Nova Senha
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ) : (
                // --- TELA 1: VISUALIZAÇÃO DO PERFIL ---
                <div>
                    <Title level={5}>Dados de Acesso</Title>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        {/* Item Nome de Usuário */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                            <div>
                                <Text>Nome de usuário</Text><br />
                                <Text type="secondary">{user?.username}</Text>
                            </div>
                        </div>

                        <Divider style={{ margin: 0 }} />

                        {/* Item Senha */}
                        <div onClick={() => setIsEditingPassword(true)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '12px 0' }}>
                            <div>
                                <Text>Senha</Text><br />
                                <Text type="secondary">Alterar senha</Text>
                            </div>
                            <RightOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
                        </div>
                    </Space>

                    <Divider />

                    {/* Item Sair */}
                    <div onClick={logout} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '12px 0' }}>
                        <Text>Sair</Text>
                    </div>

                    <Divider />

                    {/* Zona de Perigo */}
                    <Title level={5} style={{ color: 'red' }}>Apagar conta</Title>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>Apagar sua conta permanentemente.</Text>
                        <Button danger onClick={showDeleteConfirm} loading={isDeletingAccount}>
                            Apagar Conta
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default ProfileModal;