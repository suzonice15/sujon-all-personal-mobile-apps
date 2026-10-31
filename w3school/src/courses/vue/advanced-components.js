// Vue chapter: Advanced Components. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'advanced-components',
  title: 'Advanced Components',
  description: 'Dynamic components, KeepAlive, Teleport, Suspense and directives',
  icon: 'architecture',
  lessons: [
    {
      id: 'vue-dynamic-keepalive',
      title: 'Dynamic Components and KeepAlive',
      blocks: [
        { type: 'text', value: '<component :is="..."> renders whichever component you choose at runtime, perfect for tabs and wizards. Wrap it in <KeepAlive> to keep each tab\'s state when you switch away.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref, shallowRef, defineComponent } from 'vue';

const Notes = defineComponent({
  setup() { return { text: ref('') }; },
  template: '<textarea v-model="text" placeholder="Type, switch tabs, come back" rows="3"></textarea>',
});
const Counter = defineComponent({
  setup() { return { n: ref(0) }; },
  template: '<button @click="n++">Clicked {{ n }}</button>',
});

const tabs = { Notes, Counter };
const current = shallowRef(Notes);   // shallowRef: do not make the component object deeply reactive
const keep = ref(true);
</script>

<template>
  <button v-for="(comp, name) in tabs" :key="name" @click="current = comp">{{ name }}</button>
  <label><input type="checkbox" v-model="keep" /> KeepAlive</label>
  <div style="margin-top: 10px">
    <KeepAlive v-if="keep"><component :is="current" /></KeepAlive>
    <component v-else :is="current" />
  </div>
</template>` },
        { type: 'note', value: 'Turn KeepAlive off, type some notes, switch tabs and back: the text is lost because the component was destroyed.' },
      ],
    },
    {
      id: 'vue-teleport',
      title: 'Teleport',
      blocks: [
        { type: 'text', value: '<Teleport to="body"> renders its content somewhere else in the DOM while it stays part of the component logically. Use it for modals, toasts and tooltips that must escape overflow or z-index of their parents.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>

<template>
  <div style="overflow: hidden; height: 70px; border: 1px dashed gray; padding: 8px">
    Clipped container
    <button @click="open = true">Open modal</button>

    <Teleport to="body">
      <div v-if="open" class="backdrop" @click.self="open = false">
        <div class="modal">
          <h3>Hello from Teleport!</h3>
          <button @click="open = false">Close</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style>
.backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: grid; place-items: center; }
.modal { background: white; padding: 20px; border-radius: 12px; }
</style>` },
      ],
    },
    {
      id: 'vue-custom-directives',
      title: 'Custom Directives',
      blocks: [
        { type: 'text', value: 'Directives add low-level DOM behavior you can reuse with a v- attribute. In <script setup>, any variable named vSomething becomes a v-something directive.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { ref } from 'vue';

const vFocus = { mounted: el => el.focus() };

const vClickOutside = {
  mounted(el, binding) {
    el.__handler = event => { if (!el.contains(event.target)) binding.value(); };
    document.addEventListener('click', el.__handler);
  },
  unmounted(el) {
    document.removeEventListener('click', el.__handler);
  },
};

const menuOpen = ref(false);
</script>

<template>
  <input v-focus placeholder="Focused by v-focus" />
  <div v-click-outside="() => (menuOpen = false)" style="margin-top: 12px; display: inline-block">
    <button @click="menuOpen = !menuOpen">Menu ▾</button>
    <ul v-if="menuOpen" style="border: 1px solid #ddd; padding: 8px 20px">
      <li>Profile</li><li>Settings</li>
    </ul>
  </div>
  <p>Tap outside the menu to close it.</p>
</template>` },
        { type: 'note', value: 'Prefer components and composables for most reuse. Directives are best for small DOM-level behaviors like focus, click-outside or lazy images.' },
      ],
    },
    {
      id: 'vue-render-functions',
      title: 'Render Functions and Suspense',
      blocks: [
        { type: 'text', value: 'Templates compile to render functions. You can write them directly with h() when you need full JavaScript power, for example a heading component whose tag depends on a prop.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { h, defineComponent, ref } from 'vue';

const Heading = defineComponent({
  props: { level: { type: Number, default: 1 } },
  setup(props, { slots }) {
    return () => h('h' + props.level, { style: { color: '#2f855a' } }, slots.default?.());
  },
});

const level = ref(2);
</script>

<template>
  <input type="range" min="1" max="6" v-model.number="level" />
  <Heading :level="level">I am an h{{ level }}</Heading>
</template>` },
        { type: 'heading', value: 'Suspense for async setup' },
        { type: 'code', lang: 'vue', value: `<!-- UserProfile.vue: top-level await makes the component async -->
<script setup>
const user = await fetch('/api/me').then(r => r.json());
</script>
<template><h2>{{ user.name }}</h2></template>

<!-- Parent -->
<Suspense>
  <UserProfile />
  <template #fallback>Loading profile...</template>
</Suspense>` },
        { type: 'note', value: 'Suspense is still marked experimental in Vue. Nuxt uses it heavily; in plain Vue apps, a loading ref is usually simpler.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'advanced-components', q: 'What does <KeepAlive> do?', options: ['Prevents errors', 'Caches inactive components so their state is preserved', 'Keeps the network alive', 'Repeats animations'], answer: 1, explain: 'Switching tabs no longer destroys the component.' },
    { chapterId: 'advanced-components', q: 'Why use <Teleport to="body"> for a modal?', options: ['It is faster', 'To render it outside clipping parents while keeping component logic', 'It is required for v-if', 'For SEO'], answer: 1, explain: 'The DOM moves; the component relationship stays.' },
    { chapterId: 'advanced-components', q: 'In <script setup>, how is a custom directive named vFocus used?', options: ['v:focus', 'v-focus', '@focus', ':focus'], answer: 1, explain: 'vCamelCase becomes v-kebab-case.' },
    { chapterId: 'advanced-components', q: 'What does h() create?', options: ['A hook', 'A virtual DOM node in a render function', 'An HTML file', 'A heading only'], answer: 1, explain: 'Templates compile to h() calls.' },
  ],
};
