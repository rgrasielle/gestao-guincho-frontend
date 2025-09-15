import { useState, useEffect } from 'react';

// Hook que recebe um valor e um tempo de atraso (delay)
export function useDebounce(value, delay) {
    // Estado para armazenar o valor "atrasado" (debounced)
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Configura um timer para atualizar o valor debounced após o delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Função de limpeza: cancela o timer se o valor mudar antes do delay
        // Isso acontece a cada letra digitada
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Roda o efeito novamente apenas se o valor ou o delay mudarem

    return debouncedValue;
}