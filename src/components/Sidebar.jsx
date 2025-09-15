import { Layout, Menu, message } from "antd";
import {
    HomeOutlined,
    PhoneOutlined,
    TruckOutlined,
    DollarOutlined,
    FileTextOutlined,
    SettingOutlined,
    LogoutOutlined,
    TeamOutlined
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const { Sider } = Layout;

const Sidebar = () => {
    const location = useLocation();
    const path = location.pathname.substring(1);
    const selectedKey = path.split("/")[0] || "dashboard";

    const { logout } = useAuth();

    // Items do menu principal
    const mainMenuItems = [
        { key: "dashboard", icon: <HomeOutlined />, label: <Link to="/dashboard">Dashboard</Link> },
        { key: "chamados", icon: <PhoneOutlined />, label: <Link to="/chamados">Chamados</Link> },
        { key: "motoristas", icon: <TeamOutlined />, label: <Link to="/motoristas">Motoristas</Link> },
        { key: "guinchos", icon: <TruckOutlined />, label: <Link to="/guinchos">Guinchos</Link> },
        /* { key: "financeiro", icon: <DollarOutlined />, label: <Link to="/financeiro">Financeiro</Link> }, */
        { key: "relatorios", icon: <FileTextOutlined />, label: <Link to="/relatorios">Relatórios</Link> },
    ];

    // Items do menu inferior
    const bottomMenuItems = [
        /* { key: "configuracoes", icon: <SettingOutlined />, label: <Link to="/configuracoes">Configurações</Link> }, */
        {
            key: "sair",
            icon: <LogoutOutlined />,
            label: <span
                onClick={() => {
                    message.success("Você saiu da aplicação!");
                    logout();
                }}
                style={{ cursor: "pointer" }}>Sair</span>
        },
    ];

    return (
        <Sider
            width={250}
            style={{
                background: "#fff",
                borderRight: "1px solid #f0f0f0",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
            }}
        >
            {/* Logo */}
            <div
                style={{
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#1677ff",
                    borderBottom: "1px solid #f0f0f0",
                }}
            >
                GestãoGuincho
            </div>

            {/* Menu principal */}
            <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                style={{ borderRight: 0 }}
                items={mainMenuItems}
            />

            {/* Menu inferior */}
            <Menu
                mode="inline"
                selectedKeys={["configuracoes", "sair"].includes(selectedKey) ? [selectedKey] : []}
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    borderTop: "1px solid #f0f0f0",
                }}
                items={bottomMenuItems}
            />
        </Sider>
    );
};

export default Sidebar;
