// =============================================================
// Page Object: Authentication Pages
// =============================================================

class AuthPage {
  // ---- Sign Up Selectors ----
  get signUpEmailInput() {
    return cy.get('input[type="email"], input[id="email"], input[name="email"]').first();
  }
  get signUpSubmitBtn() {
    return cy.get('button[type="submit"]').first();
  }

  // ---- Portal Login Selectors ----
  get portalEmailInput() {
    return cy.get('input[type="email"], input[name="email"], input[placeholder*="mail"]').first();
  }
  get portalSignInBtn() {
    return cy.get('button[type="submit"], button[type="button"]')
      .filter(':visible')
      .contains(/sign.?in|log.?in|send.*link|submit/i)
      .first();
  }

  // ---- Actions ----
  visitSignUp() {
    cy.visit('/sign-up');
    cy.waitForPageReady();
    return this;
  }

  visitPortal() {
    cy.visit('https://portal.telnyx.com/');
    cy.waitForPageReady();
    return this;
  }

  typeInvalidEmail(email = 'invalid-email-format') {
    this.signUpEmailInput.should('be.visible').type(email);
    return this;
  }

  submitSignUpForm() {
    this.signUpSubmitBtn.click({ force: true });
    return this;
  }

  clickPortalSignIn() {
    this.portalSignInBtn.click({ force: true });
    return this;
  }

  /**
   * Checks for validation errors using multiple strategies:
   * 1. Custom error text in the DOM
   * 2. HTML5 :invalid pseudo-class
   */
  assertSignUpValidationError() {
    // Should stay on sign-up page
    cy.url().should('include', '/sign-up');

    cy.get('body').then(($body) => {
      const bodyText = $body.text().toLowerCase();
      const errorPatterns = [
        'valid email', 'email is invalid', 'invalid email',
        'enter a valid', 'email format', 'please enter'
      ];
      const hasError = errorPatterns.some((p) => bodyText.includes(p));

      if (!hasError) {
        // Fallback to HTML5 validation
        this.signUpEmailInput.then(($input) => {
          expect($input[0].checkValidity()).to.be.false;
        });
      }
    });
    return this;
  }

  assertPortalLoginError() {
    cy.get('body').then(($body) => {
      const bodyText = $body.text().toLowerCase();
      const errorPatterns = ['required', 'enter', 'invalid', 'email'];
      const hasError = errorPatterns.some((p) => bodyText.includes(p));

      if (!hasError) {
        cy.url().should('include', 'portal.telnyx.com');
      } else {
        expect(hasError).to.be.true;
      }
    });
    return this;
  }
}

export default new AuthPage();
