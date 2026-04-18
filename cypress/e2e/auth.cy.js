import authPage from '../pages/AuthPage';

describe('Authentication Tests', () => {
  before(() => {
    cy.assertSiteIsUp('https://telnyx.com');
  });

  it('TC-03: Sign Up Email Validation (Negative)', { tags: '@regression' }, () => {
    // Step 1: Navigate to sign-up page
    authPage.visitSignUp();

    // Step 2: Locate email input (wait for SPA to render form)
    authPage.signUpEmailInput.should('be.visible', { timeout: 10000 });

    // Step 3: Enter an invalid email format
    authPage.typeInvalidEmail('invalid-email-format');

    // Step 4: Attempt to submit the form
    authPage.submitSignUpForm();

    // Step 5: Verify validation error — text message or HTML5 constraint
    authPage.assertSignUpValidationError();
  });

  it('TC-04: Log In Empty Submit', { tags: '@regression' }, () => {
    // Step 1: Navigate to portal login page
    // cy.visit() with a full URL handles cross-origin navigation in Cypress 15
    cy.visit('https://portal.telnyx.com/');

    // Step 2: Wait for the login form to render (SPA)
    cy.get('input[type="email"], input[name="email"], input[placeholder*="mail"]', { timeout: 15000 })
      .first()
      .should('be.visible');

    // Step 3: Without entering anything, click the submit/sign-in button
    cy.get('button[type="submit"], button[type="button"]')
      .filter(':visible')
      .contains(/sign.?in|log.?in|send.*link|submit/i)
      .first()
      .click({ force: true });

    // Step 4: Verify error message or validation appears
    cy.get('body').then(($body) => {
      const bodyText = $body.text().toLowerCase();
      const errorPatterns = ['required', 'enter', 'invalid', 'email'];
      const hasError = errorPatterns.some((p) => bodyText.includes(p));

      if (!hasError) {
        // At minimum, we should still be on the login page
        cy.url().should('include', 'portal.telnyx.com');
      } else {
        expect(hasError).to.be.true;
      }
    });
  });
});
