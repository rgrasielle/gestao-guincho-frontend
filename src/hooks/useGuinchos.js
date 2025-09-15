import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import guinchosService from '../services/guinchosService';

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

    return useMutation({
        mutationFn: (dados) => guinchosService.criar(dados),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['guinchos'] });
        },
    });
}

/**
 * Hook para atualizar todos os dados de um guincho
 */
export function useAtualizarGuincho() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, dados }) => guinchosService.atualizar(id, dados),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['guinchos'] });
        },
    });
}

/**
 * Hook para atualizar apenas a disponibilidade do guincho
 */
export function useAtualizarDisponibilidadeGuincho() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, disponibilidade }) =>
            guinchosService.atualizarDisponibilidade(id, disponibilidade),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['guinchos'] });
        },
    });
}

/**
 * Hook para deletar um guincho
 */
export function useDeletarGuincho() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => guinchosService.deletar(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['guinchos'] });
        },
    });
}
