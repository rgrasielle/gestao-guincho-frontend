import { Layout, Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
    const location = useLocation();
    const path = location.pathname.substring(1);
    const pageTitle = path.charAt(0).toUpperCase() + path.slice(1);

    return (
        <Header
            style={{
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #f0f0f0",
                padding: "0 24px",
                height: 64,
                position: "fixed",
                width: "calc(100% - 220px)",
                zIndex: 1,
                left: 220
            }}
        >
            <div style={{ display: "flex", alignItems: "center" }}>
                {/* Título da página dinâmico */}
                <Title level={4} style={{ margin: 0, paddingLeft: "24px" }}>
                    {pageTitle}
                </Title>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar style={{ marginRight: 8, background: "#e6f7ff", color: "#1677ff" }} icon={<UserOutlined />} />
                <span style={{ color: "#333" }}>Atendente</span>
            </div>
        </Header>
    );
};

export default AppHeader;