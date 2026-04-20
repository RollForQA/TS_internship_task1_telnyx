// =============================================================
// Page Object: Developer Documentation (developers.telnyx.com)
// =============================================================

class DocsPage {
  // ---- Selectors ----

  /**
   * The "Search…  Ctrl K" bar in the top navigation.
   */
  get openSearchButton() {
    return cy.get('#search-bar-entry').first();
  }

  /**
   * The text input inside the search modal.
   */
  get searchInput() {
    return cy.get('input[type="search"], input[cmdk-input], [role="dialog"] input')
      .filter(':visible')
      .first();
  }

  // ---- Actions ----
  visit() {
    cy.visit('https://developers.telnyx.com');
    cy.waitForPageReady();
    return this;
  }

  openSearch() {
    this.openSearchButton.should('be.visible').click();
    this.searchInput.should('be.visible');
    return this;
  }

  fillSearch(query) {
    this.searchInput
      .should('be.visible')
      .clear()
      .type(query, { delay: 100 });

    return this;
  }

  /**
   * TC-09 Step 4: Verifies the URL contains the search query parameter
   * and that at least one search result is displayed in the dropdown.
   */
  verifySearchResults(query) {
    const encodedQuery = query.replace(/\s+/g, '+');

    // URL must contain the search parameter
    cy.location('search', { timeout: 15000 })
      .should('include', `search=${encodedQuery}`);

    // At least one result link must be visible inside the search dialog
    cy.get('[role="dialog"] a[href]', { timeout: 15000 })
      .filter(':visible')
      .should('have.length.greaterThan', 0);

    return this;
  }

  /**
   * Selects and navigates to the first search result.
   * Uses Enter key on the HeadlessUI combobox, which auto-highlights
   * the first result and triggers proper client-side routing — unlike
   * a raw <a> click that gets swallowed by the SPA router.
   */
  clickFirstResultAndVerifyPage() {
    // The first result is auto-highlighted; press Enter to navigate.
    this.searchInput.type('{enter}');

    // The search dialog should close
    cy.get('[role="dialog"]', { timeout: 10000 }).should('not.exist');

    // The page should navigate away from /docs/overview
    cy.location('pathname', { timeout: 15000 })
      .should('not.eq', '/docs/overview');

    // The destination page should display meaningful content
    cy.get('h1', { timeout: 15000 })
      .should('be.visible')
      .and('not.be.empty');

    return this;
  }
}

export default new DocsPage();
