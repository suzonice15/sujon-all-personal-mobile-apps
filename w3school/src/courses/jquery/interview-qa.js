// jQuery interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is jQuery?',
      a: 'A small library that simplifies DOM selection, events, manipulation and AJAX with a consistent API.',
      level: 'basic',
    },
    {
      q: 'What is a ready callback for?',
      a: 'Running code after the DOM is parsed, so selectors find the elements.',
      level: 'basic',
    },
    {
      q: 'Why can methods chain?',
      a: 'Most methods return the same jQuery object, so the next call applies to the same set.',
      level: 'basic',
    },
    {
      q: 'Is jQuery still needed for new projects?',
      a: 'Rarely. Native querySelector, classList and fetch cover most uses. It still matters for legacy apps.',
      level: 'intermediate',
    },
  ],
  'selectors-events': [
    {
      q: 'How do you select an id?',
      a: '$("#main"). Class uses ., tag uses the bare name.',
      level: 'basic',
    },
    {
      q: 'What is event delegation?',
      a: 'Binding on a stable parent and filtering by selector, so elements added later still work.',
      level: 'intermediate',
    },
    {
      q: 'How do you read an input value?',
      a: '$(el).val() or $(el).val(newValue) to set.',
      level: 'basic',
    },
    {
      q: 'What should a submit handler call first?',
      a: 'event.preventDefault() to stop the default navigation.',
      level: 'basic',
    },
  ],
  'dom-manipulation': [
    {
      q: 'toggleClass versus addClass?',
      a: 'toggleClass adds or removes depending on presence. addClass only adds.',
      level: 'basic',
    },
    {
      q: 'attr versus prop?',
      a: 'prop reads live properties such as checked and disabled. attr reads the initial HTML attribute.',
      level: 'intermediate',
    },
    {
      q: 'Which is safe for user input?',
      a: 'text(), because it does not parse HTML. html() can introduce XSS.',
      level: 'basic',
    },
    {
      q: 'Why use remove() instead of hide()?',
      a: 'remove() deletes the element and cleans up handlers. hide() keeps it in the DOM.',
      level: 'basic',
    },
  ],
  ajax: [
    {
      q: 'What do $.get and $.post return?',
      a: 'A jqXHR object with done, fail and always callbacks.',
      level: 'basic',
    },
    {
      q: 'How do you send JSON?',
      a: 'Set contentType: "application/json" and JSON.stringify the payload.',
      level: 'intermediate',
    },
    {
      q: 'Why disable a submit button during a request?',
      a: 'To prevent duplicate submissions from repeated clicks.',
      level: 'basic',
    },
    {
      q: 'What should a 401 response do?',
      a: 'Redirect to login, because the session is missing or expired.',
      level: 'basic',
    },
  ],
  effects: [
    {
      q: 'What does slideToggle do?',
      a: 'Shows or hides an element with a slide animation.',
      level: 'basic',
    },
    {
      q: 'What can animate() change?',
      a: 'Numeric CSS properties such as opacity and margin. Transforms are better with CSS.',
      level: 'intermediate',
    },
    {
      q: 'Why respect prefers-reduced-motion?',
      a: 'Motion can cause discomfort, and users explicitly asked for less of it.',
      level: 'basic',
    },
    {
      q: 'What is usually smoother, jQuery or CSS transitions?',
      a: 'CSS transitions, especially for transform and opacity.',
      level: 'basic',
    },
  ],
  'plugins-modern': [
    {
      q: 'How does a jQuery plugin register?',
      a: 'By adding a method to $.fn and returning this for chaining.',
      level: 'intermediate',
    },
    {
      q: 'What is the main security risk in jQuery code?',
      a: 'Passing user input to html(), which can execute injected markup.',
      level: 'basic',
    },
    {
      q: 'What replaces $.get today?',
      a: 'The native fetch API.',
      level: 'basic',
    },
    {
      q: 'Which jQuery versions are unsupported?',
      a: '1.x and 2.x. Use 3.7 or later, or migrate away.',
      level: 'intermediate',
    },
  ],
  'projects-interview': [
    {
      q: 'How would you build a small jQuery app today?',
      a: 'AJAX with fetch or $.ajax, text() for rendering, delegated events, disabled buttons during requests and clear error states.',
      level: 'intermediate',
    },
    {
      q: 'When would you migrate off jQuery?',
      a: 'When you are actively changing a component and native APIs cover it, not as a blanket rewrite.',
      level: 'advanced',
    },
    {
      q: 'What is the risk of old plugins?',
      a: 'They may be abandoned and contain known vulnerabilities or break on new browsers.',
      level: 'intermediate',
    },
    {
      q: 'What is the best first step?',
      a: 'Load a list with AJAX and render it with text(), then add a form.',
      level: 'basic',
    },
  ],
};
