import { useQuery, useQueryClient } from "@tanstack/react-query";
import { App } from 'antd'; // 1. Importe o 'App' do Ant Design
import chamadosService from "../services/chamadosService";
import { useApiMutation } from './useUsers'; // 2. Importe nosso hook customizado

/**
 * Listar chamados com filtros e paginação
 */
export function useChamados(filtros = {}) {
    return useQuery({
        queryKey: ["chamados", filtros], // Simplificado: usa o objeto de filtros inteiro como parte da chave
        queryFn: () => chamadosService.listar(filtros).then((res) => res.data),
        keepPreviousData: true,
    });
}

// Buscar um chamado específico por ID
export function useChamadoById(id) {
    // Queries (buscas) não usam useApiMutation, então o tratamento de erro pode ser local se necessário
    return useQuery({
        queryKey: ["chamado", id],
        queryFn: () => chamadosService.buscarPorId(id).then((res) => res.data ?? {}),
        enabled: !!id, // Só executa a busca se o ID existir
    });
}

// Criar chamado
export function useCriarChamado() {
    const queryClient = useQueryClient();
    const { notification } = App.useApp();

    return useApiMutation({
        mutationFn: (dados) => chamadosService.criar(dados),
        onSuccess: () => {
            // A notificação de sucesso já está aqui no hook
            notification.success({ message: 'Chamado criado com sucesso!' });
            // Invalida o cache da lista para forçar a atualização
            queryClient.invalidateQueries({ queryKey: ['chamados'] });
        },
    });
}

// Atualizar chamado inteiro
export function useAtualizarChamado() {
    const queryClient = useQueryClient();
    const { notification } = App.useApp();

    return useApiMutation({
        mutationFn: ({ id, dados }) => chamadosService.atualizar(id, dados),
        onSuccess: (data, { id }) => {
            notification.success({ message: 'Chamado atualizado com sucesso!' });
            // Invalida tanto a lista geral quanto o cache específico deste chamado
            queryClient.invalidateQueries({ queryKey: ['chamados'] });
            queryClient.invalidateQueries({ queryKey: ['chamado', id] });
        },
    });
}

// Atualizar apenas o status
export function useAtualizarStatus() {
    const queryClient = useQueryClient();
    const { notification } = App.useApp();

    return useApiMutation({
        mutationFn: ({ id, status }) =>
            chamadosService.atualizarStatus(id, status), // Garante que o corpo da requisição seja um objeto
        onSuccess: (data, { id }) => {
            notification.success({ message: 'Status atualizado com sucesso!' });
            queryClient.invalidateQueries({ queryKey: ['chamados'] });
            queryClient.invalidateQueries({ queryKey: ['chamado', id] });
        },
    });
}

// Deletar chamado
export function useDeletarChamado() {
    const queryClient = useQueryClient();
    const { notification } = App.useApp();

    return useApiMutation({
        mutationFn: (id) => chamadosService.deletar(id),
        onSuccess: () => {
            notification.success({ message: 'Chamado deletado com sucesso!' });
            queryClient.invalidateQueries({ queryKey: ['chamados'] });
        },
    });
}

// --- Hooks para os Filtros ---

export function useSeguradoras() {
    return useQuery({
        queryKey: ['seguradoras'],
        queryFn: () => chamadosService.listarSeguradoras().then((res) => res.data),
        staleTime: Infinity,
    });
}

export function useTiposServico() {
    return useQuery({
        queryKey: ['tiposServico'],
        queryFn: () => chamadosService.listarTiposServico().then((res) => res.data),
        staleTime: Infinity,
    });
}