describe('Greyhound project', () => {

    beforeEach(function() {
        cy.fixture('tripData').as('tripData');
    });

    it('should complete the full flow using only E2E/Test attributes', function() {
        cy.intercept('GET', '**/search/autocomplete/cities*').as('citySearch');
        cy.intercept('POST', '**/checkout/payment*', {
            statusCode: 200,
            body: { status: 'success' }
        }).as('mockPayment');

        cy.visit('/');
        cy.handlePrivacyBanner();

        cy.get('[data-e2e="origin-input-field"] input').type(this.tripData.origin);
        cy.wait('@citySearch');
        cy.get('[data-e2e="autocomplete-suggestion"]').contains('Miami, FL').click({ force: true });

        cy.get('[data-e2e="destination-input-field"] input').type(this.tripData.destination);
        cy.wait('@citySearch');
        cy.get('[data-e2e="autocomplete-suggestion"]').contains('Orlando, FL').click({ force: true });

        cy.log('### Opening Calendar ###');
        cy.get('[data-e2e="departure-date-input"]').click(); 
        
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + this.tripData.daysInFuture);
        cy.contains('button', targetDate.getDate()).click({ force: true });

        cy.log('### Executing Search ###');
        cy.clickWithoutNewTab('[data-e2e="search-button"] button');

        cy.get('[data-e2e="results-list"]', { timeout: 25000 }).should('be.visible');
        cy.get('[data-e2e="trip-item-select-button"]').first().click();
        cy.get('[data-e2e="continue-to-checkout-button"]').click();

        cy.get('[data-e2e="passenger-first-name"] input').type('Stephen');
        cy.get('[data-e2e="passenger-last-name"] input').type('QA');
        cy.get('[data-e2e="payment-submit-button"]').click();

        cy.wait('@mockPayment');
        cy.log('### MISSION ACCOMPLISHED ###');
    });
});