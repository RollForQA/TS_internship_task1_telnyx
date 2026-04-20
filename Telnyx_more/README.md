# Telnyx_more

Окремий Cypress-підпроєкт для `https://telnyx.com/`.

Що всередині:
- responsive smoke-перевірки на ключових viewport
- component/UI responsive checks
- breakpoint audit навколо ключових width transition points
- окремий mobile navigation test для `375x812`

Запуск із кореня репозиторію:

```bash
cd Telnyx_more
npm run cy:run
```

Фільтрація:

```bash
npm run cy:run:smoke
npm run cy:run:regression
```

Звітність і артефакти:
- `mochawesome` JSON-репорти: `Telnyx_more/cypress/reports`
- злитий JSON: `Telnyx_more/cypress/reports/merged.json`
- HTML-репорт: `Telnyx_more/cypress/reports/html/report.html`
- відео прогонів: `Telnyx_more/cypress/videos`
- скріншоти падінь: `Telnyx_more/cypress/screenshots`

Генерація репортів:

```bash
cd Telnyx_more
npm run cy:run
npm run report
```

Chrome run за замовчуванням:

```bash
cd Telnyx_more
npm test
```
