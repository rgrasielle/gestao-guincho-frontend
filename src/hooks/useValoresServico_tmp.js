import { useState, useEffect, useCallback } from 'react';
import valoresServicoService from '../services/valoresServicoService';

export const useValoresServico = (chamadoId) => {
    const [valores, setValores] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formInitialized, setFormInitialized] = useState(false); // flag para inicialização única

    // Função para buscar os valores do chamado
    const buscarValores = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await valoresServicoService.buscarValores(chamadoId);
            setValores(data);
            return data;
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [chamadoId]);

    // Função para criar ou atualizar os valores
    const salvarValores = async (dados) => {
        try {
            setIsLoading(true);
            const data = await valoresServicoService.salvarValores(chamadoId, dados);
            setValores(data); // atualiza com os valores do backend
            return data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Buscar os valores automaticamente ao iniciar
    useEffect(() => {
        if (chamadoId && !formInitialized) {
            buscarValores().then(() => setFormInitialized(true));
        }
    }, [chamadoId, buscarValores, formInitialized]);

    return {
        valores,
        isLoading,
        error,
        buscarValores,
        salvarValores
    };
};
