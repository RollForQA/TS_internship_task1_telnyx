describe('Developer Documentation Tests', () => {
  it('TC-09: Developer Docs Search', () => {
    cy.visit('https://developers.telnyx.com');
    cy.get('input[id="search-input"]').type('Send a message{enter}');
    cy.url().should('include', 'q=Send+a+message');
    cy.get('main').should('contain', 'Send a message');
  });
});
