import { test, expect } from '@playwright/test';

// Test configuration
const variants = [
  { name: 'base', buttonText: 'Base' },
  { name: 'sm', buttonText: 'Small' },
  { name: 'lg', buttonText: 'Large' },
  { name: 'xl', buttonText: 'XL' },
  { name: '2xl', buttonText: '2XL' },
];

// Tolerance for pixel differences (0 = exact match required)
const PIXEL_DIFFERENCE_TOLERANCE = parseInt(process.env.PLAYWRIGHT_PIXEL_TOLERANCE || '0');

// Only test elements that actually exist in the demo content
const elementsToTest = [
  // Headings that exist
  { selector: 'h1', name: 'Heading 1' },
  { selector: 'h2', name: 'Heading 2' },
  { selector: 'h3', name: 'Heading 3' },
  { selector: 'h4', name: 'Heading 4' },
  { selector: 'h5', name: 'Heading 5' },
  { selector: 'h6', name: 'Heading 6' },

  // Text elements that exist
  { selector: 'p', name: 'Paragraph' },
  { selector: 'p.lead', name: 'Lead paragraph' },

  // Inline elements that exist
  { selector: 'a', name: 'Link' },
  { selector: 'strong', name: 'Strong/Bold' },
  { selector: 'em', name: 'Emphasis/Italic' },
  { selector: 'u', name: 'Underline' },
  { selector: 'small', name: 'Small text' },
  { selector: 'sup', name: 'Superscript' },
  { selector: 'sub', name: 'Subscript' },
  { selector: 'mark', name: 'Highlighted text' },

  // Code elements that exist
  { selector: 'code', name: 'Inline code' },
  { selector: 'pre', name: 'Code block container' },
  { selector: 'pre code', name: 'Code block content' },
  { selector: 'kbd', name: 'Keyboard input' },

  // Lists that exist
  { selector: 'ul', name: 'Unordered list' },
  { selector: 'ol', name: 'Ordered list' },
  { selector: 'li', name: 'List item' },
  { selector: 'ul li', name: 'Unordered list item' },
  { selector: 'ol li', name: 'Ordered list item' },
  { selector: 'ul ul', name: 'Nested unordered list' },
  { selector: 'ol ol', name: 'Nested ordered list' },

  // Quotes and citations that exist
  { selector: 'blockquote', name: 'Blockquote' },
  { selector: 'blockquote p', name: 'Paragraph in blockquote' },
  { selector: 'cite', name: 'Citation' },

  // Tables that exist
  { selector: 'table', name: 'Table' },
  { selector: 'thead', name: 'Table header group' },
  { selector: 'tbody', name: 'Table body group' },
  { selector: 'tr', name: 'Table row' },
  { selector: 'th', name: 'Table header cell' },
  { selector: 'td', name: 'Table data cell' },
  { selector: 'thead th', name: 'Header cell in thead' },
  { selector: 'tbody td', name: 'Data cell in tbody' },

  // Definition lists that exist
  { selector: 'dl', name: 'Definition list' },
  { selector: 'dt', name: 'Definition term' },
  { selector: 'dd', name: 'Definition description' },

  // Other elements that exist
  { selector: 'hr', name: 'Horizontal rule' },
  { selector: 'img', name: 'Image' },
  { selector: 'figure', name: 'Figure' },
  { selector: 'figcaption', name: 'Figure caption' },
  { selector: 'address', name: 'Address' },
  { selector: 'abbr', name: 'Abbreviation' },
  { selector: 'div', name: 'Division element' },
  { selector: 'span', name: 'Span element' },
];

// CSS properties to compare
const cssPropertiesToTest = [
  // Typography properties
  'fontSize',
  'fontFamily',
  'fontWeight',
  'fontStyle',
  'lineHeight',
  'letterSpacing',
  'textAlign',
  'textDecoration',
  'textTransform',

  // Color properties
  'color',
  'backgroundColor',
  'borderColor',

  // Box model properties
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',

  // Border properties
  'borderWidth',
  'borderStyle',
  'borderRadius',
];

/**
 * Helper function to compare numeric CSS values with tolerance
 */
function hasSignificantDifferences(
  twStyles: Record<string, string>,
  tailwindStyles: Record<string, string>,
  tolerance = PIXEL_DIFFERENCE_TOLERANCE,
): { hasDifferences: boolean; differences: string[] } {
  const differences: string[] = [];

  for (const property of cssPropertiesToTest) {
    const twValue = twStyles[property];
    const tailwindValue = tailwindStyles[property];

    if (twValue !== tailwindValue) {
      // For pixel values, check if difference is within tolerance
      const twPx = parseFloat(twValue);
      const tailwindPx = parseFloat(tailwindValue);

      if (!isNaN(twPx) && !isNaN(tailwindPx)) {
        const diff = Math.abs(twPx - tailwindPx);
        if (diff > tolerance) {
          differences.push(
            `${property}: tw-prose="${twValue}" vs @tailwindcss/typography="${tailwindValue}" (diff: ${diff.toFixed(2)}px)`,
          );
        }
      } else {
        // Non-numeric values must match exactly
        differences.push(
          `${property}: tw-prose="${twValue}" vs @tailwindcss/typography="${tailwindValue}"`,
        );
      }
    }
  }

  return {
    hasDifferences: differences.length > 0,
    differences,
  };
}

