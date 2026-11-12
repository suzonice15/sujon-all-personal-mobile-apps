// Flutter chapter: Forms.

export default {
  id: 'forms',
  title: 'Forms & Input',
  description: 'TextField, controllers, validation and the keyboard',
  icon: 'edit',
  lessons: [
    {
      id: 'flutter-textfield',
      title: 'TextField and controllers',
      blocks: [
        { type: 'text', value: 'A TextEditingController reads and sets the text. Dispose it when the widget is removed. Use a Form for validation across several fields.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `class LoginForm extends StatefulWidget {
  const LoginForm({super.key});

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final email = TextEditingController();

  @override
  void dispose() {
    email.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: email,
      keyboardType: TextInputType.emailAddress,
      decoration: const InputDecoration(labelText: 'Email'),
    );
  }
}` },
        { type: 'note', value: 'A controller you forget to dispose keeps listeners alive. Dispose every controller in dispose().' },
      ],
    },
    {
      id: 'flutter-validation',
      title: 'Form validation',
      blocks: [
        { type: 'text', value: 'Wrap fields in a Form with a GlobalKey. Each TextFormField has a validator. On submit, call validate and show the errors.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `final formKey = GlobalKey<FormState>();

Form(
  key: formKey,
  child: Column(
    children: [
      TextFormField(
        decoration: const InputDecoration(labelText: 'Email'),
        validator: (value) =>
          value == null || !value.contains('@') ? 'Enter a valid email' : null,
      ),
      ElevatedButton(
        onPressed: () {
          if (formKey.currentState!.validate()) {
            // submit
          }
        },
        child: const Text('Login'),
      ),
    ],
  ),
)` },
        { type: 'note', value: 'Validate again on the server. The client can be modified, so it is not a security boundary.' },
      ],
    },
    {
      id: 'flutter-keyboard',
      title: 'Keyboard',
      blocks: [
        { type: 'text', value: 'ResizeToAvoidBottomInset keeps content above the keyboard. Wrap scrollable forms in SingleChildScrollView so the focused field can scroll into view.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `Scaffold(
  resizeToAvoidBottomInset: true,
  body: SingleChildScrollView(
    padding: const EdgeInsets.all(16),
    child: Form(
      key: formKey,
      child: Column(children: [/* fields */]),
    ),
  ),
)` },
        { type: 'note', value: 'Test on a small phone with the keyboard open. A button hidden behind the keyboard is a common and avoidable bug.' },
      ],
    },
    {
      id: 'flutter-form-ux',
      title: 'Form UX',
      blocks: [
        { type: 'list', items: [
          'Show errors next to the field',
          'Disable submit while saving',
          'Use the right keyboard type',
          'Set autofill hints for email and password',
          'Do not clear the form after a failed request',
          'Show a success message and a next step',
        ] },
        { type: 'text', value: 'A form is a conversation. Clear labels, immediate feedback and a visible disabled state make it feel trustworthy.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'forms',
      q: 'What does a TextEditingController do?',
      options: ['Styles the field', 'Reads and sets the text', 'Validates the form', 'Starts a route'],
      answer: 1,
      explain: 'It holds the text and selection.',
    },
    {
      chapterId: 'forms',
      q: 'When should a controller be disposed?',
      options: ['Never', 'In dispose()', 'On every build', 'When the app exits'],
      answer: 1,
      explain: 'Dispose releases its listeners.',
    },
    {
      chapterId: 'forms',
      q: 'How do you validate a form?',
      options: ['formKey.currentState!.validate()', 'print(form)', 'setState', 'Navigator.pop'],
      answer: 0,
      explain: 'It runs every field validator.',
    },
    {
      chapterId: 'forms',
      q: 'Why use resizeToAvoidBottomInset?',
      options: ['To hide the keyboard', 'To keep content above the keyboard', 'To add a border', 'To validate'],
      answer: 1,
      explain: 'It resizes the body when the keyboard appears.',
    },
  ],
};
