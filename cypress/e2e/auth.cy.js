import authPage from '../pages/AuthPage';
import portalPage from '../pages/PortalPage';

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

    // Step 5: Verify validation error and user stays on sign-up page
    authPage.assertSignUpValidationError();
  });

  it('TC-04: Log In Empty Submit', { tags: '@regression' }, () => {
    // Step 1: Navigate to portal login page
    portalPage.visit();

    // Step 2: Wait for the login form to render (SPA)
    portalPage.emailInput.should('be.visible');

    // Step 3: Without entering anything, click the submit/sign-in button
    portalPage.submitButton.click({ force: true });

    // Step 4: Verify user stays on login page and validation fires
    portalPage.assertOnLoginPage();
    portalPage.assertValidationError();
  });
});
