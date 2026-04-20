import fs from 'node:fs/promises';
import path from 'node:path';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const outputDir = path.resolve('H:/aqa/TS internship/Telnyx_more/outputs');
const outputPath = path.join(outputDir, 'Telnyx_more_TestPlan.xlsx');

const responsiveRows = [
  ['TC-RESP-001', 'Responsive / Smoke', 'Mobile Layout Smoke', 'Set viewport to 390x844. Open homepage. Scroll from header to footer.', 'Page renders in mobile layout, key content is visible, no horizontal scrolling occurs.', 'High', 'Implemented', 'cypress/e2e/responsive-smoke.cy.js'],
  ['TC-RESP-002', 'Responsive / Mobile', 'Small Mobile Layout', 'Set viewport to 360x800. Open homepage. Check hero, CTA, cards, and full-page scroll.', 'No overlap or clipping on narrow mobile viewport.', 'Medium', 'Implemented', 'cypress/e2e/responsive-smoke.cy.js'],
  ['TC-RESP-003', 'Responsive / Mobile', 'Large Mobile Layout', 'Set viewport to 414x896. Open homepage. Verify hero, cards, and footer spacing.', 'Large-mobile layout stays stable with no broken zones.', 'Medium', 'Implemented', 'cypress/e2e/responsive-smoke.cy.js'],
  ['TC-RESP-004', 'Responsive / Tablet', 'Tablet Layout', 'Set viewport to 768x1024. Open homepage. Verify header, sections, and footer.', 'Tablet layout renders correctly and stays free of horizontal scroll.', 'High', 'Implemented', 'cypress/e2e/responsive-smoke.cy.js'],
  ['TC-RESP-005', 'Responsive / Desktop', 'Desktop Transition Layout', 'Set viewport to 1024x768. Open homepage. Compare navigation and hero with tablet layout.', 'Desktop layout activates cleanly without overlap.', 'High', 'Implemented', 'cypress/e2e/responsive-smoke.cy.js'],
  ['TC-RESP-006', 'Responsive / Laptop', 'Laptop Layout', 'Set viewport to 1280x720. Open homepage. Check key sections and CTA visibility.', 'Laptop layout remains readable and stable.', 'High', 'Implemented', 'cypress/e2e/responsive-smoke.cy.js'],
  ['TC-RESP-007', 'Responsive / Wide Desktop', 'Wide Desktop Layout', 'Set viewport to 1440x900. Open homepage. Review large media and grid sections.', 'Wide desktop presentation scales correctly.', 'Medium', 'Implemented', 'cypress/e2e/responsive-smoke.cy.js'],
  ['TC-RESP-008', 'Responsive / Full HD', 'Full HD Layout', 'Set viewport to 1920x1080. Open homepage and review full-page composition.', 'Full HD layout remains balanced with no broken spacing.', 'Medium', 'Implemented', 'cypress/e2e/responsive-smoke.cy.js'],
  ['TC-11', 'Responsive / Breakpoints', 'Adaptive navigation on mobile devices', 'Set viewport to 375x812. Open homepage. Verify hamburger menu and open it.', 'Desktop navigation is collapsed and mobile menu opens correctly.', 'High', 'Implemented', 'cypress/e2e/components-ui.cy.js'],
  ['TC-RESP-009', 'Navigation / Mobile', 'Mobile Menu Functionality', 'Set viewport to 390x844. Open homepage. Open mobile menu and verify primary links.', 'Mobile menu contains key navigation items and stays visible after opening.', 'High', 'Implemented', 'cypress/e2e/components-ui.cy.js'],
  ['TC-RESP-010', 'Navigation / Stability', 'Header And Navigation Stability', 'Check header behavior at 390x844, 768x1024, 1024x768, and 1440x900 while scrolling.', 'Header remains visible and stable across key viewport groups.', 'Medium', 'Implemented', 'cypress/e2e/components-ui.cy.js'],
  ['TC-RESP-011', 'Hero / Responsive', 'Hero Section Responsiveness', 'Review hero section at 390x844, 768x1024, 1024x768, and 1920x1080.', 'Hero copy and CTA remain visible and usable across viewport changes.', 'Medium', 'Implemented', 'cypress/e2e/components-ui.cy.js'],
  ['TC-RESP-012', 'Content / Grid', 'Content Cards And Grids', 'Check visible card/grid sections at 390x844, 768x1024, 1024x768, and 1280x720.', 'Cards and grids reflow correctly with no overlap.', 'Medium', 'Implemented', 'cypress/e2e/components-ui.cy.js'],
  ['TC-RESP-013', 'Content / Marquee', 'Logo Strip / Marquee', 'Inspect logo/marquee areas at 390x844, 1024x768, and 1920x1080.', 'Logo strip or equivalent content stays visible and stable.', 'Low', 'Implemented', 'cypress/e2e/components-ui.cy.js'],
  ['TC-RESP-014', 'Footer / Responsive', 'Footer Responsiveness', 'Verify footer content at 390x844, 768x1024, and 1280x720.', 'Footer links remain visible and readable across viewports.', 'Medium', 'Implemented', 'cypress/e2e/components-ui.cy.js'],
  ['TC-RESP-015', 'Layout / Overflow', 'No Horizontal Scroll', 'Check horizontal scroll behavior at 360x800, 390x844, 414x896, 768x1024, and 1024x768.', 'Page does not horizontally scroll for tested viewports.', 'Medium', 'Implemented', 'cypress/e2e/components-ui.cy.js'],
  ['TC-RESP-016', 'Breakpoints / Audit', 'Breakpoint Check At 430', 'Verify page behavior at widths 429, 430, and 431.', 'Transition around 430px occurs without visible breakage.', 'Medium', 'Implemented', 'cypress/e2e/breakpoints.cy.js'],
  ['TC-RESP-017', 'Breakpoints / Audit', 'Breakpoint Check At 720', 'Verify page behavior at widths 719, 720, and 721.', 'Transition around 720px occurs without visible breakage.', 'Medium', 'Implemented', 'cypress/e2e/breakpoints.cy.js'],
  ['TC-RESP-018', 'Breakpoints / Audit', 'Breakpoint Check At 1024', 'Verify page behavior at widths 1023, 1024, and 1025.', 'Transition around 1024px occurs without visible breakage.', 'High', 'Implemented', 'cypress/e2e/breakpoints.cy.js'],
  ['TC-RESP-019', 'Breakpoints / Audit', 'Breakpoint Check At 1260', 'Verify page behavior at widths 1259, 1260, and 1261.', 'Transition around 1260px occurs without visible breakage.', 'Medium', 'Implemented', 'cypress/e2e/breakpoints.cy.js'],
  ['TC-RESP-020', 'Breakpoints / Audit', 'Breakpoint Check At 1440', 'Verify page behavior at widths 1439, 1440, and 1441.', 'Transition around 1440px occurs without visible breakage.', 'Medium', 'Implemented', 'cypress/e2e/breakpoints.cy.js'],
];

