// Vue chapter: Forms and Server Data. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'forms-data',
  title: 'Forms and Server Data',
  description: 'Validation and data fetching for real apps',
  icon: 'cloud-sync',
  lessons: [
    {
      id: 'vue-form-validation',
      title: 'Form Validation',
      blocks: [
        { type: 'text', value: 'Good validation shows errors after a field is touched, explains how to fix them, and blocks double submits. Computed properties make the rules clean.' },
        { type: 'code', lang: 'vue', tryIt: true, value: `<script setup>
import { reactive, computed, ref } from 'vue';

const form = reactive({ name: '', email: '', password: '' });
const touched = reactive({});
const status = ref('idle');

const errors = computed(() => ({
  name: form.name.trim().length >= 2 ? '' : 'At least 2 characters',
  email: /^[^@\\s]+@[^@\\s]+\\.[a-z]{2,}$/i.test(form.email) ? '' : 'Enter a valid email',
  password: form.password.length >= 8 ? '' : 'Use 8 or more characters',
}));
const isValid = computed(() => Object.values(errors.value).every(e => !e));

async function submit() {
  Object.keys(form).forEach(k => { touched[k] = true; });
  if (!isValid.value) return;
  status.value = 'sending';
  await new Promise(r => setTimeout(r, 900));
  status.value = 'done';
}
</script>

<template>
  <h3 v-if="status === 'done'">🎉 Welcome, {{ form.name }}!</h3>
  <form v-else @submit.prevent="submit" novalidate>
    <div v-for="field in ['name', 'email', 'password']" :key="field" style="margin-bottom: 10px">
      <input v-model="form[field]" :type="field === 'password' ? 'password' : 'text'" :placeholder="field"
             @blur="touched[field] = true" :style="{ borderColor: touched[field] && errors[field] ? 'crimson' : '#cbd5e1' }" />
      <div v-if="touched[field] && errors[field]" style="color: crimson; font-size: 13px">{{ errors[field] }}</div>
    </div>
    <button :disabled="status === 'sending'">{{ status === 'sending' ? 'Creating...' : 'Create account' }}</button>
  </form>
</template>` },
        { type: 'heading', value: 'Larger forms: VeeValidate + Zod' },
        { type: 'code', lang: 'vue', value: `<script setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(z.object({
    email: z.string().email('Invalid email'),
    age: z.coerce.number().min(18, 'You must be 18+'),
  })),
});
const [email] = defineField('email');
const [age] = defineField('age');
const onSubmit = handleSubmit(values => api.signup(values));
</script>

<template>
  <form @submit="onSubmit">
    <input v-model="email" /> <span>{{ errors.email }}</span>
    <input v-model="age" /> <span>{{ errors.age }}</span>
    <button :disabled="isSubmitting">Sign up</button>
  </form>
</template>` },
      ],
    },
    {
      id: 'vue-query',
      title: 'Server State with TanStack Vue Query',
      blocks: [
        { type: 'text', value: 'TanStack Query also exists for Vue. It caches server data, deduplicates requests, refetches in the background and handles retries, replacing most hand-written fetching code.' },
        { type: 'code', lang: 'vue', value: `<script setup>
import { computed } from 'vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';

const props = defineProps({ courseId: String });
const queryClient = useQueryClient();

const { data: course, isPending, isError, error } = useQuery({
  queryKey: computed(() => ['course', props.courseId]),   // reactive key: refetches when the id changes
  queryFn: () => fetch('/api/courses/' + props.courseId).then(r => r.json()),
  staleTime: 60_000,
});

const enroll = useMutation({
  mutationFn: () => fetch('/api/courses/' + props.courseId + '/enroll', { method: 'POST' }),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['my-courses'] }),
});
</script>

<template>
  <p v-if="isPending">Loading...</p>
  <p v-else-if="isError">{{ error.message }}</p>
  <div v-else>
    <h1>{{ course.title }}</h1>
    <button @click="enroll.mutate()" :disabled="enroll.isPending.value">Enroll</button>
  </div>
</template>` },
        { type: 'note', value: 'Keep server data in Vue Query and client-only state (theme, open panels, cart before checkout) in Pinia or local refs.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'forms-data', q: 'Which Vue feature is ideal for validation rules that depend on form values?', options: ['watchEffect', 'computed', 'onMounted', 'v-html'], answer: 1, explain: 'Errors are derived values, so computed fits perfectly.' },
    { chapterId: 'forms-data', q: 'Why make a Vue Query queryKey a computed value?', options: ['For styling', 'So the query refetches when a reactive id changes', 'It is required for mutations', 'To disable caching'], answer: 1, explain: 'A reactive key creates a new query per id.' },
    { chapterId: 'forms-data', q: 'Where should server data like a course list live?', options: ['In Pinia always', 'In a query library cache such as Vue Query', 'In localStorage', 'In a global variable'], answer: 1, explain: 'Server state needs caching and refetching.' },
  ],
};
