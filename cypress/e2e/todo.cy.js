// todo.cy.js

import LoginPage from '../e2e/pageObject/loginPage.page';
import CartPage from '../e2e/pageObject/cartPage.page';
import CheckoutPage from './pageObject/checkoutPage.page';


describe('Login to Website Bata', { testIsolation: false }, () => {
  const loginPage = new LoginPage();

  it('Go to Bata website', () => {
    loginPage.visit();
  });

  it('Login to the home page', () => {
    cy.fixture('userdata.json').then((userData) => {
      loginPage.fillEmail(userData.email);
      loginPage.fillPassword(userData.password);
      loginPage.clickLoginButton()
    }).wait(5000)
    cy.get('.cc-headerBar-logo').click()
  });
})

describe('Search product, add to cart and checkout', { testIsolation: false }, () => {
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage()

  it('Check the number of items before adding', () => {
    cartPage.visitCart();
    cartPage.getCartQuantity().invoke('text').as('previousAmount');
  });

  it('Search Products and Add to Cart', () => {
    cy.get('.cc-headerBar-right > .cc-headerBar-search').click();
    cy.get('#search-input-top-bar-mobile').type('MEN SANDAL SHAZAM');
    cy.get('#product-0').click();
    cy.get('[data-display-value="40"]').click();
    cy.get('.product-name').invoke('text').as('productName');
    cy.get('.add-to-cart').click();
  });

  it('Verify that the product has been added to the cart', function () {
    cy.get('#minicartIcon').click();
    cartPage.verifyCartQuantityChanged(this.previousAmount);
    cy.get('.cc-cart-product-name')
      .should('be.visible')
      .invoke('text')
      .should('include', this.productName);
  });

  it('Checkout Product', function () {
    checkoutPage.clickCheckoutButton();
    checkoutPage.selectTitle();

    //complete data information
    checkoutPage.fillShippingInformation('John', 'Doe', 'Medan');

    //complete shipping address
    checkoutPage.selectProvince('bs-select-1-34');
    checkoutPage.selectCity('bs-select-2-14');
    checkoutPage.selectDistrict('bs-select-3-15');
    checkoutPage.selectSubdictrict('bs-select-4-3');

    // Verification of products in cart
    checkoutPage.verifyProductsOnShoppinglist(this.productName);

    //click for payment
    checkoutPage.clickNextStepButton();
  })
});