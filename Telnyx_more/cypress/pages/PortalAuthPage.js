class PortalAuthPage {
  visitLogin() {
    cy.visit('https://portal.telnyx.com/');
    cy.get('body', { timeout: 20000 }).should('contain.text', 'Welcome Back');
    return this;
  }

  visitProtectedHash(path, options = {}) {
    cy.visit(`https://portal.telnyx.com/#${path}`, options);
    return this;
  }

  emailInput() {
    return cy.get('input[name="email"], input[type="text"]').filter(':visible').first();
  }

  passwordInput() {
    return cy.get('input[name="password"], input[type="password"]').filter(':visible').first();
  }

  sendLinkButton() {
    return cy.contains('button', /send me sign-in link/i);
  }

  signInWithPasswordButton() {
    return cy.contains('button', /sign in with password/i);
  }

  loginButton() {
    return cy.contains('button', /^log in$/i);
  }

  assertLoginScreenVisible() {
    cy.contains(/welcome back/i).should('be.visible');
    this.emailInput().should('be.visible');
    return this;
  }
}

export default new PortalAuthPage();
