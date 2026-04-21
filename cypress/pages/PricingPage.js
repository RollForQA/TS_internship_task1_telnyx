// =============================================================
// Page Object: Pricing Pages
// =============================================================

class PricingPage {
  // ---- Selectors ----
  get pageHeading() { return cy.get('main h1').first(); }
  get payAsYouGo() { return cy.contains('Pay as you go'); }
  get volumeBased() { return cy.contains('Volume-based'); }
  get countryFilter() { return cy.get('#country-filter'); }
  get currencyFilter() { return cy.get('#currency-filter'); }

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

  selectCountry(countryName) {
    this.countryFilter.should('be.visible').click();
    cy.contains('[role="option"]', new RegExp(`^${countryName}$`)).click();
    this.countryFilter.should('contain', countryName);
    return this;
  }

  selectCurrency(currencyCode) {
    this.currencyFilter.should('be.visible').click();
    cy.contains('[role="option"]', new RegExp(`^${currencyCode}$`)).click();
    this.currencyFilter.should('contain', currencyCode);
    return this;
  }

  pricingRow(label) {
    return cy.contains(new RegExp(`^${label}$`)).closest('div.grid');
  }

  priceValueFor(label) {
    // Traverses: label span → parent grid row → last visible child div (price cell)
    return cy.contains('span', label)
      .closest('div.grid')
      .find('div[class]')
      .filter(':visible')
      .last();
  }

  assertPricingRowContains(label, expectedText) {
    this.pricingRow(label)
      .should('be.visible')
      .should(($row) => {
        const text = $row.text().replace(/\s+/g, ' ').trim();
        expect(text, `${label} row should include ${expectedText}`).to.include(expectedText);
      });

    return this;
  }

  assertPricingRowNotContains(label, unexpectedText) {
    this.pricingRow(label)
      .should('be.visible')
      .should(($row) => {
        const text = $row.text().replace(/\s+/g, ' ').trim();
        expect(text, `${label} row should not include ${unexpectedText}`).not.to.include(unexpectedText);
      });

    return this;
  }

  assertPriceUsesCurrency(label, symbol) {
    this.priceValueFor(label)
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.trim(), `${label} price should use ${symbol}`).to.include(symbol);
      });

    return this;
  }
}

export default new PricingPage();
