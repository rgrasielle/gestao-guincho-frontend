import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/Layout"; // Layout que junta Sidebar + Header + Content
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ChamadosPage from "./pages/Chamados/ChamadosPage";
import ChamadoForm from "./pages/Dashboard/ChamadoForm";
import MotoristasPage from "./pages/Motoristas/MotoristasPage";
import GuinchosPage from "./pages/Guinchos/GuinchosPage";

function App() {
  return (
    <Routes>
      {/* Rotas que usam o layout */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/chamados" element={<ChamadosPage />} />
        <Route path="/motoristas" element={<MotoristasPage />} />
        <Route path="/guinchos" element={<GuinchosPage />} />
        <Route path="/financeiro" element={<h1>Financeiro</h1>} />
        <Route path="/relatorios" element={<h1>Relatórios</h1>} />
        <Route path="/configuracoes" element={<h1>Configurações</h1>} />
        <Route path="/sair" element={<h1>Sair</h1>} />
        <Route path="/usuario" element={<h1>Usuário</h1>} />
      </Route>

      {/* Rota sem layout */}
      <Route path="/cadastro" element={<h1>Cadastro</h1>} />
      <Route path="/login" element={<h1>Login</h1>} />
      <Route path="/chamadoform" element={<ChamadoForm />} />
    </Routes>
  );
}

export default App;
