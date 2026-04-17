describe('Navigation and Responsiveness Tests', () => {
  const baseUrl = 'https://telnyx.com';

  it('TC-02: Products Menu Navigation', () => {
    cy.visit(baseUrl);
    cy.get('body').then(($body) => {
        if ($body.find('button#onetrust-accept-btn-handler').length > 0) {
            cy.get('button#onetrust-accept-btn-handler').click();
        }
    });
    // Accept cookies handler (ID usually stays same)
    cy.contains('button', 'Products').realHover().wait(500);
    cy.get('header nav a[href*="/products/voice-api"]').first().click({force: true});
    cy.url().should('include', '/products/voice-api');
  });

  it('TC-10: Mobile Menu Interaction', () => {
    cy.viewport(375, 812);
    cy.visit(baseUrl);
    
    // Accept cookies (critical for visibility)
    cy.get('body').then(($body) => {
        if ($body.find('button#onetrust-accept-btn-handler').length > 0) {
            cy.get('button#onetrust-accept-btn-handler').click();
        }
    });

    // Find the hamburger menu button specifically
    // On Telnyx, it's often a button with aria-haspopup or simply the visible one in header
    cy.get('header button').filter(':visible').first().click({force: true});
    
    // Wait for the menu container to become opaque (finish animation)
    cy.get('#main-menu').should('be.visible').and('not.have.css', 'opacity', '0');
    
    // Now verify the actual links are visible
    cy.contains('Products').should('be.visible');
    cy.contains('Solutions').should('be.visible');
  });
});
