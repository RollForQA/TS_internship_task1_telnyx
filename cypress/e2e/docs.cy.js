import docsPage from '../pages/DocsPage';

describe('Developer Documentation Tests', () => {
  before(() => {
    cy.assertSiteIsUp('https://developers.telnyx.com');
  });

  it('TC-09: Developer Portal Search', { tags: '@regression' }, () => {
    const query = 'Send a message';

    // Step 1: Navigate to developer documentation
    docsPage.visit();

    // Step 2: Open search and enter the query
    docsPage.openSearch();
    docsPage.fillSearch(query);

    // Step 3–4: Verify search results are shown and URL contains search params
    docsPage.verifySearchResults(query);

    // Click the first result and verify the search dialog closes
    docsPage.clickFirstResultAndVerifyPage();
  });
});
