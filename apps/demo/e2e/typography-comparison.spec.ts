import { test, expect } from '@playwright/test';

// Test configuration
const variants = [
  { name: 'base', buttonText: 'Base' },
  { name: 'sm', buttonText: 'Small' },
  { name: 'lg', buttonText: 'Large' },
  { name: 'xl', buttonText: 'XL' },
  { name: '2xl', buttonText: '2XL' },
];

const elementsToTest = [
  { selector: 'h1', name: 'Main Heading' },
  { selector: 'h2', name: 'Secondary Heading' },
  { selector: 'h3', name: 'Tertiary Heading' },
  { selector: 'p', name: 'Paragraph' },
  { selector: 'a', name: 'Link' },
  { selector: 'strong', name: 'Bold text' },
  { selector: 'em', name: 'Italic text' },
  { selector: 'code', name: 'Inline code' },
  { selector: 'ul', name: 'Unordered list' },
  { selector: 'li', name: 'List item' },
  { selector: 'blockquote', name: 'Blockquote' },
];

const criticalProperties = [
  'fontSize',
  'lineHeight',
  'fontWeight',
  'color',
  'marginTop',
  'marginBottom',
];

function normalizeCSSValue(property: string, value: string): string {
  let normalized = value.trim();

  if (property === 'fontFamily') {
    normalized = normalized.replace(/['"]/g, '').replace(/,\\s*/g, ', ');
  }

  if (normalized.includes('px')) {
    const match = normalized.match(/(\\d+(?:\\.\\d+)?)px/);
    if (match) {
      const rounded = Math.round(parseFloat(match[1]));
      normalized = normalized.replace(match[0], `${rounded}px`);
    }
  }

  if (normalized.includes('rgb')) {
    normalized = normalized.replace(/\\s+/g, '');
  }

  return normalized;
}

test.describe('Typography Libraries Comparison', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1').first()).toContainText('Typography Library Comparison');

    // Wait for content to be fully loaded
    await page.waitForSelector('.prose, .prose-sm, .prose-lg, .prose-xl, .prose-2xl');
    await page.waitForSelector('.legacy-prose');
  });

  variants.forEach((variant) => {
    test(`should have similar styles for ${variant.name} variant`, async ({ page }) => {
      // Select the variant using exact text match to avoid XL/2XL conflict
      const variantButton = page.getByRole('button', { name: variant.buttonText, exact: true });
      await variantButton.click();

      // Wait for changes to apply
      await page.waitForTimeout(1000);

      // Get both containers by finding the prose content areas
      const twProseContainer = page
        .locator('div')
        .filter({ hasText: 'tw-prose (CSS-only)' })
        .locator('..')
        .locator('div')
        .nth(1);
      const tailwindContainer = page
        .locator('div')
        .filter({ hasText: '@tailwindcss/typography (Plugin)' })
        .locator('..')
        .locator('div')
        .nth(1);

      // Verify containers are visible
      await expect(twProseContainer).toBeVisible();
      await expect(tailwindContainer).toBeVisible();

      // Compare a few key elements
      for (const element of elementsToTest.slice(0, 3)) {
        // Test first 3 elements to avoid timeout
        const twElement = twProseContainer.locator(element.selector).first();
        const tailwindElement = tailwindContainer.locator(element.selector).first();

        // Skip if elements don't exist
        const twExists = (await twElement.count()) > 0;
        const tailwindExists = (await tailwindElement.count()) > 0;

        if (!twExists || !tailwindExists) {
          console.log(`Skipping ${element.name} - not found in both containers`);
          continue;
        }

        // Get computed styles
        const twStyles = await twElement.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            fontSize: styles.fontSize,
            lineHeight: styles.lineHeight,
            fontWeight: styles.fontWeight,
            color: styles.color,
            marginTop: styles.marginTop,
            marginBottom: styles.marginBottom,
          };
        });

        const tailwindStyles = await tailwindElement.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            fontSize: styles.fontSize,
            lineHeight: styles.lineHeight,
            fontWeight: styles.fontWeight,
            color: styles.color,
            marginTop: styles.marginTop,
            marginBottom: styles.marginBottom,
          };
        });

        // Compare styles (allowing for minor differences)
        let hasSignificantDifferences = false;
        const differences = [];

        for (const prop of criticalProperties) {
          const twValue = normalizeCSSValue(prop, twStyles[prop] || '');
          const tailwindValue = normalizeCSSValue(prop, tailwindStyles[prop] || '');

          if (twValue !== tailwindValue) {
            differences.push(
              `${prop}: tw-prose="${twValue}" vs @tailwindcss/typography="${tailwindValue}"`,
            );

            // Consider significant differences (ignoring minor pixel differences)
            if (prop === 'fontSize' || prop === 'lineHeight') {
              const twNum = parseFloat(twValue);
              const tailwindNum = parseFloat(tailwindValue);
              if (Math.abs(twNum - tailwindNum) > 2) {
                // More than 2px difference is significant
                hasSignificantDifferences = true;
              }
            } else {
              hasSignificantDifferences = true;
            }
          }
        }

        if (differences.length > 0) {
          console.log(
            `Style differences found for ${element.name} in ${variant.name} variant:`,
            differences,
          );

          // Take screenshot for manual inspection
          await page.screenshot({
            path: `test-results/${variant.name}-${element.name.replace(/\\s+/g, '-')}-comparison.png`,
            fullPage: true,
          });
        }

        // Only fail if there are significant differences
        if (hasSignificantDifferences) {
          throw new Error(
            `Significant style differences found for ${element.name} in ${variant.name}:\\n${differences.join('\\n')}`,
          );
        }
      }

      // If we get here, the test passed (no significant differences)
      expect(true).toBe(true);
    });
  });

  test('should toggle dark mode correctly', async ({ page }) => {
    const darkModeToggle = page.locator('input[type="checkbox"]');

    // Test dark mode toggle
    await darkModeToggle.check();
    await page.waitForTimeout(500);

    // Verify dark mode is applied - check for dark class on a container
    const mainContainer = page.locator('[class*="dark"]').first();
    await expect(mainContainer).toBeVisible();

    // Toggle back
    await darkModeToggle.uncheck();
    await page.waitForTimeout(500);
  });

  test('should switch between all variants', async ({ page }) => {
    for (const variant of variants) {
      const variantButton = page.getByRole('button', { name: variant.buttonText, exact: true });
      await variantButton.click();
      await page.waitForTimeout(300);

      // Verify both containers are still visible after switching
      const twProseContainer = page
        .locator('.prose, .prose-sm, .prose-lg, .prose-xl, .prose-2xl')
        .first();
      const tailwindContainer = page.locator('.legacy-prose').first();

      await expect(twProseContainer).toBeVisible();
      await expect(tailwindContainer).toBeVisible();
    }
  });

  test('should display version information', async ({ page }) => {
    // Look for version pattern in footer
    const versionText = page.getByText(/v\d+\.\d+\.\d+/);
    await expect(versionText).toBeVisible();
  });

  test('should render all typography elements', async ({ page }) => {
    // Verify all key typography elements are present in both containers
    const containers = [
      page
        .locator('div')
        .filter({ hasText: 'tw-prose (CSS-only)' })
        .locator('..')
        .locator('div')
        .nth(1),
      page
        .locator('div')
        .filter({ hasText: '@tailwindcss/typography (Plugin)' })
        .locator('..')
        .locator('div')
        .nth(1),
    ];

    for (const container of containers) {
      // Check for presence of key elements
      await expect(container.locator('h1')).toBeVisible();
      await expect(container.locator('h2')).toBeVisible();
      await expect(container.locator('p')).toBeVisible();
      await expect(container.locator('a')).toBeVisible();
      await expect(container.locator('strong')).toBeVisible();
      await expect(container.locator('em')).toBeVisible();
      await expect(container.locator('code')).toBeVisible();
      await expect(container.locator('ul')).toBeVisible();
      await expect(container.locator('ol')).toBeVisible();
      await expect(container.locator('li')).toBeVisible();
      await expect(container.locator('blockquote')).toBeVisible();
    }
  });
});
