/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    login(): Chainable<any>
    user(username: string): Chainable<any>
    pass(password: string): Chainable<any>
    loginError(): Chainable<any>
    errorText(text: string): Chainable<any>
    matchUT(url: string, title: string): Chainable<any>
    exampleFixture(): Chainable<any>
  }
}