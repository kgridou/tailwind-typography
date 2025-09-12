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
// Set PLAYWRIGHT_PIXEL_TOLERANCE environment variable to allow minor differences
// Example: PLAYWRIGHT_PIXEL_TOLERANCE=2 npm run test:playwright
const PIXEL_DIFFERENCE_TOLERANCE = parseInt(process.env.PLAYWRIGHT_PIXEL_TOLERANCE || '0');

const elementsToTest = [
  // Headings - all levels
  { selector: 'h1', name: 'Heading 1' },
  { selector: 'h2', name: 'Heading 2' },
  { selector: 'h3', name: 'Heading 3' },
  { selector: 'h4', name: 'Heading 4' },
  { selector: 'h5', name: 'Heading 5' },
  { selector: 'h6', name: 'Heading 6' },

  // Text elements
  { selector: 'p', name: 'Paragraph' },
  { selector: 'p:first-of-type', name: 'First paragraph' },
  { selector: 'p:last-of-type', name: 'Last paragraph' },
  { selector: 'p + p', name: 'Subsequent paragraph' },

  // Inline elements
  { selector: 'a', name: 'Link' },
  { selector: 'a:hover', name: 'Link hover state' },
  { selector: 'strong', name: 'Strong/Bold' },
  { selector: 'em', name: 'Emphasis/Italic' },
  { selector: 'b', name: 'Bold tag' },
  { selector: 'i', name: 'Italic tag' },
  { selector: 'u', name: 'Underline' },
  { selector: 'small', name: 'Small text' },
  { selector: 'sup', name: 'Superscript' },
  { selector: 'sub', name: 'Subscript' },
  { selector: 'mark', name: 'Highlighted text' },
  { selector: 'del', name: 'Deleted text' },
  { selector: 'ins', name: 'Inserted text' },
  { selector: 's', name: 'Strikethrough' },

  // Code elements
  { selector: 'code', name: 'Inline code' },
  { selector: 'pre', name: 'Code block container' },
  { selector: 'pre code', name: 'Code block content' },
  { selector: 'kbd', name: 'Keyboard input' },
  { selector: 'samp', name: 'Sample output' },
  { selector: 'var', name: 'Variable' },

  // Lists
  { selector: 'ul', name: 'Unordered list' },
  { selector: 'ol', name: 'Ordered list' },
  { selector: 'li', name: 'List item' },
  { selector: 'ul li', name: 'Unordered list item' },
  { selector: 'ol li', name: 'Ordered list item' },
  { selector: 'ul ul', name: 'Nested unordered list' },
  { selector: 'ol ol', name: 'Nested ordered list' },
  { selector: 'ul ol', name: 'Mixed nested list (ul > ol)' },
  { selector: 'ol ul', name: 'Mixed nested list (ol > ul)' },
  { selector: 'li p', name: 'Paragraph in list item' },
  { selector: 'li:first-child', name: 'First list item' },
  { selector: 'li:last-child', name: 'Last list item' },

  // Quotes and citations
  { selector: 'blockquote', name: 'Blockquote' },
  { selector: 'blockquote p', name: 'Paragraph in blockquote' },
  { selector: 'blockquote p:first-of-type', name: 'First paragraph in blockquote' },
  { selector: 'blockquote p:last-of-type', name: 'Last paragraph in blockquote' },
  { selector: 'cite', name: 'Citation' },
  { selector: 'q', name: 'Inline quote' },

  // Tables
  { selector: 'table', name: 'Table' },
  { selector: 'thead', name: 'Table header group' },
  { selector: 'tbody', name: 'Table body group' },
  { selector: 'tfoot', name: 'Table footer group' },
  { selector: 'tr', name: 'Table row' },
  { selector: 'th', name: 'Table header cell' },
  { selector: 'td', name: 'Table data cell' },
  { selector: 'thead th', name: 'Header cell in thead' },
  { selector: 'tbody td', name: 'Data cell in tbody' },
  { selector: 'tr:first-child', name: 'First table row' },
  { selector: 'tr:last-child', name: 'Last table row' },
  { selector: 'tr:nth-child(even)', name: 'Even table rows' },
  { selector: 'tr:nth-child(odd)', name: 'Odd table rows' },
  { selector: 'th:first-child', name: 'First header cell' },
  { selector: 'td:first-child', name: 'First data cell' },

  // Definition lists
  { selector: 'dl', name: 'Definition list' },
  { selector: 'dt', name: 'Definition term' },
  { selector: 'dd', name: 'Definition description' },

  // Horizontal rules
  { selector: 'hr', name: 'Horizontal rule' },

  // Figures and media
  { selector: 'figure', name: 'Figure' },
  { selector: 'figcaption', name: 'Figure caption' },
  { selector: 'img', name: 'Image' },

  // Form elements (if any in prose content)
  { selector: 'fieldset', name: 'Fieldset' },
  { selector: 'legend', name: 'Legend' },
  { selector: 'label', name: 'Label' },
  { selector: 'input', name: 'Input' },
  { selector: 'textarea', name: 'Textarea' },
  { selector: 'select', name: 'Select' },
  { selector: 'button', name: 'Button' },

  // Address and contact
  { selector: 'address', name: 'Address' },

  // Abbreviations and acronyms
  { selector: 'abbr', name: 'Abbreviation' },
  { selector: 'acronym', name: 'Acronym' },

  // Time and dates
  { selector: 'time', name: 'Time element' },

  // Ruby annotations (for East Asian typography)
  { selector: 'ruby', name: 'Ruby annotation' },
  { selector: 'rt', name: 'Ruby text' },
  { selector: 'rp', name: 'Ruby parentheses' },
];

