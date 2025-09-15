import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import valoresFixosService from '../services/valoresFixosService';

/**
 * Hook para buscar os valores fixos
 */
export function useValoresFixos() {
    return useQuery({
        queryKey: ['valoresFixos'],
        queryFn: () => valoresFixosService.listar(),
    });
}

/**
 * Hook para criar/atualizar os valores fixos
 * (usado tanto para criação inicial quanto para atualização)
 */
export function useAtualizarValoresFixos() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dados) => valoresFixosService.atualizar(dados),
        onSuccess: () => {
            // Atualiza o cache para refletir as mudanças
            queryClient.invalidateQueries({ queryKey: ['valoresFixos'] });
        },
    });
}
