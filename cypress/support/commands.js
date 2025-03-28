// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  cy.get('[data-test=login-button]').click();
});

Cypress.Commands.add('user', (user) => {
  cy.get('#user-name').type(user);
});

Cypress.Commands.add('pass', (pass) => {
  cy.get('#password').type(pass);
});

Cypress.Commands.add('loginError', () => {
  cy.get('#user-name').should('have.class', 'error');
  cy.get('#password').should('have.class', 'error');
});

Cypress.Commands.add('errorText', (text) => {
  cy.get('[data-test=error]').should('include.text', text); 
});

Cypress.Commands.add('matchUT', (url, title) => {
  cy.visit(url);
  cy.url().should('eq', url);
  cy.title().should('include', title);
});

Cypress.Commands.add('exampleFixture', () => {
  cy.fixture("example")
    .then((data) => {
      globalThis.users = data.users;
      globalThis.passwords = data.passwords;
      globalThis.site = data.site;
    })
});