import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/Layout"; // Layout que junta Sidebar + Header + Content
import Dashboard from "./pages/Dashboard";
import Chamados from "./pages/Chamados";
import ChamadoForm from "./pages/ChamadoForm";
import Motoristas from "./pages/Motoristas";
import Guinchos from "./pages/Guinchos";

function App() {
  return (
    <Routes>
      {/* Rotas que usam o layout */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chamados" element={<Chamados />} />
        <Route path="/motoristas" element={<Motoristas />} />
        <Route path="/guinchos" element={<Guinchos />} />
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
