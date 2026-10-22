// HTML chapter: Best Practices and Projects. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'projects',
  title: 'Best Practices and Projects',
  description: 'Write professional HTML and build real pages',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'html-best-practices',
      title: 'Best Practices and Validation',
      blocks: [
        { type: 'text', value: 'Professional HTML is valid, consistent and easy for the next developer to read. Follow these habits from day one.' },
        { type: 'list', items: [
          'Always start with <!DOCTYPE html>, <html lang>, <meta charset> and the viewport tag.',
          'Use lowercase tags and attributes, and quote every attribute value.',
          'Close every element that needs closing, and nest correctly.',
          'Indent nested elements consistently (2 spaces is common).',
          'Choose the most meaningful element: <button> for actions, <a> for navigation.',
          'Keep styles in CSS files and scripts in JS files, not inline.',
          'Give every image alt text and every input a label.',
        ] },
        { type: 'heading', value: 'Validate your code' },
        { type: 'text', value: 'A validator finds mistakes such as unclosed tags, duplicate ids and wrong nesting. The free W3C Markup Validation Service (validator.w3.org) checks a URL, an uploaded file, or pasted code.' },
        { type: 'code', lang: 'html', value: `<!-- Common mistakes a validator catches -->
<p>Unclosed <strong>bold text</p>        <!-- </strong> missing -->
<div id="box"></div><div id="box"></div> <!-- duplicate id -->
<ul><p>Not a list item</p></ul>          <!-- only <li> allowed in <ul> -->` },
        { type: 'note', value: 'Browsers forgive broken HTML, but each one fixes it differently. Valid HTML behaves the same everywhere.' },
      ],
    },
    {
      id: 'html-project-portfolio',
      title: 'Project 1: Personal Portfolio',
      blocks: [
        { type: 'text', value: 'Time to combine everything. This portfolio page uses semantic layout, images, lists, links and a little CSS. Open it in Try it, then make it yours: change the name, add your skills, link your projects.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rahim Uddin | Web Developer</title>
  <style>
    body { margin: 0; font-family: sans-serif; color: #1e293b; line-height: 1.6; }
    header { background: #1e293b; color: white; text-align: center; padding: 30px 16px; }
    header img { border-radius: 50%; border: 4px solid white; }
    nav a { color: #93c5fd; margin: 0 8px; }
    section { max-width: 640px; margin: auto; padding: 16px; }
    .skills li { display: inline-block; background: #e0e7ff; padding: 4px 10px; border-radius: 999px; margin: 3px; }
    .project { border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-bottom: 10px; }
    footer { text-align: center; padding: 16px; color: #64748b; }
  </style>
</head>
<body>
  <header>
    <img src="https://picsum.photos/id/64/120/120" alt="Portrait of Rahim" width="120" height="120">
    <h1>Rahim Uddin</h1>
    <p>Frontend web developer from Dhaka</p>
    <nav><a href="#about">About</a><a href="#projects">Projects</a><a href="#contact">Contact</a></nav>
  </header>

  <main>
    <section id="about">
      <h2>About me</h2>
      <p>I build fast, accessible websites. I started learning HTML in 2026 and now I love turning ideas into web pages.</p>
      <ul class="skills">
        <li>HTML</li><li>CSS</li><li>JavaScript</li><li>Git</li>
      </ul>
    </section>

    <section id="projects">
      <h2>Projects</h2>
      <article class="project">
        <h3>Recipe Finder</h3>
        <p>Search thousands of recipes by ingredient.</p>
        <a href="#">View project</a>
      </article>
      <article class="project">
        <h3>Weather Dashboard</h3>
        <p>A clean 7-day forecast for any city.</p>
        <a href="#">View project</a>
      </article>
    </section>

    <section id="contact">
      <h2>Contact</h2>
      <p>Email: <a href="mailto:rahim@example.com">rahim@example.com</a></p>
    </section>
  </main>

  <footer><small>&copy; 2026 Rahim Uddin</small></footer>
</body>
</html>` },
        { type: 'heading', value: 'Challenge' },
        { type: 'list', items: [
          'Add a third project with an image.',
          'Add a "Download CV" link with the download attribute.',
          'Add Open Graph tags so the page looks good when shared.',
        ] },
      ],
    },
    {
      id: 'html-project-landing',
      title: 'Project 2: Product Landing Page',
      blocks: [
        { type: 'text', value: 'A landing page has one goal: convince the visitor to take an action. This one has a hero section, a feature grid, a pricing table and an FAQ built with <details>.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FocusTimer | Get more done</title>
  <style>
    body { margin: 0; font-family: sans-serif; color: #0f172a; }
    .hero { background: linear-gradient(135deg, #6366f1, #ec4899); color: white; text-align: center; padding: 40px 16px; }
    .cta { display: inline-block; background: white; color: #6366f1; padding: 12px 24px; border-radius: 999px; font-weight: bold; text-decoration: none; }
    .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; padding: 16px; }
    .features article { background: #f1f5f9; border-radius: 10px; padding: 12px; }
    table { width: calc(100% - 32px); margin: 16px; border-collapse: collapse; }
    th, td { border: 1px solid #e2e8f0; padding: 8px; text-align: center; }
    details { margin: 8px 16px; padding: 10px; background: #f8fafc; border-radius: 8px; }
  </style>
</head>
<body>
  <header class="hero">
    <h1>FocusTimer</h1>
    <p>The simple timer that helps you study 2x longer.</p>
    <a class="cta" href="#pricing">Start free</a>
  </header>

  <main>
    <section class="features" aria-label="Features">
      <article><h3>⏱ Pomodoro</h3><p>25-minute focus sessions.</p></article>
      <article><h3>📊 Stats</h3><p>See your weekly progress.</p></article>
      <article><h3>🔕 No distractions</h3><p>Blocks noisy apps.</p></article>
    </section>

    <section id="pricing">
      <h2 style="text-align:center">Pricing</h2>
      <table>
        <thead><tr><th scope="col">Plan</th><th scope="col">Price</th><th scope="col">Devices</th></tr></thead>
        <tbody>
          <tr><th scope="row">Free</th><td>৳0</td><td>1</td></tr>
          <tr><th scope="row">Pro</th><td>৳199/month</td><td>Unlimited</td></tr>
        </tbody>
      </table>
    </section>

    <section aria-label="FAQ">
      <details><summary>Is there a free plan?</summary><p>Yes, forever free for one device.</p></details>
      <details><summary>Can I cancel anytime?</summary><p>Yes, with one tap in settings.</p></details>
    </section>
  </main>
</body>
</html>` },
        { type: 'heading', value: 'Challenge' },
        { type: 'list', items: [
          'Add a testimonial section using <blockquote> and <cite>.',
          'Add a newsletter form with an email input and validation.',
        ] },
      ],
    },
    {
      id: 'html-project-signup',
      title: 'Project 3: Accessible Sign-up Form',
      blocks: [
        { type: 'text', value: 'Forms are where most websites fail real users. This sign-up form uses labels, grouping, validation, helpful hints and correct autocomplete values.' },
        { type: 'code', lang: 'html', tryIt: true, value: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Create your account</title>
  <style>
    body { font-family: sans-serif; max-width: 420px; margin: auto; padding: 16px; color: #0f172a; }
    label { display: block; font-weight: bold; margin-top: 12px; }
    input, select { width: 100%; padding: 10px; margin-top: 4px; box-sizing: border-box; border: 1px solid #94a3b8; border-radius: 6px; }
    .hint { color: #64748b; font-size: 13px; }
    fieldset { border: 1px solid #cbd5e1; border-radius: 8px; margin-top: 14px; }
    fieldset label { display: inline; font-weight: normal; }
    fieldset input { width: auto; }
    button { margin-top: 16px; width: 100%; padding: 12px; background: #0f766e; color: white; border: 0; border-radius: 8px; font-size: 16px; }
    input:invalid:not(:placeholder-shown) { border-color: #dc2626; }
  </style>
</head>
<body>
  <main>
    <h1>Create your account</h1>
    <form action="/signup" method="post">
      <label for="name">Full name</label>
      <input id="name" name="name" autocomplete="name" required placeholder=" ">

      <label for="email">Email</label>
      <input id="email" name="email" type="email" autocomplete="email" required placeholder=" ">

      <label for="password">Password</label>
      <input id="password" name="password" type="password" autocomplete="new-password"
             minlength="8" required aria-describedby="pw-hint" placeholder=" ">
      <p id="pw-hint" class="hint">At least 8 characters.</p>

      <label for="level">Your level</label>
      <select id="level" name="level">
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <fieldset>
        <legend>Send me</legend>
        <label><input type="checkbox" name="news"> Weekly lessons</label><br>
        <label><input type="checkbox" name="offers"> Special offers</label>
      </fieldset>

      <label><input type="checkbox" required style="width:auto"> I accept the terms</label>

      <button type="submit">Create account</button>
    </form>
  </main>
</body>
</html>` },
        { type: 'heading', value: 'What makes it good' },
        { type: 'list', items: [
          'Every input has a <label> connected with for and id.',
          'aria-describedby links the password hint, so screen readers read it.',
          'autocomplete values let the browser fill in name, email and a new password.',
          'Required fields and minlength stop bad data before it is sent.',
        ] },
        { type: 'note', value: 'Congratulations! You have finished the HTML course. Take the HTML Full Test in the Quiz tab, then continue with CSS.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'projects', q: 'What does an HTML validator find?', options: ['Slow images', 'Spelling mistakes', 'Errors such as unclosed tags and duplicate ids', 'Security bugs'], answer: 2, explain: 'Validators check that markup follows the HTML rules.' },
    { chapterId: 'projects', q: 'Which element should be used for an action like "Save"?', options: ['<a>', '<button>', '<div>', '<span>'], answer: 1, explain: 'Buttons perform actions; links navigate.' },
    { chapterId: 'projects', q: 'Which autocomplete value fits a sign-up password field?', options: ['current-password', 'password', 'new-password', 'off'], answer: 2, explain: 'new-password lets the browser suggest a strong new password.' },
    { chapterId: 'projects', q: 'How do you connect a hint text to an input for screen readers?', options: ['aria-describedby', 'title', 'for', 'aria-hidden'], answer: 0, explain: 'aria-describedby points to the element that describes the input.' },
  ],
};
