"use strict";
/**
 * Decifrando o Código Secreto da Floresta Encantada
 *
 * Este script resolve o desafio da Árvore Anciã, calculando o Número Mágico
 * a partir de uma sequência de números multiplicados por seus índices.
 */
// Elementos do DOM
const inputNumbers = document.getElementById('input-numbers');
const calculateBtn = document.getElementById('calculate-btn');
const resetBtn = document.getElementById('reset-btn');
const resultContainer = document.getElementById('result-container');
const magicNumberElement = document.getElementById('magic-number');
const calculationElement = document.getElementById('calculation');
/**
 * Calcula o Número Mágico a partir de uma lista de números
 * @param numbers - Array de números inteiros
 * @returns O Número Mágico resultante e os passos do cálculo
 */
function calculateMagicNumber(numbers) {
    // Inicializa o resultado como zero
    let magicNumber = 0;
    // Array para armazenar cada passo do cálculo para exibição
    const calculationSteps = [];
    // Itera sobre cada número no array
    numbers.forEach((number, index) => {
        // O índice na lógica do problema começa em 1, não em 0
        const actualIndex = index + 1;
        // Calcula o produto do número pelo seu índice
        const product = number * actualIndex;
        // Adiciona o produto ao Número Mágico
        magicNumber += product;
        // Registra o passo do cálculo
        calculationSteps.push(`(${number} × ${actualIndex})`);
    });
    // Formata os passos do cálculo para exibição
    const stepsString = calculationSteps.join(' + ') + ' = ' + magicNumber;
    // Retorna o resultado e os passos do cálculo
    return { result: magicNumber, steps: stepsString };
}
/**
 * Valida e processa a entrada do usuário
 * @returns Array de números ou null se a entrada for inválida
 */
function processInput() {
    // Obtém o texto digitado pelo usuário
    const inputText = inputNumbers.value.trim();
    // Verifica se a entrada está vazia
    if (!inputText) {
        showError('Por favor, insira números separados por vírgula.');
        return null;
    }
    // Divide a string por vírgulas e converte cada parte em número
    const numbersArray = inputText.split(',')
        .map(num => num.trim())
        .filter(num => num !== '')
        .map(num => Number(num));
    // Verifica se todos os valores são números válidos
    if (numbersArray.some(isNaN)) {
        showError('Por favor, insira apenas números válidos.');
        return null;
    }
    // Verifica se há pelo menos um número
    if (numbersArray.length === 0) {
        showError('Por favor, insira pelo menos um número.');
        return null;
    }
    return numbersArray;
}
/**
 * Exibe uma mensagem de erro
 * @param message - Mensagem de erro a ser exibida
 */
function showError(message) {
    // Exibe o container de resultado para mostrar o erro
    resultContainer.classList.add('active');
    // Atualiza os elementos com a mensagem de erro
    magicNumberElement.textContent = 'Erro';
    magicNumberElement.style.color = '#ff3333';
    calculationElement.textContent = message;
    calculationElement.style.color = '#ff9999';
    // Adiciona uma animação de shake ao input
    inputNumbers.classList.add('shake');
    // Remove a animação após ela terminar
    setTimeout(() => {
        inputNumbers.classList.remove('shake');
    }, 500);
}
/**
 * Exibe o resultado do cálculo
 * @param result - Resultado do cálculo (Número Mágico)
 * @param steps - Passos do cálculo para exibição
 */
function displayResult(result, steps) {
    // Exibe o container de resultado
    resultContainer.classList.add('active');
    // Reseta as cores (caso tenha exibido erro anteriormente)
    magicNumberElement.style.color = '#39FF14';
    calculationElement.style.color = '#ddd';
    // Adiciona uma animação para revelar o número mágico
    magicNumberElement.textContent = '';
    // Efeito de digitação para o número mágico
    const resultStr = result.toString();
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
        if (currentIndex < resultStr.length) {
            magicNumberElement.textContent += resultStr[currentIndex];
            currentIndex++;
        }
        else {
            clearInterval(typingInterval);
            // Após o número mágico ser revelado, mostra os passos do cálculo
            setTimeout(() => {
                calculationElement.textContent = steps;
            }, 300);
        }
    }, 150);
}
/**
 * Função principal que é executada quando o botão de calcular é clicado
 */
function handleCalculate() {
    // Processa a entrada do usuário
    const numbers = processInput();
    // Se a entrada for válida, calcula e exibe o resultado
    if (numbers) {
        const { result, steps } = calculateMagicNumber(numbers);
        displayResult(result, steps);
    }
}
/**
 * Função para resetar o formulário e os resultados
 */
function handleReset() {
    // Limpa o campo de entrada
    inputNumbers.value = '';
    // Esconde a área de resultado
    resultContainer.classList.remove('active');
    // Foca no campo de entrada
    inputNumbers.focus();
}
// Adiciona os event listeners aos botões
calculateBtn.addEventListener('click', handleCalculate);
resetBtn.addEventListener('click', handleReset);
// Permite que o usuário pressione Enter para calcular
inputNumbers.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleCalculate();
    }
});
// Adiciona um efeito sonoro e visual ao botão quando clicado
calculateBtn.addEventListener('mousedown', () => {
    calculateBtn.style.transform = 'scale(0.98)';
});
calculateBtn.addEventListener('mouseup', () => {
    calculateBtn.style.transform = 'scale(1)';
});
resetBtn.addEventListener('mousedown', () => {
    resetBtn.style.transform = 'scale(0.98)';
});
resetBtn.addEventListener('mouseup', () => {
    resetBtn.style.transform = 'scale(1)';
});
// Inicialização - foca no campo de entrada quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    inputNumbers.focus();
    // Exibe um placeholder de exemplo temporário
    inputNumbers.setAttribute('placeholder', 'Ex: 2, 3, 5, 7');
});
//# sourceMappingURL=script.js.map