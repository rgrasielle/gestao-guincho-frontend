import { useCallback } from 'react';

/**
 * Hook customizado que retorna um manipulador de evento onKeyDown.
 * Este manipulador captura a tecla 'Enter' e move o foco para o
 * próximo campo de formulário interativo.
 */
export const useEnterToNavigate = () => {

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            const formElement = e.target.form;
            if (!formElement) return;

            // Pega todos os elementos interativos do formulário
            const formInputs = Array.from(
                formElement.querySelectorAll('input, select, textarea, button')
            ).filter(el =>
                !el.disabled &&
                !el.readOnly &&
                el.type !== 'hidden' &&
                !el.closest('.ant-select-dropdown') &&
                !el.closest('.ant-picker-dropdown')
            );

            const currentIndex = formInputs.findIndex(el => el === e.target);
            const nextIndex = currentIndex + 1;

            // Se houver um próximo campo, move o foco para ele
            if (nextIndex < formInputs.length && formInputs[nextIndex]) {
                e.preventDefault(); // Impede o comportamento padrão do Enter (ex: submeter o form)
                formInputs[nextIndex].focus();
            }
        }
    }, []); // O array vazio [] garante que a função seja criada apenas uma vez

    return handleKeyDown;
};