
/// <reference types="cypress" />

// Cypress custom commands

// Command to check accessibility
Cypress.Commands.add('checkA11y', (context, options) => {
  cy.injectAxe();
  cy.checkA11y(context, options);
});

// Command to navigate and check for basic accessibility
Cypress.Commands.add('navigateAndCheckA11y', (path: string) => {
  cy.visit(path);
  cy.injectAxe();
  cy.checkA11y();
});

// Command to test that a page is rendered correctly
Cypress.Commands.add('assertPageLoaded', (title: string, selector = 'h1, h2') => {
  cy.get(selector).contains(title).should('be.visible');
});

// Command to simulate wallet connection
Cypress.Commands.add('connectWallet', () => {
  cy.window().then((win) => {
    // Mock wallet connection
    win.localStorage.setItem('wallet_connected', 'true');
    win.localStorage.setItem('wallet_address', '0x123456789abcdef');
  });
  cy.reload();
});

// Add TypeScript definitions
declare global {
  namespace Cypress {
    interface Chainable {
      checkA11y(
        context?: string | Node | NodeList | Element,
        options?: any
      ): Chainable<Element>;
      
      navigateAndCheckA11y(path: string): Chainable<Element>;
      
      assertPageLoaded(
        title: string, 
        selector?: string
      ): Chainable<Element>;
      
      connectWallet(): Chainable<Element>;
    }
  }
}

export {};
