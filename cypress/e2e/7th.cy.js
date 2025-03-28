describe('Invalidated Access', () => {
  before(() => {
    cy.exampleFixture();
  })

  beforeEach('[0] Must open login page first to get the error', () => {
    cy.matchUT(site.url, site.title);
  })

  // Each of these urls should return to the login page with an error.
  afterEach('[*] Check current page is the login page', () => {
    cy.url().should('eq', site.url);
    cy.title().should('include', site.title);
  })

  it("[1] Trying to access inventory page", () => {
    cy.visit(site.url + site.pages.inventory, { failOnStatusCode: false });
    // cy.errorText(`Epic sadface: You can only access '/${site.pages.inventory}' when you are logged in`);
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

  it("[5] Trying to access checkout complete page", () => { 
    cy.visit(site.url + site.pages.checkout3, { failOnStatusCode: false });
    cy.errorText(`Epic sadface: You can only access '/${site.pages.checkout3}' when you are logged in`);
  })
});

describe('Login Page', () => {
  before(() => {
    cy.exampleFixture();
  })
  
  beforeEach('[0] Visit the page url', () => {
    // cy.clearCookies();
    cy.matchUT(site.url, site.title);
  })
  
  // missing name and password
  it("[1] Missing username and password", () => {
    cy.login();
    cy.url().should('eq', site.url);
    cy.loginError()
    cy.errorText("Epic sadface: Username is required");
  })
  
  // missing password
  it("[2] Missing password", () => {
    cy.user(users.valid);
    cy.login();
    cy.url().should('eq', site.url);
    cy.loginError();
    cy.errorText("Epic sadface: Password is required");
  })
  
  // username and password do not match any user in this service
  it("[3] Incorrect username and password", () => {
    cy.user(users.wrong);
    cy.pass(passwords.wrong);
    cy.login();
    cy.url().should('eq', site.url);
    cy.loginError();
    cy.errorText("Epic sadface: Username and password do not match any user in this service");
  })
  
  // password doesn't match
  it("[4] Incorrect password", () => {
    cy.user(users.valid);
    cy.pass(passwords.wrong);
    cy.login();
    cy.url().should('eq', site.url);
    cy.loginError();
    cy.errorText("Epic sadface: Username and password do not match any user in this service");
  })
  
  // valid user and password
  it("[5] Valid user", () => {
    cy.user(users.valid);
    cy.pass(passwords.correct);
    cy.login();
    cy.wait(1000);
    cy.url().should('eq', site.url + site.pages.inventory);
  })
  
  // blocked user
  it("[6] Blocked user", () => {
    cy.user(users.blocked);
    cy.pass(passwords.correct);
    cy.login();
    cy.url().should('eq', site.url);
    cy.loginError();
    cy.errorText("Epic sadface: Sorry, this user has been locked out.");
  })
  
});

describe.only('Products Page', () => {

  before(() => {
    cy.exampleFixture();
  })

  beforeEach('Login with the provided user', () => {
    cy.matchUT(site.url, site.title);
    cy.user(users.performance);
    cy.pass(passwords.correct);
    cy.login();
    cy.url().should('eq', site.url + site.pages.inventory);
  });

  // error that can occur with visual error user
  it('[1] Product has correct image', () => {
    cy.get('[data-test=inventory-item-sauce-labs-backpack-img]')
      .should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
  });

  // Menu, close menu icon is slightly tilted
  it('[1] Product has correct image', () => {
    cy.get('[data-test=inventory-item-sauce-labs-backpack-img]')
      .should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
  });

  // Cart icon appeasr on top of the filter icon
  it('[1] Product has correct image', () => {
    cy.get('[data-test=inventory-item-sauce-labs-backpack-img]')
      .should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
  });
  
  // Bottom right add to cart button is shifted to the right
  it('[1] Product has correct image', () => {
    cy.get('[data-test=inventory-item-sauce-labs-backpack-img]')
      .should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
  });
  
  // Middle row product names are shifted to the right
  it('[1] Product has correct image', () => {
    cy.get('[data-test=inventory-item-sauce-labs-backpack-img]')
      .should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
  });
  
  // Prices are randomly generated on each reload/navigation
  it('[1] Product has correct image', () => {
    cy.get('[data-test=inventory-item-sauce-labs-backpack-img]')
      .should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
  });
  
  // Cannot add any products
  it('[1] Product has correct image', () => {
    cy.get('[data-test=inventory-item-sauce-labs-backpack-img]')
      .should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
  });
  
  // Cannot click twice to add and remove items from cart
  it('[1] Product has correct image', () => {
    cy.get('[data-test=inventory-item-sauce-labs-backpack-img]')
      .should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
  });
  
  // Cannot change sorting method 
  it('[1] Product has correct image', () => {
    cy.get('[data-test=inventory-item-sauce-labs-backpack-img]')
      .should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
  });
  
  // Trying to sort will not work, causing an alert to pop up
  it('[1] Product has correct image', () => {
    cy.get('[data-test=inventory-item-sauce-labs-backpack-img]')
      .should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
  });
  
  // Cannot go to cart page
  it('[1] Product has correct image', () => {
    cy.get('[data-test=inventory-item-sauce-labs-backpack-img]')
      .should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
  });
  
});

describe('Checkout Page 1', () => {

  // Cannot edit last name in 
  it('[1] Product has correct image', () => {
    cy.get('[data-test=inventory-item-sauce-labs-backpack-img]')
      .should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
  });
  
  // Last name isn't a required field in checkout form
  it('[1] Product has correct image', () => {
    cy.get('[data-test=inventory-item-sauce-labs-backpack-img]')
      .should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
  });
  
  
})

describe('Checkout Page 2', () => {
  //   // Cannot finish checkout to go to order details page
  it('[1] Product has correct image', () => {
    cy.get('[data-test=inventory-item-sauce-labs-backpack-img]')
      .should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
  });

})

// describe('Performance Glitch User', () => {
//   // Takes more than 3 seconds to redirect to the inventory page
// });
