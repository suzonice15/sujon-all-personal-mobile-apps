// Django chapter: Forms & Validation.

export default {
  id: 'forms',
  title: 'Forms & Validation',
  description: 'Django forms, model forms and clean methods',
  icon: 'edit-note',
  lessons: [
    {
      id: 'dj-forms',
      title: 'Forms',
      blocks: [
        { type: 'text', value: 'A Django form validates input and renders HTML fields. It handles CSRF, required fields, types and error messages. Custom rules go in clean() or clean_<field>().' },
        { type: 'code', lang: 'python', tryIt: false, value: `from django import forms

class CourseForm(forms.Form):
    title = forms.CharField(max_length=200)
    price = forms.IntegerField(min_value=0)

    def clean_title(self):
        title = self.cleaned_data["title"].strip()
        if len(title) < 3:
            raise forms.ValidationError("Title is too short")
        return title` },
        { type: 'note', value: 'Validation belongs in the form for input shape and in the service or model for business rules. Never trust data from the client.' },
      ],
    },
    {
      id: 'dj-model-forms',
      title: 'Model forms',
      blocks: [
        { type: 'text', value: 'A ModelForm builds a form from a model, so fields and validation stay in sync. Use fields or exclude explicitly; never include every field blindly.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from django.forms import ModelForm
from .models import Course

class CourseModelForm(ModelForm):
    class Meta:
        model = Course
        fields = ["title", "price", "published"]

# In a view
form = CourseModelForm(request.POST)
if form.is_valid():
    course = form.save()` },
        { type: 'note', value: 'Explicit fields prevent a mass-assignment bug where a client sets a field such as is_admin or price.' },
      ],
    },
    {
      id: 'dj-csrf',
      title: 'CSRF and security',
      blocks: [
        { type: 'text', value: 'Django protects POST forms with a CSRF token. Include {% csrf_token %} in every form. For APIs, use the CSRF-exempt token flow only with proper authentication.' },
        { type: 'code', lang: 'html', tryIt: false, value: `<form method="post">
  {% csrf_token %}
  {{ form.as_p }}
  <button type="submit">Save</button>
</form>` },
        { type: 'list', items: [
          'Include the CSRF token in every POST form',
          'Use POST, never GET, for changes',
          'Validate on the server, not only in the browser',
          'Escape output; do not disable autoescaping globally',
        ] },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'forms',
      q: 'What does a Django form handle?',
      options: ['Only rendering', 'Validation, rendering and CSRF', 'Database migrations', 'Routing'],
      answer: 1,
      explain: 'Forms handle input, errors and CSRF.',
    },
    {
      chapterId: 'forms',
      q: 'Where does a custom field rule go?',
      options: ['In urls.py', 'In clean_<field>', 'In models only', 'In the template'],
      answer: 1,
      explain: 'clean_<field> validates one field.',
    },
    {
      chapterId: 'forms',
      q: 'Why list fields explicitly in a ModelForm?',
      options: ['It is shorter', 'To prevent mass assignment of sensitive fields', 'To improve speed', 'To enable CSRF'],
      answer: 1,
      explain: 'Explicit fields limit what a client can set.',
    },
    {
      chapterId: 'forms',
      q: 'What does {% csrf_token %} do?',
      options: ['Creates a session', 'Adds the CSRF protection token', 'Encrypts the form', 'Validates input'],
      answer: 1,
      explain: 'It protects POST requests from CSRF.',
    },
  ],
};