const portalRows = [
  ['TC-13', 'State Management', 'Session Expiry / Invalid Session Redirect', 'Seed invalid auth token values in storage. Open protected portal route #/app/billing.', 'Portal redirects to login screen and protected billing content is not exposed.', 'High', 'Implemented', 'cypress/e2e/portal-security.cy.js'],
  ['TC-14', 'RBAC / Direct Links', 'Unauthenticated Direct Link Access', 'Open clean session. Visit protected portal route #/app/keys directly.', 'Portal redirects to login screen and protected keys area is blocked.', 'Critical', 'Implemented', 'cypress/e2e/portal-security.cy.js'],
];

const accessibilityRows = [
  ['TC-15', 'Accessibility (a11y)', 'Keyboard Navigation on Sign Up Form', 'Open /sign-up. Dismiss cookie banner. Traverse visible form controls using keyboard-style focus progression and submit via Enter key event.', 'Visible focus indicator appears on form controls and form remains keyboard-submittable without mouse interaction.', 'Medium', 'Implemented', 'cypress/e2e/accessibility-and-time.cy.js'],
  ['TC-16', 'Time Mocks', 'Toast Disappearance With Mocked Time', 'Open deterministic in-test copy/toast demo page. Trigger copy action. Advance mocked time by 5000ms.', 'Toast becomes visible and is removed from the DOM after cy.tick(5000).', 'Low', 'Implemented', 'cypress/e2e/accessibility-and-time.cy.js'],
];

