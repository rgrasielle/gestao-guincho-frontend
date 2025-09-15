import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { notification } from 'antd';
import { AuthContext } from '../context/AuthContext';
import usersService from '../services/usersService';

// Hook de mutação para alterar a senha do usuário.
export function useChangePassword() {
    return useMutation({
        mutationFn: (passwords) => usersService.changePassword(passwords),
    });
}

//  Hook de mutação para apagar a conta do usuário.
export function useDeleteAccount() {
    const { logout } = useContext(AuthContext);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => usersService.deleteAccount(),
        onSuccess: () => {
            notification.success({ message: 'Conta apagada com sucesso.' });

            // Limpa todos os caches de dados da aplicação
            queryClient.clear();

            // Chama a função de logout do AuthContext para limpar o token e redirecionar
            logout();
        },
        onError: (error) => {
            notification.error({
                message: 'Erro ao apagar a conta',
                description: error.response?.data?.message || 'Tente novamente.',
            });
        },
    });
}