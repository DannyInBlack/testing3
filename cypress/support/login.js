Cypress.Commands.add('login', () => {
  cy.get('[data-test=login-button]').click();
})

Cypress.Commands.add('user', (user) => {
  cy.get('#user-name').type(user);
})

Cypress.Commands.add('pass', (pass) => {
  cy.get('#password').type(pass);
})

Cypress.Commands.add('loginError', () => {
  cy.get('#user-name').should('have.class', 'error');
  cy.get('#password').should('have.class', 'error');
})

Cypress.Commands.add('errorText', (text) => {
  cy.get('[data-test=error]').should('include.text', text); 
})