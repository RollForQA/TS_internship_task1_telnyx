describe('Authentication Tests', () => {
  const baseUrl = 'https://telnyx.com';

  it('TC-03: Sign Up Email Validation (Negative)', () => {
    cy.visit(`${baseUrl}/sign-up`);
    // Fill in an invalid email
    cy.get('input[name="email"]').type('invalid-email-format');
    // Attempt to submit
    cy.get('button[type="submit"]').first().click();
    // Check for error message
    cy.contains('Please enter a valid email address').should('be.visible');
  });

  it('TC-04: Log In Empty Submit', () => {
    cy.visit('https://portal.telnyx.com/');
    cy.get('form').should('be.visible');
    cy.get('button[type="submit"]').first().click();
    cy.contains('Email is required').should('be.visible');
  });
});