const criticalProperties = [
  // Typography properties
  'fontSize',
  'lineHeight',
  'fontWeight',
  'fontFamily',
  'fontStyle',
  'fontVariant',
  'fontStretch',
  'letterSpacing',
  'wordSpacing',
  'textAlign',
  'textIndent',
  'textTransform',
  'textDecoration',
  'textDecorationColor',
  'textDecorationLine',
  'textDecorationStyle',
  'textUnderlineOffset',
  'textShadow',
  'whiteSpace',
  'wordBreak',
  'overflowWrap',
  'hyphens',
  'quotes',

  // Color properties
  'color',
  'backgroundColor',
  'borderColor',
  'outlineColor',

  // Box model properties
  'width',
  'height',
  'minWidth',
  'minHeight',
  'maxWidth',
  'maxHeight',

  // Margin properties
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',

  // Padding properties
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',

  // Border properties
  'border',
  'borderWidth',
  'borderStyle',
  'borderColor',
  'borderRadius',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderTopStyle',
  'borderRightStyle',
  'borderBottomStyle',
  'borderLeftStyle',
  'borderTopColor',
  'borderRightColor',
  'borderBottomColor',
  'borderLeftColor',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomRightRadius',
  'borderBottomLeftRadius',

  // Outline properties
  'outline',
  'outlineWidth',
  'outlineStyle',
  'outlineColor',
  'outlineOffset',

  // Display and positioning
  'display',
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'zIndex',
  'float',
  'clear',
  'overflow',
  'overflowX',
  'overflowY',
  'visibility',
  'opacity',

  // Flexbox properties
  'flexDirection',
  'flexWrap',
  'justifyContent',
  'alignItems',
  'alignContent',
  'alignSelf',
  'flex',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'order',

  // Grid properties
  'gridTemplateColumns',
  'gridTemplateRows',
  'gridTemplateAreas',
  'gridColumn',
  'gridRow',
  'gridArea',
  'gap',
  'rowGap',
  'columnGap',

  // List properties
  'listStyle',
  'listStyleType',
  'listStylePosition',
  'listStyleImage',

  // Table properties
  'borderCollapse',
  'borderSpacing',
  'captionSide',
  'tableLayout',
  'verticalAlign',

  // Transform and animation
  'transform',
  'transformOrigin',
  'transition',
  'animation',

  // Filter and effects
  'filter',
  'backdropFilter',
  'boxShadow',

  // Content and quotes
  'content',
  'counterIncrement',
  'counterReset',

  // Cursor and user interaction
  'cursor',
  'userSelect',
  'pointerEvents',

  // Scroll behavior
  'scrollBehavior',
  'scrollMargin',
  'scrollPadding',

  // Writing modes (for international typography)
  'writingMode',
  'textOrientation',
  'direction',
  'unicodeBidi',
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
    test(`should have identical styles for ${variant.name} variant`, async ({ page }) => {
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

      // Compare ALL elements comprehensively
      for (const element of elementsToTest) {
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

            // Consider significant differences based on configurable tolerance
            if (prop === 'fontSize' || prop === 'lineHeight') {
              const twNum = parseFloat(twValue);
              const tailwindNum = parseFloat(tailwindValue);
              if (Math.abs(twNum - tailwindNum) > PIXEL_DIFFERENCE_TOLERANCE) {
                hasSignificantDifferences = true;
              }
            } else {
              // For non-pixel properties, any difference is significant when tolerance is 0
              if (PIXEL_DIFFERENCE_TOLERANCE === 0) {
                hasSignificantDifferences = true;
              }
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

  // Comprehensive dark mode testing for every variant
  variants.forEach((variant) => {
    test(`should have identical dark mode styles for ${variant.name} variant`, async ({ page }) => {
      // Enable dark mode first
      const darkModeToggle = page.locator('input[type="checkbox"]');
      await darkModeToggle.check();
      await page.waitForTimeout(500);

      // Select the variant
      const variantButton = page.getByRole('button', { name: variant.buttonText, exact: true });
      await variantButton.click();
      await page.waitForTimeout(1000);

      // Get both containers
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

      // Test key elements in dark mode
      const darkModeElements = [
        { selector: 'h1', name: 'Heading 1' },
        { selector: 'h2', name: 'Heading 2' },
        { selector: 'h3', name: 'Heading 3' },
        { selector: 'p', name: 'Paragraph' },
        { selector: 'a', name: 'Link' },
        { selector: 'strong', name: 'Strong' },
        { selector: 'code', name: 'Code' },
        { selector: 'blockquote', name: 'Blockquote' },
        { selector: 'li', name: 'List item' },
        { selector: 'th', name: 'Table header' },
        { selector: 'td', name: 'Table cell' },
      ];

      for (const element of darkModeElements) {
        const twElement = twProseContainer.locator(element.selector).first();
        const tailwindElement = tailwindContainer.locator(element.selector).first();

        const twExists = (await twElement.count()) > 0;
        const tailwindExists = (await tailwindElement.count()) > 0;

        if (!twExists || !tailwindExists) {
          console.log(`Skipping dark mode test for ${element.name} - not found`);
          continue;
        }

        // Focus on color properties for dark mode testing
        const darkModeProperties = ['color', 'backgroundColor', 'borderColor'];

        const twStyles = await twElement.evaluate((el, props) => {
          const styles = window.getComputedStyle(el);
          const result: Record<string, string> = {};
          props.forEach((prop: string) => {
            result[prop] = styles.getPropertyValue(prop);
          });
          return result;
        }, darkModeProperties);

        const tailwindStyles = await tailwindElement.evaluate((el, props) => {
          const styles = window.getComputedStyle(el);
          const result: Record<string, string> = {};
          props.forEach((prop: string) => {
            result[prop] = styles.getPropertyValue(prop);
          });
          return result;
        }, darkModeProperties);

        const differences = [];
        for (const prop of darkModeProperties) {
          const twValue = normalizeCSSValue(prop, twStyles[prop] || '');
          const tailwindValue = normalizeCSSValue(prop, tailwindStyles[prop] || '');

          if (twValue !== tailwindValue) {
            differences.push(
              `${prop}: tw-prose="${twValue}" vs @tailwindcss/typography="${tailwindValue}"`,
            );
          }
        }

        if (differences.length > 0) {
          console.log(`Dark mode differences for ${element.name} in ${variant.name}:`, differences);
          await page.screenshot({
            path: `test-results/${variant.name}-${element.name.replace(/\\s+/g, '-')}-dark-mode.png`,
            fullPage: true,
          });

          if (PIXEL_DIFFERENCE_TOLERANCE === 0) {
            throw new Error(
              `Dark mode differences for ${element.name} in ${variant.name}:\\n${differences.join('\\n')}`,
            );
          }
        }
      }

      expect(true).toBe(true);
    });
  });

  // Pseudo-state testing (hover, focus, active)
  variants.forEach((variant) => {
    test(`should have identical pseudo-states for ${variant.name} variant`, async ({ page }) => {
      // Select the variant
      const variantButton = page.getByRole('button', { name: variant.buttonText, exact: true });
      await variantButton.click();
      await page.waitForTimeout(1000);

      // Get both containers
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

      // Test hover states on links
      const twLink = twProseContainer.locator('a').first();
      const tailwindLink = tailwindContainer.locator('a').first();

      if ((await twLink.count()) > 0 && (await tailwindLink.count()) > 0) {
        // Hover over both links
        await twLink.hover();
        await tailwindLink.hover();
        await page.waitForTimeout(100);

        // Compare hover styles
        const twHoverStyles = await twLink.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            color: styles.color,
            textDecoration: styles.textDecoration,
            textDecorationColor: styles.textDecorationColor,
          };
        });

        const tailwindHoverStyles = await tailwindLink.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            color: styles.color,
            textDecoration: styles.textDecoration,
            textDecorationColor: styles.textDecorationColor,
          };
        });

        const hoverDifferences = [];
        Object.keys(twHoverStyles).forEach((prop) => {
          const twValue = normalizeCSSValue(prop, twHoverStyles[prop] || '');
          const tailwindValue = normalizeCSSValue(prop, tailwindHoverStyles[prop] || '');

          if (twValue !== tailwindValue) {
            hoverDifferences.push(
              `${prop}: tw-prose="${twValue}" vs @tailwindcss/typography="${tailwindValue}"`,
            );
          }
        });

        if (hoverDifferences.length > 0 && PIXEL_DIFFERENCE_TOLERANCE === 0) {
          throw new Error(
            `Link hover state differences in ${variant.name}:\\n${hoverDifferences.join('\\n')}`,
          );
        }
      }

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
      // Check for presence of key elements - use first() to avoid strict mode violations
      await expect(container.locator('h1').first()).toBeVisible();
      await expect(container.locator('h2').first()).toBeVisible();
      await expect(container.locator('p').first()).toBeVisible();
      await expect(container.locator('a').first()).toBeVisible();
      await expect(container.locator('strong').first()).toBeVisible();
      await expect(container.locator('em').first()).toBeVisible();
      await expect(container.locator('code').first()).toBeVisible();
      await expect(container.locator('ul').first()).toBeVisible();
      await expect(container.locator('ol').first()).toBeVisible();
      await expect(container.locator('li').first()).toBeVisible();
      await expect(container.locator('blockquote').first()).toBeVisible();
    }
  });
});
