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

  // ---- Actions ----
  visitSignUp() {
    cy.visit('/sign-up');
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

}

export default new AuthPage();
