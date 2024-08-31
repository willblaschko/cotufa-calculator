// tests/e2e/calculator.spec.js

describe('Calculator E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/'); // Assuming the calculator is served at the root URL
  });

  it('should display the calculator', () => {
    cy.get('.calculator').should('be.visible');
    cy.get('.calculator__display').should('have.text', '0');
  });

  it('should perform basic arithmetic operations', () => {
    cy.get('.key--number').contains('5').click();
    cy.get('.key--operator').contains('+').click();
    cy.get('.key--number').contains('3').click();
    cy.get('.key--operator').contains('=').click();
    cy.get('.calculator__display').should('have.text', '8');

    cy.get('.key--operator').contains('-').click();
    cy.get('.key--number').contains('2').click();
    cy.get('.key--operator').contains('=').click();
    cy.get('.calculator__display').should('have.text', '6');

    cy.get('.key--operator').contains('*').click();
    cy.get('.key--number').contains('4').click();
    cy.get('.key--operator').contains('=').click();
    cy.get('.calculator__display').should('have.text', '24');

    cy.get('.key--operator').contains('/').click();
    cy.get('.key--number').contains('3').click();
    cy.get('.key--operator').contains('=').click();
    cy.get('.calculator__display').should('have.text', '8');
  });

  it('should handle decimal numbers', () => {
    cy.get('.key--number').contains('1').click();
    cy.get('.key--decimal').click();
    cy.get('.key--number').contains('5').click();
    cy.get('.key--operator').contains('+').click();
    cy.get('.key--number').contains('2').click();
    cy.get('.key--decimal').click();
    cy.get('.key--number').contains('5').click();
    cy.get('.key--operator').contains('=').click();
    cy.get('.calculator__display').should('have.text', '4');
  });

  it('should clear the display', () => {
    cy.get('.key--number').contains('5').click();
    cy.get('.key--operator').contains('+').click();
    cy.get('.key--number').contains('3').click();
    cy.get('.key--operator[data-action="clear"]').click();
    cy.get('.calculator__display').should('have.text', '0');
  });

  it('should perform all-clear operation', () => {
    cy.get('.key--number').contains('5').click();
    cy.get('.key--operator').contains('+').click();
    cy.get('.key--number').contains('3').click();
    cy.get('.key--operator[data-action="all-clear"]').click();
    cy.get('.calculator__display').should('have.text', '0');
  });

  it('should handle keyboard input', () => {
    cy.get('body').type('5+3{enter}');
    cy.get('.calculator__display').should('have.text', '8');

    cy.get('body').type('{backspace}');
    cy.get('.calculator__display').should('have.text', '0');

    cy.get('body').type('7*6{enter}');
    cy.get('.calculator__display').should('have.text', '42');
  });

  it('should be responsive across different viewport sizes', () => {
    // Test on mobile viewport
    cy.viewport('iphone-6');
    cy.get('.calculator').should('be.visible');
    cy.get('.key').should('have.css', 'height', '50px');

    // Test on tablet viewport
    cy.viewport('ipad-2');
    cy.get('.calculator').should('be.visible');
    cy.get('.key').should('have.css', 'height', '55px');

    // Test on desktop viewport
    cy.viewport(1200, 800);
    cy.get('.calculator').should('be.visible');
    cy.get('.key').should('have.css', 'height', '70px');
  });

  it('should handle edge cases', () => {
    // Division by zero
    cy.get('.key--number').contains('5').click();
    cy.get('.key--operator').contains('/').click();
    cy.get('.key--number').contains('0').click();
    cy.get('.key--operator').contains('=').click();
    cy.get('.calculator__display').should('have.text', 'Error');

    // Long numbers
    cy.get('.key--operator[data-action="all-clear"]').click();
    for (let i = 0; i < 15; i++) {
      cy.get('.key--number').contains('9').click();
    }
    cy.get('.calculator__display').invoke('text').should('have.length', 12);
  });

  it('should maintain calculation state', () => {
    cy.get('.key--number').contains('5').click();
    cy.get('.key--operator').contains('+').click();
    cy.get('.key--number').contains('3').click();
    cy.get('.key--operator').contains('=').click();
    cy.get('.calculator__display').should('have.text', '8');

    cy.get('.key--operator').contains('+').click();
    cy.get('.key--number').contains('2').click();
    cy.get('.key--operator').contains('=').click();
    cy.get('.calculator__display').should('have.text', '10');
  });
});
