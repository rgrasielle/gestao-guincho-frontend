import { useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd'; // 1. Importe o 'App' do Ant Design
import valoresFixosService from '../services/valoresFixosService';
import { useApiMutation } from './useUsers'; // 2. Importe nosso hook customizado

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
 */
export function useAtualizarValoresFixos() {
    const queryClient = useQueryClient();
    const { notification } = App.useApp();

    return useApiMutation({
        mutationFn: (dados) => valoresFixosService.atualizar(dados),
        onSuccess: () => {
            notification.success({ message: 'Valores fixos configurados com sucesso!' });
            // Atualiza o cache para refletir as mudanças
            queryClient.invalidateQueries({ queryKey: ['valoresFixos'] });
        },
    });
}