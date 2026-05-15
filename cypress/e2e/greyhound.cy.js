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

        cy.visit('/', {
        headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
        }
        });
        cy.handlePrivacyBanner();

        cy.wait(7000); 
        cy.scrollTo('top');

        cy.get('input[name="origin"], input[placeholder*="From"]', { timeout: 20000 })
        .first()
        .should('be.visible')
        .click({ force: true })
        .clear({ force: true })
        .type(this.tripData.origin, { delay: 150, force: true });

        cy.wait('@citySearch');
        cy.get('[data-e2e="autocomplete-suggestion"], .autocomplete-results')
        .contains('Miami, FL')
        .click({ force: true });


        cy.get('input[name="destination"], input[placeholder*="To"]', { timeout: 15000 })
        .first()
       .should('be.visible')
       .click({ force: true })
       .clear({ force: true })
       .type(this.tripData.destination, { delay: 150, force: true });

        cy.wait('@citySearch');
        cy.get('[data-e2e="autocomplete-suggestion"], .autocomplete-results')
       .contains('Orlando, FL')
       .click({ force: true })
        
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
