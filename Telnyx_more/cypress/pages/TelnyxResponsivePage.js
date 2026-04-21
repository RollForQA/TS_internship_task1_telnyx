// =============================================================
// Page Object: Telnyx Responsive Page (telnyx.com)
// =============================================================

class TelnyxResponsivePage {
  // ---- Selectors (getters for static elements) ----
  get header()      { return cy.get('header').first(); }
  get footer()      { return cy.get('footer').first(); }
  get hero()        { return cy.get('main').find('h1').first(); }
  get mainContent() { return cy.get('main').first(); }

  // ---- Selectors (methods for dynamic/complex queries) ----
  mobileMenuToggle() {
    return cy.get('header button[aria-controls="main-menu-content"]').filter(':visible').first();
  }

  mobileMenuPanel() {
    return cy.get('#main-menu-content, #main-menu').filter(':visible').first();
  }

  visibleInteractiveElements() {
    return cy.get('main a, main button').filter(':visible');
  }

  visibleCardsOrGridItems() {
    return cy.get('main section article, main section [class*="card"], main section [class*="grid"] > *')
      .filter(':visible');
  }

  // ---- Actions ----
  visitHome() {
    cy.visit('/');
    cy.waitForPageReady();
    return this;
  }

  acceptCookiesIfPresent() {
    cy.acceptCookies();
    return this;
  }

  openMobileMenu() {
    this.mobileMenuToggle().click({ force: true });
    return this;
  }

  /**
   * Opens the mobile hamburger menu and asserts it rendered correctly.
   * Uses the same resilient approach as the main project's NavigationPage.
   */
  openAndAssertMobileMenu() {
    cy.get('body').then(($body) => {
      const ariaBtn = $body.find(
        'header button[aria-label*="enu"], header button[aria-label*="menu"], header button[aria-expanded]'
      ).filter(':visible');

      if (ariaBtn.length > 0) {
        cy.wrap(ariaBtn.first()).click();
      } else {
        throw new Error('Mobile menu button not found — no button with aria-label or aria-expanded in header');
      }
    });

    // Verify menu is present in DOM and has navigation content
    cy.get('#main-menu', { timeout: 10000 })
      .should('exist')
      .find('button, a')
      .should('have.length.greaterThan', 0);
    cy.get('#main-menu').should('contain.text', 'Products');

    return this;
  }

  // ---- Assertions ----
  assertNoHorizontalScroll() {
    cy.window().then((win) => {
      win.scrollTo(win.document.body.scrollWidth, 0);
    });
    cy.window().then((win) => {
      expect(win.document.body.scrollWidth, 'no horizontal overflow').to.be.lte(win.innerWidth);
    });
    return this;
  }

  assertHeaderVisible() {
    this.header.should('be.visible');
    return this;
  }

  assertHeroVisible() {
    this.hero.should('be.visible').and('not.be.empty');
    return this;
  }

  assertFooterVisible() {
    this.footer.scrollIntoView().should('be.visible');
    return this;
  }
}

export default new TelnyxResponsivePage();
