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
    // Wait for the login card to be visible
    cy.contains('h1', 'Welcome Back').should('be.visible');
    
    // Click exactly on the "Send me sign-in link" button
    cy.contains('button', 'Send me sign-in link').should('be.visible').click({force: true});
    
    // Check for the error message "Email is required" in the toast/popup
    cy.get('body').should('contain', 'Email is required');
  });
});