const deferredRows = [
  ['TC-12', 'Network Interception', 'Server Error 500 During Login', 'Open portal login, intercept the real login request, submit valid credentials, and force HTTP 500.', 'UI should stay stable, show meaningful server error message, and re-enable login action.', 'High', 'Deferred - requires real account / real login flow', 'Not implemented'],
];

const allRows = [...responsiveRows, ...portalRows, ...accessibilityRows, ...deferredRows];

function writeTable(sheet, startCell, headers, rows) {
  const startRange = sheet.getRange(startCell);
  const startRow = startRange.rowIndex;
  const startCol = startRange.columnIndex;
  const totalRows = rows.length + 1;
  const totalCols = headers.length;
  const range = sheet.getRangeByIndexes(startRow, startCol, totalRows, totalCols);
  range.values = [headers, ...rows];
  return range;
}

function styleTable(sheet, range, headerColor = '#0F766E') {
  const rowCount = range.rowCount;
  const colCount = range.columnCount;
  const header = range.getRow(0);
  header.format = {
    fill: headerColor,
    font: { bold: true, color: '#FFFFFF' },
    wrapText: true,
    horizontalAlignment: 'center',
    verticalAlignment: 'center',
  };
  const body = sheet.getRangeByIndexes(range.rowIndex + 1, range.columnIndex, rowCount - 1, colCount);
  body.format.wrapText = true;
  body.format.verticalAlignment = 'top';
  body.format.borders = {
    bottom: { color: '#D1D5DB', style: 'continuous' },
  };
}

const workbook = Workbook.create();

const summary = workbook.worksheets.add('Summary');
const responsiveSheet = workbook.worksheets.add('Responsive_UI');
const portalSheet = workbook.worksheets.add('Portal_Security');
const accessibilitySheet = workbook.worksheets.add('Accessibility_Time');
const deferredSheet = workbook.worksheets.add('Deferred');

summary.getRange('A1:H1').merge();
summary.getRange('A1').values = [['Telnyx_more Test Plan']];
summary.getRange('A1').format = {
  fill: '#111827',
  font: { color: '#FFFFFF', bold: true, size: 16 },
  horizontalAlignment: 'center',
};
summary.getRange('A2:H2').merge();
summary.getRange('A2').values = [['Autonomous Cypress subproject covering telnyx.com responsive checks, portal access control, keyboard accessibility, and time-mock validation.']];
summary.getRange('A2').format.wrapText = true;

summary.getRange('A4:B7').values = [
  ['Metric', 'Value'],
  ['Total test cases in workbook', allRows.length],
  ['Implemented automated cases', allRows.filter((row) => String(row[6]).startsWith('Implemented')).length],
  ['Deferred cases', allRows.filter((row) => String(row[6]).startsWith('Deferred')).length],
];
styleTable(summary, summary.getRange('A4:B7'), '#1D4ED8');

summary.getRange('D4:G8').values = [
  ['Area', 'Cases', 'Status', 'Notes'],
  ['Responsive_UI', responsiveRows.length, 'Implemented', 'Validated in Chrome within Telnyx_more'],
  ['Portal_Security', portalRows.length, 'Implemented', 'Covers unauthenticated and invalid-session redirect behavior'],
  ['Accessibility_Time', accessibilityRows.length, 'Implemented', 'Includes sign-up focus flow and deterministic time mock case'],
  ['Deferred', deferredRows.length, 'Deferred', 'TC-12 held until a real portal account/login flow is available'],
];
styleTable(summary, summary.getRange('D4:G8'), '#7C3AED');

