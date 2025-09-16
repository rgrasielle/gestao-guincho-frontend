import { Layout } from "antd";
import Sidebar from "./Sidebar";
import AppHeader from "./Header";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

// Junta Sidebar + Header + Content
const AppLayout = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sidebar />
            <Layout style={{ marginLeft: 200 }}>
                <AppHeader />
                <Content style={{ marginTop: "15px", marginLeft: "15px", background: "#fff", padding: 70 }}>
                    <Outlet /> {/* Aqui entram as páginas */}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
