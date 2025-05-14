/// @ts-ignore
/// <reference types="Cypress" />
/// <reference types="../support" />

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
    cy.pass(passwords.valid);
    cy.login();
    cy.wait(1000);
    cy.url().should('eq', site.url + site.pages.inventory);
  })

  // blocked user
  it("[6] Blocked user", () => {
    cy.user(users.blocked);
    cy.pass(passwords.valid);
    cy.login();
    cy.url().should('eq', site.url);
    cy.loginError();
    cy.errorText("Epic sadface: Sorry, this user has been locked out.");
  })

});

describe('Products Page', () => {

  before(() => {
    cy.exampleFixture();
  })

  beforeEach('[0] Login with the provided user', () => {
    cy.matchUT(site.url, site.title);
    cy.user(users.valid);
    cy.pass(passwords.valid);
    cy.login();
    cy.url().should('eq', site.url + site.pages.inventory);
  });

  // Product images are correct
  it('[1] Product has correct image', () => {
    cy.get('[data-test=inventory-item-sauce-labs-backpack-img]')
      .should('have.attr', 'src', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
  });

  // Menu, close menu icon have correct orientation
  it('[2] Menu icons have correct rotation', () => {
    cy.get('[data-test=open-menu]').should('not.have.class', 'visual_failure');
    cy.get('#react-burger-menu-btn').click();
    cy.get('[data-test=close-menu]').should('not.have.class', 'visual_failure');
  });

  // Cart icon is aligned correctly
  it('[3] Cart icon in correct position', () => {
    cy.get('#shopping_cart_container').should('not.have.class', 'visual_failure');
  });

  // Cart buttons are aligned correctly
  it('[4] Product has correct image', () => {
    cy.get('.btn_inventory')
      .each(button => {
        expect(button).to.not.have.class('btn_inventory_misaligned')
      });
  });

  // Product labels are aligned correctly
  it('[5] Product names are aligned correctly', () => {
    cy.get('[data-test=inventory-item-name]')
      .each(label => {
        expect(label).to.not.have.class('align_right')
      });
  });

  // Can change sorting method
  it('[6] Change sorting method', () => {
    cy.get('[data-test=product-sort-container').select('lohi');
    cy.get('[data-test=inventory-item-name]').eq(0).should('have.text', 'Sauce Labs Onesie');

    cy.get('[data-test=product-sort-container').select('hilo');
    cy.get('[data-test=inventory-item-name]').eq(0).should('have.text', 'Sauce Labs Fleece Jacket');

    cy.get('[data-test=product-sort-container').select('za');
    cy.get('[data-test=inventory-item-name]').eq(0).should('have.text', 'Test.allTheThings() T-Shirt (Red)');
  });

  // Can add products to the cart
  it('[7] Add product to cart', () => {
    cy.get('#remove-sauce-labs-backpack').should('not.exist');
    cy.get('#add-to-cart-sauce-labs-backpack').click();
    cy.get('#add-to-cart-sauce-labs-backpack').should('not.exist');
    cy.get('#remove-sauce-labs-backpack').should('exist');
    cy.get('[data-test=shopping-cart-badge]').should('include.text', '1');
    cy.get('[data-test=shopping-cart-link]').click();
    cy.url().should('include', site.pages.cart);
    cy.contains('Sauce Labs Backpack').should('exist');
  });

  // Can remove products from the cart
  it('[8] Add and remove an item from cart', () => {
    cy.get('#remove-sauce-labs-backpack').should('not.exist');
    cy.get('#add-to-cart-sauce-labs-backpack').click();
    cy.get('#add-to-cart-sauce-labs-backpack').should('not.exist');
    cy.get('#remove-sauce-labs-backpack').should('exist');
    cy.get('[data-test=shopping-cart-badge]').should('include.text', '1');

    cy.get('[data-test=shopping-cart-link]').click();
    cy.url().should('include', site.pages.cart);
    cy.contains('Sauce Labs Backpack').should('exist');

    cy.get('#continue-shopping').click();
    cy.url().should('include', site.pages.inventory);

    cy.get('#remove-sauce-labs-backpack').click();
    cy.get('#remove-sauce-labs-backpack').should('not.exist');
    cy.get('#add-to-cart-sauce-labs-backpack').should('exist');
    cy.get('[data-test=shopping-cart-badge]').should('not.exist');

    cy.get('[data-test=shopping-cart-link]').click();
    cy.url().should('include', site.pages.cart);
    cy.contains('Sauce Labs Backpack').should('not.exist');
  });

  // Can open product page
  it('[9] Open product page', () => {
    cy.get('#item_4_title_link').click();

    cy.url().should('include', site.pages.product);

    cy.get('[data-test=inventory-item-name]')
      .should('include.text', 'Sauce Labs Backpack');
  });
});

describe('Checkout Page 1', () => {

  before(() => {
    cy.exampleFixture();
  });

  beforeEach('[0] Login then add product to cart', () => {
    cy.matchUT(site.url, site.title);
    cy.user(users.valid);
    cy.pass(passwords.valid);
    cy.login();
    cy.url().should('eq', site.url + site.pages.inventory);

    cy.get('#add-to-cart-sauce-labs-backpack').click();
    cy.get('[data-test=shopping-cart-link]').click();
    cy.url().should('include', site.pages.cart);
    cy.contains('Sauce Labs Backpack').should('exist');
    
    cy.get('#checkout').click();
    cy.url().should('include', site.pages.checkout1);
  });

  // Cannot submit with filling in all form fields. 
  it('[1] All fields missing', () => {
    cy.get('#continue').click();
    cy.url().should('include', site.pages.checkout1);
    cy.get('.error-message-container').should('include.text', 'Error: First Name is required');
  });
  
  it('[2] Firstname required', () => {
    // cy.get('#first-name').type('danny');
    cy.get('#last-name').type('is the man');
    cy.get('#postal-code').type('you wish');
    cy.get('#continue').click();
    cy.url().should('include', site.pages.checkout1);
    cy.get('.error-message-container').should('include.text', 'Error: First Name is required');
  });
  
  it('[3] Lastname required', () => {
    cy.get('#first-name').type('danny');
    // cy.get('#last-name').type('is the man');
    cy.get('#postal-code').type('you wish');
    cy.get('#continue').click();
    cy.url().should('include', site.pages.checkout1);
    cy.get('.error-message-container').should('include.text', 'Error: Last Name is required');
  });
  
  it('[4] Postal code required', () => {
    cy.get('#first-name').type('danny');
    cy.get('#last-name').type('is the man');
    // cy.get('#postal-code').type('you wish');
    cy.get('#continue').click();
    cy.url().should('include', site.pages.checkout1);
    cy.get('.error-message-container').should('include.text', 'Error: Postal Code is required');
  });

})

describe('Checkout Page 2', () => {
  //   // Cannot finish checkout to go to order details page
  before(() => {
    cy.exampleFixture();
  });

  beforeEach('[0] Login, add product to cart, checkout', () => {
    cy.matchUT(site.url, site.title);
    cy.user(users.valid);
    cy.pass(passwords.valid);
    cy.login();
    cy.url().should('eq', site.url + site.pages.inventory);

    cy.get('#add-to-cart-sauce-labs-backpack').click();
    cy.get('[data-test=shopping-cart-link]').click();
    cy.url().should('include', site.pages.cart);
    cy.contains('Sauce Labs Backpack').should('exist');
    
    cy.get('#checkout').click();
    cy.url().should('include', site.pages.checkout1);

    cy.get('#first-name').type('danny');
    cy.get('#last-name').type('is the man');
    cy.get('#postal-code').type('you wish');

    cy.get('#continue').click();
    cy.url().should('include', site.pages.checkout2);

  });

  it('[1] Checkout includes cart item', () => {
    cy.contains('Sauce Labs Backpack').should('exist');
  })

  it('[2] Finalize checkout', () => {
    cy.get('#finish').click();
    cy.url().should('include', site.pages.checkout3);

    cy.get('#back-to-products').click();
    cy.url().should('include', site.pages.inventory);
  })
})

// describe('Performance Glitch User', () => {
//   // Takes more than 3 seconds to redirect to the inventory page
// });
