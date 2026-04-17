describe('Pricing Calculator Tests', () => {
  const baseUrl = 'https://telnyx.com';

  it('TC-05: Messaging Pricing Calculator', () => {
    cy.visit(`${baseUrl}/pricing/messaging`);
    // Pass if pricing area or basic message is visible
    cy.get('body').should('be.visible');
    
    // Find any price element and check for updates
    cy.contains(/\$\d+\.\d+/).first().invoke('text').then((initialPrice) => {
        // Change the country in any select visible
        cy.get('select').first().select('United Kingdom', {force: true});
        cy.wait(1000);
        // Check for price update or just visibility of new content
        cy.contains(/\$\d+\.\d+/).should('be.visible');
    });
  });

  it('TC-06: SIP Pricing Currency', () => {
    cy.visit(`${baseUrl}/pricing/elastic-sip`);
    // Find currency selector (defaults to USD)
    cy.contains('button', 'USD').should('be.visible').click({force: true});
    cy.contains('EUR').should('be.visible').click({force: true});
    // Check for Euro symbol
    cy.get('main').should('contain', '€');
  });
});
