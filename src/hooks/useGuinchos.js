import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd'; // 1. Importe o 'App' do Ant Design
import guinchosService from '../services/guinchosService';
import { useApiMutation } from './useUsers'; // 2. Importe nosso hook customizado

/**
 * Hook para listar guinchos
 */
export function useGuinchos() {
    return useQuery({
        queryKey: ['guinchos'],
        queryFn: () => guinchosService.listar(),
    });
}

/**
 * Hook para criar um guincho
 */
export function useCriarGuincho() {
    const queryClient = useQueryClient();
    const { notification } = App.useApp(); // Pega a instância da notificação

    return useApiMutation({ // Usa nosso hook que já trata erros
        mutationFn: (dados) => guinchosService.criar(dados),
        onSuccess: () => {
            notification.success({ message: 'Cadastro realizado com sucesso!' });
            queryClient.invalidateQueries({ queryKey: ['guinchos'] });
        },
    });
}

/**
 * Hook para atualizar todos os dados de um guincho
 */
export function useAtualizarGuincho() {
    const queryClient = useQueryClient();
    const { notification } = App.useApp();

    return useApiMutation({
        mutationFn: ({ id, dados }) => guinchosService.atualizar(id, dados),
        onSuccess: () => {
            notification.success({ message: 'Guincho atualizado com sucesso!' });
            queryClient.invalidateQueries({ queryKey: ['guinchos'] });
        },
    });
}

/**
 * Hook para atualizar apenas a disponibilidade do guincho
 */
export function useAtualizarDisponibilidadeGuincho() {
    const queryClient = useQueryClient();
    const { notification } = App.useApp();

    return useApiMutation({
        mutationFn: ({ id, disponibilidade }) =>
            guinchosService.atualizarDisponibilidade(id, disponibilidade),
        onSuccess: () => {
            notification.success({ message: 'Disponibilidade atualizada com sucesso!' });
            queryClient.invalidateQueries({ queryKey: ['guinchos'] });
        },
    });
}

/**
 * Hook para deletar um guincho
 */
export function useDeletarGuincho() {
    const queryClient = useQueryClient();
    const { notification } = App.useApp();

    // Usa o `useMutation` diretamente para um controlo total do erro
    return useMutation({
        mutationFn: (id) => guinchosService.deletar(id),
        onSuccess: () => {
            notification.success({ message: 'Guincho deletado com sucesso!' });
            queryClient.invalidateQueries({ queryKey: ['guinchos'] });
        },
        onError: (error) => {
            // Esta é a ÚNICA lógica de erro que será executada
            // Caso 1: Erro específico de guincho em uso
            if (error.response && error.response.status === 500) {
                notification.error({
                    message: 'Falha ao Excluir Guincho',
                    description: 'Este guincho não pode ser excluído pois já está associado a um ou mais chamados.',
                    placement: 'topRight',
                });
            } else {
                // Caso 2: Para qualquer outro erro, mostramos a notificação genérica
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