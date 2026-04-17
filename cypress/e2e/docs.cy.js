describe('Developer Documentation Tests', () => {
  it('TC-09: Developer Docs Search', () => {
    cy.visit('https://developers.telnyx.com');
    // Using a more robust way to find the search trigger
    cy.get('body').then(($body) => {
        if ($body.find('input#search-input').length > 0) {
            cy.get('input#search-input').type('Send a message{enter}', {force: true});
        } else {
            // Fallback to searching for the search button/icon
            cy.get('button').contains(/Search|Find/i).first().click({force: true});
            cy.get('input').first().type('Send a message{enter}', {force: true});
        }
    });
    cy.get('body').should('contain', 'Send a message');
  });
});
