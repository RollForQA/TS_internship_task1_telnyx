// =============================================================
// Custom Cypress Commands for Telnyx Test Suite
// =============================================================

/**
 * Dismisses the OneTrust cookie consent banner if present.
 * Safe to call on any page — does nothing if banner isn't shown.
 */
Cypress.Commands.add('acceptCookies', () => {
  cy.get('body').then(($body) => {
    if ($body.find('#onetrust-accept-btn-handler').length > 0) {
      cy.get('#onetrust-accept-btn-handler').click({ force: true });
      cy.get('#onetrust-banner-sdk').should('not.be.visible');
    }
  });
});

/**
 * Waits for the page to be fully loaded:
 * - Document readyState is 'complete'
 * - Body is visible
 */
Cypress.Commands.add('waitForPageReady', () => {
  cy.document().its('readyState').should('eq', 'complete');
  cy.get('body').should('be.visible');
});

/**
 * API health check — verifies the target site returns HTTP 200.
 * Use in before() hooks to fail fast if the site is down.
 */
Cypress.Commands.add('assertSiteIsUp', (url = 'https://telnyx.com') => {
  cy.request({ url, failOnStatusCode: false }).then((response) => {
    expect(response.status).to.eq(200);
  });
});