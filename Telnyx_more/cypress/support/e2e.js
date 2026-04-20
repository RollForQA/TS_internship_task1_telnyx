import '../../../cypress/support/commands';
import { register as registerCypressGrep } from '@cypress/grep';

registerCypressGrep();

Cypress.on('uncaught:exception', () => {
  return false;
});
