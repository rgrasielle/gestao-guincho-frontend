import api from "./api";

// todas as chamadas HTTP relacionadas a Chamado
const chamadosService = {
    // Criar um chamado
    criar: (dados) => api.post("/api/chamados", dados),

    // Listar chamados com filtros opcionais + paginação
    listar: (params) => api.get("/api/chamados", { params }),

    // Buscar um chamado por ID
    buscarPorId: (id) => api.get(`/api/chamados/${id}`),

    // Atualizar um chamado inteiro
    atualizar: (id, dados) => api.put(`/api/chamados/${id}`, dados),

    // Atualizar apenas o status do chamado
    atualizarStatus: (id, status) =>
        api.patch(`/api/chamados/${id}/status`, { status }),

    // Deletar chamado
    deletar: (id) => api.delete(`/api/chamados/${id}`),
};

export default chamadosService;
