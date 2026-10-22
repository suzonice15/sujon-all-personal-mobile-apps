// HTML chapter: SEO and Performance. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'seo',
  title: 'SEO and Performance',
  description: 'Get found on Google and load fast',
  icon: 'trending-up',
  lessons: [
    {
      id: 'html-seo-basics',
      title: 'SEO Basics',
      blocks: [
        { type: 'text', value: 'SEO (Search Engine Optimization) is making pages easy for search engines to understand, so they show up when people search. Much of it comes down to clean HTML.' },
        { type: 'list', items: [
          '<title>: the clickable headline in search results. Unique for every page.',
          '<meta name="description">: the summary under the headline, about 150 characters.',
          'One clear <h1> and a logical heading outline.',
          'Descriptive link text: "Read the HTML guide", not "click here".',
          'Alt text on images, and readable URLs like /learn/html-forms.',
        ] },
        { type: 'code', lang: 'html', value: `<head>
  <title>HTML Forms Tutorial for Beginners | CodeNest</title>
  <meta name="description" content="Learn to build HTML forms step by step: inputs, validation, and accessible labels, with live examples.">
  <link rel="canonical" href="https://codenest.example/learn/html-forms">
</head>` },
        { type: 'note', value: 'canonical tells search engines which address is the "real" one when the same page can be reached through several URLs.' },
      ],
    },
    {
      id: 'html-open-graph',
      title: 'Social Sharing with Open Graph',
      blocks: [
        { type: 'text', value: 'When someone shares your link on Facebook, WhatsApp or LinkedIn, these apps read Open Graph meta tags to build the preview card with a title, description and image.' },
        { type: 'code', lang: 'html', value: `<meta property="og:title" content="Learn HTML in 30 Days">
<meta property="og:description" content="Free lessons with live examples.">
<meta property="og:image" content="https://codenest.example/share.jpg">
<meta property="og:url" content="https://codenest.example/html">
<meta property="og:type" content="website">

<!-- X (Twitter) uses its own tag for the card size -->
<meta name="twitter:card" content="summary_large_image">` },
        { type: 'list', items: [
          'Use an image of 1200x630 pixels so it looks sharp on every platform.',
          'The image URL must be a full address, starting with https://',
        ] },
        { type: 'note', value: 'Without these tags, apps guess the preview and often pick the wrong image or text.' },
      ],
    },
    {
      id: 'html-performance',
      title: 'Faster Pages',
      blocks: [
        { type: 'text', value: 'Speed affects both visitors and search ranking. Many big wins come from HTML attributes alone.' },
        { type: 'list', items: [
          'loading="lazy" on images and iframes below the first screen',
          'width and height on images to prevent layout jumps',
          'defer on scripts so they do not block the page',
          'Compressed modern image formats such as WebP or AVIF',
        ] },
        { type: 'heading', value: 'Resource hints' },
        { type: 'code', lang: 'html', value: `<head>
  <!-- Connect early to a server you will need -->
  <link rel="preconnect" href="https://fonts.googleapis.com">

  <!-- Download a critical file right away -->
  <link rel="preload" href="hero.webp" as="image">

  <!-- Fetch the next page in idle time -->
  <link rel="prefetch" href="/lesson-2.html">
</head>` },
        { type: 'note', value: 'Do not lazy-load the main image at the top of the page. It should load as early as possible.' },
      ],
    },
    {
      id: 'html-structured-data',
      title: 'Structured Data',
      blocks: [
        { type: 'text', value: 'Structured data describes your content in a format search engines read directly. It can unlock rich results such as star ratings, FAQs, recipes or event dates in search.' },
        { type: 'text', value: 'The most common format is JSON-LD, placed in a script tag:' },
        { type: 'code', lang: 'html', value: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "HTML for Beginners",
  "description": "Learn HTML from zero with live examples.",
  "provider": {
    "@type": "Organization",
    "name": "CodeNest"
  }
}
</script>` },
        { type: 'list', items: [
          'The vocabulary comes from schema.org (Course, Article, Product, FAQPage, Event...).',
          'Only describe content that is really visible on the page.',
          'Test it with Google\'s Rich Results Test before publishing.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'seo', q: 'Which tag gives the summary shown under a search result?', options: ['<meta name="description">', '<meta name="summary">', '<title>', '<meta name="keywords">'], answer: 0, explain: 'The meta description is often used as the search snippet.' },
    { chapterId: 'seo', q: 'Which link text is best for SEO and accessibility?', options: ['Click here', 'More', 'Read the HTML forms guide', 'Link'], answer: 2, explain: 'Descriptive link text tells users and search engines where the link goes.' },
    { chapterId: 'seo', q: 'Which tags control the preview when a link is shared on Facebook?', options: ['ARIA tags', 'Open Graph tags', 'canonical tags', 'robots tags'], answer: 1, explain: 'og:title, og:description and og:image build the share card.' },
    { chapterId: 'seo', q: 'Which attribute delays loading off-screen images?', options: ['defer', 'async', 'loading="lazy"', 'preload'], answer: 2, explain: 'loading="lazy" loads images only when they are about to be seen.' },
    { chapterId: 'seo', q: 'What is JSON-LD used for?', options: ['Styling pages', 'Structured data for search engines', 'Loading fonts', 'Form validation'], answer: 1, explain: 'JSON-LD describes content using the schema.org vocabulary.' },
  ],
};
