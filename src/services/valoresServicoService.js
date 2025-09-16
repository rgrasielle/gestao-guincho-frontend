import api from './api';

const valoresServicoService = {
    // Buscar valores de um chamado específico
    buscarValores: async (chamadoId) => {
        const response = await api.get(`/chamados/${chamadoId}/financeiro`);
        return response.data;
    },

    // Criar ou atualizar os valores de um chamado
    salvarValores: async (chamadoId, dados) => {
        const response = await api.post(`/chamados/${chamadoId}/financeiro`, dados);
        return response.data;
    }
};

export default valoresServicoService;
