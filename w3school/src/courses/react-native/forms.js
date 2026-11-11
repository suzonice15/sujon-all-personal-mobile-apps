// React Native chapter: Forms.

export default {
  id: 'forms',
  title: 'Forms & Input',
  description: 'Controlled inputs, validation and the keyboard',
  icon: 'edit',
  lessons: [
    {
      id: 'rn-textinput',
      title: 'TextInput',
      blocks: [
        { type: 'text', value: 'TextInput is controlled when its value comes from state and onChangeText updates that state. Configure keyboardType, autoCapitalize and secureTextEntry for the field.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import { useState } from 'react';
import { TextInput, View } from 'react-native';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ padding: 20, gap: 12 }}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
    </View>
  );
}` },
        { type: 'note', value: 'Always set autoCapitalize="none" and autoCorrect={false} for email and username fields. The keyboard otherwise fights the user.' },
      ],
    },
    {
      id: 'rn-validation',
      title: 'Validation',
      blocks: [
        { type: 'text', value: 'Validate on submit, show a clear message per field and disable the button while submitting. Validate again on the server; the app cannot be trusted.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `function validate({ email, password }) {
  const errors = {};
  if (!email.includes('@')) errors.email = 'Enter a valid email';
  if (password.length < 8) errors.password = 'Use at least 8 characters';
  return errors;
}

const handleSubmit = async () => {
  const errors = validate({ email, password });
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }
  setLoading(true);
  try {
    await login(email, password);
  } finally {
    setLoading(false);
  }
};` },
        { type: 'note', value: 'Disable the submit button while a request is in flight. Double taps create duplicate requests and confusing states.' },
      ],
    },
    {
      id: 'rn-keyboard',
      title: 'Keyboard handling',
      blocks: [
        { type: 'text', value: 'The keyboard covers the lower part of the screen. KeyboardAvoidingView moves content up. ScrollView with keyboardShouldPersistTaps lets a button receive a tap while the keyboard is open.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import { KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';

export default function Form() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 20 }}>
        <TextInput placeholder="Name" />
        <TextInput placeholder="Email" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}` },
        { type: 'note', value: 'Android usually resizes the window when adjustResize is set. iOS needs KeyboardAvoidingView. Test on both.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'forms',
      q: 'What makes a TextInput controlled?',
      options: ['A placeholder', 'value from state and onChangeText', 'A ref only', 'A style'],
      answer: 1,
      explain: 'The value is driven by state and updated through the change handler.',
    },
    {
      chapterId: 'forms',
      q: 'Why set autoCapitalize="none" for email?',
      options: ['It looks better', 'Emails are case sensitive in practice and capital letters annoy users', 'It enables validation', 'It hides the keyboard'],
      answer: 1,
      explain: 'Usernames and emails should not be auto-capitalised.',
    },
    {
      chapterId: 'forms',
      q: 'When should validation run?',
      options: ['Only on the server', 'On submit and again on the server', 'Never', 'Only while typing'],
      answer: 1,
      explain: 'Client validation improves UX; server validation is the real guarantee.',
    },
    {
      chapterId: 'forms',
      q: 'What does keyboardShouldPersistTaps="handled" do?',
      options: ['Closes the keyboard immediately', 'Lets a button press work while the keyboard is open', 'Hides the keyboard', 'Prevents scrolling'],
      answer: 1,
      explain: 'Without it the first tap only dismisses the keyboard.',
    },
  ],
};
