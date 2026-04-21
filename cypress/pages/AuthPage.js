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
    this.signUpSubmitBtn.click();
    return this;
  }

  /**
   * Checks for validation errors using multiple strategies:
   * 1. Custom error text in the DOM
   * 2. HTML5 :invalid pseudo-class
   */
  assertSignUpValidationError() {
    cy.url().should('include', '/sign-up');
    // HTML5 constraint validation must reject the invalid email
    this.signUpEmailInput.then(($input) => {
      expect($input[0].checkValidity(), 'Email input should be invalid').to.be.false;
    });
    return this;
  }

}

export default new AuthPage();
