// =============================================================
// Custom Cypress Commands for Telnyx Test Suite
// =============================================================

/**
 * Dismisses the OneTrust cookie consent banner if present.
 * Safe to call on any page — does nothing if banner isn't shown.
 */
Cypress.Commands.add('acceptCookies', () => {
  const bannerSelector = '#onetrust-banner-sdk';
  const acceptButtonSelector = '#onetrust-accept-btn-handler';

  cy.get('body', { timeout: 15000 })
    .should(($body) => {
      const bannerVisible = $body.find(`${bannerSelector}:visible`).length > 0;
      const acceptVisible = $body.find(`${acceptButtonSelector}:visible`).length > 0;

      expect(
        !bannerVisible || acceptVisible,
        'cookie banner should either be hidden or ready to accept'
      ).to.equal(true);
    })
    .then(($body) => {
      if ($body.find(`${acceptButtonSelector}:visible`).length > 0) {
        cy.get(acceptButtonSelector)
          .should('be.visible')
          .click({ force: true });
      } else {
        cy.log('Cookie banner not found, skipping');
      }
    });

  cy.get('body').should(($body) => {
    expect(
      $body.find(`${bannerSelector}:visible`).length,
      'cookie banner should not block the page'
    ).to.equal(0);
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
    expect(response.status).to.be.within(200, 399);
  });
});
