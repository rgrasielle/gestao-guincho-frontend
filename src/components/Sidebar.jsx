import { Layout, Menu, message } from "antd";
import {
    HomeOutlined,
    PhoneOutlined,
    TruckOutlined,
    LogoutOutlined,
    TeamOutlined
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";

const { Sider } = Layout;

const Sidebar = () => {
    const location = useLocation();
    const path = location.pathname.substring(1);
    const selectedKey = path.split("/")[0] || "dashboard";

    const { logout } = useAuth();

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    // Items do menu principal
    const mainMenuItems = [
        { key: "dashboard", icon: <HomeOutlined />, label: <Link to="/dashboard">Dashboard</Link> },
        { key: "chamados", icon: <PhoneOutlined />, label: <Link to="/chamados">Chamados</Link> },
        { key: "motoristas", icon: <TeamOutlined />, label: <Link to="/motoristas">Motoristas</Link> },
        { key: "guinchos", icon: <TruckOutlined />, label: <Link to="/guinchos">Guinchos</Link> },
        /* { key: "financeiro", icon: <DollarOutlined />, label: <Link to="/financeiro">Financeiro</Link> }, */
        /*{ key: "relatorios", icon: <FileTextOutlined />, label: <Link to="/relatorios">Relatórios</Link> }, */
        { key: 'spacer', style: { flexGrow: 1 }, disabled: true, label: ' ' },
        /* { key: "configuracoes", icon: <SettingOutlined />, label: <Link to="/configuracoes">Configurações</Link> }, */
        {
            key: "sair",
            icon: <LogoutOutlined />,
            label: "Sair",
        },
    ];

    const handleMenuClick = (event) => {
        if (event.key === 'sair') {
            setIsLogoutModalOpen(true);
        }
    };

    return (
        <>
            <Sider
                width={250}
                style={{
                    background: "#fff",
                    borderRight: "1px solid #f0f0f0",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    display: 'flex',
                    flexDirection: 'column',


                }}
            >
                {/* Logo */}
                <div
                    style={{
                        height: 64, // Altura do header
                        display: "flex",
                        alignItems: "center",
                        padding: "0 24px", // Adiciona espaçamento nas laterais
                        fontWeight: "bold",
                        fontSize: "20px",
                        color: "#1677ff",
                        borderBottom: "1px solid #f0f0f0",

                    }}
                >
                    GestãoGuincho
                </div>

                {/* Menu */}
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    items={mainMenuItems}
                    onClick={handleMenuClick}
                    style={{
                        borderRight: 0,
                        fontWeight: 500,
                        fontSize: '14px',
                        padding: '16px 10px', // Espaçamento geral
                        display: 'flex', // Faz o Menu usar Flexbox internamente
                        flexDirection: 'column', // Organiza os itens na vertical
                        height: 'calc(100% - 64px)', // Ocupa o resto da altura
                    }}
                    itemMarginBlock={8}
                />
            </Sider>

            <ConfirmationModal
                open={isLogoutModalOpen}
                title="Você tem certeza que deseja sair?"
                content="Você será desconectado da sua conta."
                okText="Sim, Sair"
                cancelText="Cancelar"
                onConfirm={() => {
                    setIsLogoutModalOpen(false);
                    message.success("Você saiu com sucesso!");
                    logout(); // Executa o logout
                }}
                onCancel={() => setIsLogoutModalOpen(false)}
            />
        </>
    );
};

export default Sidebar;