summary.getRange('A10:H10').merge();
summary.getRange('A10').values = [['Sheets included in this workbook']];
summary.getRange('A10').format = {
  fill: '#0F766E',
  font: { color: '#FFFFFF', bold: true },
};
summary.getRange('A11:C15').values = [
  ['Sheet', 'Purpose', 'Contents'],
  ['Responsive_UI', 'Homepage responsive and breakpoint coverage', 'TC-11 and TC-RESP-001 through TC-RESP-020'],
  ['Portal_Security', 'Portal access control and state handling', 'TC-13 and TC-14'],
  ['Accessibility_Time', 'Sign-up keyboard flow and mocked timer validation', 'TC-15 and TC-16'],
  ['Deferred', 'Cases intentionally postponed', 'TC-12'],
];
styleTable(summary, summary.getRange('A11:C15'));

summary.showGridLines = false;
summary.freezePanes.freezeRows(3);
summary.getRange('A1:H20').format.autofitColumns();

const detailHeaders = ['ID', 'Category', 'Title', 'Steps', 'Expected Result', 'Priority', 'Status', 'Automation File'];

const responsiveRange = writeTable(responsiveSheet, 'A1', detailHeaders, responsiveRows);
styleTable(responsiveSheet, responsiveRange);
responsiveSheet.freezePanes.freezeRows(1);
responsiveSheet.showGridLines = false;

const portalRange = writeTable(portalSheet, 'A1', detailHeaders, portalRows);
styleTable(portalSheet, portalRange, '#B45309');
portalSheet.freezePanes.freezeRows(1);
portalSheet.showGridLines = false;

const accessibilityRange = writeTable(accessibilitySheet, 'A1', detailHeaders, accessibilityRows);
styleTable(accessibilitySheet, accessibilityRange, '#BE185D');
accessibilitySheet.freezePanes.freezeRows(1);
accessibilitySheet.showGridLines = false;

const deferredRange = writeTable(deferredSheet, 'A1', detailHeaders, deferredRows);
styleTable(deferredSheet, deferredRange, '#6B7280');
deferredSheet.freezePanes.freezeRows(1);
deferredSheet.showGridLines = false;

for (const sheet of [responsiveSheet, portalSheet, accessibilitySheet, deferredSheet]) {
  sheet.getRange('A:H').format.autofitColumns();
  sheet.getRange('C:H').format.wrapText = true;
  sheet.getRange('D:D').format.columnWidthPx = 330;
  sheet.getRange('E:E').format.columnWidthPx = 330;
  sheet.getRange('C:C').format.columnWidthPx = 220;
  sheet.getRange('B:B').format.columnWidthPx = 180;
  sheet.getRange('H:H').format.columnWidthPx = 220;
}

await fs.mkdir(outputDir, { recursive: true });
const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);

const inspectSummary = await workbook.inspect({
  kind: 'table',
  range: 'Summary!A1:G15',
  include: 'values',
  tableMaxRows: 15,
  tableMaxCols: 8,
});
console.log(inspectSummary.ndjson);

const errorScan = await workbook.inspect({
  kind: 'match',
  searchTerm: '#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A',
  options: { useRegex: true, maxResults: 50 },
  summary: 'formula error scan',
});
console.log(errorScan.ndjson);

const rendered = await workbook.render({ sheetName: 'Summary', range: 'A1:G15', scale: 1.5, format: 'png' });
const renderBytes = new Uint8Array(await rendered.arrayBuffer());
await fs.writeFile(path.join(outputDir, 'Telnyx_more_TestPlan_summary.png'), renderBytes);

console.log(`Saved workbook to ${outputPath}`);
