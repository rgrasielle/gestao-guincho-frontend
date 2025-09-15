import api from './api';

const valoresFixosService = {
    // Busca os valores fixos
    listar: async () => {
        const response = await api.get('/valores-fixos');
        return response.data;
    },

    // Cria ou atualiza os valores fixos
    atualizar: async (dados) => {
        const response = await api.put('/valores-fixos', dados);
        return response.data;
    },
};

export default valoresFixosService;
