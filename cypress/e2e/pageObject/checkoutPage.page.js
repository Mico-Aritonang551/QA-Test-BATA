class CheckoutPage {
    clickCheckoutButton() {
        cy.get('#cart-page-checkout-btn').click({ force: true });
    }

    selectTitle() {
        cy.get('[for="mr"]').click();
    }

    fillShippingInformation(firstName, lastName, address) {
        cy.get('#shippingFirstNamedefault').clear().type(firstName);
        cy.get('#shippingLastNamedefault').clear().type(lastName);
        cy.get('#shippingAddressOnedefault').clear().type(address);
    }

    selectProvince(province) {
        cy.get(':nth-child(4) > :nth-child(1) > .form-group > .cc-content-select > .editable-block > .dropdown > .btn').click()
        cy.get(`#${province}`).click();
    }

    selectCity(city) {
        cy.get(':nth-child(4) > :nth-child(2) > .form-group > .cc-content-select > .editable-block > .dropdown > .btn').click()
        cy.get(`#${city}`).click();
    }

    selectDistrict(district) {
        cy.get(':nth-child(5) > :nth-child(1) > .form-group > .cc-content-select > .editable-block > .dropdown > .btn').click()
        cy.get(`#${district}`).click();
    }
    selectSubdictrict(subdictrict) {
        cy.get('.js-addressField-container > .editable-block > .dropdown > .btn').click()
        cy.get(`#${subdictrict}`).click();
    }

    verifyProductsOnShoppinglist(productName) {
        cy.get('#cc-summary-label').click()
        cy.get('.cc-prod-name').click()
            .should('be.visible')
            .invoke('text')
            .should('include', productName);
    }

    clickNextStepButton() {
        cy.get('.next-step-button > .submit-shipping').click();
    }
}

export default CheckoutPage
