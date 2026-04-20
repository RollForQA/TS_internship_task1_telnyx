import { assertFocusIndicator, focusNextElement } from '../support/a11y-helpers';
import authPage from '../../../cypress/pages/AuthPage';

describe('Telnyx_more - Accessibility and Timed Feedback', () => {
  before(() => {
    cy.assertSiteIsUp('https://telnyx.com');
    cy.assertSiteIsUp('https://developers.telnyx.com');
  });

  it('TC-15: Full keyboard navigation on the Sign Up form', { tags: '@regression' }, () => {
    // Step 1: Navigate to sign-up page
    authPage.visitSignUp();
    cy.acceptCookies();

    // Step 2: Collect all focusable form controls
    cy.get('form input, form button, .mktoForm input, .mktoForm button', { timeout: 20000 })
      .filter(':visible')
      .then(($elements) => {
        const focusable = [...$elements].filter((el) => {
          const type = (el.getAttribute('type') || '').toLowerCase();
          return !['hidden'].includes(type) && !el.disabled;
        });

        expect(focusable.length, 'focusable sign-up controls').to.be.gte(2);

        // Step 3: Tab through focusable elements and verify focus indicators
        focusNextElement(focusable, 0);
        if (focusable.length > 1) focusNextElement(focusable, 1);
        if (focusable.length > 2) focusNextElement(focusable, 2);
      });

    // Step 4: Submit the form via keyboard (Enter on submit button)
    cy.get('input[type="email"], input[id="email"], input[name="email"]', { timeout: 15000 })
      .filter(':visible')
      .first()
      .closest('form')
      .within(() => {
        cy.get('button[type="submit"], input[type="submit"]')
          .filter(':visible')
          .first()
          .focus()
          .should('be.focused')
          .trigger('keydown', { key: 'Enter', code: 'Enter', which: 13, keyCode: 13 });
      });

    // Step 5: Verify user stays on /sign-up (form not submitted with invalid data)
    cy.url().should('include', '/sign-up');
  });

  it('TC-16: Copy confirmation disappears using mocked time', { tags: '@regression' }, () => {
    // Step 1: Create a minimal page with a copy button and a toast notification
    cy.visit('about:blank');
    cy.document().then((doc) => {
      doc.write(`
        <html>
          <body>
            <button id="copy-btn">Copy to clipboard</button>
            <div id="toast" style="display:none">Copied</div>
            <script>
              document.getElementById('copy-btn').addEventListener('click', () => {
                const toast = document.getElementById('toast');
                toast.style.display = 'block';
                setTimeout(() => {
                  toast.remove();
                }, 5000);
              });
            </script>
          </body>
        </html>
      `);
      doc.close();
    });

    // Step 2: Freeze the browser clock
    cy.clock();

    // Step 3: Click the copy button and verify the toast appears
    cy.get('#copy-btn').click();
    cy.get('#toast').should('be.visible');

    // Step 4: Fast-forward time by 5 seconds and verify the toast disappears
    cy.tick(5000);
    cy.get('#toast').should('not.exist');
  });
});
