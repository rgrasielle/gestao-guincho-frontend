import api from "./api";

// todas as chamadas HTTP relacionadas a Chamado
const chamadosService = {
    // Criar um chamado
    criar: (dados) => api.post("/chamados", dados),

    // Listar chamados com filtros opcionais + paginação
    listar: (params) => api.get("/chamados", { params: params }),

    // Buscar um chamado por ID
    buscarPorId: (id) => api.get(`/chamados/${id}`),

    // Atualizar um chamado inteiro
    atualizar: (id, dados) => api.put(`/chamados/${id}`, dados),

    // Atualizar apenas o status do chamado
    atualizarStatus: (id, status) =>
        api.patch(`/chamados/${id}/status`, { status }),

    // Deletar chamado
    deletar: (id) => api.delete(`/chamados/${id}`),

    // Listar seguradoras únicas
    listarSeguradoras: () => api.get("/chamados/seguradoras"),

    // Listar tipos de serviço únicos
    listarTiposServico: () => api.get("/chamados/tipos-servico"),
};

export default chamadosService;
