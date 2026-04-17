describe('Home Page and General Tests', () => {
  const baseUrl = 'https://telnyx.com';

  it('TC-01: Main Page Load & SEO', () => {
    cy.visit(baseUrl);
    cy.title().should('contain', 'Telnyx');
    cy.get('h1').should('be.visible').and('not.be.empty');
  });

  it('TC-07: Cookie Consent', () => {
    cy.visit(baseUrl);
    cy.get('#onetrust-banner-sdk').should('be.visible');
    cy.get('#onetrust-accept-btn-handler').click();
    cy.get('#onetrust-banner-sdk').should('not.be.visible');
    cy.getCookie('OptanonAlertBoxClosed').should('exist');
  });

  it('TC-08: Footer LinkedIn Link', () => {
    cy.visit(baseUrl);
    cy.get('footer').scrollIntoView();
    cy.get('footer a[href*="linkedin.com/company/telnyx"]')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'href').and('contain', 'linkedin.com');
  });
});
