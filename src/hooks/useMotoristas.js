import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd'; // 1. Importe o 'App' do Ant Design
import motoristasService from '../services/motoristasService';
import { useApiMutation } from './useUsers'; // 2. Importe nosso hook customizado

/**
 * Hook para listar motoristas
 */
export function useMotoristas() {
    return useQuery({
        queryKey: ['motoristas'],
        queryFn: () => motoristasService.listar(),
    });
}

/**
 * Hook para criar um motorista
 */
export function useCriarMotorista() {
    const queryClient = useQueryClient();
    const { notification } = App.useApp(); // Pega a instância da notificação

    return useApiMutation({ // Usa nosso hook que já trata erros
        mutationFn: (dados) => motoristasService.criar(dados),
        onSuccess: () => {
            notification.success({ message: 'Cadastro realizado com sucesso!' });
            queryClient.invalidateQueries({ queryKey: ['motoristas'] });
        },
    });
}

/**
 * Hook para atualizar todos os dados de um motorista
 */
export function useAtualizarMotorista() {
    const queryClient = useQueryClient();
    const { notification } = App.useApp();

    return useApiMutation({
        mutationFn: ({ id, dados }) => motoristasService.atualizar(id, dados),
        onSuccess: () => {
            notification.success({ message: 'Motorista atualizado com sucesso!' });
            queryClient.invalidateQueries({ queryKey: ['motoristas'] });
        },
    });
}

/**
 * Hook para atualizar apenas a disponibilidade do motorista
 */
export function useAtualizarDisponibilidade() {
    const queryClient = useQueryClient();
    const { notification } = App.useApp();

    return useApiMutation({
        mutationFn: ({ id, disponibilidade }) =>
            motoristasService.atualizarDisponibilidade(id, disponibilidade),
        onSuccess: () => {
            notification.success({ message: 'Disponibilidade atualizada com sucesso!' });
            queryClient.invalidateQueries({ queryKey: ['motoristas'] });
        },
    });
}

/**
 * Hook para deletar um motorista
 */
export function useDeletarMotorista() {
    const queryClient = useQueryClient();
    const { notification } = App.useApp();

    return useMutation({
        mutationFn: (id) => motoristasService.deletar(id),
        onSuccess: () => {
            notification.success({ message: 'Motorista deletado com sucesso!' });
            queryClient.invalidateQueries({ queryKey: ['motoristas'] });
        },
        onError: (error) => {
            if (error.response && error.response.status === 500) {
                notification.error({
                    message: 'Falha ao Excluir Motorista',
                    description: 'Este motorista não pode ser excluído pois já está associado a um ou mais chamados.',
                    placement: 'topRight',
                });
            } else {
                const errorMessage = error.response?.data?.message || 'Ocorreu um erro inesperado no servidor.';
                notification.error({
                    message: 'Erro',
                    description: errorMessage,
                    placement: 'topRight',
                });
            }
        },
    });
}