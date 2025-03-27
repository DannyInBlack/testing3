describe.only('Invalidated Access', () => {
  before(() => {
    cy.fixture("example")
      .then((data) => {
        globalThis.users = data.users;
        globalThis.passwords = data.passwords;
        globalThis.site = data.site;
      })
  })

  beforeEach('Must open login page first to get the error', () => {
    cy.matchUT(site.url, site.title);
  })

  // Each of these urls should return to the login page with an error.
  afterEach('Check current page is the login page', () => {
    cy.url().should('eq', site.url);
    cy.title().should('include', site.title);
  })

  it("[1] Trying to access inventory page", () => {
    cy.visit(site.url, site.pages.inventory, { failOnStatusCode: false });
    cy.errorText(`Epic sadface: You can only access '/${site.pages.inventory}' when you are logged in`);
  })

  it("[2] Trying to access cart page", () => {
    cy.visit(site.url + site.pages.cart, { failOnStatusCode: false });
    cy.errorText(`Epic sadface: You can only access '/${site.pages.cart}' when you are logged in`);
  })

  it("[3] Trying to access checkout step one page", () => {
    cy.visit(site.url + site.pages.checkout1, { failOnStatusCode: false });
    cy.errorText(`Epic sadface: You can only access '/${site.pages.checkout1}' when you are logged in`);
  })

  it("[4] Trying to access checkout step two page", () => {
    cy.visit(site.url + site.pages.checkout2, { failOnStatusCode: false });
    cy.errorText(`Epic sadface: You can only access '/${site.pages.checkout2}' when you are logged in`);
  })

  it("[6] Trying to access checkout complete page", () => { 
    cy.visit(site.url + site.pages.checkout3, { failOnStatusCode: false });
    cy.errorText(`Epic sadface: You can only access '/${site.pages.checkout3}' when you are logged in`);
  })
});

// describe.skip('Login Page', () => {
//   beforeEach('Visit the page url', () => {
//     cy.matchUT(url, title);
//   })
  
//   // missing username and password
//   it("[1] Missing username and password", () => {
//     cy.login();
//     cy.url().should('eq', url);
//     cy.loginError()
//     cy.errorText("Epic sadface: Username is required");
//   })
  
//   // missing password
//   it("[2] Missing password", () => {
//     cy.user(validUser);
//     cy.login();
//     cy.url().should('eq', url);
//     cy.loginError();
//     cy.errorText("Epic sadface: Password is required");
//   })
  
//   // username and password do not match any user in this service
//   it("[3] Incorrect username and password", () => {
//     cy.user(wrongUser);
//     cy.pass(wrongPass);
//     cy.login();
//     cy.url().should('eq', url);
//     cy.loginError();
//     cy.errorText("Epic sadface: Username and password do not match any user in this service");
//   })
  
//   // password doesn't match
//   it("[4] Incorrect password", () => {
//     cy.user(validUser);
//     cy.pass(wrongPass);
//     cy.login();
//     cy.url().should('eq', url);
//     cy.loginError();
//     cy.errorText("Epic sadface: Username and password do not match any user in this service");
//   })
  
//   // valid user and password
//   it("[5] Valid user", () => {
//     cy.user(validUser);
//     cy.pass(pass);
//     cy.login();
//     cy.wait(1000);
//     cy.url().should('eq', url + pages[0]);
//   })
  
//   // blocked user
//   it("[6] Blocked user", () => {
//     cy.user(blockedUser);
//     cy.pass(pass);
//     cy.login();
//     cy.url().should('eq', url);
//     cy.loginError();
//     cy.errorText("Epic sadface: Sorry, this user has been locked out.");
//   })
  
// });

// describe.skip('Products Page', () => {
//   beforeEach('Login with the provided user', () => {
//     cy.matchUT(url, title);
//     cy.user(validUser);
//     cy.pass(pass);
//     cy.login();
//     cy.wait(1000);
//     cy.url().should('eq', url + pages[0]);
//   });

//   it('[1] Product has correct image', () => {
//     cy.get('[data-test=inventory-item-sauce-labs-backpack-img]')
//       .should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
//   });

// });

// describe('Problem User', () => {
//   // All product images are replaced with a dog image
//   // Cannot add any products 
//   // Cannot edit last name in
//   // cannot change sorting method 
// });

// describe('Performance Glitch User', () => {
//   // Takes more than 3 seconds to redirect to the inventory page
// });

// describe('Visual Error User', () => {
//   // Cart icon appeasr on top of the filter icon
//   // Menu, close menu icon is slightly tilted
//   // Bottom right add to cart button is shifted to the right
//   // Prices are randomly generated on each reload/navigation
//   // Backpack image is incorrect
//   // Middle row product names are shifted to the right
// });

// describe('Error User', () => {
//   // Cannot click twice to add and remove items from cart
//   // Trying to sort will not work, causing an alert to pop up
//   // Last name isn't a required field in checkout form
//   // Cannot finish checkout to go to order details page
// });

