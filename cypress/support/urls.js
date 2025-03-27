Cypress.Commands.add('matchUT', (url, title) => {
  cy.visit(url);
  cy.url().should('eq', url);
  cy.title().should('include', title);
})