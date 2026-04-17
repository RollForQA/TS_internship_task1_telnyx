describe('Authentication Tests', () => {
  const baseUrl = 'https://telnyx.com';

  it('TC-03: Sign Up Email Validation (Negative)', () => {
    cy.visit(`${baseUrl}/sign-up`);
    // Fill in an invalid email - using a more robust selector
    cy.get('input[id="email"], input[name="email"]').first().should('be.visible').type('invalid-email-format');
    // Attempt to submit
    cy.get('button[type="submit"]').first().click();
    // Check for error message
    cy.get('body').should('contain', 'Please enter a valid email address');
  });

  it('TC-04: Log In Empty Submit', () => {
    cy.visit('https://portal.telnyx.com/');
    cy.get('form').should('be.visible');
    // Find the login/submit button
    cy.get('button[type="submit"]').first().click();
    // Check for "Email is required" error
    cy.get('body').should('contain', 'Email is required');
  });
});