test.describe('Typography Libraries Comparison', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  // Test each variant
  for (const variant of variants) {
    test(`should have identical styles for ${variant.name} variant`, async ({ page }) => {
      // Select the variant using test ID
      await page.click(`[data-testid="size-${variant.name}"]`);
      await page.waitForTimeout(500); // Allow styles to update

      let passedElements = 0;
      let totalComparisons = 0;

      for (const element of elementsToTest) {
        const twElement = page
          .locator(`[data-testid="tw-prose-container"] ${element.selector}`)
          .first();
        const tailwindElement = page
          .locator(`[data-testid="tailwindcss-container"] ${element.selector}`)
          .first();

        // Check if elements exist in both containers
        const twExists = (await twElement.count()) > 0;
        const tailwindExists = (await tailwindElement.count()) > 0;

        if (!twExists || !tailwindExists) {
          throw new Error(
            `Element "${element.name}" (${element.selector}) not found - tw-prose: ${twExists}, @tailwindcss/typography: ${tailwindExists}`,
          );
        }

        // Get computed styles
        const twStyles = await twElement.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          const result: Record<string, string> = {};
          for (const prop of [
            'fontSize',
            'fontFamily',
            'fontWeight',
            'fontStyle',
            'lineHeight',
            'letterSpacing',
            'textAlign',
            'textDecoration',
            'textTransform',
            'color',
            'backgroundColor',
            'borderColor',
            'margin',
            'marginTop',
            'marginRight',
            'marginBottom',
            'marginLeft',
            'padding',
            'paddingTop',
            'paddingRight',
            'paddingBottom',
            'paddingLeft',
            'borderWidth',
            'borderStyle',
            'borderRadius',
          ]) {
            result[prop] = styles.getPropertyValue(prop);
          }
          return result;
        });

        const tailwindStyles = await tailwindElement.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          const result: Record<string, string> = {};
          for (const prop of [
            'fontSize',
            'fontFamily',
            'fontWeight',
            'fontStyle',
            'lineHeight',
            'letterSpacing',
            'textAlign',
            'textDecoration',
            'textTransform',
            'color',
            'backgroundColor',
            'borderColor',
            'margin',
            'marginTop',
            'marginRight',
            'marginBottom',
            'marginLeft',
            'padding',
            'paddingTop',
            'paddingRight',
            'paddingBottom',
            'paddingLeft',
            'borderWidth',
            'borderStyle',
            'borderRadius',
          ]) {
            result[prop] = styles.getPropertyValue(prop);
          }
          return result;
        });

        // Compare styles with tolerance
        const comparison = hasSignificantDifferences(twStyles, tailwindStyles);
        totalComparisons++;

        if (comparison.hasDifferences) {
          console.log(`❌ ${element.name} (${element.selector}) has differences:`);
          comparison.differences.forEach((diff) => console.log(`   ${diff}`));

          // Show first few differences in test failure
          const errorMessage = `Styling differences found for ${element.name} (${element.selector}):\n${comparison.differences.slice(0, 5).join('\n')}${comparison.differences.length > 5 ? `\n... and ${comparison.differences.length - 5} more differences` : ''}`;
          throw new Error(errorMessage);
        } else {
          passedElements++;
          console.log(`✅ ${element.name} matches exactly`);
        }
      }

      console.log(
        `\n🎉 ${variant.name} variant: ${passedElements}/${totalComparisons} elements match perfectly!`,
      );
    });
  }

  // UI functionality tests
  test('should toggle dark mode correctly', async ({ page }) => {
    const darkModeCheckbox = page.locator('[data-testid="dark-mode-toggle"]');
    await darkModeCheckbox.click();

    // Check if dark mode classes are applied to the prose content
    const twProseContent = page.locator('[data-testid="tw-prose-container"] app-prose-content');
    const tailwindProseContent = page.locator(
      '[data-testid="tailwindcss-container"] app-prose-content',
    );

    await expect(twProseContent).toHaveClass(/prose-invert/);
    await expect(tailwindProseContent).toHaveClass(/legacy-prose-invert/);
  });

  test('should switch between all variants', async ({ page }) => {
    for (const variant of variants) {
      const button = page.locator(`[data-testid="size-${variant.name}"]`);
      await button.click();

      // Verify the variant is applied to the prose content components
      const twProseContent = page.locator('[data-testid="tw-prose-container"] app-prose-content');
      const tailwindProseContent = page.locator(
        '[data-testid="tailwindcss-container"] app-prose-content',
      );

      if (variant.name === 'base') {
        await expect(twProseContent).toHaveClass(/\bprose\b/);
        await expect(tailwindProseContent).toHaveClass(/\blegacy-prose\b/);
      } else {
        await expect(twProseContent).toHaveClass(new RegExp(`prose-${variant.name}`));
        await expect(tailwindProseContent).toHaveClass(new RegExp(`legacy-prose-${variant.name}`));
      }
    }
  });

  test('should display version information', async ({ page }) => {
    await expect(page.locator('footer')).toContainText('tw-prose');
  });

  test('should render all typography elements', async ({ page }) => {
    // Check that key elements are present in the tw-prose container
    await expect(page.locator('[data-testid="tw-prose-container"] h1').first()).toBeVisible();
    await expect(page.locator('[data-testid="tw-prose-container"] p').first()).toBeVisible();
    await expect(
      page.locator('[data-testid="tw-prose-container"] blockquote').first(),
    ).toBeVisible();
    await expect(page.locator('[data-testid="tw-prose-container"] table').first()).toBeVisible();
    await expect(page.locator('[data-testid="tw-prose-container"] ul').first()).toBeVisible();
    await expect(page.locator('[data-testid="tw-prose-container"] ol').first()).toBeVisible();
  });
});
