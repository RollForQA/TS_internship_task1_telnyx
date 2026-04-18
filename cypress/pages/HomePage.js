// =============================================================
// Page Object: Home Page (telnyx.com)
// =============================================================

class HomePage {
  // ---- Selectors ----
  get heading()         { return cy.get('h1').first(); }
  get metaDescription() { return cy.get('meta[name="description"]'); }
  get cookieBanner()    { return cy.get('#onetrust-banner-sdk'); }
  get cookieAcceptBtn() { return cy.get('#onetrust-accept-btn-handler'); }
  get footer()          { return cy.get('footer'); }

  linkedInLink() {
    return cy.get('footer a[href*="linkedin.com/company/telnyx"]');
  }

  // ---- Actions ----
  visit() {
    cy.visit('/');
    cy.waitForPageReady();
    return this;
  }

  acceptCookies() {
    cy.acceptCookies();
    return this;
  }

  scrollToFooter() {
    this.footer.scrollIntoView();
    return this;
  }
}

export default new HomePage();
