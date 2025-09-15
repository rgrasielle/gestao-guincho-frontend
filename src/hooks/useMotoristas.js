import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import motoristasService from '../services/motoristasService';

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

    return useMutation({
        mutationFn: (dados) => motoristasService.criar(dados),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['motoristas'] });
        },
    });
}

/**
 * Hook para atualizar todos os dados de um motorista
 */
export function useAtualizarMotorista() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, dados }) => motoristasService.atualizar(id, dados),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['motoristas'] });
        },
    });
}

/**
 * Hook para atualizar apenas a disponibilidade do motorista
 */
export function useAtualizarDisponibilidade() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, disponibilidade }) =>
            motoristasService.atualizarDisponibilidade(id, disponibilidade),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['motoristas'] });
        },
    });
}

/**
 * Hook para deletar um motorista
 */
export function useDeletarMotorista() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => motoristasService.deletar(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['motoristas'] });
        },
    });
}
