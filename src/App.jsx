import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/Layout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ChamadosPage from "./pages/Chamados/ChamadosPage";
import ChamadoForm from "./pages/Dashboard/ChamadoForm";
import MotoristasPage from "./pages/Motoristas/MotoristasPage";
import GuinchosPage from "./pages/Guinchos/GuinchosPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { App as AntApp } from 'antd'; // Importe o App do Ant Design aqui também

function App() {

  // 1. Pega a instância da notificação contextual
  const { notification } = AntApp.useApp();
  // 2. Pega a instância do QueryClient
  const queryClient = useQueryClient();

  // 3. Cria um "ouvinte" de erros
  useEffect(() => {
    // Se inscreve para receber eventos do cache de mutações
    const unsubscribe = queryClient.getMutationCache().subscribe(event => {
      // Verifica se o evento é do tipo 'error'
      if (event.type === 'error') {
        const error = event.error;

        const errorMessage = error?.response?.data?.message || "Ocorreu um erro inesperado. Tente novamente.";

        notification.error({
          message: 'Operação Falhou',
          description: errorMessage,
          placement: 'topRight',
        });
      }
    });

    // Limpa a inscrição quando o componente for desmontado
    return () => {
      unsubscribe();
    };
  }, [notification, queryClient]);

  return (
    <Routes>
      {/* Redirecionamento da raiz */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Rotas protegidas que usam o Layout */}
      <Route
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/chamados" element={<ChamadosPage />} />
        <Route path="/motoristas" element={<MotoristasPage />} />
        <Route path="/guinchos" element={<GuinchosPage />} />
        <Route path="/financeiro" element={<h1>Financeiro</h1>} />
        <Route path="/relatorios" element={<h1>Relatórios</h1>} />
        <Route path="/configuracoes" element={<h1>Configurações</h1>} />
        <Route path="/usuario" element={<h1>Usuário</h1>} />
      </Route>
      <Route path="/chamadoform" element={<ChamadoForm />} />

      {/* Rotas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
