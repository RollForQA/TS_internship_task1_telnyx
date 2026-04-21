import '../../../cypress/support/commands';
import { register as registerCypressGrep } from '@cypress/grep';

registerCypressGrep();

// Selectively ignore known non-critical application errors.
// Other uncaught exceptions will still fail the test.
Cypress.on('uncaught:exception', (err) => {
  const ignoredPatterns = [
    'hydrat',                // React/Next.js hydration mismatches
    'Minified React error',  // Minified production React errors (e.g. #418 = hydration)
    'ResizeObserver',        // ResizeObserver loop limit exceeded
    'ChunkLoadError',        // Lazy-loaded chunk failures
    'Loading chunk',         // Webpack chunk loading errors
    'require is not defined',// Third-party script loading errors
    'redeclaration of',      // Third-party script conflicts (Firefox)
    'has already been declared', // Third-party script conflicts (Chrome)
    'NetworkError',          // Firefox-specific fetch network error for next.js background chunks
  ];
  if (ignoredPatterns.some((pattern) => err.message.includes(pattern))) {
    return false;
  }
});

