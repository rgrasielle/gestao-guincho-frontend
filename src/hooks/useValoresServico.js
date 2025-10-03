import { useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { useApiMutation } from './useUsers'; // Importando nosso hook wrapper
import valoresServicoService from '../services/valoresServicoService';

/**
 * Hook para BUSCAR os valores de serviço de um chamado específico.
 */
export function useValoresServico(chamadoId) {
    return useQuery({
        // A chave do cache inclui o ID do chamado para que cada um tenha seu próprio cache
        queryKey: ['valoresServico', chamadoId],
        queryFn: () => valoresServicoService.buscarValores(chamadoId),
        enabled: !!chamadoId, // A busca só é executada se um chamadoId for fornecido
    });
}

/**
 * Hook para SALVAR (criar/atualizar) os valores de serviço de um chamado.
 */
export function useSalvarValoresServico(chamadoId) {
    const queryClient = useQueryClient();
    const { notification } = App.useApp();

    return useApiMutation({
        mutationFn: (dados) => valoresServicoService.salvarValores(chamadoId, dados),
        onSuccess: () => {
            notification.success({ message: 'Valores do serviço salvos com sucesso!' });

            // Invalida o cache para forçar a atualização dos dados na tela
            queryClient.invalidateQueries({ queryKey: ['valoresServico', chamadoId] });
            queryClient.invalidateQueries({ queryKey: ['chamados'] }); // Invalida a lista principal de chamados
        },
    });
}