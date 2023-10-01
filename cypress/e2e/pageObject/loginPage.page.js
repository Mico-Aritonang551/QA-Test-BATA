// LoginPage.js

class LoginPage {
  visit() {
    cy.visit('https://www.bata.com/id/en/login');
  }

  login(email, password) {
    cy.get('#login-form-email').clear().type(email);
    cy.get('#login-form-password').clear().type(password);
    cy.get('.login > .cc-button-type-1').click()
  }

  fillEmail(email) {
    cy.get('#login-form-email').clear().type(email);
  }

  fillPassword(password) {
    cy.get('#login-form-password').clear().type(password);
  }

  clickLoginButton() {
    cy.get('.login > .cc-button-type-1').click();
  }
  visitCart() {
    cy.get('#minicartIcon').click();
  }
}

export default LoginPage;
