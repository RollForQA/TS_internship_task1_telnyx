import pricingPage from '../pages/PricingPage';

describe('Pricing Page Tests', () => {
  before(() => {
    cy.assertSiteIsUp('https://telnyx.com');
  });

  it('TC-05: Messaging Pricing Page Content', { tags: '@regression' }, () => {
    // Step 1: Navigate to messaging pricing page
    pricingPage.visitMessaging();

    // Step 2: Verify page title contains pricing-related text
    pricingPage.pageHeading.should('be.visible');
    cy.title().should('contain', 'Pricing');

    // Step 3: Verify pricing content is displayed ($ amounts or pricing keywords)
    pricingPage.assertHasPricingContent(['$', 'per message', 'Pay as you go', 'pricing']);

    // Step 4: Verify "Pay as you go" section exists
    pricingPage.payAsYouGo.should('be.visible');

    // Step 5: Verify "Sign up" CTA is present
    pricingPage.signUpCta().should('exist');
  });

  it('TC-06: SIP Trunking Pricing Page Content', { tags: '@regression' }, () => {
    // Step 1: Navigate to SIP trunking pricing page
    pricingPage.visitElasticSip();

    // Step 2: Verify page heading
    pricingPage.pageHeading.should('be.visible');
    cy.title().should('contain', 'SIP');

    // Step 3: Verify pricing tiers are displayed
    pricingPage.payAsYouGo.should('be.visible');

    // Step 4: Verify volume-based pricing section exists
    pricingPage.volumeBased.should('be.visible');

    // Step 5: Verify the page contains price information
    pricingPage.assertHasPricingContent(['$', 'per minute', 'per channel']);

    // Step 6: Verify "Talk to an expert" CTA exists
    pricingPage.talkToExpertCta().should('exist');
  });
});
