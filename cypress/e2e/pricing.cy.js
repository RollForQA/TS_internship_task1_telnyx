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

    // Step 3: Verify prices are shown for the United States by default
    pricingPage.countryFilter.should('contain', 'United States');
    pricingPage.assertPricingRowContains('Send outbound messages', '$0.004 per message part +');

    // Step 4: Change country to United Kingdom and verify prices update
    pricingPage.selectCountry('United Kingdom');
    pricingPage.assertPricingRowContains('Send outbound messages', '$0.055 per message part');
    pricingPage.assertPricingRowNotContains('Send outbound messages', '$0.004 per message part +');
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

    // Step 5: Verify prices are shown in USD by default
    pricingPage.currencyFilter.should('contain', 'USD');
    pricingPage.assertPriceUsesCurrency('International calls', '$');

    // Step 6: Change currency to EUR and verify prices update
    pricingPage.selectCurrency('EUR');
    pricingPage.assertPriceUsesCurrency('International calls', '€');
  });
});
