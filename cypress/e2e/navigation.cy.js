import navPage from '../pages/NavigationPage';

describe('Navigation and Responsiveness Tests', () => {
  before(() => {
    cy.assertSiteIsUp('https://telnyx.com');
  });

  it('TC-02: Products Menu Navigation', { tags: '@smoke' }, () => {
    navPage.visit();
    cy.acceptCookies();

    // Step 1: Locate "Products" in the header navigation
    navPage.productsLink.should('be.visible');

    // Step 2: Hover over "Products" to open the dropdown menu
    navPage.hoverProducts();

    // Step 3: Click "Voice API" link from dropdown
    navPage.voiceApiLink()
      .should('exist', { timeout: 5000 })
      .click({ force: true });

    // Step 4: Verify navigation to Voice API page
    cy.url().should('include', '/products/voice-api');
  });

  it('TC-10: Mobile Menu Interaction', { tags: '@regression' }, () => {
    // Step 1: Set mobile viewport (iPhone X)
    cy.viewport(375, 812);
    navPage.visit();

    // Step 2: Dismiss cookie banner — explicit wait for full removal
    cy.get('#onetrust-accept-btn-handler', { timeout: 15000 })
      .should('exist')
      .click({ force: true });
    cy.get('#onetrust-banner-sdk', { timeout: 10000 }).should('not.be.visible');

    // Step 3: Open the hamburger mobile menu
    navPage.openMobileMenu();

    // Step 4: Verify key navigation items are in the menu
    navPage.mainMenu.should('contain.text', 'Products');
    navPage.mainMenu.should('contain.text', 'Solutions');
  });
});
