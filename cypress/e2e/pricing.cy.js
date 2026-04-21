import pricingPage from '../pages/PricingPage';

describe('Pricing Page Tests', () => {
  before(() => {
    cy.assertSiteIsUp('https://telnyx.com');
  });

  beforeEach(function () {
    cy.fixture('pricing').as('pricingData');
  });

  it('TC-05: Messaging Pricing Page Content', { tags: '@smoke' }, function () {
    const msg = this.pricingData.messaging;

    // Step 1: Navigate to messaging pricing page
    pricingPage.visitMessaging();
    cy.url().should('include', '/pricing/messaging');

    // Step 2: Verify page title contains pricing-related text
    pricingPage.pageHeading.should('be.visible');
    cy.title().should('contain', 'Pricing');

    // Step 3: Verify prices are shown for the default country
    pricingPage.countryFilter.should('contain', msg.defaultCountry);
    pricingPage.assertPricingRowContains(msg.rowLabel, msg.defaultPrice);

    // Step 4: Change country and verify prices update
    pricingPage.selectCountry(msg.alternateCountry);
    pricingPage.assertPricingRowContains(msg.rowLabel, msg.alternatePrice);
    pricingPage.assertPricingRowNotContains(msg.rowLabel, msg.defaultPrice);
  });

  it('TC-06: SIP Trunking Pricing Page Content', { tags: '@smoke' }, function () {
    const sip = this.pricingData.elasticSip;

    // Step 1: Navigate to SIP trunking pricing page
    pricingPage.visitElasticSip();
    cy.url().should('include', '/pricing/elastic-sip');

    // Step 2: Verify page heading
    pricingPage.pageHeading.should('be.visible');
    cy.title().should('contain', 'SIP');

    // Step 3: Verify pricing tiers are displayed
    pricingPage.payAsYouGo.should('be.visible');

    // Step 4: Verify volume-based pricing section exists
    pricingPage.volumeBased.should('be.visible');

    // Step 5: Verify prices are shown in default currency
    pricingPage.currencyFilter.should('contain', sip.defaultCurrency);
    pricingPage.assertPriceUsesCurrency(sip.rowLabel, sip.defaultSymbol);

    // Step 6: Change currency and verify prices update
    pricingPage.selectCurrency(sip.alternateCurrency);
    pricingPage.assertPriceUsesCurrency(sip.rowLabel, sip.alternateSymbol);
  });
});
