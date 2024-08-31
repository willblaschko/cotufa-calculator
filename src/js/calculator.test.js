import { initCalculator, performOperation, inputDigit, inputDecimal, handleOperator, resetCalculator, handleClear } from './calculator.js';

describe('Calculator', () => {
  let mockDisplay;

  beforeEach(() => {
    // Mock the DOM elements
    document.body.innerHTML = `
      <div id="display">0</div>
      <div class="calculator__keys">
        <button data-action="clear">C</button>
        <button data-action="all-clear">AC</button>
        <button data-action="calculate">=</button>
      </div>
    `;
    mockDisplay = document.getElementById('display');
    initCalculator();
  });

  describe('performOperation', () => {
    test('addition', () => {
      expect(performOperation(2, 3, '+')).toBe(5);
    });

    test('subtraction', () => {
      expect(performOperation(5, 3, '-')).toBe(2);
    });

    test('multiplication', () => {
      expect(performOperation(4, 3, '*')).toBe(12);
    });

    test('division', () => {
      expect(performOperation(6, 2, '/')).toBe(3);
    });

    test('division by zero', () => {
      expect(() => performOperation(5, 0, '/')).toThrow('Division by zero');
    });

    test('invalid operation', () => {
      expect(() => performOperation(2, 3, '%')).toThrow('Invalid operation');
    });
  });

  describe('inputDigit', () => {
    test('input single digit', () => {
      inputDigit('5');
      expect(mockDisplay.textContent).toBe('5');
    });

    test('input multiple digits', () => {
      inputDigit('1');
      inputDigit('2');
      inputDigit('3');
      expect(mockDisplay.textContent).toBe('123');
    });

    test('replace initial zero', () => {
      inputDigit('0');
      inputDigit('5');
      expect(mockDisplay.textContent).toBe('5');
    });

    test('limit to 12 digits', () => {
      for (let i = 1; i <= 13; i++) {
        inputDigit('1');
      }
      expect(mockDisplay.textContent).toBe('111111111111');
    });
  });

  describe('inputDecimal', () => {
    test('add decimal to integer', () => {
      inputDigit('5');
      inputDecimal();
      expect(mockDisplay.textContent).toBe('5.');
    });

    test('ignore multiple decimals', () => {
      inputDigit('5');
      inputDecimal();
      inputDecimal();
      inputDigit('2');
      expect(mockDisplay.textContent).toBe('5.2');
    });

    test('start with decimal', () => {
      inputDecimal();
      expect(mockDisplay.textContent).toBe('0.');
    });
  });

  describe('handleOperator', () => {
    test('basic operation', () => {
      inputDigit('5');
      handleOperator('+');
      inputDigit('3');
      handleOperator('=');
      expect(mockDisplay.textContent).toBe('8');
    });

    test('chained operations', () => {
      inputDigit('5');
      handleOperator('+');
      inputDigit('3');
      handleOperator('-');
      inputDigit('2');
      handleOperator('=');
      expect(mockDisplay.textContent).toBe('6');
    });

    test('operation with decimal numbers', () => {
      inputDigit('5');
      inputDecimal();
      inputDigit('5');
      handleOperator('*');
      inputDigit('2');
      handleOperator('=');
      expect(mockDisplay.textContent).toBe('11');
    });
  });

  describe('resetCalculator', () => {
    test('reset to initial state', () => {
      inputDigit('5');
      handleOperator('+');
      inputDigit('3');
      resetCalculator();
      expect(mockDisplay.textContent).toBe('0');
    });
  });

  describe('handleClear', () => {
    test('clear current entry', () => {
      inputDigit('5');
      inputDigit('3');
      handleClear();
      expect(mockDisplay.textContent).toBe('0');
    });

    test('clear all after multiple clears', () => {
      inputDigit('5');
      handleOperator('+');
      inputDigit('3');
      handleClear();
      handleClear();
      expect(mockDisplay.textContent).toBe('0');
    });
  });

  describe('Edge cases', () => {
    test('handle very large numbers', () => {
      inputDigit('9');
      for (let i = 0; i < 15; i++) {
        inputDigit('9');
      }
      expect(mockDisplay.textContent).toBe('999999999999');
    });

    test('handle very small decimal numbers', () => {
      inputDigit('0');
      inputDecimal();
      for (let i = 0; i < 11; i++) {
        inputDigit('0');
      }
      inputDigit('1');
      expect(mockDisplay.textContent).toBe('0.00000000001');
    });
  });
});
