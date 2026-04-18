import homePage from '../pages/HomePage';

describe('Home Page and General Tests', () => {
  before(() => {
    // API health check — fail fast if site is down
    cy.assertSiteIsUp('https://telnyx.com');
  });

  beforeEach(() => {
    homePage.visit();
  });

  it('TC-01: Main Page Load & SEO', { tags: '@smoke' }, () => {
    // Step 1: Verify page title contains "Telnyx"
    cy.title().should('contain', 'Telnyx');

    // Step 2: Verify main heading is visible and not empty
    homePage.heading.should('be.visible').and('not.be.empty');

    // Step 3: Verify meta description exists and is meaningful
    homePage.metaDescription
      .should('have.attr', 'content')
      .and('not.be.empty')
      .and('have.length.greaterThan', 20);
  });

  it('TC-07: Cookie Consent Banner', { tags: '@smoke' }, () => {
    // Step 1: Verify cookie banner is displayed (wait for OneTrust script to load)
    homePage.cookieBanner.should('be.visible', { timeout: 15000 });

    // Step 2: Click "Accept All Cookies" button
    homePage.cookieAcceptBtn.should('be.visible').click();

    // Step 3: Verify banner disappears
    homePage.cookieBanner.should('not.be.visible');

    // Step 4: Verify cookie is set
    cy.getCookie('OptanonAlertBoxClosed').should('exist');
  });

  it('TC-08: Footer LinkedIn Link', { tags: '@regression' }, () => {
    // Step 1: Scroll to footer
    homePage.scrollToFooter();

    // Step 2: Find LinkedIn link and verify attributes
    homePage.linkedInLink()
      .should('exist')
      // Step 3: Verify it opens in new tab
      .should('have.attr', 'target', '_blank')
      // Step 4: Verify href points to LinkedIn
      .should('have.attr', 'href')
      .and('contain', 'linkedin.com');
  });
});
