describe("Contact Us Page", () => {
  it("[Test Case #1] Fill with valid inputs", () => {
    cy.visit("https://webdriveruniversity.com/Contact-Us/contactus.html");
    // how to select an element
    // by ID, Class, Attribute, CSS, or xpath
    // select element by ID 
    cy.get('#contact-us').click()
  });
  
  it.only("[Test Case #1] Fill with valid inputs", () => {
    cy.visit("https://webdriveruniversity.com/Contact-Us/contactus.html");
    cy.title().should('eq', 'WebDriver | Contact Us');
    cy.get('[name=first_name]').type('Mohammed');
    cy.get('[name=last_name]').type('Salah');
    cy.get('[placeholder="Email Address"]').type('mosalah@gmail.com');
    cy.get('.feedback-input').last().type("This is my second class")
    cy.get('[type=submit]').click()
    // chai --> expected result
    cy.url().should('include', 'thank-you')
  });
})
