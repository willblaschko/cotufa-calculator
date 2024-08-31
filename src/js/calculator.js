/**
 * Calculator module for basic arithmetic operations and display management.
 * @module calculator
 */

// Constants for display
const MAX_DISPLAY_LENGTH = 12;
const ERROR_MESSAGE = 'Error';

// Calculator state
let displayValue = '0';
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;

/**
 * Performs the specified arithmetic operation.
 * @param {number} a - The first operand.
 * @param {number} b - The second operand.
 * @param {string} operation - The operation to perform.
 * @returns {number} The result of the operation.
 */
function performOperation(a, b, operation) {
    switch (operation) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) {
                throw new Error('Division by zero');
            }
            return a / b;
        default:
            throw new Error('Invalid operation');
    }
}

/**
 * Updates the calculator display.
 */
function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue;
}

/**
 * Handles number input.
 * @param {string} digit - The digit pressed.
 */
function inputDigit(digit) {
    if (waitingForSecondOperand) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    if (displayValue.length > MAX_DISPLAY_LENGTH) {
        displayValue = displayValue.slice(0, MAX_DISPLAY_LENGTH);
    }
}

/**
 * Handles decimal input.
 */
function inputDecimal() {
    if (waitingForSecondOperand) {
        displayValue = '0.';
        waitingForSecondOperand = false;
        return;
    }
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

/**
 * Handles operator input.
 * @param {string} nextOperator - The operator pressed.
 */
function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performOperation(firstOperand, inputValue, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

/**
 * Resets the calculator to its initial state.
 */
function resetCalculator() {
    displayValue = '0';
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null;
}

/**
 * Handles clear input.
 */
function handleClear() {
    if (displayValue !== '0') {
        displayValue = '0';
    } else {
        resetCalculator();
    }
}

/**
 * Handles keyboard input.
 * @param {KeyboardEvent} event - The keyboard event.
 */
function handleKeyboardInput(event) {
    const key = event.key;

    if (/^[0-9]$/.test(key)) {
        event.preventDefault();
        inputDigit(key);
    } else if (key === '.') {
        event.preventDefault();
        inputDecimal();
    } else if (key === '=' || key === 'Enter') {
        event.preventDefault();
        if (operator) handleOperator('=');
    } else if (key === 'Backspace') {
        event.preventDefault();
        handleClear();
    } else if (key === 'Escape') {
        event.preventDefault();
        resetCalculator();
    } else if (['+', '-', '*', '/'].includes(key)) {
        event.preventDefault();
        handleOperator(key);
    }

    updateDisplay();
}

/**
 * Initializes the calculator and sets up event listeners.
 */
function initCalculator() {
    document.addEventListener('keydown', handleKeyboardInput);
    
    document.querySelectorAll('.calculator__keys button').forEach(button => {
        button.addEventListener('click', () => {
            const { action } = button.dataset;
            const buttonContent = button.textContent;

            if (!action) {
                inputDigit(buttonContent);
            } else if (action === 'decimal') {
                inputDecimal();
            } else if (action === 'clear') {
                handleClear();
            } else if (action === 'all-clear') {
                resetCalculator();
            } else if (action === 'calculate') {
                if (operator) handleOperator('=');
            } else {
                handleOperator(buttonContent);
            }

            updateDisplay();
        });
    });

    updateDisplay();
}

// Export functions for use in other modules
export {
    initCalculator
};
