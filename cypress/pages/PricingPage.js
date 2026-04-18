// =============================================================
// Page Object: Pricing Pages
// =============================================================

class PricingPage {
  // ---- Selectors ----
  get pageHeading()  { return cy.get('h1, h2').first(); }
  get payAsYouGo()   { return cy.contains('Pay as you go'); }
  get volumeBased()  { return cy.contains('Volume-based'); }

  signUpCta() {
    return cy.contains('a', 'Sign up');
  }
  talkToExpertCta() {
    return cy.contains('Talk to an expert');
  }

  // ---- Actions ----
  visitMessaging() {
    cy.visit('/pricing/messaging');
    cy.waitForPageReady();
    cy.acceptCookies();
    return this;
  }

  visitElasticSip() {
    cy.visit('/pricing/elastic-sip');
    cy.waitForPageReady();
    cy.acceptCookies();
    return this;
  }

  assertHasPricingContent(keywords = ['$', 'per message', 'Pay as you go', 'pricing']) {
    cy.get('body').then(($body) => {
      const text = $body.text();
      const hasPricing = keywords.some((kw) => text.includes(kw));
      expect(hasPricing, 'Page should display pricing information').to.be.true;
    });
    return this;
  }
}

export default new PricingPage();
