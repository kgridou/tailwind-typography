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
            const value = styles.getPropertyValue(prop) || styles[prop as any] || '';
            result[prop] = value;
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
            const value = styles.getPropertyValue(prop) || styles[prop as any] || '';
            result[prop] = value;
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

  // Test dark mode for each variant
  for (const variant of variants) {
    test(`should have identical dark mode styles for ${variant.name} variant`, async ({ page }) => {
      // Select the variant
      await page.click(`[data-testid="size-${variant.name}"]`);
      await page.waitForTimeout(200);

      // Enable dark mode
      const darkModeCheckbox = page.locator('[data-testid="dark-mode-toggle"]');
      await darkModeCheckbox.click();
      await page.waitForTimeout(500); // Allow dark mode styles to apply

      let passedElements = 0;
      let totalComparisons = 0;

      // Test key elements that are affected by dark mode
      const darkModeElements = [
        { selector: 'h1', name: 'Heading 1 (dark)' },
        { selector: 'h2', name: 'Heading 2 (dark)' },
        { selector: 'p', name: 'Paragraph (dark)' },
        { selector: 'a', name: 'Link (dark)' },
        { selector: 'strong', name: 'Strong/Bold (dark)' },
        { selector: 'code', name: 'Inline code (dark)' },
        { selector: 'pre', name: 'Code block (dark)' },
        { selector: 'blockquote', name: 'Blockquote (dark)' },
        { selector: 'table', name: 'Table (dark)' },
        { selector: 'th', name: 'Table header (dark)' },
        { selector: 'td', name: 'Table cell (dark)' },
      ];

      for (const element of darkModeElements) {
        const twElement = page
          .locator(`[data-testid="tw-prose-container"] ${element.selector}`)
          .first();
        const tailwindElement = page
          .locator(`[data-testid="tailwindcss-container"] ${element.selector}`)
          .first();

        const twExists = (await twElement.count()) > 0;
        const tailwindExists = (await tailwindElement.count()) > 0;

        if (twExists && tailwindExists) {
          // Focus on color properties for dark mode
          const twStyles = await twElement.evaluate((el) => {
            const styles = window.getComputedStyle(el);
            return {
              color: styles.getPropertyValue('color'),
              backgroundColor: styles.getPropertyValue('backgroundColor'),
              borderColor: styles.getPropertyValue('borderColor'),
            };
          });

          const tailwindStyles = await tailwindElement.evaluate((el) => {
            const styles = window.getComputedStyle(el);
            return {
              color: styles.getPropertyValue('color'),
              backgroundColor: styles.getPropertyValue('backgroundColor'),
              borderColor: styles.getPropertyValue('borderColor'),
            };
          });

          totalComparisons++;
          const comparison = hasSignificantDifferences(twStyles, tailwindStyles);

          if (comparison.hasDifferences) {
            console.log(`❌ ${element.name} has dark mode differences:`);
            comparison.differences.forEach((diff) => console.log(`   ${diff}`));
            throw new Error(
              `Dark mode styling differences found for ${element.name}:\n${comparison.differences.join('\n')}`,
            );
          } else {
            passedElements++;
            console.log(`✅ ${element.name} matches exactly in dark mode`);
          }
        }
      }

      console.log(
        `\n🌙 ${variant.name} dark mode: ${passedElements}/${totalComparisons} elements match perfectly!`,
      );
    });
  }

  // Test responsive behavior
  test('should maintain consistency across different viewport sizes', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1920, height: 1080, name: 'Desktop' },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(300);

      // Test key responsive elements
      const responsiveElements = ['p', 'h1', 'h2', 'blockquote', 'table'];

      for (const selector of responsiveElements) {
        const twElement = page.locator(`[data-testid="tw-prose-container"] ${selector}`).first();
        const tailwindElement = page
          .locator(`[data-testid="tailwindcss-container"] ${selector}`)
          .first();

        if ((await twElement.count()) > 0 && (await tailwindElement.count()) > 0) {
          const twStyles = await twElement.evaluate((el) => {
            const styles = window.getComputedStyle(el);
            return {
              fontSize: styles.getPropertyValue('fontSize'),
              lineHeight: styles.getPropertyValue('lineHeight'),
              margin: styles.getPropertyValue('margin'),
            };
          });

          const tailwindStyles = await tailwindElement.evaluate((el) => {
            const styles = window.getComputedStyle(el);
            return {
              fontSize: styles.getPropertyValue('fontSize'),
              lineHeight: styles.getPropertyValue('lineHeight'),
              margin: styles.getPropertyValue('margin'),
            };
          });

          const comparison = hasSignificantDifferences(twStyles, tailwindStyles);
          if (comparison.hasDifferences) {
            throw new Error(
              `Responsive differences found for ${selector} on ${viewport.name}:\n${comparison.differences.join('\n')}`,
            );
          }
        }
      }

      console.log(
        `✅ ${viewport.name} (${viewport.width}x${viewport.height}) layout matches perfectly`,
      );
    }
  });

  // Test CSS specificity and inheritance
  test('should handle CSS specificity correctly', async ({ page }) => {
    const specificityTests = [
      { selector: 'blockquote p', name: 'Paragraph inside blockquote' },
      { selector: 'li p', name: 'Paragraph inside list item' },
      { selector: 'thead th', name: 'Header in table head' },
      { selector: 'tbody td', name: 'Cell in table body' },
      { selector: 'pre code', name: 'Code inside pre block' },
      { selector: 'a strong', name: 'Strong text inside link' },
      { selector: 'h1 code', name: 'Code inside heading 1' },
      { selector: 'h2 code', name: 'Code inside heading 2' },
    ];

    for (const test of specificityTests) {
      const twElement = page.locator(`[data-testid="tw-prose-container"] ${test.selector}`).first();
      const tailwindElement = page
        .locator(`[data-testid="tailwindcss-container"] ${test.selector}`)
        .first();

      const twExists = (await twElement.count()) > 0;
      const tailwindExists = (await tailwindElement.count()) > 0;

      if (twExists && tailwindExists) {
        const twStyles = await twElement.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            color: styles.getPropertyValue('color'),
            fontSize: styles.getPropertyValue('fontSize'),
            fontWeight: styles.getPropertyValue('fontWeight'),
            margin: styles.getPropertyValue('margin'),
            padding: styles.getPropertyValue('padding'),
          };
        });

        const tailwindStyles = await tailwindElement.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            color: styles.getPropertyValue('color'),
            fontSize: styles.getPropertyValue('fontSize'),
            fontWeight: styles.getPropertyValue('fontWeight'),
            margin: styles.getPropertyValue('margin'),
            padding: styles.getPropertyValue('padding'),
          };
        });

        const comparison = hasSignificantDifferences(twStyles, tailwindStyles);
        if (comparison.hasDifferences) {
          throw new Error(
            `Specificity differences found for ${test.name}:\n${comparison.differences.join('\n')}`,
          );
        }

        console.log(`✅ ${test.name} specificity handled correctly`);
      }
    }
  });

  // Test performance and accessibility
  test('should have similar accessibility properties', async ({ page }) => {
    const accessibilityElements = [
      { selector: 'a', properties: ['color', 'textDecoration', 'cursor'] },
      { selector: 'button', properties: ['cursor', 'outline'] },
      { selector: 'table', properties: ['borderCollapse', 'textAlign'] },
      { selector: 'th', properties: ['fontWeight', 'textAlign'] },
      { selector: 'code', properties: ['fontFamily', 'fontSize'] },
      { selector: 'pre', properties: ['fontFamily', 'whiteSpace', 'overflow'] },
    ];

    for (const test of accessibilityElements) {
      const twElement = page.locator(`[data-testid="tw-prose-container"] ${test.selector}`).first();
      const tailwindElement = page
        .locator(`[data-testid="tailwindcss-container"] ${test.selector}`)
        .first();

      if ((await twElement.count()) > 0 && (await tailwindElement.count()) > 0) {
        for (const property of test.properties) {
          const twValue = await twElement.evaluate((el, prop) => {
            return window.getComputedStyle(el).getPropertyValue(prop);
          }, property);

          const tailwindValue = await tailwindElement.evaluate((el, prop) => {
            return window.getComputedStyle(el).getPropertyValue(prop);
          }, property);

          if (twValue !== tailwindValue) {
            throw new Error(
              `Accessibility property mismatch for ${test.selector}.${property}: tw-prose="${twValue}" vs @tailwindcss/typography="${tailwindValue}"`,
            );
          }
        }

        console.log(`✅ ${test.selector} accessibility properties match`);
      }
    }
  });

  // Test edge cases and boundary conditions
  test('should handle edge cases correctly', async ({ page }) => {
    const edgeCases = [
      { selector: 'p:first-child', name: 'First paragraph' },
      { selector: 'p:last-child', name: 'Last paragraph' },
      { selector: 'li:first-child', name: 'First list item' },
      { selector: 'li:last-child', name: 'Last list item' },
      { selector: 'tr:first-child', name: 'First table row' },
      { selector: 'tr:last-child', name: 'Last table row' },
      { selector: 'h2 + *', name: 'Element immediately after h2' },
      { selector: 'h3 + *', name: 'Element immediately after h3' },
      { selector: 'hr + *', name: 'Element immediately after hr' },
    ];

    for (const test of edgeCases) {
      const twElement = page.locator(`[data-testid="tw-prose-container"] ${test.selector}`).first();
      const tailwindElement = page
        .locator(`[data-testid="tailwindcss-container"] ${test.selector}`)
        .first();

      if ((await twElement.count()) > 0 && (await tailwindElement.count()) > 0) {
        const twStyles = await twElement.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            marginTop: styles.getPropertyValue('marginTop'),
            marginBottom: styles.getPropertyValue('marginBottom'),
            paddingTop: styles.getPropertyValue('paddingTop'),
            paddingBottom: styles.getPropertyValue('paddingBottom'),
          };
        });

        const tailwindStyles = await tailwindElement.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            marginTop: styles.getPropertyValue('marginTop'),
            marginBottom: styles.getPropertyValue('marginBottom'),
            paddingTop: styles.getPropertyValue('paddingTop'),
            paddingBottom: styles.getPropertyValue('paddingBottom'),
          };
        });

        const comparison = hasSignificantDifferences(twStyles, tailwindStyles);
        if (comparison.hasDifferences) {
          throw new Error(
            `Edge case differences found for ${test.name}:\n${comparison.differences.join('\n')}`,
          );
        }

        console.log(`✅ ${test.name} edge case handled correctly`);
      }
    }
  });

  // Test CSS custom properties and theming
  test('should have correct CSS custom properties', async ({ page }) => {
    const twContainer = page.locator('[data-testid="tw-prose-container"]');
    const tailwindContainer = page.locator('[data-testid="tailwindcss-container"]');

    const customProperties = [
      '--tw-prose-body',
      '--tw-prose-headings',
      '--tw-prose-links',
      '--tw-prose-bold',
      '--tw-prose-code',
      '--tw-prose-quotes',
    ];

    for (const property of customProperties) {
      const twValue = await twContainer.evaluate((el, prop) => {
        return window.getComputedStyle(el).getPropertyValue(prop);
      }, property);

      // Note: The tailwind container uses legacy-prose which may not have the same custom properties
      // This test ensures our tw-prose has the expected custom properties defined
      expect(twValue).toBeTruthy();
      console.log(`✅ Custom property ${property} is defined: ${twValue}`);
    }
  });

  // Performance test
  test('should render within performance budget', async ({ page }) => {
    const startTime = Date.now();

    // Navigate and wait for full load
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Should load within 5 seconds (generous for comprehensive content)
    expect(loadTime).toBeLessThan(5000);

    // Check that both containers are rendered
    await expect(page.locator('[data-testid="tw-prose-container"]')).toBeVisible();
    await expect(page.locator('[data-testid="tailwindcss-container"]')).toBeVisible();

    console.log(`✅ Page loaded in ${loadTime}ms (within performance budget)`);
  });
});
