import telnyxPage from '../pages/TelnyxResponsivePage';

describe('Telnyx_more - Responsive UI Components', () => {
  before(() => {
    cy.assertSiteIsUp('https://telnyx.com');
  });

  it('TC-11: Responsive navigation on mobile devices', { tags: '@smoke' }, () => {
    // Step 1: Set mobile viewport and navigate to home page
    cy.viewport(375, 812);
    telnyxPage.visitHome();
    telnyxPage.acceptCookiesIfPresent();

    // Step 2: Verify the hamburger button is visible
    telnyxPage.mobileMenuToggle().should('be.visible');

    // Step 3: Open mobile menu and verify it rendered correctly
    telnyxPage.openAndAssertMobileMenu();
  });

  it('TC-RESP-009 Mobile Menu Functionality', { tags: '@regression' }, () => {
    // Step 1: Set mobile viewport and navigate
    cy.viewport(390, 844);
    telnyxPage.visitHome();
    telnyxPage.acceptCookiesIfPresent();

    // Step 2: Open mobile menu and verify core navigation items
    telnyxPage.openAndAssertMobileMenu();
    cy.get('#main-menu').should('contain.text', 'Solutions');
  });

  it('TC-RESP-010 Header And Navigation Stability', { tags: '@regression' }, () => {
    [
      [390, 844],
      [768, 1024],
      [1024, 768],
      [1440, 900],
    ].forEach(([width, height]) => {
      // Step 1: Set viewport and navigate
      cy.viewport(width, height);
      telnyxPage.visitHome();
      telnyxPage.acceptCookiesIfPresent();

      // Step 2: Verify header stays visible after scrolling down and back up
      telnyxPage.assertHeaderVisible();
      cy.scrollTo('bottom');
      telnyxPage.assertHeaderVisible();
      cy.scrollTo('top');
      telnyxPage.assertHeaderVisible();
    });
  });

  it('TC-RESP-011 Hero Section Responsiveness', { tags: '@regression' }, () => {
    [
      [390, 844],
      [768, 1024],
      [1024, 768],
      [1920, 1080],
    ].forEach(([width, height]) => {
      // Step 1: Set viewport and navigate
      cy.viewport(width, height);
      telnyxPage.visitHome();
      telnyxPage.acceptCookiesIfPresent();

      // Step 2: Verify hero section and interactive elements are visible
      telnyxPage.assertHeroVisible();
      telnyxPage.visibleInteractiveElements().should('have.length.greaterThan', 0);
    });
  });

  it('TC-RESP-012 Content Cards And Grids', { tags: '@regression' }, () => {
    [
      [390, 844],
      [768, 1024],
      [1024, 768],
      [1280, 720],
    ].forEach(([width, height]) => {
      // Step 1: Set viewport and navigate
      cy.viewport(width, height);
      telnyxPage.visitHome();
      telnyxPage.acceptCookiesIfPresent();

      // Step 2: Verify at least one content card is visible
      telnyxPage.visibleCardsOrGridItems().its('length').should('be.gte', 1);

      // Step 3: Verify no horizontal overflow
      telnyxPage.assertNoHorizontalScroll();
    });
  });

  it('TC-RESP-013 Logo Strip / Marquee', { tags: '@regression' }, () => {
    [
      [390, 844],
      [1024, 768],
      [1920, 1080],
    ].forEach(([width, height]) => {
      // Step 1: Set viewport and navigate
      cy.viewport(width, height);
      telnyxPage.visitHome();
      telnyxPage.acceptCookiesIfPresent();

      // Step 2: Verify logo strip or fallback content is visible
      cy.get('main').then(($main) => {
        const marqueeCandidate = $main.find('[class*="marquee"], [class*="logo"], [aria-label*="logo"]').filter(':visible');

        if (marqueeCandidate.length) {
          cy.wrap(marqueeCandidate.first()).should('be.visible');
        } else {
          telnyxPage.visibleCardsOrGridItems().its('length').should('be.gte', 1);
        }
      });

      // Step 3: Verify no horizontal overflow
      telnyxPage.assertNoHorizontalScroll();
    });
  });

  it('TC-RESP-014 Footer Responsiveness', { tags: '@regression' }, () => {
    [
      [390, 844],
      [768, 1024],
      [1280, 720],
    ].forEach(([width, height]) => {
      // Step 1: Set viewport and navigate
      cy.viewport(width, height);
      telnyxPage.visitHome();
      telnyxPage.acceptCookiesIfPresent();

      // Step 2: Verify footer is visible and contains links
      telnyxPage.assertFooterVisible();
      telnyxPage.footer.find('a:visible').its('length').should('be.gte', 1);
    });
  });

  it('TC-RESP-015 No Horizontal Scroll', { tags: '@regression' }, () => {
    [
      [360, 800],
      [390, 844],
      [414, 896],
      [768, 1024],
      [1024, 768],
    ].forEach(([width, height]) => {
      // Step 1: Set viewport and navigate
      cy.viewport(width, height);
      telnyxPage.visitHome();
      telnyxPage.acceptCookiesIfPresent();

      // Step 2: Verify no horizontal overflow at this width
      telnyxPage.assertNoHorizontalScroll();
    });
  });
});
