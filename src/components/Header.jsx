import { useContext, useState } from 'react';
import { Layout, Typography, Avatar, Dropdown, Space } from "antd";
import { UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import ProfileModal from './ProfileModal';

const { Header } = Layout;
const { Title, Text } = Typography;

const AppHeader = () => {
    const location = useLocation();
    const path = location.pathname.substring(1);
    const pageTitle = path.charAt(0).toUpperCase() + path.slice(1);

    // Busca o usuário e a função de logout do contexto de autenticação
    const { user, logout } = useContext(AuthContext);

    // Estado para controlar a visibilidade do modal de perfil
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    // Definição dos itens do menu dropdown
    const menuItems = [
        {
            key: 'profile',
            icon: <SettingOutlined />,
            label: 'Meu Perfil',
            onClick: () => setIsProfileModalOpen(true),
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Sair',
            danger: true,
            onClick: logout,
        },
    ];

    return (
        <>
            <Header
                style={{
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #f0f0f0",
                    padding: "0 24px",
                    position: "fixed",
                    width: "calc(100% - 220px)",
                    zIndex: 1,
                    left: 220
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Title level={4} style={{ margin: 0 }}>
                        {pageTitle || 'Dashboard'}
                    </Title>
                </div>

                <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow>
                    <Space style={{ cursor: 'pointer' }}>
                        <Avatar style={{ background: "#e6f7ff", color: "#1677ff" }} icon={<UserOutlined />} />
                        <Text strong>{user?.username || 'Usuário'}</Text>
                    </Space>
                </Dropdown>
            </Header>

            <ProfileModal
                open={isProfileModalOpen}
                onCancel={() => setIsProfileModalOpen(false)}
            />
        </>
    );
};

export default AppHeader;