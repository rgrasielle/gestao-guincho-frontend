import { Routes, Route, Navigate } from "react-router-dom";
import ChamadosPage from "./pages/ChamadosPage";
import FinanceiroPage from "./pages/FinanceiroPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/chamados" replace />} />
      <Route path="/chamados" element={<ChamadosPage />} />
      <Route path="/chamados/:id/financeiro" element={<FinanceiroPage />} />
    </Routes>
  );
}

