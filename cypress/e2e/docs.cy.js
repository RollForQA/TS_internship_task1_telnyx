import docsPage from '../pages/DocsPage';

describe('Developer Documentation Tests', () => {
  before(() => {
    cy.assertSiteIsUp('https://developers.telnyx.com');
  });

  it('TC-09: Developer Docs Page & Navigation', { tags: '@regression' }, () => {
    // Step 1: Navigate to developer documentation
    docsPage.visit();

    // Step 2: Verify the docs page loads with proper title
    cy.title().should('not.be.empty');
    cy.get('body').should('be.visible');

    // Step 3: Verify key documentation sections are present
    cy.contains('Development').should('exist');

    // Step 4: Verify search functionality exists
    docsPage.assertSearchExists();

    // Step 5: Verify navigation links to key documentation areas
    docsPage.developmentLink.should('exist');

    // Step 6: Verify footer with community links
    docsPage.githubLink.should('exist');
  });
});
