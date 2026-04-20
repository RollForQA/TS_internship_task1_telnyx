import telnyxPage from '../pages/TelnyxResponsivePage';

const smokeViewports = [
  { width: 390, height: 844, label: 'TC-RESP-001 Mobile Layout Smoke' },
  { width: 768, height: 1024, label: 'TC-RESP-004 Tablet Layout' },
  { width: 1024, height: 768, label: 'TC-RESP-005 Desktop Transition Layout' },
  { width: 1280, height: 720, label: 'TC-RESP-006 Laptop Layout' },
  { width: 1920, height: 1080, label: 'TC-RESP-008 Full HD Layout' },
];

describe('Telnyx_more - Responsive Smoke Matrix', () => {
  before(() => {
    cy.assertSiteIsUp('https://telnyx.com');
  });

  smokeViewports.forEach(({ width, height, label }) => {
    it(label, { tags: '@smoke' }, () => {
      // Step 1: Set viewport and navigate
      cy.viewport(width, height);
      telnyxPage.visitHome();
      telnyxPage.acceptCookiesIfPresent();

      // Step 2: Verify all major page sections are visible
      telnyxPage.assertHeaderVisible();
      telnyxPage.assertHeroVisible();
      telnyxPage.mainContent.should('be.visible');
      telnyxPage.visibleInteractiveElements().should('have.length.greaterThan', 0);
      telnyxPage.assertFooterVisible();

      // Step 3: Verify no horizontal overflow
      telnyxPage.assertNoHorizontalScroll();
    });
  });

  it('TC-RESP-002 Small Mobile Layout', { tags: '@regression' }, () => {
    // Step 1: Set small mobile viewport and navigate
    cy.viewport(360, 800);
    telnyxPage.visitHome();
    telnyxPage.acceptCookiesIfPresent();

    // Step 2: Verify hero, interactive elements, and content cards
    telnyxPage.assertHeroVisible();
    telnyxPage.visibleInteractiveElements().should('have.length.greaterThan', 0);
    telnyxPage.visibleCardsOrGridItems().its('length').should('be.gte', 1);

    // Step 3: Verify no horizontal overflow
    telnyxPage.assertNoHorizontalScroll();
  });

  it('TC-RESP-003 Large Mobile Layout', { tags: '@regression' }, () => {
    // Step 1: Set large mobile viewport and navigate
    cy.viewport(414, 896);
    telnyxPage.visitHome();
    telnyxPage.acceptCookiesIfPresent();

    // Step 2: Verify all major page sections
    telnyxPage.assertHeaderVisible();
    telnyxPage.assertHeroVisible();
    telnyxPage.visibleCardsOrGridItems().its('length').should('be.gte', 1);
    telnyxPage.assertFooterVisible();

    // Step 3: Verify no horizontal overflow
    telnyxPage.assertNoHorizontalScroll();
  });

  it('TC-RESP-007 Wide Desktop Layout', { tags: '@regression' }, () => {
    // Step 1: Set wide desktop viewport and navigate
    cy.viewport(1440, 900);
    telnyxPage.visitHome();
    telnyxPage.acceptCookiesIfPresent();

    // Step 2: Verify all major page sections
    telnyxPage.assertHeaderVisible();
    telnyxPage.assertHeroVisible();
    telnyxPage.visibleCardsOrGridItems().its('length').should('be.gte', 1);
    telnyxPage.assertFooterVisible();

    // Step 3: Verify no horizontal overflow
    telnyxPage.assertNoHorizontalScroll();
  });
});
