// HTML interview questions, grouped by chapter id (see src/courses/index.js).

export default {
  'getting-started': [
    { level: 'basic', q: 'What is HTML and what is it used for?', a: 'HTML (HyperText Markup Language) describes the structure and meaning of web content: headings, paragraphs, links, images, forms. Browsers read it to build the page. It is a markup language, not a programming language: it has no logic.' },
    { level: 'basic', q: 'What is the purpose of <!DOCTYPE html>?', a: 'It tells the browser to render the page in standards mode using HTML5 rules. Without it, browsers fall back to "quirks mode", which imitates old buggy behavior and can break layouts.' },
    { level: 'basic', q: 'What is the difference between an element and a tag?', a: 'A tag is the markup itself, like <p> or </p>. An element is the whole thing: opening tag, content and closing tag together. Empty elements such as <img> or <br> have no content and no closing tag.' },
    { level: 'intermediate', q: 'What is the difference between the id and class attributes?', a: 'An id must be unique on the page and identifies one element (used for anchors, labels, JavaScript). A class can be shared by many elements and an element can have several classes; it is mainly used for styling groups.' },
    { level: 'intermediate', q: 'What happens when the browser receives an HTML file?', a: 'It parses the HTML into the DOM tree, parses CSS into the CSSOM, combines them into a render tree, calculates layout (positions and sizes), then paints pixels. Scripts without defer or async pause parsing while they download and run.' },
  ],
  text: [
    { level: 'basic', q: 'How many heading levels are there, and how should they be used?', a: 'Six: <h1> to <h6>. Use them to describe the document outline in order, with one main <h1>, and never skip levels just to get a smaller font. Screen readers and search engines rely on that structure.' },
    { level: 'basic', q: 'What is the difference between <strong> and <b>, and <em> and <i>?', a: '<strong> and <em> carry meaning: importance and emphasis, which screen readers can convey. <b> and <i> are purely visual (bold, italic) for text that is stylistically different without extra importance, like a technical term.' },
    { level: 'intermediate', q: 'Why are multiple spaces collapsed in HTML, and how do you keep them?', a: 'HTML treats any run of whitespace as a single space so the source code can be indented freely. Use <pre> (or CSS white-space: pre) to preserve spaces and line breaks, or &nbsp; for a single non-breaking space.' },
    { level: 'intermediate', q: 'When would you use <blockquote>, <q>, <cite> and <abbr>?', a: '<blockquote> for a long, block-level quotation; <q> for a short inline quote; <cite> for the title of a work; <abbr title="..."> for abbreviations so the full form is available to users and assistive technology.' },
  ],
  'links-media': [
    { level: 'basic', q: 'What is the difference between absolute and relative URLs?', a: 'An absolute URL includes the full address (https://site.com/page). A relative URL is resolved against the current page: about.html, ../images/logo.png, or /images/logo.png (from the site root).' },
    { level: 'basic', q: 'Why is the alt attribute important?', a: 'It describes the image for screen reader users and appears if the image fails to load. Search engines also use it. Decorative images should have an empty alt="" so they are skipped.' },
    { level: 'intermediate', q: 'Why add rel="noopener noreferrer" to target="_blank" links?', a: 'Without noopener, the opened page gets a reference to your window (window.opener) and could redirect it to a phishing page. noreferrer also hides the referring URL. Modern browsers imply noopener, but adding it is still best practice.' },
    { level: 'advanced', q: 'Explain srcset, sizes and the <picture> element.', a: 'srcset lists image files with their widths; sizes tells the browser how wide the image will display, so it can pick the smallest suitable file. <picture> with <source> elements lets you switch formats (AVIF, WebP) or crops based on media queries, with <img> as the fallback.' },
    { level: 'intermediate', q: 'What is the difference between <svg> and <canvas>?', a: 'SVG is vector markup: shapes are DOM elements, scale without blur, can be styled with CSS and are accessible. Canvas is a bitmap you draw on with JavaScript: fast for many changing pixels (games, charts with thousands of points) but not resolution-independent or accessible by default.' },
  ],
  'lists-tables': [
    { level: 'basic', q: 'What are the three types of lists in HTML?', a: '<ul> for unordered (bulleted) lists, <ol> for ordered (numbered) lists, and <dl> for description lists made of <dt> terms and <dd> descriptions. List items in <ul> and <ol> must be <li>.' },
    { level: 'intermediate', q: 'Why should tables not be used for page layout?', a: 'Tables are for tabular data. Using them for layout gives screen readers a misleading structure, makes responsive design very hard and mixes presentation into markup. CSS Flexbox and Grid are built for layout.' },
    { level: 'intermediate', q: 'How do you make a data table accessible?', a: 'Add a <caption>, use <thead>, <tbody> and <tfoot>, mark header cells with <th>, and give them scope="col" or scope="row" so screen readers can announce which header each cell belongs to.' },
  ],
  forms: [
    { level: 'basic', q: 'What is the difference between GET and POST?', a: 'GET sends form data in the URL query string; it is bookmarkable and suited to searches and filters. POST sends data in the request body; use it for logins, sign-ups and anything that changes data or contains sensitive information.' },
    { level: 'basic', q: 'Why does every input need a <label>?', a: 'Labels tell screen reader users what a field is for, and clicking the label focuses the field, which makes small checkboxes easier to tap. Connect them with for="id" or by wrapping the input inside the label.' },
    { level: 'intermediate', q: 'What built-in validation does HTML provide?', a: 'Attributes such as required, minlength, maxlength, min, max, step, pattern and input types like email and url. The browser blocks submission and shows a message. It improves UX but must always be repeated on the server, because it can be bypassed.' },
    { level: 'intermediate', q: 'What does the name attribute do on form fields?', a: 'It is the key used when the form is submitted (name=value pairs). A field without a name is not sent at all. Radio buttons that share a name form one group where only one can be selected.' },
    { level: 'advanced', q: 'What is required to upload files with a form?', a: 'An <input type="file">, method="post" and enctype="multipart/form-data" on the form. accept limits the file types shown in the picker, and multiple allows selecting several files.' },
  ],
  semantic: [
    { level: 'basic', q: 'What is semantic HTML and why does it matter?', a: 'Using elements that describe their meaning (<header>, <nav>, <main>, <article>, <button>) instead of generic <div>s. It improves accessibility, SEO and code readability, and gives you built-in behavior like keyboard support for buttons.' },
    { level: 'basic', q: 'What is the difference between block and inline elements?', a: 'Block elements start on a new line and take the full available width (<div>, <p>, <section>). Inline elements flow within a line and only take the space they need (<span>, <a>, <strong>); width and height do not apply to them.' },
    { level: 'intermediate', q: 'What is the difference between <section> and <article>?', a: '<article> is self-contained content that makes sense on its own, such as a blog post, product card or comment. <section> groups related content within a page, usually with a heading. An article can contain sections and vice versa.' },
    { level: 'intermediate', q: 'What does the viewport meta tag do?', a: '<meta name="viewport" content="width=device-width, initial-scale=1"> makes mobile browsers use the device width instead of a virtual desktop width (around 980px). Without it, phones show a zoomed-out page and media queries do not work as expected.' },
  ],
  advanced: [
    { level: 'intermediate', q: 'What is the difference between async and defer on scripts?', a: 'Both download the script without blocking HTML parsing. defer runs scripts in order after the HTML is parsed; async runs each script as soon as it arrives, in any order. Use defer for your app code and async for independent scripts like analytics.' },
    { level: 'intermediate', q: 'What are data-* attributes used for?', a: 'They store custom information on elements without breaking HTML validity. JavaScript reads them via element.dataset (data-user-id becomes dataset.userId) and CSS can select them with [data-status="active"].' },
    { level: 'advanced', q: 'Why use the native <dialog> element instead of a div-based modal?', a: 'showModal() puts it in the top layer, makes the rest of the page inert, handles the Escape key, manages focus and exposes the correct role to assistive technology. Homemade modals must reimplement all of that and often get it wrong.' },
    { level: 'advanced', q: 'What is the <template> element?', a: 'Its content is parsed but not rendered or executed. JavaScript clones template.content to create repeated structures efficiently, and it is the basis of Web Components\' shadow DOM templates.' },
  ],
  accessibility: [
    { level: 'basic', q: 'What is web accessibility?', a: 'Designing and building sites that people with disabilities can use: blind users with screen readers, keyboard-only users, people with low vision, hearing or cognitive impairments. It is also a legal requirement in many countries.' },
    { level: 'intermediate', q: 'What is ARIA and what is the first rule of ARIA?', a: 'ARIA attributes (role, aria-label, aria-expanded...) add accessibility information when native HTML cannot express it. The first rule: if a native element with the needed semantics exists, use it instead of adding ARIA to a generic element.' },
    { level: 'intermediate', q: 'How should tabindex be used?', a: 'tabindex="0" makes a custom element focusable in the natural order; tabindex="-1" makes it focusable only via JavaScript (useful for dialogs and skip targets). Avoid positive values, which override the natural order and confuse keyboard users.' },
    { level: 'advanced', q: 'What are landmarks and skip links?', a: 'Landmark elements (<header>, <nav>, <main>, <aside>, <footer>) let screen reader users jump between page regions. A skip link ("Skip to main content") placed first lets keyboard users bypass long navigation menus.' },
  ],
  seo: [
    { level: 'basic', q: 'Which HTML elements matter most for SEO?', a: 'A unique, descriptive <title>, a meta description, one clear <h1> with a logical heading structure, descriptive link text, alt text on images and meaningful URLs. Fast loading and mobile friendliness also affect ranking.' },
    { level: 'intermediate', q: 'What are Open Graph tags?', a: 'Meta tags like og:title, og:description and og:image that control how a link preview looks when shared on Facebook, WhatsApp or LinkedIn. Without them, platforms guess and often choose the wrong image or text.' },
    { level: 'intermediate', q: 'What is a canonical URL?', a: '<link rel="canonical" href="..."> tells search engines which URL is the main version of a page when the same content is reachable at several addresses, avoiding duplicate-content issues.' },
    { level: 'advanced', q: 'What is structured data (JSON-LD)?', a: 'Machine-readable descriptions of your content using the schema.org vocabulary, placed in a <script type="application/ld+json">. It can enable rich results in search such as ratings, FAQs, events or course listings.' },
  ],
  projects: [
    { level: 'basic', q: 'What does an HTML validator check?', a: 'That markup follows the specification: correctly closed and nested elements, valid attributes, unique ids, allowed children (only <li> inside <ul>). The W3C validator at validator.w3.org is the standard tool.' },
    { level: 'intermediate', q: 'How do you make a web page load fast using HTML alone?', a: 'Use defer on scripts, loading="lazy" on below-the-fold images and iframes, width and height on images to avoid layout shift, responsive images with srcset, preconnect/preload for critical resources and modern formats like WebP or AVIF.' },
    { level: 'intermediate', q: 'Walk me through building an accessible form.', a: 'Use a <label> for every field, the correct input types and autocomplete values, group related controls with <fieldset> and <legend>, connect hints and errors with aria-describedby, use native validation and a real <button type="submit">, and test with the keyboard.' },
  ],
};
