// Vue chapter: Template Directives. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'directives',
  title: 'Template Directives',
  description: 'Conditions, lists, events, forms and bindings',
  icon: 'code',
  lessons: [
    {
      id: 'vue-conditionals',
      title: 'v-if, v-else and v-show',
      blocks: [
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref } from 'vue';

const marks = ref(72);
const showHelp = ref(false);
</script>

<template>
  <input type="range" min="0" max="100" v-model.number="marks" /> {{ marks }}

  <p v-if="marks >= 80">🏆 A+</p>
  <p v-else-if="marks >= 60">👍 A</p>
  <p v-else-if="marks >= 33">🙂 Pass</p>
  <p v-else>📚 Fail, keep studying</p>

  <button @click="showHelp = !showHelp">Toggle help</button>
  <p v-show="showHelp">v-show only hides with CSS (display: none).</p>
</template>` },
        { type: 'list', items: [
          'v-if adds or removes the element from the DOM. Use it for things that rarely change.',
          'v-show keeps the element and toggles display. Cheaper for things toggled often.',
          'Group several elements with <template v-if> without adding a wrapper element.',
        ] },
      ],
    },
    {
      id: 'vue-lists',
      title: 'v-for and Keys',
      blocks: [
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref } from 'vue';

const students = ref([
  { id: 1, name: 'Rahim', marks: 82 },
  { id: 2, name: 'Nadia', marks: 95 },
  { id: 3, name: 'Karim', marks: 45 },
]);
const profile = { city: 'Dhaka', level: 'Beginner' };

function shuffle() {
  students.value = [...students.value].sort(() => Math.random() - 0.5);
}
</script>

<template>
  <button @click="shuffle">Shuffle</button>
  <ol>
    <li v-for="(s, index) in students" :key="s.id">
      #{{ index + 1 }} {{ s.name }}: {{ s.marks }}
      <span v-if="s.marks < 50">⚠️</span>
    </li>
  </ol>

  <p v-for="(value, key) in profile" :key="key">{{ key }}: {{ value }}</p>
  <span v-for="n in 5" :key="n">⭐</span>
</template>` },
        { type: 'note', value: 'Always give v-for a unique :key from your data. Do not put v-if and v-for on the same element; filter the list with a computed property instead.' },
      ],
    },
    {
      id: 'vue-events',
      title: 'Event Handling and Modifiers',
      blocks: [
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref } from 'vue';

const log = ref([]);
const add = msg => log.value.unshift(msg);

function onSubmit() {
  add('Form submitted without reloading (.prevent)');
}
function onKey(event) {
  add('Enter pressed: ' + event.target.value);
}
</script>

<template>
  <button @click="add('Clicked!')">Click</button>
  <button @click.once="add('Only the first click counts')">Once</button>

  <form @submit.prevent="onSubmit">
    <input @keyup.enter="onKey" placeholder="Type and press Enter" />
    <button>Submit</button>
  </form>

  <div @click="add('Outer div')" style="padding: 10px; background: #f1f5f9">
    <button @click.stop="add('Inner button only (.stop)')">Stop propagation</button>
  </div>

  <ul><li v-for="(l, i) in log" :key="i">{{ l }}</li></ul>
</template>` },
        { type: 'list', items: [
          '.prevent calls event.preventDefault()',
          '.stop calls event.stopPropagation()',
          '.once runs the handler only once',
          '.enter, .esc, .space, .ctrl: key modifiers',
          '.self only if the event started on this element',
        ] },
      ],
    },
    {
      id: 'vue-v-model',
      title: 'Forms with v-model',
      blocks: [
        { type: 'text', value: 'v-model creates two-way binding between a form field and state: typing updates the state, and changing the state updates the field.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref, computed } from 'vue';

const form = ref({
  name: '',
  age: null,
  level: 'beginner',
  topics: [],
  newsletter: true,
  bio: '',
});
const valid = computed(() => form.value.name.trim().length >= 2 && form.value.age >= 10);
</script>

<template>
  <input v-model.trim="form.name" placeholder="Name" />
  <input v-model.number="form.age" type="number" placeholder="Age" />

  <p>
    <label><input type="radio" value="beginner" v-model="form.level" /> Beginner</label>
    <label><input type="radio" value="advanced" v-model="form.level" /> Advanced</label>
  </p>
  <p>
    <label><input type="checkbox" value="HTML" v-model="form.topics" /> HTML</label>
    <label><input type="checkbox" value="Vue" v-model="form.topics" /> Vue</label>
  </p>
  <label><input type="checkbox" v-model="form.newsletter" /> Newsletter</label>
  <textarea v-model.lazy="form.bio" placeholder="Bio (updates on blur)"></textarea>

  <p><button :disabled="!valid">Save</button></p>
  <pre>{{ form }}</pre>
</template>` },
        { type: 'list', items: [
          '.trim removes spaces, .number converts to a number, .lazy updates on change instead of every key.',
          'Checkboxes bound to an array collect all checked values.',
        ] },
      ],
    },
    {
      id: 'vue-class-style',
      title: 'Class and Style Bindings',
      blocks: [
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref } from 'vue';

const active = ref('Lessons');
const progress = ref(40);
const hasError = ref(false);
</script>

<template>
  <button
    v-for="tab in ['Lessons', 'Quiz', 'Notes']"
    :key="tab"
    class="tab"
    :class="{ active: tab === active }"
    @click="active = tab"
  >{{ tab }}</button>

  <div class="bar"><div class="fill" :style="{ width: progress + '%' }"></div></div>
  <input type="range" v-model.number="progress" />

  <p :class="['message', hasError ? 'error' : 'ok']">{{ hasError ? 'Something failed' : 'All good' }}</p>
  <button @click="hasError = !hasError">Toggle error</button>
</template>

<style>
.tab { border: 0; padding: 8px 14px; border-radius: 8px; margin-right: 4px; background: #f1f5f9; }
.tab.active { background: #42b883; color: white; }
.bar { height: 10px; background: #e2e8f0; border-radius: 5px; margin: 12px 0; }
.fill { height: 10px; background: #42b883; border-radius: 5px; transition: width .3s; }
.message.ok { color: green; }
.message.error { color: crimson; font-weight: bold; }
</style>` },
        { type: 'note', value: 'An object { active: condition } adds the class when the condition is true. An array combines several classes. Static class and :class merge together.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'directives', q: 'What is the difference between v-if and v-show?', options: ['No difference', 'v-if removes the element; v-show only hides it with CSS', 'v-show is faster to render first', 'v-if is for lists'], answer: 1, explain: 'Use v-show for frequently toggled elements.' },
    { chapterId: 'directives', q: 'What should every v-for element have?', options: ['A class', 'A unique :key', 'An id', 'A v-if'], answer: 1, explain: 'Keys help Vue track items efficiently.' },
    { chapterId: 'directives', q: 'Which modifier stops a form from reloading the page?', options: ['.stop', '.once', '.prevent', '.self'], answer: 2, explain: '@submit.prevent calls preventDefault().' },
    { chapterId: 'directives', q: 'Which v-model modifier converts input to a number?', options: ['.int', '.number', '.lazy', '.trim'], answer: 1, explain: 'v-model.number casts the value.' },
    { chapterId: 'directives', q: 'What does :class="{ active: isActive }" do?', options: ['Always adds active', 'Adds the active class when isActive is true', 'Sets an id', 'Creates a style'], answer: 1, explain: 'Object syntax toggles classes by condition.' },
  ],
};
