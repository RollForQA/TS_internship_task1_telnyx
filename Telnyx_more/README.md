# Telnyx_more

Additional Cypress coverage for [telnyx.com](https://telnyx.com), focused on responsive behavior, breakpoint checks, portal access, and extra UI scenarios.

## Project Structure

```text
.
|-- cypress/
|   |-- e2e/
|   |   |-- accessibility-and-time.cy.js
|   |   |-- breakpoints.cy.js
|   |   |-- components-ui.cy.js
|   |   |-- portal-security.cy.js
|   |   `-- responsive-smoke.cy.js
|   |-- pages/
|   |   |-- PortalAuthPage.js
|   |   `-- TelnyxResponsivePage.js
|   `-- support/
|       |-- a11y-helpers.js
|       `-- e2e.js
|-- cypress.config.js
`-- package.json
```

## Coverage Areas

| Spec | Focus |
|------|-------|
| `responsive-smoke.cy.js` | smoke coverage across key viewport sizes |
| `components-ui.cy.js` | responsive header, hero, cards, footer, overflow checks |
| `breakpoints.cy.js` | breakpoint boundary checks around important width transitions |
| `portal-security.cy.js` | direct access and invalid-session portal behavior |
| `accessibility-and-time.cy.js` | keyboard navigation and timer-based UI behavior |

## Configuration

Current config in `Telnyx_more/cypress.config.js`:

- `baseUrl: https://telnyx.com`
- `viewportWidth: 1280`
- `viewportHeight: 720`
- `video: true`
- `screenshotOnRunFailure: true`
- `retries.runMode: 1`
- `mochawesome` JSON reporting

## npm Scripts

| Command | Description |
|---------|-------------|
| `npm run cy:open` | Open Cypress with `Telnyx_more/cypress.config.js` |
| `npm run cy:run` | Run the child suite in Chrome |
| `npm run cy:run:smoke` | Run only child tests tagged `@smoke` in Chrome |
| `npm run cy:run:regression` | Run only child tests tagged `@regression` in Chrome |
| `npm run report` | Merge Mochawesome JSON files and generate an HTML report |
| `npm test` | Alias for the Chrome run of the child suite |

## Quick Start

From the child project directory:

```bash
cd Telnyx_more
npm install
npm run cy:open
```

Typical runs:

```bash
cd Telnyx_more
npm run cy:run
npm run cy:run:smoke
npm run cy:run:regression
```

Generate an HTML report after a run:

```bash
cd Telnyx_more
npm run report
```

Output:

- Mochawesome JSON: `Telnyx_more/cypress/reports/`
- merged JSON: `Telnyx_more/cypress/reports/merged.json`
- HTML report: `Telnyx_more/cypress/reports/html/report.html`
- failure screenshots: `Telnyx_more/cypress/screenshots/`
- videos: `Telnyx_more/cypress/videos/`

## Implementation Notes

- The child project reuses shared commands from the root project via `../../../cypress/support/commands`.
- Test filtering is implemented with `@cypress/grep`.
- Responsive helpers and reusable selectors live in `cypress/pages/TelnyxResponsivePage.js`.
- Accessibility helpers live in `cypress/support/a11y-helpers.js`.
