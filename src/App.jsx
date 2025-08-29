import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/Layout"; // Layout que junta Sidebar + Header + Content
import Dashboard from "./pages/Dashboard";
import Chamados from "./pages/Chamados";

function App() {
  return (
    <Routes>
      {/* Rotas que usam o layout */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chamados" element={<Chamados />} />
        <Route path="/motoristas" element={<h1>Motoristas</h1>} />
        <Route path="/guinchos" element={<h1>Guinchos</h1>} />
        <Route path="/financeiro" element={<h1>Financeiro</h1>} />
        <Route path="/relatorios" element={<h1>Relatórios</h1>} />
        <Route path="/configuracoes" element={<h1>Configurações</h1>} />
        <Route path="/sair" element={<h1>Sair</h1>} />
        <Route path="/usuario" element={<h1>Usuário</h1>} />
      </Route>

      {/* Rota sem layout */}
      <Route path="/cadastro" element={<h1>Cadastro</h1>} />
      <Route path="/login" element={<h1>Login</h1>} />
      <Route path="/novochamado" element={<h1>NovoChamado</h1>} />
    </Routes>
  );
}

export default App;
