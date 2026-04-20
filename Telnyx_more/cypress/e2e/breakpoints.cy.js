import telnyxPage from '../pages/TelnyxResponsivePage';

const breakpointCases = [
  {
    title: 'TC-RESP-016 Breakpoint Check At 430',
    widths: [429, 430, 431],
  },
  {
    title: 'TC-RESP-017 Breakpoint Check At 720',
    widths: [719, 720, 721],
  },
  {
    title: 'TC-RESP-018 Breakpoint Check At 1024',
    widths: [1023, 1024, 1025],
  },
  {
    title: 'TC-RESP-019 Breakpoint Check At 1260',
    widths: [1259, 1260, 1261],
  },
  {
    title: 'TC-RESP-020 Breakpoint Check At 1440',
    widths: [1439, 1440, 1441],
  },
];

describe('Telnyx_more - Breakpoint Audit', () => {
  before(() => {
    cy.assertSiteIsUp('https://telnyx.com');
  });

  breakpointCases.forEach(({ title, widths }) => {
    it(title, { tags: '@regression' }, () => {
      widths.forEach((width) => {
        // Step 1: Set viewport to breakpoint boundary and navigate
        cy.viewport(width, 900);
        telnyxPage.visitHome();
        telnyxPage.acceptCookiesIfPresent();

        // Step 2: Verify core layout elements are visible
        telnyxPage.assertHeaderVisible();
        telnyxPage.assertHeroVisible();
        telnyxPage.visibleInteractiveElements().should('have.length.greaterThan', 0);

        // Step 3: Verify no horizontal overflow at this width
        telnyxPage.assertNoHorizontalScroll();
      });
    });
  });
});
