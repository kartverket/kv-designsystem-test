import { afterEach, expect } from 'vitest';
import { page } from 'vitest/browser';

afterEach(async (context) => {
  const el = window.__visualTestCanvasElement;
  if (el && el.getBoundingClientRect().height > 0) {
    await expect(page.elementLocator(el)).toMatchScreenshot(context.task.name);
  }
});
