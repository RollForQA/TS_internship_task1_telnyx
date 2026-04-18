// =============================================================
// Page Object: Navigation Header (telnyx.com)
// =============================================================

class NavigationPage {
  // ---- Selectors ----
  get header()       { return cy.get('header'); }
  get productsLink() { return cy.get('header').contains('Products'); }
  get mainMenu()     { return cy.get('#main-menu'); }

  voiceApiLink() {
    return cy.get('header a[href*="/products/voice-api"]').first();
  }

  hamburgerButton() {
    // The hamburger is outside #main-menu; look for aria-label or aria-expanded
    return cy.get(
      'header button[aria-label*="enu"], header button[aria-label*="menu"], header button[aria-expanded]'
    ).filter(':visible').first();
  }

  // ---- Actions ----
  visit() {
    cy.visit('/');
    cy.waitForPageReady();
    return this;
  }

  hoverProducts() {
    this.productsLink.trigger('mouseover');
    return this;
  }

  clickVoiceApi() {
    this.voiceApiLink().should('exist').click({ force: true });
    return this;
  }

  openMobileMenu() {
    // Try aria-label approach first
    cy.get('body').then(($body) => {
      const ariaBtn = $body.find(
        'header button[aria-label*="enu"], header button[aria-label*="menu"], header button[aria-expanded]'
      ).filter(':visible');

      if (ariaBtn.length > 0) {
        cy.wrap(ariaBtn.first()).click({ force: true });
      } else {
        // Fallback: last visible header button (not inside #main-menu)
        cy.get('header').find('button:visible').last().click({ force: true });
      }
    });

    // Verify menu is present in DOM and has content
    this.mainMenu.should('exist');
    this.mainMenu.find('button, a').should('have.length.greaterThan', 0);
    return this;
  }
}

export default new NavigationPage();
