// =============================================================
// Page Object: Navigation Header (telnyx.com)
// =============================================================

class NavigationPage {
  // ---- Selectors ----
  get productsTrigger() {
    return cy.contains('header button[aria-haspopup="menu"] span', /^Products\b/i)
      .should('be.visible')
      .closest('button');
  }
  get mainMenu() { return cy.get('#main-menu'); }

  get voiceApiLink() {
    // Look for the link globally in case it's in a mobile overlay outside the header
    return cy.get('a[href*="/products/voice-api"]:visible', { timeout: 10000 }).first();
  }

  isVoiceApiVisible() {
    return cy.get('body').then(($body) => $body.find('a[href*="/products/voice-api"]:visible').length > 0);
  }

  // ---- Actions ----
  visit() {
    cy.visit('/', {
      onBeforeLoad(win) {
        const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
        win.document.cookie = `OptanonAlertBoxClosed=${encodeURIComponent(new Date().toISOString())}; expires=${expires}; path=/`;
      },
    });
    cy.waitForPageReady();
    return this;
  }

  openProductsMenu() {
    this.productsTrigger.should('be.visible');

    const waitForUiTick = () => cy.window().then((win) => new Cypress.Promise((resolve) => {
      win.requestAnimationFrame(() => win.requestAnimationFrame(resolve));
    }));

    const dispatchHoverEvents = () => this.productsTrigger.then(($trigger) => {
      const trigger = $trigger[0];
      const win = trigger.ownerDocument.defaultView;
      const pointerEventTypes = ['pointerover', 'pointerenter', 'pointermove'];
      const mouseEventTypes = ['mouseover', 'mouseenter', 'mousemove'];

      pointerEventTypes.forEach((type) => {
        const event = typeof win.PointerEvent === 'function'
          ? new win.PointerEvent(type, {
            bubbles: true,
            cancelable: true,
            composed: true,
            pointerType: 'mouse',
          })
          : new win.MouseEvent(type, {
            bubbles: true,
            cancelable: true,
            composed: true,
            view: win,
          });

        trigger.dispatchEvent(event);
      });

      mouseEventTypes.forEach((type) => {
        trigger.dispatchEvent(new win.MouseEvent(type, {
          bubbles: true,
          cancelable: true,
          composed: true,
          view: win,
        }));
      });
    });

    const tryAction = (action) => action()
      .then(waitForUiTick)
      .then(() => this.isVoiceApiVisible());

    tryAction(() => dispatchHoverEvents())
      .then((isVisible) => {
        if (isVisible) return isVisible;
        return tryAction(() => this.productsTrigger.focus().type('{downarrow}', { force: true }));
      })
      .then((isVisible) => {
        if (isVisible) return isVisible;
        return tryAction(() => this.productsTrigger.focus().type('{enter}', { force: true }));
      })
      .then((isVisible) => {
        if (isVisible) return isVisible;
        return tryAction(() => this.productsTrigger.click({ force: true }));
      })
      .then((isVisible) => {
        if (isVisible || Cypress.isBrowser('firefox')) return isVisible;
        return tryAction(() => this.productsTrigger.realHover());
      });

    this.voiceApiLink.should('be.visible');

    return this;
  }

  openMobileMenu() {
    // Try aria-label approach first
    cy.get('body').then(($body) => {
      const ariaBtn = $body.find(
        'header button[aria-label*="enu"], header button[aria-label*="menu"], header button[aria-expanded]'
      ).filter(':visible');

      if (ariaBtn.length > 0) {
        cy.wrap(ariaBtn.first()).click({ force: true });
      } else {
        throw new Error('Mobile menu button not found — no button with aria-label or aria-expanded in header');
      }
    });

    // Verify menu is present in DOM and has content
    this.mainMenu.should('exist');
    this.mainMenu.find('button, a').should('have.length.greaterThan', 0);
    return this;
  }
}

export default new NavigationPage();
