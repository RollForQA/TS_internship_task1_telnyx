// =============================================================
// Page Object: Portal Login (portal.telnyx.com)
// =============================================================

const PORTAL_URL = 'https://portal.telnyx.com/';

class PortalPage {
  get emailInput() {
    return cy.get('input[type="email"], input[name="email"]', { timeout: 15000 })
      .filter(':visible')
      .first();
  }

  get submitButton() {
    return cy.get('button[type="submit"], button[type="button"]')
      .filter(':visible')
      .contains(/sign.?in|log.?in|send.*link|submit/i)
      .first();
  }

  visit() {
    cy.visit(PORTAL_URL);
    cy.get('body', { timeout: 20000 }).should('be.visible');
    return this;
  }

  assertOnLoginPage() {
    cy.url().should('include', 'portal.telnyx.com');
    return this;
  }

  assertValidationError() {
    this.emailInput.then(($input) => {
      expect($input[0].checkValidity(), 'Email input should be invalid').to.be.false;
    });
    return this;
  }
}

export default new PortalPage();
