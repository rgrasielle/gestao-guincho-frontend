import api from './api'; // sua instância do axios já configurada

const motoristasService = {
    listar: async () => {
        const response = await api.get('/motoristas');
        return response.data;
    },

    criar: async (motoristaData) => {
        const response = await api.post('/motoristas', motoristaData);
        return response.data;
    },

    atualizar: async (id, motoristaData) => {
        const response = await api.put(`/motoristas/${id}`, motoristaData);
        return response.data;
    },

    atualizarDisponibilidade: async (id, disponibilidade) => {
        const response = await api.patch(`/motoristas/${id}/disponibilidade`, {
            disponibilidade,
        });
        return response.data;
    },

    deletar: async (id) => {
        await api.delete(`/motoristas/${id}`);
        return id; // retorna o id deletado, útil no frontend
    },
};

export default motoristasService;
