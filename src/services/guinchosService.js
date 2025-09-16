import api from './api';

const guinchosService = {
    listar: async () => {
        const response = await api.get('/guinchos');
        return response.data;
    },

    criar: async (guinchoData) => {
        const response = await api.post('/guinchos', guinchoData);
        return response.data;
    },

    atualizar: async (id, guinchoData) => {
        const response = await api.put(`/guinchos/${id}`, guinchoData);
        return response.data;
    },

    atualizarDisponibilidade: async (id, disponibilidade) => {
        const response = await api.patch(`/guinchos/${id}/disponibilidade`, {
            disponibilidade,
        });
        return response.data;
    },

    deletar: async (id) => {
        await api.delete(`/guinchos/${id}`);
        return id; // retorna o id deletado, útil no frontend
    },
};

export default guinchosService;
