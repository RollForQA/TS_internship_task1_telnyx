import navPage from '../pages/NavigationPage';

describe('Navigation and Responsiveness Tests', () => {
  before(() => {
    cy.assertSiteIsUp('https://telnyx.com');
  });

  it('TC-02: Products Menu Navigation', { tags: '@smoke' }, () => {
    cy.viewport(1440, 900);

    navPage.visit();
    cy.acceptCookies();
    cy.get('body').should(($body) => {
      expect($body.find('#onetrust-banner-sdk:visible').length, 'cookie banner should not block the page').to.equal(0);
    });

    // Step 1: Locate the desktop "Products" menu trigger
    navPage.productsTrigger.should('be.visible');
    cy.acceptCookies();

    // Step 2: Open the Products menu and wait for Voice API to appear
    navPage.openProductsMenu();

    // Step 3: Click "Voice API" link from dropdown
    navPage.voiceApiLink.click();

    // Step 4: Verify navigation to Voice API page
    cy.url().should('include', '/products/voice-api');
  });

  it('TC-10: Mobile Menu Interaction', { tags: '@regression' }, () => {
    // Step 1: Set mobile viewport (iPhone X)
    cy.viewport(375, 812);
    navPage.visit();

    // Step 2: Dismiss cookie banner
    cy.acceptCookies();

    // Step 3: Open the hamburger mobile menu
    navPage.openMobileMenu();

    // Step 4: Verify key navigation items are in the menu
    navPage.mainMenu.should('contain.text', 'Products');
    navPage.mainMenu.should('contain.text', 'Solutions');
  });
});
