import { Layout, Menu } from "antd";
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

const { Sider } = Layout;

const Sidebar = () => {
    const location = useLocation();
    const path = location.pathname.substring(1);
    const selectedKey = path.split("/")[0] || "dashboard";

    return (
        <Sider
            width={240}
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

            >
                <Menu.Item key="dashboard" icon={<HomeOutlined />}>
                    <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="chamados" icon={<PhoneOutlined />}>
                    <Link to="/chamados">Chamados</Link>
                </Menu.Item>
                <Menu.Item key="motoristas" icon={<TeamOutlined />}>
                    <Link to="/motoristas">Motoristas</Link>
                </Menu.Item>
                <Menu.Item key="guinchos" icon={<TruckOutlined />}>
                    <Link to="/guinchos">Guinchos</Link>
                </Menu.Item>
                <Menu.Item key="financeiro" icon={<DollarOutlined />}>
                    <Link to="/financeiro">Financeiro</Link>
                </Menu.Item>
                <Menu.Item key="relatorios" icon={<FileTextOutlined />}>
                    <Link to="/relatorios">Relatórios</Link>
                </Menu.Item>
            </Menu>

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
            >
                <Menu.Item key="configuracoes" icon={<SettingOutlined />}>
                    <Link to="/configuracoes">Configurações</Link>
                </Menu.Item>
                <Menu.Item key="sair" icon={<LogoutOutlined />}>
                    <Link to="/sair">Sair</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;