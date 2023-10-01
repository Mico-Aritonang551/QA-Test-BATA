// CartPage.js

class CartPage {
  visitCart() {
    cy.get('#minicartIcon').click();
  }

  getCartQuantity() {
    return cy.get('#minicartIcon > .cc-headerBar-iconNumber > .cc-icon-number');
  }

  verifyCartQuantityChanged(previousAmount) {
    cy.get('#minicartIcon > .cc-headerBar-iconNumber > .cc-icon-number').invoke('text').then((amountAfter) => {
      expect(amountAfter).to.not.equal(previousAmount);

      const before = parseInt(previousAmount.replace('Total Items: ', ''), 10);
      const after = parseInt(amountAfter.replace('Total Items: ', ''), 10);

      expect(after).to.equal(before + 1);
    });
  }

  verifyProductInCart(productName) {
    cy.get('.cc-cart-product-name').should('contain', productName);
  }
}

export default CartPage;
