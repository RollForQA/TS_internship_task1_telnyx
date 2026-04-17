describe('Pricing Calculator Tests', () => {
  const baseUrl = 'https://telnyx.com';

  it('TC-05: Messaging Pricing Calculator', () => {
    cy.visit(`${baseUrl}/pricing/messaging`);
    cy.get('[class*="PriceDisplay"]').first().invoke('text').then((initialPrice) => {
        cy.get('select[id="country-select"]').select('United Kingdom', {force: true});
        cy.get('[class*="PriceDisplay"]').first().invoke('text').should('not.equal', initialPrice);
    });
  });

  it('TC-06: SIP Pricing Currency', () => {
    cy.visit(`${baseUrl}/pricing/elastic-sip`);
    cy.contains('button', 'USD').click({force: true});
    cy.contains('EUR').click({force: true});
    cy.get('[class*="PriceDisplay"]').should('contain', '€');
  });
});
