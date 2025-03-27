describe('Test contact page', () => {

  it('[Test case #1] fill all the requirement fields with valid inputs', () => {
    cy.visit("https://webdriveruniversity.com/Contact-Us/contactus.html");
    cy.title().should('include', 'WebDriver | Contact Us');
    cy.get('[name=first_name]').type('danny');
    cy.get('[name=last_name]').type('boy');
    cy.get('.feedback-input').eq(2).type("dannyboy@gmail.com");
    cy.get('.feedback-input').last().type("dannyboy@gmail.com");
    cy.get('[type="submit"]').click();
    cy.url().should('include', 'contact-form-thank-you');
  });

  it.only('[Test case #2] navigate to error page', () => {
    cy.visit("https://webdriveruniversity.com/Contact-Us/contactus.html");
    cy.get('[name=first_name]').type('danny');
    cy.get('[name=last_name]').type('boy');
    cy.get('.feedback-input').eq(2).type("dannyboy@gmail.com");
    // cy.get('.feedback-input').last().type("dannyboy@gmail.com");
    cy.get('[type="submit"]').click();
    cy.contains('Error: all fields are required').should('be.exist');
  });
})