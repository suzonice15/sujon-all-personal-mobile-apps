// Vue chapter: TypeScript and Testing. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'typescript-testing',
  title: 'TypeScript and Testing',
  description: 'Type-safe components, unit tests and end-to-end tests',
  icon: 'verified',
  lessons: [
    {
      id: 'vue-typescript',
      title: 'Vue with TypeScript',
      blocks: [
        { type: 'text', value: 'Vue 3 is written in TypeScript and has first-class support. Add lang="ts" to <script setup> and type your props, emits and refs. The "Vue - Official" editor extension checks templates too.' },
        { type: 'code', lang: 'vue', value: `<script setup lang="ts">
import { ref, computed } from 'vue';

interface Course {
  id: string;
  title: string;
  lessons: number;
  level?: 'beginner' | 'advanced';
}

const props = withDefaults(defineProps<{
  course: Course;
  compact?: boolean;
}>(), { compact: false });

const emit = defineEmits<{
  open: [id: string];
  rate: [id: string, stars: number];
}>();

const hovered = ref<boolean>(false);
const label = computed<string>(() => props.course.title + ' · ' + props.course.lessons + ' lessons');
</script>

<template>
  <div @mouseenter="hovered = true" @click="emit('open', course.id)">{{ label }}</div>
</template>` },
        { type: 'list', items: [
          'defineProps<{...}>() declares props from a type, with no runtime object needed.',
          'withDefaults() adds default values.',
          'defineEmits<{ event: [args] }>() types each event and its arguments.',
          'Run vue-tsc --noEmit in CI to type-check the whole project.',
        ] },
      ],
    },
    {
      id: 'vue-test-utils',
      title: 'Unit Testing with Vitest and Vue Test Utils',
      blocks: [
        { type: 'text', value: 'Vitest is the test runner made by the Vite team, and Vue Test Utils mounts components in tests. create-vue can set both up for you.' },
        { type: 'code', lang: 'vue', value: `<!-- Counter.vue -->
<script setup>
import { ref } from 'vue';
const props = defineProps({ start: { type: Number, default: 0 } });
const count = ref(props.start);
const emit = defineEmits(['change']);
function increment() {
  count.value++;
  emit('change', count.value);
}
</script>

<template>
  <p>Count: {{ count }}</p>
  <button @click="increment">Increment</button>
</template>` },
        { type: 'code', lang: 'js', value: `// Counter.spec.js
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Counter from './Counter.vue';

describe('Counter', () => {
  it('starts from the start prop', () => {
    const wrapper = mount(Counter, { props: { start: 5 } });
    expect(wrapper.text()).toContain('Count: 5');
  });

  it('increments and emits change', async () => {
    const wrapper = mount(Counter);
    await wrapper.get('button').trigger('click');     // await: DOM updates are async
    expect(wrapper.text()).toContain('Count: 1');
    expect(wrapper.emitted('change')[0]).toEqual([1]);
  });
});` },
        { type: 'note', value: 'Testing Library also has a Vue version (@testing-library/vue) if you prefer querying by role and text, as in the React course.' },
      ],
    },
    {
      id: 'vue-e2e',
      title: 'End-to-End Tests',
      blocks: [
        { type: 'text', value: 'Playwright and Cypress both work with Vue apps. E2E tests drive a real browser through critical user journeys.' },
        { type: 'code', lang: 'js', value: `// e2e/cart.spec.js (Playwright)
import { test, expect } from '@playwright/test';

test('student can add a course to the cart and check out', async ({ page }) => {
  await page.goto('/courses');
  await page.getByRole('button', { name: 'Add Vue course' }).click();
  await expect(page.getByTestId('cart-count')).toHaveText('1');
  await page.getByRole('link', { name: 'Checkout' }).click();
  await expect(page).toHaveURL(/checkout/);
});` },
        { type: 'note', value: 'Write many fast unit tests, some component tests, and only a few E2E tests for the most important flows.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'typescript-testing', q: 'How do you enable TypeScript in a .vue file?', options: ['<script ts>', '<script setup lang="ts">', 'A .ts template', 'It is not possible'], answer: 1, explain: 'lang="ts" turns on TypeScript for that block.' },
    { chapterId: 'typescript-testing', q: 'Which function adds defaults to type-based props?', options: ['defaultProps', 'withDefaults', 'defineDefaults', 'propsDefault'], answer: 1, explain: 'withDefaults(defineProps<...>(), { ... }).' },
    { chapterId: 'typescript-testing', q: 'Why await trigger("click") in Vue Test Utils?', options: ['It returns a promise for the DOM update', 'Clicks are network requests', 'It is optional styling', 'To slow down tests'], answer: 0, explain: 'Vue updates the DOM asynchronously.' },
  ],
};
