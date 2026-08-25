import { afterEach, expect } from 'vitest';
import { page } from 'vitest/browser';

afterEach(async (context) => {
  const el = document.body;
  if (el.getBoundingClientRect().height > 0) {
    await expect(page.elementLocator(el)).toMatchScreenshot(context.task.name);
  }
});
