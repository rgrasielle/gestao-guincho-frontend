import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import chamadosService from "../services/chamadosService";

/**
 * Listar chamados com filtros e paginação
 * @param {Object} filtros - filtros opcionais { sinistro, placa, status, page, size }
 */
export function useChamados(filtros) {
    return useQuery({
        queryKey: ["chamados", filtros], // cache separado por filtros
        queryFn: () =>
            chamadosService.listar(filtros).then((res) => res.data), // retorna dados da API
        keepPreviousData: true, // mantém lista antiga enquanto busca nova página
    });
}


// Buscar um chamado específico por ID
export function useChamado(id) {
    return useQuery({
        queryKey: ["chamado", id],
        queryFn: () => chamadosService.buscarPorId(id).then((res) => res.data),
        enabled: !!id, // só executa se id for válido
    });
}


// Criar chamado
export function useCriarChamado() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dados) => chamadosService.criar(dados),
        onSuccess: () => {
            queryClient.invalidateQueries(["chamados"]); // atualiza lista após criar
        },
    });
}


// Atualizar chamado inteiro
export function useAtualizarChamado() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, dados }) => chamadosService.atualizar(id, dados),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries(["chamados"]);
            queryClient.invalidateQueries(["chamado", id]);
        },
    });
}


// Atualizar apenas o status
export function useAtualizarStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }) =>
            chamadosService.atualizarStatus(id, status),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries(["chamados"]);
            queryClient.invalidateQueries(["chamado", id]);
        },
    });
}


// Deletar chamado

export function useDeletarChamado() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => chamadosService.deletar(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["chamados"]);
        },
    });
}
