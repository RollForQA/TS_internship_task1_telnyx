import portalAuthPage from '../pages/PortalAuthPage';

const PORTAL = {
  expiredToken: 'expired-token',
  testEmail: 'qa@example.com',
  loginRoute: '#/login/sign-in',
};

describe('Telnyx_more - Portal Security and Access Control', () => {
  before(() => {
    cy.assertSiteIsUp('https://portal.telnyx.com');
  });

  it('TC-13: Session expiry redirects invalid session to login', { tags: '@regression' }, () => {
    // Step 1: Navigate to a protected page with an expired/fake auth token
    portalAuthPage.visitProtectedHash('/app/billing', {
      onBeforeLoad(win) {
        win.localStorage.setItem('authToken', PORTAL.expiredToken);
        win.localStorage.setItem('accessToken', PORTAL.expiredToken);
        win.localStorage.setItem('customerLoginId', PORTAL.testEmail);
        win.sessionStorage.setItem('authToken', PORTAL.expiredToken);
        win.document.cookie = `authToken=${PORTAL.expiredToken}`;
      },
    });

    // Step 2: Verify the portal redirected to the login screen
    portalAuthPage.assertLoginScreenVisible();

    // Step 3: Verify the URL contains the login path
    cy.url().should('include', PORTAL.loginRoute);

    // Step 4: Verify billing content is not exposed
    cy.get('body').should('not.contain.text', 'Billing');
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
    cy.url().should('include', PORTAL.loginRoute);
  });
});
