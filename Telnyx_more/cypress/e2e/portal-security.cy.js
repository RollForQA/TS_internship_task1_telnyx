import portalAuthPage from '../pages/PortalAuthPage';

describe('Telnyx_more - Portal Security and Access Control', () => {
  before(() => {
    cy.assertSiteIsUp('https://portal.telnyx.com');
  });

  it('TC-13: Session expiry redirects invalid session to login', { tags: '@regression' }, () => {
    // Step 1: Navigate to a protected page with an expired/fake auth token
    portalAuthPage.visitProtectedHash('/app/billing', {
      onBeforeLoad(win) {
        win.localStorage.setItem('authToken', 'expired-token');
        win.localStorage.setItem('accessToken', 'expired-token');
        win.localStorage.setItem('customerLoginId', 'qa@example.com');
        win.sessionStorage.setItem('authToken', 'expired-token');
        win.document.cookie = 'authToken=expired-token';
      },
    });

    // Step 2: Verify the portal redirected to the login screen
    portalAuthPage.assertLoginScreenVisible();

    // Step 3: Verify the URL contains the login path
    cy.url().should('include', '#/login/sign-in');
    cy.url().should('satisfy', (url) => url.includes('billing') || url.includes('login'));
  });

  it('TC-14: Unauthenticated direct link access is blocked', { tags: '@smoke' }, () => {
    // Step 1: Navigate to a protected page with no auth data at all
    portalAuthPage.visitProtectedHash('/app/keys', {
      onBeforeLoad(win) {
        win.localStorage.clear();
        win.sessionStorage.clear();
      },
    });

    // Step 2: Verify the portal redirected to the login screen
    portalAuthPage.assertLoginScreenVisible();

    // Step 3: Verify the URL contains the login path
    cy.url().should('include', '#/login/sign-in');
    cy.url().should('satisfy', (url) => url.includes('keys') || url.includes('login'));
  });
});
