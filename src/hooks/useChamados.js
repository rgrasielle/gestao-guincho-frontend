import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import chamadosService from "../services/chamadosService";

/**
 * Listar chamados com filtros e paginação
 * @param {Object} filtros - filtros opcionais { sinistro, placa, status, page, size }
 */
export function useChamados(filtros = {}) {
    const { page = 0, size = 10, ...rest } = filtros;
    return useQuery({
        queryKey: ["chamados", { page, size, ...rest }], // cache separado por página e filtros
        queryFn: () =>
            chamadosService
                .listar({ page, size, ...rest })
                .then((res) => res.data),
        keepPreviousData: true, // mantém dados antigos enquanto busca a nova página
    });
}


// Buscar um chamado específico por ID
export function useChamadoById(id) {
    return useQuery({
        queryKey: ["chamado", id],
        queryFn: () => chamadosService.buscarPorId(id).then((res) => res.data ?? {}),
        enabled: !!id,
        staleTime: 1000 * 60, // 1 min
        onError: (error) => {
            console.error("Erro ao buscar chamado:", error);
        },
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
