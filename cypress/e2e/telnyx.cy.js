describe('Telnyx Website Tests', () => {
  const baseUrl = 'https://telnyx.com';

  beforeEach(() => {
    // Standard setup for each test if needed
  });

  it('TC-01: Main Page Load & SEO', () => {
    cy.visit(baseUrl);
    cy.title().should('contain', 'Telnyx');
    // Common H1 check - looking for unique main header
    cy.get('h1').should('be.visible').and('not.be.empty');
  });

  it('TC-02: Products Menu Navigation', () => {
    cy.visit(baseUrl);
    // Accepting cookies first to ensure visibility
    cy.get('body').then(($body) => {
        if ($body.find('button#onetrust-accept-btn-handler').length > 0) {
            cy.get('button#onetrust-accept-btn-handler').click();
        }
    });
    
    // Hover on Products (using trigger or realEvents if available, here using trigger/click as fallback)
    cy.contains('button', 'Products').realHover().wait(500);
    cy.get('header nav a[href*="/products/voice-api"]').first().click({force: true});
    
    cy.url().should('include', '/products/voice-api');
    cy.get('h1').should('be.visible');
  });

  it('TC-03: Sign Up Email Validation (Negative)', () => {
    cy.visit(`${baseUrl}/sign-up`);
    
    // Fill in an invalid email
    cy.get('input[name="email"]').type('invalid-email-format');
    
    // Attempt to submit (or just trigger validation)
    cy.get('button[type="submit"]').first().click();
    
    // Check for error message
    cy.contains('Please enter a valid email address').should('be.visible');
  });

  it('TC-04: Log In Empty Submit', () => {
    cy.visit('https://portal.telnyx.com/');
    
    // Wait for form to load
    cy.get('form').should('be.visible');
    
    // Submit empty form
    cy.get('button[type="submit"]').first().click();
    
    // Check for "Email is required" error
    cy.contains('Email is required').should('be.visible');
  });

  it('TC-05: Messaging Pricing Calculator', () => {
    cy.visit(`${baseUrl}/pricing/messaging`);
    
    // Wait for the calculator/price display
    cy.get('[class*="PriceDisplay"]').first().invoke('text').then((initialPrice) => {
        // Find and change the country selector
        // Note: selector might be complex, using contains/find
        cy.get('select[id="country-select"]').select('United Kingdom', {force: true});
        
        // Wait for update and verify price changed
        cy.get('[class*="PriceDisplay"]').first().invoke('text').should('not.equal', initialPrice);
    });
  });

  it('TC-06: SIP Pricing Currency', () => {
    cy.visit(`${baseUrl}/pricing/elastic-sip`);
    
    // Open currency selector and change to EUR
    // Note: Assuming a button/dropdown for currency
    cy.contains('button', 'USD').click({force: true});
    cy.contains('EUR').click({force: true});
    
    // Verify results show Euro symbol
    cy.get('[class*="PriceDisplay"]').should('contain', '€');
  });

  it('TC-07: Cookie Consent', () => {
    cy.visit(baseUrl);
    
    // Verify banner exists
    cy.get('#onetrust-banner-sdk').should('be.visible');
    
    // Click Accept All
    cy.get('#onetrust-accept-btn-handler').click();
    
    // Verify it disappears
    cy.get('#onetrust-banner-sdk').should('not.be.visible');
    
    // Check if the cookie is set
    cy.getCookie('OptanonAlertBoxClosed').should('exist');
  });

  it('TC-08: Footer LinkedIn Link', () => {
    cy.visit(baseUrl);
    
    // Scroll to footer and check LinkedIn link
    cy.get('footer').scrollIntoView();
    cy.get('footer a[href*="linkedin.com/company/telnyx"]')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'href').and('contain', 'linkedin.com');
  });

  it('TC-09: Developer Docs Search', () => {
    cy.visit('https://developers.telnyx.com');
    
    // Find search input
    cy.get('input[id="search-input"]').type('Send a message{enter}');
    
    // Verify search results page/popover
    cy.url().should('include', 'q=Send+a+message');
    cy.get('main').should('contain', 'Send a message');
  });

  it('TC-10: Mobile Menu Interaction', () => {
    // Set mobile viewport
    cy.viewport(375, 812);
    cy.visit(baseUrl);
    
    // Find and click hamburger menu
    // Selector based on common patterns if exact id is unknown
    cy.get('header button[aria-label*="menu"]').first().click();
    
    // Verify menu items are visible
    cy.contains('Products').should('be.visible');
    cy.contains('Solutions').should('be.visible');
  });
});
