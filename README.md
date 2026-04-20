# Telnyx E2E Test Suite

Automated end-to-end testing for [telnyx.com](https://telnyx.com) using Cypress 15.

## Project Structure

```text
├── cypress/
│   ├── e2e/                     # Test specs (5 files, 10 test cases)
│   │   ├── auth.cy.js           # TC-03, TC-04
│   │   ├── docs.cy.js           # TC-09
│   │   ├── home.cy.js           # TC-01, TC-07, TC-08
│   │   ├── navigation.cy.js     # TC-02, TC-10
│   │   └── pricing.cy.js        # TC-05, TC-06
│   ├── pages/                   # Page Object Model (POM)
│   │   ├── AuthPage.js
│   │   ├── DocsPage.js
│   │   ├── HomePage.js
│   │   ├── NavigationPage.js
│   │   └── PricingPage.js
│   └── support/
│       ├── commands.js          # Custom commands
│       └── e2e.js               # Support file + @cypress/grep registration
├── cypress.config.js            # Default Cypress config
├── cypress.config.custom.js     # CI/reporting config
├── TC Telnyx.xlsx               # Test plan workbook
└── .github/workflows/main.yml   # CI pipeline
```

## Quick Start

```bash
npm install
npm run cy:open:custom
npm test
npm run cy:run:smoke
npm run cy:run:regression
```

## Test Cases

| TC | Title | Tag | Module |
|----|-------|-----|--------|
| TC-01 | Main Page Load & SEO | `@smoke` | Home |
| TC-02 | Products Menu Navigation | `@smoke` | Navigation |
| TC-03 | Sign Up Email Validation (Negative) | `@regression` | Authentication |
| TC-04 | Log In Empty Submit | `@regression` | Authentication |
| TC-05 | Interaction with the price calculator | `@smoke` | Pricing |
| TC-06 | Currency change in the calculator | `@smoke` | Pricing |
| TC-07 | Cookie Consent Banner | `@smoke` | Compliance |
| TC-08 | Footer LinkedIn Link | `@regression` | Footer / Social |
| TC-09 | Пошук по порталу розробників (Developer Docs) | `@regression` | Developer Docs |
| TC-10 | Mobile Menu Interaction | `@regression` | Responsiveness |

## Reports

Generate a Mochawesome HTML report after a run:

```bash
npm run report
```

The report is written to `cypress/reports/html/report.html`.

## npm Scripts

| Command | Description |
|---------|-------------|
| `npm run cy:open` | Open Cypress GUI with the default config |
| `npm run cy:open:custom` | Open Cypress GUI with the custom config |
| `npm run cy:run` | Run all tests with the default config |
| `npm run cy:run:custom` | Run all tests with the custom config |
| `npm run cy:run:ci` | Run in Chrome headless mode |
| `npm run cy:run:smoke` | Run only `@smoke` tests |
| `npm run cy:run:regression` | Run only `@regression` tests |
| `npm run report` | Generate Mochawesome HTML report |
| `npm test` | Alias for `cy:run:custom` |

## Architecture

- Page Object Model keeps selectors and reusable actions in `cypress/pages/`.
- Custom commands live in `cypress/support/commands.js`.
- Test tagging uses `@cypress/grep` with `@smoke` and `@regression`.
- `cy.assertSiteIsUp()` runs in `before()` hooks to fail fast if the site is unavailable.
