Cypress.Commands.add('handlePrivacyBanner', () => {
  cy.log('### COMMAND: Checking for Cookies Banner ###');
  cy.get('body').then(($body) => {
    if ($body.find('[data-testid="uc-ccpa-button"]').length > 0) {
      cy.log('### Banner found, clicking... ###');
      cy.get('[data-testid="uc-ccpa-button"]').click();
    } else {
      cy.log('### Banner not found, skipping... ###');
    }
  });
});

Cypress.Commands.add('clickWithoutNewTab', (selector) => {
    cy.log('### COMMAND: Removing target attribute ###');
    cy.get(selector)
      .invoke('removeAttr', 'target')
      .click({ force: true });
});
