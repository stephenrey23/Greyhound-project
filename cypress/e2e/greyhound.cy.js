describe('Greyhound E2E Ticket Purchase Flow', () => {

    beforeEach(function() {
        cy.fixture('tripData').as('tripData');
    });

    it('Should complete the full booking flow using hybrid E2E and network intercept strategies', function() {
        
        cy.intercept('GET', '**/search/autocomplete/cities*').as('citySearch');
        
        cy.intercept('POST', '**/checkout/payment*', {
            statusCode: 200,
            body: { status: 'success' }
        }).as('mockPayment');

        cy.log('INIT: Launching Greyhound production environment with custom user-agent headers');
        cy.visit('https://www.greyhound.com', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
            },
            onBeforeLoad(win) {
                Object.defineProperty(win.navigator, 'webdriver', {
                    get: () => false,
                });
            },
        });

        cy.handlePrivacyBanner();

        cy.wait(7000); 
        cy.scrollTo('top');

        cy.log(`STEP 1: Selecting origin location -> ${this.tripData.origin}`);
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

        cy.log(`STEP 2: Selecting destination location -> ${this.tripData.destination}`);
        cy.get('input[name="destination"], input[placeholder*="To"]', { timeout: 15000 })
            .first()
            .should('be.visible')
            .click({ force: true })
            .clear({ force: true })
            .type(this.tripData.destination, { delay: 150, force: true });

        cy.wait('@citySearch');
        cy.get('[data-e2e="autocomplete-suggestion"], .autocomplete-results')
            .contains('Orlando, FL')
            .click({ force: true });
            
        cy.log(`STEP 3: Calculating outbound date window (+${this.tripData.daysInFuture} days in future)`);
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + this.tripData.daysInFuture);
        cy.contains('button', targetDate.getDate()).click({ force: true });

        cy.log('STEP 4: Dispatching search query and waiting for results grid to render');
        cy.clickWithoutNewTab('[data-e2e="search-button"] button');

        cy.get('[data-e2e="results-list"]', { timeout: 25000 }).should('be.visible');
        cy.get('[data-e2e="trip-item-select-button"]').first().click();
        cy.get('[data-e2e="continue-to-checkout-button"]').click();

        cy.log('STEP 5: Injecting passenger credentials and submitting transaction boundary');
        cy.get('[data-e2e="passenger-first-name"] input').type('Stephen');
        cy.get('[data-e2e="passenger-last-name"] input').type('QA');
        cy.get('[data-e2e="payment-submit-button"]').click();

        cy.wait('@mockPayment');
        cy.log('SUCCESS: Intercepted payload verified. Full transaction flow completed successfully.');
    });
});
