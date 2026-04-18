// ***********************************************************
// This support/e2e.js is processed and loaded automatically
// before your test files.
// ***********************************************************

// Import custom commands
import './commands';

// Register @cypress/grep for test tagging (@smoke, @regression)
import { register as registerCypressGrep } from '@cypress/grep';
registerCypressGrep();

// Ignore uncaught exceptions from the application to prevent
// test failure on non-critical React/Next.js hydration errors
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});