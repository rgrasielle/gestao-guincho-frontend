import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { App, notification } from 'antd';
import { AuthContext } from '../context/AuthContext';
import usersService from '../services/usersService';
import api from '../services/api';

// Hook customizado com tratamento de erro embutido
export const useApiMutation = (mutationOptions) => {
    const { notification } = App.useApp();

    return useMutation({
        ...mutationOptions,
        onError: (error, variables, context) => {
            const errorMessage = error?.response?.data?.message || 'Ocorreu um erro inesperado na sua requisição.';
            notification.error({
                message: 'Erro',
                description: errorMessage,
                placement: 'topRight',
            });
            if (mutationOptions.onError) {
                mutationOptions.onError(error, variables, context);
            }
        },
    });
};


// Hook de mutação para fazer login
export function useLogin() {
    // ANTES: return useMutation({ ... });
    return useApiMutation({ // <-- DEPOIS
        mutationFn: (loginData) => api.post('/auth/login', loginData),
    });
}

// Hook de mutação para registrar um novo usuário
export function useRegister() {
    // ANTES: return useMutation({ ... });
    return useApiMutation({ // <-- DEPOIS
        mutationFn: (registerData) => api.post('/auth/register', registerData),
    });
}

// Hook de mutação para alterar a senha do usuário.
export function useChangePassword() {
    // ANTES: return useMutation({ ... });
    return useApiMutation({ // <-- DEPOIS
        mutationFn: (passwords) => usersService.changePassword(passwords),
    });
}

// Hook de mutação para apagar a conta do usuário.
export function useDeleteAccount() {
    const { logout } = useContext(AuthContext);
    const queryClient = useQueryClient();

    // ANTES: return useMutation({ ... });
    return useApiMutation({ // <-- DEPOIS
        mutationFn: () => usersService.deleteAccount(),
        onSuccess: () => {
            notification.success({ message: 'Conta apagada com sucesso.' });
            queryClient.clear();
            logout();
        },
        // O onError já é tratado pelo useApiMutation, não precisa mais dele aqui.
    });
}