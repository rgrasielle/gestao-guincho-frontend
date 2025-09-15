import api from "./api"; // Sua instância configurada do Axios

const usersService = {

    // Envia os dados para alterar a senha do usuário logado.
    // * @param {object} passwords - Contém { currentPassword, newPassword, confirmPassword }
    changePassword: (passwords) => api.post('/users/change-password', passwords),

    // Envia a requisição para deletar a conta do usuário logado
    deleteAccount: () => api.delete('/users/me'),
};

export default usersService;