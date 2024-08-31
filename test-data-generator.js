/**
 * Test Data Generator for Basic Numeric Calculator
 * This module provides functions to generate test data for various calculator scenarios.
 */

/**
 * Generates a set of basic arithmetic operation test cases
 * @returns {Array} An array of test cases for basic arithmetic operations
 */
function generateBasicArithmeticTestCases() {
  return [
    { input: ['5', '+', '3'], expected: '8', description: 'Basic addition' },
    { input: ['10', '-', '4'], expected: '6', description: 'Basic subtraction' },
    { input: ['6', '*', '7'], expected: '42', description: 'Basic multiplication' },
    { input: ['15', '/', '3'], expected: '5', description: 'Basic division' },
    { input: ['2', '+', '2', '*', '2'], expected: '6', description: 'Order of operations' },
    { input: ['(', '4', '+', '4', ')', '*', '2'], expected: '16', description: 'Parentheses' },
  ];
}

/**
 * Generates a set of edge case test scenarios
 * @returns {Array} An array of test cases for edge cases
 */
function generateEdgeCaseTestScenarios() {
  return [
    { input: ['0', '/', '0'], expected: 'Error', description: 'Division by zero' },
    { input: ['9'.repeat(16)], expected: '9'.repeat(15), description: 'Maximum display length' },
    { input: ['0', '.', '1', '+', '0', '.', '2'], expected: '0.3', description: 'Decimal addition' },
    { input: ['1', 'e', '10'], expected: '10000000000', description: 'Scientific notation' },
    { input: ['-', '5', '+', '3'], expected: '-2', description: 'Negative numbers' },
    { input: ['0', '.', '1', '*', '0', '.', '1'], expected: '0.01', description: 'Decimal multiplication' },
  ];
}

/**
 * Generates a set of error condition test cases
 * @returns {Array} An array of test cases for error conditions
 */
function generateErrorConditionTestCases() {
  return [
    { input: ['5', '+', '+'], expected: 'Error', description: 'Consecutive operators' },
    { input: ['*', '5'], expected: 'Error', description: 'Starting with an operator' },
    { input: ['5', '+'], expected: 'Error', description: 'Incomplete operation' },
    { input: ['5', '.', '.', '5'], expected: 'Error', description: 'Multiple decimal points' },
    { input: ['(', '5', '+', '3'], expected: 'Error', description: 'Unmatched parentheses' },
    { input: ['1', '/', '(', '2', '-', '2', ')'], expected: 'Error', description: 'Division by zero in expression' },
  ];
}

/**
 * Generates a set of keyboard input test cases
 * @returns {Array} An array of test cases for keyboard input
 */
function generateKeyboardInputTestCases() {
  return [
    { input: '5+3=', expected: '8', description: 'Basic keyboard input' },
    { input: '7*8=', expected: '56', description: 'Multiplication using keyboard' },
    { input: '10-5=', expected: '5', description: 'Subtraction using keyboard' },
    { input: '20/4=', expected: '5', description: 'Division using keyboard' },
    { input: '2.5+2.5=', expected: '5', description: 'Decimal input using keyboard' },
    { input: 'Backspace5+3=', expected: '8', description: 'Using backspace key' },
    { input: 'c7+3=', expected: '10', description: 'Using clear key' },
  ];
}

/**
 * Generates a set of complex calculation test cases
 * @returns {Array} An array of test cases for complex calculations
 */
function generateComplexCalculationTestCases() {
  return [
    { input: ['2', '+', '3', '*', '4', '-', '6', '/', '2'], expected: '11', description: 'Complex calculation with multiple operations' },
    { input: ['(', '5', '+', '3', ')', '*', '(', '2', '-', '1', ')'], expected: '8', description: 'Nested parentheses' },
    { input: ['1', '0', '0', '0', '0', '0', '0', '*', '0', '.', '0', '0', '0', '0', '0', '1'], expected: '1', description: 'Large number multiplication with small decimal' },
    { input: ['1', '/', '3', '*', '3'], expected: '1', description: 'Division followed by multiplication' },
    { input: ['2', '^', '3', '+', '4', '^', '2'], expected: '24', description: 'Exponentiation (if supported)' },
  ];
}

module.exports = {
  generateBasicArithmeticTestCases,
  generateEdgeCaseTestScenarios,
  generateErrorConditionTestCases,
  generateKeyboardInputTestCases,
  generateComplexCalculationTestCases
};
