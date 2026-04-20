// =============================================================
// Accessibility Test Helpers
// Shared utilities for keyboard navigation and focus testing
// =============================================================

/**
 * Asserts that the currently focused element has a visible focus indicator
 * (outline, box-shadow, or a CSS class containing "focus").
 */
export function assertFocusIndicator() {
  cy.focused().then(($el) => {
    const win = $el[0].ownerDocument.defaultView;
    const styles = win.getComputedStyle($el[0]);
    const hasOutline = styles.outlineStyle !== 'none' && styles.outlineWidth !== '0px';
    const hasShadow = styles.boxShadow && styles.boxShadow !== 'none';
    const hasRingClass = ($el.attr('class') || '').toLowerCase().includes('focus');

    expect(hasOutline || hasShadow || hasRingClass, 'focus indicator').to.equal(true);
  });
}

/**
 * Focuses the element at the given index and verifies it receives
 * both focus state and a visible focus indicator.
 */
export function focusNextElement($elements, index) {
  cy.wrap($elements[index]).focus().should('be.focused');
  assertFocusIndicator();
}
