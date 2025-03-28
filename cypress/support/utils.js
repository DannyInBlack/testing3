Cypress.Commands.add('matchUT', (url, title) => {
  cy.visit(url);
  cy.url().should('eq', url);
  cy.title().should('include', title);
})

Cypress.Commands.add('exampleFixture', () => {
  cy.fixture("example")
    .then((data) => {
      globalThis.users = data.users;
      globalThis.passwords = data.passwords;
      globalThis.site = data.site;
    })
})

