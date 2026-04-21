# Telnyx E2E Test Suite

Automated end-to-end testing for [telnyx.com](https://telnyx.com) with Cypress 15.

## Project Structure

```text
.
|-- cypress/
|   |-- e2e/
|   |   |-- auth.cy.js
|   |   |-- docs.cy.js
|   |   |-- home.cy.js
|   |   |-- navigation.cy.js
|   |   `-- pricing.cy.js
|   |-- fixtures/
|   |   `-- pricing.json
|   |-- pages/
|   |   |-- AuthPage.js
|   |   |-- DocsPage.js
|   |   |-- HomePage.js
|   |   |-- NavigationPage.js
|   |   |-- PortalPage.js
|   |   `-- PricingPage.js
|   `-- support/
|       |-- commands.js
|       `-- e2e.js
|-- Telnyx_more/
|-- cypress.config.js
|-- cypress.config.custom.js
|-- package.json
`-- .github/workflows/main.yml
```

## Main Test Coverage

| Spec | Test cases |
|------|------------|
| `auth.cy.js` | TC-03, TC-04 |
| `docs.cy.js` | TC-09 |
| `home.cy.js` | TC-01, TC-07, TC-08 |
| `navigation.cy.js` | TC-02, TC-10 |
| `pricing.cy.js` | TC-05, TC-06 |

## Configuration

Both root configs currently use:

- `baseUrl: https://telnyx.com`
- `viewportWidth: 1280`
- `viewportHeight: 720`
- `video: true`
- `screenshotOnRunFailure: true`
- `mochawesome` JSON reporting

Config differences:

| File | Main use | Retries | `projectId` |
|------|----------|---------|-------------|
| `cypress.config.js` | default root config | `runMode: 2` | yes |
| `cypress.config.custom.js` | alternate root config for CI/manual runs | `runMode: 2` | yes |

## npm Scripts

| Command | Description |
|---------|-------------|
| `npm run cy:open` | Open Cypress with the default root config |
| `npm run cy:open:custom` | Open Cypress with `cypress.config.custom.js` |
| `npm run cy:run` | Run the root suite with the default config |
| `npm run cy:run:custom` | Run the root suite with the custom config |
| `npm run cy:run:ci` | Run the root suite in Chrome with the custom config |
| `npm run cy:run:smoke` | Run only root tests tagged `@smoke` with the custom config |
| `npm run cy:run:regression` | Run only root tests tagged `@regression` with the custom config |
| `npm run report` | Merge Mochawesome JSON files and generate HTML report |
| `npm test` | Alias for `cypress run --config-file cypress.config.custom.js` |

## Quick Start

```bash
npm install
npm run cy:open
```

Typical local runs:

```bash
npm run cy:run
npm run cy:run:smoke
npm run cy:run:regression
```

Generate an HTML report after a run:

```bash
npm run report
```

Output:

- merged JSON: `cypress/reports/merged.json`
- HTML report: `cypress/reports/html/report.html`
- failure screenshots: `cypress/screenshots/`
- videos: `cypress/videos/`

## Implementation Notes

- The root project uses Page Object Model classes from `cypress/pages/`.
- Shared custom commands live in `cypress/support/commands.js`.
- Test filtering is implemented with `@cypress/grep`.
- Native hover support comes from `cypress-real-events`.
- `cy.assertSiteIsUp()` is used in `before()` hooks as a fast availability check.

## CI

The GitHub Actions workflow in `.github/workflows/main.yml` currently runs the root suite in Chrome with `cypress.config.custom.js`, then uploads Mochawesome HTML, screenshots, and videos as artifacts.
