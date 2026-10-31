// HTML chapter: Lists and Tables. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'lists-tables',
  title: 'Lists and Tables',
  description: 'Organize content into lists and grids',
  icon: 'table-chart',
  lessons: [
    {
      id: 'html-lists',
      title: 'Lists',
      blocks: [
        { type: 'text', value: 'HTML has three kinds of lists:' },
        { type: 'list', items: [
          '<ul> unordered list (bullets)',
          '<ol> ordered list (numbers)',
          '<dl> description list (terms and descriptions)',
        ] },
        { type: 'text', value: 'Each item in <ul> and <ol> goes inside an <li> element.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<h3>Shopping list</h3>
<ul>
  <li>Milk</li>
  <li>Bread</li>
  <li>Eggs</li>
</ul>

<h3>Steps</h3>
<ol>
  <li>Open the editor</li>
  <li>Write HTML</li>
  <li>Open it in a browser</li>
</ol>` },
        { type: 'heading', value: 'Nested and description lists' },
        { type: 'code', lang: 'html', tryIt: true, value: `<ul>
  <li>Frontend
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </li>
  <li>Backend</li>
</ul>

<dl>
  <dt>HTML</dt>
  <dd>Structure of a page</dd>
</dl>` },
      ],
    },
    {
      id: 'html-tables',
      title: 'Tables',
      blocks: [
        { type: 'text', value: 'Tables show data in rows and columns.' },
        { type: 'list', items: [
          '<table> wraps the whole table',
          '<tr> is a table row',
          '<th> is a header cell (bold and centered by default)',
          '<td> is a normal data cell',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<table border="1">
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Rahim</td>
    <td>24</td>
  </tr>
  <tr>
    <td>Karim</td>
    <td>31</td>
  </tr>
</table>` },
        { type: 'heading', value: 'Merging cells' },
        { type: 'text', value: 'colspan makes a cell span several columns; rowspan makes it span several rows.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<table border="1">
  <tr><th colspan="2">Contact</th></tr>
  <tr><td>Phone</td><td>0123</td></tr>
</table>` },
        { type: 'note', value: 'Use tables for data only, not for page layout. Use CSS for layout.' },
      ],
    },
    {
      id: 'html-table-structure',
      title: 'Table Structure and Accessibility',
      blocks: [
        { type: 'text', value: 'Professional tables are split into sections and labelled, so screen readers can announce "column: Price, row: Laptop" instead of a stream of numbers.' },
        { type: 'list', items: [
          '<caption> the table title, placed right after <table>',
          '<thead> the header rows',
          '<tbody> the main data rows',
          '<tfoot> summary rows such as totals',
          'scope="col" / scope="row" on <th> says whether it labels a column or a row',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<style>
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
  thead { background: #1e293b; color: white; }
  tbody tr:nth-child(even) { background: #f1f5f9; }
  tfoot { font-weight: bold; }
</style>

<table>
  <caption>Order summary</caption>
  <thead>
    <tr><th scope="col">Item</th><th scope="col">Qty</th><th scope="col">Price</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Laptop</th><td>1</td><td>৳65,000</td></tr>
    <tr><th scope="row">Mouse</th><td>2</td><td>৳1,200</td></tr>
  </tbody>
  <tfoot>
    <tr><th scope="row" colspan="2">Total</th><td>৳66,200</td></tr>
  </tfoot>
</table>` },
        { type: 'note', value: 'On phones, wrap wide tables in <div style="overflow-x:auto"> so they can scroll sideways instead of breaking the layout.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'lists-tables', q: 'Which element creates a numbered list?', options: ['<ul>', '<ol>', '<dl>', '<list>'], answer: 1, explain: '<ol> is an ordered (numbered) list.' },
    { chapterId: 'lists-tables', q: 'Which element is one item of a list?', options: ['<li>', '<item>', '<dt>', '<td>'], answer: 0, explain: 'Each item in <ul> or <ol> is an <li>.' },
    { chapterId: 'lists-tables', q: 'Which element creates a table row?', options: ['<td>', '<th>', '<row>', '<tr>'], answer: 3, explain: '<tr> is a table row; <td> and <th> are cells.' },
    { chapterId: 'lists-tables', q: 'Which attribute makes a cell span two columns?', options: ['rowspan="2"', 'span="2"', 'colspan="2"', 'merge="2"'], answer: 2, explain: 'colspan merges cells across columns.' },
    { chapterId: 'lists-tables', q: 'Which element holds the title of a table?', options: ['<th>', '<caption>', '<thead>', '<title>'], answer: 1, explain: '<caption> goes right after <table>.' },
  ],
};
