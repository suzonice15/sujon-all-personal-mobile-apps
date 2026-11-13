// Flask chapter: Forms & Validation.

export default {
  id: 'forms',
  title: 'Forms & Validation',
  description: 'WTForms, CSRF and clean serverside checks',
  icon: 'edit-note',
  lessons: [
    {
      id: 'flask-wtforms',
      title: 'WTForms',
      blocks: [
        { type: 'text', value: 'WTForms defines fields and validators in Python. Flask-WTF adds CSRF protection and integrates with request.form. Validation runs on submit and produces field errors.' },
        { type: 'code', lang: 'python', tryIt: false, value: `from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange

class CourseForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), Length(min=3, max=200)])
    price = IntegerField("Price", validators=[NumberRange(min=0)])` },
        { type: 'note', value: 'Set SECRET_KEY so CSRF tokens can be signed. A random key per environment is required.' },
      ],
    },
    {
      id: 'flask-form-view',
      title: 'Handling a form',
      blocks: [
        { type: 'text', value: 'Check validate_on_submit(), then save. On failure, re-render the form with the errors. Redirect after a successful POST to avoid duplicate submissions.' },
        { type: 'code', lang: 'python', tryIt: false, value: `@app.route("/courses/new", methods=["GET", "POST"])
def create_course():
    form = CourseForm()
    if form.validate_on_submit():
        course = Course(title=form.title.data, price=form.price.data)
        db.session.add(course)
        db.session.commit()
        return redirect(url_for("course_list"))
    return render_template("courses/form.html", form=form)` },
        { type: 'note', value: 'Redirect after POST is the standard pattern. Refreshing a POST page otherwise resubmits the form.' },
      ],
    },
    {
      id: 'flask-validation',
      title: 'Validation rules',
      blocks: [
        { type: 'list', items: [
          'Validate on the server, always',
          'Use Length and NumberRange for shape',
          'Check business rules in the service',
          'Show errors next to the field',
          'Never trust hidden fields or disabled inputs',
        ] },
        { type: 'text', value: 'Client-side validation improves the experience but is not security. A request can skip the browser entirely.' },
        { type: 'note', value: 'A clear error message prevents a support ticket. "Price must be zero or more" beats "Invalid input".' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'forms',
      q: 'What does Flask-WTF add?',
      options: ['A database', 'CSRF protection and form integration', 'Templates', 'Routing'],
      answer: 1,
      explain: 'It adds CSRF and request.form handling.',
    },
    {
      chapterId: 'forms',
      q: 'Why redirect after a successful POST?',
      options: ['To speed up', 'To avoid resubmitting on refresh', 'To enable CSRF', 'To clear the database'],
      answer: 1,
      explain: 'It prevents duplicate submissions.',
    },
    {
      chapterId: 'forms',
      q: 'Where must validation happen?',
      options: ['Only in the browser', 'On the server', 'Only in HTML', 'In CSS'],
      answer: 1,
      explain: 'The server is the trust boundary.',
    },
    {
      chapterId: 'forms',
      q: 'What does SECRET_KEY protect?',
      options: ['The database', 'Signed CSRF tokens and sessions', 'Static files', 'Routes'],
      answer: 1,
      explain: 'It signs session and CSRF data.',
    },
  ],
};
