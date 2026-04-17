describe('Navigation and Responsiveness Tests', () => {
  const baseUrl = 'https://telnyx.com';

  it('TC-02: Products Menu Navigation', () => {
    cy.visit(baseUrl);
    cy.get('body').then(($body) => {
        if ($body.find('button#onetrust-accept-btn-handler').length > 0) {
            cy.get('button#onetrust-accept-btn-handler').click();
        }
    });
    cy.contains('button', 'Products').trigger('mouseover').wait(500);
    cy.get('header nav a[href*="/products/voice-api"]').first().click({force: true});
    cy.url().should('include', '/products/voice-api');
  });

  it('TC-10: Mobile Menu Interaction', () => {
    cy.viewport(375, 812);
    cy.visit(baseUrl);
    cy.get('header button[aria-label*="menu"]').first().click();
    cy.contains('Products').should('be.visible');
    cy.contains('Solutions').should('be.visible');
  });
});
