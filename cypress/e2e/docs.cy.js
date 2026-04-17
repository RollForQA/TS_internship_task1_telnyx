describe('Developer Documentation Tests', () => {
  it('TC-09: Developer Docs Search', () => {
    // 1. Visit
    cy.visit('https://developers.telnyx.com');
    // Mintlify is heavy, let's wait for the search bar to be fully initialized
    cy.get('#search-bar-entry').should('be.visible');

    // 2. Open search
    cy.get('#search-bar-entry > .flex-1').click({ force: true });

    // 3. Type and wait for results to stabilize
    cy.get('input[placeholder*="Search"]').should('be.visible').type('Send a message', { force: true });

    // 4. Click the actual link inside the results
    // We target the link to ensure navigation happens
    cy.get('[role="listbox"]').should('be.visible');
    cy.contains('[role="option"]', 'Send a message').should('be.visible').click({ force: true });

    // 5. Verify navigation
    // Sometimes it takes a moment for the SPA to transition
    cy.url().should('include', '/messages');
    cy.get('h1').should('contain', 'Send a message');
  });
});
