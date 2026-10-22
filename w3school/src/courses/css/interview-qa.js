// CSS interview questions, grouped by chapter id (see src/courses/index.js).

export default {
  basics: [
    { level: 'basic', q: 'What are the three ways to add CSS to a page?', a: 'External stylesheets (<link rel="stylesheet">), internal <style> blocks, and inline style attributes. External files are best for real sites: they are cached and shared across pages. Inline styles have the highest priority and are hard to maintain.' },
    { level: 'intermediate', q: 'Explain specificity.', a: 'When rules conflict, the more specific selector wins. Compare (ids, classes/attributes/pseudo-classes, elements): #nav .link (1,1,0) beats .menu a (0,1,1). Inline styles beat all selectors, and !important overrides normal declarations. Equal specificity: the later rule wins.' },
    { level: 'intermediate', q: 'What is the cascade?', a: 'The algorithm that decides which declaration applies: first origin and importance (user agent, user, author, !important), then cascade layers, then specificity, then source order. Inheritance supplies values for properties that were not set.' },
    { level: 'intermediate', q: 'Which properties are inherited?', a: 'Mostly text-related ones: color, font-family, font-size, line-height, text-align, visibility. Box properties like margin, padding, border, width and background are not inherited. inherit, initial and unset control this explicitly.' },
    { level: 'basic', q: 'What is the difference between em and rem?', a: 'em is relative to the element\'s own font size (or the parent\'s for font-size itself), so it compounds when nested. rem is always relative to the root <html> font size, which makes it predictable; it also scales when users change their default text size.' },
  ],
  'colors-text': [
    { level: 'basic', q: 'What color formats does CSS support?', a: 'Named colors, HEX (#ff6347), RGB/RGBA, HSL/HSLA and modern spaces like oklch(). The alpha value (or 8-digit HEX) controls transparency.' },
    { level: 'intermediate', q: 'What is the difference between opacity and rgba transparency?', a: 'opacity makes the whole element, including its text and children, transparent. An rgba() or hsla() color only affects that one color, for example a semi-transparent background behind fully opaque text.' },
    { level: 'intermediate', q: 'How do you load and optimize web fonts?', a: 'Use @font-face or a service like Google Fonts, prefer WOFF2, load only the weights you need, preconnect to the font host and set font-display: swap so text is visible immediately with a fallback font.' },
    { level: 'advanced', q: 'How do you truncate text with an ellipsis on one line and on multiple lines?', a: 'One line: white-space: nowrap; overflow: hidden; text-overflow: ellipsis. Multiple lines: display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden (now supported in all modern browsers).' },
  ],
  'box-model': [
    { level: 'basic', q: 'Explain the CSS box model.', a: 'Every element is a box made of content, padding, border and margin, from inside out. Padding is inside the border and takes the background; margin is outside and transparent, separating the box from others.' },
    { level: 'intermediate', q: 'What does box-sizing: border-box do?', a: 'It makes width and height include padding and border. With the default content-box, a 200px-wide box with 20px padding and 5px border is actually 250px wide. Most projects set border-box on every element.' },
    { level: 'advanced', q: 'What is margin collapsing?', a: 'Vertical margins of adjacent block elements (or a parent and its first/last child) combine into one margin equal to the larger value instead of adding up. It does not happen with padding, borders, flex or grid items.' },
    { level: 'intermediate', q: 'How do outline and border differ?', a: 'A border is part of the box and affects layout. An outline is drawn outside the border without taking space, does not follow border-radius in older browsers, and is used for focus indicators. Never remove focus outlines without a replacement.' },
  ],
  selectors: [
    { level: 'basic', q: 'What is the difference between a pseudo-class and a pseudo-element?', a: 'A pseudo-class (one colon) selects an element in a state or position: :hover, :focus, :nth-child(2). A pseudo-element (two colons) styles a part of an element or inserts content: ::before, ::after, ::first-letter, ::placeholder.' },
    { level: 'intermediate', q: 'Explain the descendant, child, adjacent and general sibling combinators.', a: 'A B selects any B inside A; A > B only direct children; A + B the B immediately after A; A ~ B every B that follows A with the same parent.' },
    { level: 'advanced', q: 'What do :is(), :where() and :has() do?', a: ':is() matches any selector in its list and takes the specificity of the most specific one. :where() does the same with zero specificity, making it easy to override. :has() matches an element based on its descendants, a "parent selector", e.g. .card:has(img).' },
    { level: 'intermediate', q: 'What does :nth-child(2n+1) select?', a: 'Every odd child: the 1st, 3rd, 5th and so on. The formula an+b is evaluated for n = 0, 1, 2...; keywords odd and even are shortcuts.' },
  ],
  layout: [
    { level: 'basic', q: 'What are the values of the position property?', a: 'static (default flow), relative (offset from its normal spot, keeps its space), absolute (removed from flow, positioned to the nearest positioned ancestor), fixed (relative to the viewport) and sticky (scrolls normally, then sticks at a threshold).' },
    { level: 'intermediate', q: 'Why does z-index sometimes not work?', a: 'It only applies to positioned elements (and flex/grid items), and it is compared within a stacking context. A parent with its own stacking context (z-index, opacity < 1, transform, filter) traps its children: they can never appear above elements outside that parent.' },
    { level: 'basic', q: 'How do you center an element horizontally and vertically?', a: 'On the parent: display: flex; justify-content: center; align-items: center; or display: grid; place-items: center. Alternatives: margin: 0 auto for horizontal centering of a block with a width, or absolute positioning with transform: translate(-50%, -50%).' },
    { level: 'intermediate', q: 'What is the difference between display: none and visibility: hidden?', a: 'display: none removes the element from layout entirely, as if it did not exist. visibility: hidden hides it but keeps its space. Both hide it from screen readers; opacity: 0 only makes it invisible and keeps it interactive.' },
  ],
  flexbox: [
    { level: 'basic', q: 'What are the main and cross axes in Flexbox?', a: 'The main axis follows flex-direction (horizontal for row, vertical for column); justify-content aligns items along it. The cross axis is perpendicular; align-items aligns along it.' },
    { level: 'intermediate', q: 'What does flex: 1 mean?', a: 'It is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0%. Items with flex: 1 share the available space equally regardless of their content size.' },
    { level: 'intermediate', q: 'How do you push one flex item to the far end?', a: 'Give it margin-left: auto (or margin-right: auto on the item before it). Auto margins absorb all free space in that direction, a common pattern for navbars.' },
    { level: 'advanced', q: 'Why might a flex item overflow its container with long text?', a: 'Flex items have min-width: auto by default, so they will not shrink below their content size. Set min-width: 0 (or overflow: hidden) on the item to allow it to shrink and let text truncate.' },
  ],
  grid: [
    { level: 'basic', q: 'When should you use Grid instead of Flexbox?', a: 'Grid is two-dimensional: it controls rows and columns at the same time, ideal for page layouts and galleries. Flexbox is one-dimensional, best for distributing items in a single row or column such as toolbars and cards in a line.' },
    { level: 'intermediate', q: 'What is the fr unit?', a: 'A fraction of the free space in the grid container. grid-template-columns: 2fr 1fr gives the first column two thirds and the second one third of the space left after fixed-size tracks.' },
    { level: 'advanced', q: 'Explain repeat(auto-fit, minmax(200px, 1fr)).', a: 'It creates as many columns as fit, each at least 200px and at most one share of the space. auto-fit collapses empty tracks so items stretch to fill the row; auto-fill keeps empty tracks. This builds a responsive grid without media queries.' },
    { level: 'intermediate', q: 'What are grid template areas?', a: 'Named regions drawn as strings, e.g. "header header" "side main". Items are placed with grid-area: main. Redefining the areas in a media query rearranges the whole layout without changing the HTML.' },
  ],
  responsive: [
    { level: 'basic', q: 'What is mobile-first design?', a: 'Writing base styles for small screens and adding min-width media queries for larger ones. Phones download less CSS, and layouts only become more complex when there is space.' },
    { level: 'intermediate', q: 'What is the difference between media queries and container queries?', a: 'Media queries respond to the viewport (the whole screen). Container queries (@container) respond to the size of a parent element with container-type set, so a component adapts to wherever it is placed.' },
    { level: 'intermediate', q: 'What does clamp() do?', a: 'clamp(min, preferred, max) returns the preferred value but never below min or above max. clamp(1rem, 4vw, 2rem) gives fluid typography that grows with the screen within safe limits.' },
    { level: 'intermediate', q: 'How do you make images responsive?', a: 'max-width: 100%; height: auto so they never overflow, plus srcset/sizes or <picture> to deliver appropriately sized files, and aspect-ratio or width/height attributes to prevent layout shift.' },
  ],
  effects: [
    { level: 'basic', q: 'What is the difference between a transition and an animation?', a: 'A transition animates between two states when a property changes (e.g. on :hover). A keyframe animation (@keyframes + animation) runs on its own, can have many steps, repeat and loop, without a state change.' },
    { level: 'intermediate', q: 'Which properties are cheapest to animate and why?', a: 'transform and opacity. They can be handled by the compositor (often on the GPU) without recalculating layout or repainting, so they stay smooth at 60fps. Animating width, top or margin triggers layout on every frame.' },
    { level: 'intermediate', q: 'How do you respect users who prefer less motion?', a: 'Wrap or disable animations in @media (prefers-reduced-motion: reduce). Large motion can cause dizziness or nausea for people with vestibular disorders.' },
    { level: 'advanced', q: 'What is the difference between filter and backdrop-filter?', a: 'filter applies effects (blur, grayscale, brightness) to the element itself and its content. backdrop-filter applies them to whatever is behind the element, which creates the frosted-glass effect on semi-transparent panels.' },
  ],
  modern: [
    { level: 'basic', q: 'What are CSS custom properties?', a: 'Variables declared with two dashes (--brand: #2965f1) and read with var(--brand, fallback). They are inherited, can be overridden per element and changed at runtime with JavaScript, unlike Sass variables which are fixed at build time.' },
    { level: 'intermediate', q: 'How do you implement dark mode with CSS?', a: 'Define colors as custom properties on :root, override them inside @media (prefers-color-scheme: dark) and/or a .dark class for a manual toggle, and set color-scheme: light dark so form controls and scrollbars match.' },
    { level: 'intermediate', q: 'What is native CSS nesting?', a: 'Writing child rules inside a parent rule, like Sass. & refers to the parent selector (&.active, &:hover). It is supported in all modern browsers; keep nesting shallow to avoid over-specific selectors.' },
    { level: 'advanced', q: 'What are logical properties and why use them?', a: 'Properties like margin-inline-start, padding-block and inline-size describe directions relative to the writing mode instead of physical left/right/top/bottom. The same CSS then works for left-to-right and right-to-left languages.' },
  ],
  frameworks: [
    { level: 'basic', q: 'What is a CSS preprocessor?', a: 'A language like Sass (SCSS) or Less that compiles to normal CSS and adds features: variables, nesting, mixins, functions, loops and partial files. Native CSS now has variables and nesting, but preprocessors remain common.' },
    { level: 'intermediate', q: 'What are the pros and cons of Tailwind CSS?', a: 'Pros: no naming or switching files, consistent design scale, tiny production CSS because unused classes are removed, easy responsive and state variants. Cons: long class lists in markup and a learning curve for the utility names.' },
    { level: 'intermediate', q: 'How does the Bootstrap grid work?', a: 'A 12-column flexbox grid: .container > .row > .col-*. Classes like col-12 col-md-6 make an element full width on phones and half width from the md breakpoint up.' },
  ],
  projects: [
    { level: 'intermediate', q: 'What is BEM?', a: 'Block Element Modifier, a naming convention: .card (block), .card__title (element), .card--featured (modifier). It keeps specificity flat, makes the relationship between classes obvious and avoids style clashes in large projects.' },
    { level: 'intermediate', q: 'Why use a CSS reset or normalize?', a: 'Browsers ship different default styles (margins, font sizes, form controls). A reset or normalize stylesheet removes inconsistencies so every project starts from the same predictable base.' },
    { level: 'intermediate', q: 'How do you debug a style that is not applying?', a: 'Inspect the element in DevTools: check whether the rule matches at all, whether it is crossed out by a more specific rule, whether the property applies to that display type, and look for typos or a cached old file. The Computed tab shows the final value and its source.' },
    { level: 'advanced', q: 'How would you improve CSS performance?', a: 'Remove unused CSS, keep selectors simple, animate only transform/opacity, avoid layout thrashing from JavaScript, inline critical CSS for the first screen and load the rest asynchronously, and use content-visibility: auto for long off-screen sections.' },
  ],
};
