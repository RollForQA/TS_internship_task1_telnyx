# Telnyx E2E Test Suite

Automated end-to-end testing for [telnyx.com](https://telnyx.com) using **Cypress 15**.

## 📁 Project Structure

```
├── cypress/
│   ├── e2e/                     # Test specs (5 files, 10 test cases)
│   │   ├── auth.cy.js           # TC-03: Sign-up validation, TC-04: Login empty submit
│   │   ├── docs.cy.js           # TC-09: Developer docs navigation
│   │   ├── home.cy.js           # TC-01: Home SEO, TC-07: Cookie consent, TC-08: Footer LinkedIn
│   │   ├── navigation.cy.js     # TC-02: Products menu, TC-10: Mobile menu
│   │   └── pricing.cy.js        # TC-05: Messaging pricing, TC-06: SIP pricing
│   ├── pages/                   # Page Object Model (POM)
│   │   ├── AuthPage.js
│   │   ├── DocsPage.js
│   │   ├── HomePage.js
│   │   ├── NavigationPage.js
│   │   └── PricingPage.js
│   ├── fixtures/                # Test data
│   │   └── testdata.json
│   └── support/
│       ├── commands.js          # Custom commands: acceptCookies, waitForPageReady, assertSiteIsUp
│       └── e2e.js               # Support file + @cypress/grep registration
├── cypress.config.js            # Default Cypress config
├── cypress.config.custom.js     # CI/Dashboard config (mochawesome, retries, grep)
├── TC Telnyx.xlsx               # Test plan (10 test cases with steps & expected results)
└── .github/workflows/main.yml   # CI/CD pipeline
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Open Cypress GUI
npm run cy:open:custom

# Run all tests headless
npm test

# Run only smoke tests
npm run cy:run:smoke

# Run only regression tests
npm run cy:run:regression
```

## 🧪 Test Cases

| TC | Title | Tags | Module |
|----|-------|------|--------|
| TC-01 | Main Page Load & SEO | `@smoke` | Home |
| TC-02 | Products Menu Navigation | `@smoke` | Navigation |
| TC-03 | Sign Up Email Validation | `@regression` | Auth |
| TC-04 | Log In Empty Submit | `@regression` | Auth |
| TC-05 | Messaging Pricing Content | `@regression` | Pricing |
| TC-06 | SIP Pricing Content | `@regression` | Pricing |
| TC-07 | Cookie Consent Banner | `@smoke` | Compliance |
| TC-08 | Footer LinkedIn Link | `@regression` | Footer |
| TC-09 | Developer Docs Navigation | `@regression` | Docs |
| TC-10 | Mobile Menu Interaction | `@regression` | Responsive |

## 📊 Reports

After running tests, generate a Mochawesome HTML report:

```bash
npm run report
```

Report is saved to `cypress/reports/html/report.html`.

## ⚙️ npm Scripts

| Command | Description |
|---------|-------------|
| `npm run cy:open` | Open Cypress GUI (default config) |
| `npm run cy:open:custom` | Open Cypress GUI (custom config) |
| `npm run cy:run` | Run all tests (default config) |
| `npm run cy:run:custom` | Run all tests (custom config) |
| `npm run cy:run:ci` | Run in Chrome headless (CI mode) |
| `npm run cy:run:smoke` | Run `@smoke` tagged tests only |
| `npm run cy:run:regression` | Run `@regression` tagged tests only |
| `npm run report` | Generate Mochawesome HTML report |
| `npm test` | Alias for `cy:run:custom` |

## 🔧 CI/CD

GitHub Actions pipeline (`.github/workflows/main.yml`):
- Runs on push/PR to `main`/`master`
- Uses Chrome browser
- Records to Cypress Dashboard (if `CYPRESS_RECORD_KEY` secret is set)
- Generates Mochawesome HTML report
- Uploads screenshots (on failure) and videos (always) as artifacts

## 🏗️ Architecture

- **Page Object Model (POM)**: All selectors and page actions are encapsulated in `cypress/pages/`
- **Custom Commands**: Reusable logic in `cypress/support/commands.js`
- **Test Tagging**: `@smoke` / `@regression` via `@cypress/grep`
- **API Health Check**: `cy.assertSiteIsUp()` runs in `before()` hooks — fails fast if site is down
- **Auto-retry**: Cypress built-in retry-ability with per-element `{ timeout }` — no fixed `cy.wait()` calls