Cypress.Commands.add('handlePrivacyBanner', () => {
    cy.log('### COMMAND: Handling Cookies ###');
    cy.get('[data-testid="uc-ccpa-button"]', { timeout: 15000 })
      .should('be.visible')
      .click();
});

Cypress.Commands.add('clickWithoutNewTab', (selector) => {
    cy.log('### COMMAND: Removing target attribute ###');
    cy.get(selector)
      .invoke('removeAttr', 'target')
      .click({ force: true });
});