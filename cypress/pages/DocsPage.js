// =============================================================
// Page Object: Developer Documentation (developers.telnyx.com)
// =============================================================

class DocsPage {
  // ---- Selectors ----
  get developmentLink() { return cy.get('a[href*="/development"]'); }
  get githubLink()      { return cy.get('a[href*="github.com/team-telnyx"]'); }

  // ---- Actions ----
  visit() {
    cy.visit('https://developers.telnyx.com');
    cy.waitForPageReady();
    return this;
  }

  assertSearchExists() {
    cy.get('body').then(($body) => {
      const hasSearchBar = $body.find('#search-bar-entry').length > 0;
      const hasSearchButton = $body.find(
        'button[aria-label*="Search"], [role="search"], input[placeholder*="Search"]'
      ).length > 0;
      expect(hasSearchBar || hasSearchButton, 'Search functionality should be present').to.be.true;
    });
    return this;
  }
}

export default new DocsPage();
