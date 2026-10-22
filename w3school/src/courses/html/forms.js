// HTML chapter: Forms. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'forms',
  title: 'Forms',
  description: 'Collect input from your visitors',
  icon: 'edit-note',
  lessons: [
    {
      id: 'html-forms',
      title: 'Form Basics',
      blocks: [
        { type: 'text', value: 'A form collects data from the user. The <form> element wraps the inputs. The action attribute says where to send the data, and method says how (GET or POST).' },
        { type: 'code', lang: 'html', tryIt: true, value: `<form action="/signup" method="post">
  <label for="name">Name:</label><br>
  <input type="text" id="name" name="name"><br><br>

  <label for="email">Email:</label><br>
  <input type="email" id="email" name="email"><br><br>

  <button type="submit">Sign up</button>
</form>` },
        { type: 'heading', value: 'Why labels matter' },
        { type: 'text', value: 'A <label> linked with for="id" makes the text clickable and lets screen readers announce what the field is for.' },
        { type: 'note', value: 'The name attribute is what the server receives. An input without a name is not sent.' },
      ],
    },
    {
      id: 'html-input-types',
      title: 'Input Types',
      blocks: [
        { type: 'text', value: 'The type attribute changes what an <input> looks like and accepts. On phones it also shows the right keyboard.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<input type="text" placeholder="Text"><br>
<input type="password" placeholder="Password"><br>
<input type="number" min="1" max="10"><br>
<input type="date"><br>
<input type="color"><br>
<input type="range" min="0" max="100"><br>
<label><input type="checkbox"> I agree</label><br>
<label><input type="radio" name="size"> Small</label>
<label><input type="radio" name="size"> Large</label>` },
        { type: 'heading', value: 'Useful attributes' },
        { type: 'list', items: [
          'placeholder: hint text inside the field',
          'required: the form cannot be sent if it is empty',
          'value: the starting value',
          'disabled / readonly: the user cannot change it',
        ] },
      ],
    },
    {
      id: 'html-form-controls',
      title: 'Select, Textarea and Buttons',
      blocks: [
        { type: 'text', value: '<select> creates a drop-down list, <textarea> a multi-line text box, and <button> a clickable button.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<label for="city">City:</label>
<select id="city" name="city">
  <option>Dhaka</option>
  <option>Chattogram</option>
  <option selected>Sylhet</option>
</select>
<br><br>
<textarea name="message" rows="4" cols="30">Write your message...</textarea>
<br>
<button type="submit">Send</button>
<button type="reset">Clear</button>` },
        { type: 'note', value: 'A button inside a form submits it by default. Use type="button" for a button that should not submit.' },
      ],
    },
    {
      id: 'html-form-validation',
      title: 'Form Validation',
      blocks: [
        { type: 'text', value: 'HTML can check input before the form is sent, with no JavaScript at all. The browser shows an error message and blocks submission until the data is valid.' },
        { type: 'list', items: [
          'required: the field cannot be empty',
          'minlength / maxlength: limits on text length',
          'min / max / step: limits on numbers and dates',
          'pattern: the value must match a regular expression',
          'type="email" / type="url": must look like an email or web address',
        ] },
        { type: 'code', lang: 'html', tryIt: true, value: `<form>
  <label>Username (4-12 letters)<br>
    <input name="user" required minlength="4" maxlength="12" pattern="[A-Za-z]+">
  </label><br><br>

  <label>Age (18-60)<br>
    <input name="age" type="number" min="18" max="60" required>
  </label><br><br>

  <label>Phone (11 digits)<br>
    <input name="phone" type="tel" pattern="01[0-9]{9}" placeholder="01XXXXXXXXX">
  </label><br><br>

  <button>Submit</button>
</form>` },
        { type: 'text', value: 'Try submitting with wrong values to see the browser messages.' },
        { type: 'note', value: 'Browser validation helps users, but anyone can bypass it. A server must always check the data again.' },
      ],
    },
    {
      id: 'html-form-grouping',
      title: 'Fieldset, Datalist and Output',
      blocks: [
        { type: 'heading', value: 'Grouping with fieldset and legend' },
        { type: 'text', value: '<fieldset> groups related fields and <legend> gives the group a title. This is especially helpful for groups of radio buttons.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<form>
  <fieldset>
    <legend>Delivery method</legend>
    <label><input type="radio" name="delivery" value="home" checked> Home delivery</label><br>
    <label><input type="radio" name="delivery" value="pickup"> Store pickup</label>
  </fieldset>
</form>` },
        { type: 'heading', value: 'Suggestions with datalist' },
        { type: 'code', lang: 'html', tryIt: true, value: `<label for="lang">Favourite language:</label>
<input id="lang" list="languages" name="lang">
<datalist id="languages">
  <option value="HTML">
  <option value="CSS">
  <option value="JavaScript">
  <option value="Python">
</datalist>` },
        { type: 'heading', value: 'Showing results with output' },
        { type: 'code', lang: 'html', tryIt: true, value: `<form oninput="total.value = Number(a.value) + Number(b.value)">
  <input name="a" type="number" value="10"> +
  <input name="b" type="number" value="5"> =
  <output name="total">15</output>
</form>` },
      ],
    },
    {
      id: 'html-form-attributes',
      title: 'Form Attributes: GET, POST and More',
      blocks: [
        { type: 'heading', value: 'GET vs POST' },
        { type: 'list', items: [
          'GET adds the data to the URL (search?q=html). Good for searches and filters that can be bookmarked.',
          'POST sends the data in the request body. Use it for logins, sign-ups and anything that changes data.',
        ] },
        { type: 'code', lang: 'html', value: `<form action="/search" method="get">
  <input name="q" placeholder="Search">
</form>
<!-- submits to /search?q=what-you-typed -->` },
        { type: 'heading', value: 'Uploading files' },
        { type: 'code', lang: 'html', value: `<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="photo" accept="image/*">
  <button>Upload</button>
</form>` },
        { type: 'heading', value: 'Other useful attributes' },
        { type: 'list', items: [
          'autocomplete="email" / "name" / "current-password" helps browsers fill fields correctly',
          'autofocus puts the cursor in a field when the page loads',
          'novalidate on <form> turns off browser validation',
          'inputmode="numeric" shows a number keyboard on phones without changing the type',
        ] },
        { type: 'note', value: 'File uploads only work with method="post" and enctype="multipart/form-data".' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'forms', q: 'Which attribute must an input have for its value to be sent to the server?', options: ['id', 'name', 'value', 'type'], answer: 1, explain: 'Only inputs with a name are included in the submitted data.' },
    { chapterId: 'forms', q: 'Which input type hides what the user types?', options: ['hidden', 'secret', 'text', 'password'], answer: 3, explain: 'type="password" masks the characters.' },
    { chapterId: 'forms', q: 'Which element creates a drop-down list?', options: ['<select>', '<dropdown>', '<input type="list">', '<option>'], answer: 0, explain: '<select> holds <option> elements.' },
    { chapterId: 'forms', q: 'Which attribute stops a form from being sent while a field is empty?', options: ['needed', 'required', 'validate', 'notempty'], answer: 1, explain: 'required makes the field mandatory.' },
    { chapterId: 'forms', q: 'Which attribute checks a value against a regular expression?', options: ['pattern', 'regex', 'match', 'format'], answer: 0, explain: 'pattern="01[0-9]{9}" requires a matching value.' },
    { chapterId: 'forms', q: 'Which method should a login form use?', options: ['get', 'post', 'put', 'send'], answer: 1, explain: 'POST keeps the data out of the URL.' },
    { chapterId: 'forms', q: 'Which element gives a title to a group of fields?', options: ['<label>', '<caption>', '<legend>', '<title>'], answer: 2, explain: '<legend> labels a <fieldset>.' },
  ],
};
