import { Component, input } from '@angular/core';

@Component({
  selector: 'app-prose-content',
  template: `
    <h1>Typography Test Document</h1>
    <p class="lead">This comprehensive document tests all typography elements supported by both tw-prose and @tailwindcss/typography plugins.</p>

    <h2>Headings</h2>
    <h1>Heading Level 1</h1>
    <h2>Heading Level 2</h2>
    <h3>Heading Level 3</h3>
    <h4>Heading Level 4</h4>
    <h5>Heading Level 5</h5>
    <h6>Heading Level 6</h6>

    <h2>Paragraphs and Text Formatting</h2>
    <p>This is a regular paragraph with <strong>bold text</strong>, <em>italic text</em>, <u>underlined text</u>, and <mark>highlighted text</mark>. You can also have <small>small text</small> and text with <sup>superscript</sup> and <sub>subscript</sub>.</p>

    <p>Here's a paragraph with a <a href="#test">link to test</a> the link styling. Links should have proper hover states and visual distinction from regular text.</p>

    <h2>Lists</h2>
    <h3>Unordered List</h3>
    <ul>
      <li>First item in unordered list</li>
      <li>Second item with <strong>bold text</strong></li>
      <li>Third item with nested list:
        <ul>
          <li>Nested item 1</li>
          <li>Nested item 2</li>
        </ul>
      </li>
      <li>Fourth item</li>
    </ul>

    <h3>Ordered List</h3>
    <ol>
      <li>First numbered item</li>
      <li>Second numbered item</li>
      <li>Third item with nested ordered list:
        <ol>
          <li>Nested numbered item 1</li>
          <li>Nested numbered item 2</li>
        </ol>
      </li>
      <li>Fourth numbered item</li>
    </ol>

    <h3>Definition List</h3>
    <dl>
      <dt>Term 1</dt>
      <dd>Definition for term 1 with detailed explanation.</dd>
      <dt>Term 2</dt>
      <dd>Definition for term 2.</dd>
      <dt>Term 3</dt>
      <dd>Another definition with <em>emphasized text</em>.</dd>
    </dl>

    <h2>Blockquotes</h2>
    <blockquote>
      <p>This is a blockquote with a single paragraph. Blockquotes are used to highlight quoted text or important information.</p>
    </blockquote>

    <blockquote>
      <p>This is a blockquote with multiple paragraphs. The first paragraph introduces the quote.</p>
      <p>The second paragraph continues the quoted content and shows how multiple paragraphs are handled within blockquotes.</p>
      <cite>— Author Name, Source Title</cite>
    </blockquote>

    <h2>Code Examples</h2>
    <p>Inline code can be written using <code>console.log('Hello, World!')</code> for JavaScript or <code>printf("Hello, World!")</code> for C.</p>

    <h3>Code Blocks</h3>
    <pre><code>function fibonacci(n) {{ '{' }}
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
{{ '}' }}

// Usage example
console.log(fibonacci(10)); // Output: 55</code></pre>

    <h3>Keyboard Input</h3>
    <p>To save a file, press <kbd>Ctrl</kbd> + <kbd>S</kbd> on Windows or <kbd>Cmd</kbd> + <kbd>S</kbd> on Mac.</p>

    <h2>Tables</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>City</th>
          <th>Occupation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John Doe</td>
          <td>28</td>
          <td>New York</td>
          <td>Software Developer</td>
        </tr>
        <tr>
          <td>Jane Smith</td>
          <td>32</td>
          <td>San Francisco</td>
          <td>UX Designer</td>
        </tr>
        <tr>
          <td>Bob Johnson</td>
          <td>45</td>
          <td>Chicago</td>
          <td>Project Manager</td>
        </tr>
      </tbody>
    </table>

    <h2>Images and Media</h2>
    <figure>
      <img src="https://picsum.photos/600/300" alt="Sample image for testing">
      <figcaption>Figure 1: A sample image with caption to test image styling and figure elements.</figcaption>
    </figure>

    <h2>Horizontal Rules</h2>
    <p>Content above the horizontal rule.</p>
    <hr>
    <p>Content below the horizontal rule.</p>

    <h2>Additional Text Elements</h2>
    <p>This paragraph tests various inline elements: <abbr title="HyperText Markup Language">HTML</abbr> abbreviation,
    <span class="time-element">January 1, 2024</span> time element, and
    <span>generic span element</span>.</p>

    <address>
      Contact Information:<br>
      John Developer<br>
      123 Code Street<br>
      Tech City, TC 12345<br>
      Email: john@example.com
    </address>

    <h2>Complex Nested Content</h2>
    <div>
      <h3>Nested Structure Test</h3>
      <p>This section tests how nested content is handled:</p>
      <ol>
        <li>First item with <strong>bold</strong> and <em>italic</em> text</li>
        <li>Second item containing a blockquote:
          <blockquote>
            <p>Nested blockquote within a list item.</p>
          </blockquote>
        </li>
        <li>Third item with code: <code>nested.code.example()</code></li>
      </ol>
      <p>Final paragraph to close the nested structure test.</p>
    </div>

    <h2>Long Form Content</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
  `,
  host: {
    '[class]': 'cssClasses()',
  },
})
export class ProseContentComponent {
  cssClasses = input.required<string>();
}
