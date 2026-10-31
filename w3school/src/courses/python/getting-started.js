// Python chapter: Getting Started. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What Python is, where it is used and your first programs',
  icon: 'play-circle-outline',
  lessons: [
    {
      id: 'py-intro',
      title: 'What is Python?',
      blocks: [
        { type: 'text', value: 'Python is a general-purpose programming language famous for readable code. The same language powers websites (Instagram, YouTube backends), data science, machine learning and AI, automation scripts, scientific research and even games.' },
        { type: 'list', items: [
          'Readable: indentation shows structure, so code looks almost like plain English.',
          'Batteries included: a huge standard library for files, dates, JSON, databases, networking and more.',
          'Huge ecosystem on PyPI: Django and FastAPI for the web, pandas and NumPy for data, PyTorch and scikit-learn for AI.',
          'Interpreted and dynamically typed, with optional type hints for big projects.',
          'One of the most requested skills in job posts, and the first language in many universities.',
        ] },
        { type: 'note', value: 'Try it in this app runs real CPython 3.14 on your phone (via WebAssembly). The first run downloads Python once; after that it is cached.' },
      ],
    },
    {
      id: 'py-first-program',
      title: 'Your First Program',
      blocks: [
        { type: 'text', value: 'print() shows values on the screen. Strings go in quotes. Python runs the file from top to bottom, one statement per line; no semicolons, no braces.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`print("Hello, World!")
print("Welcome to CodeNest")

# print accepts several values, separated by spaces
print("2 + 3 =", 2 + 3)

# Change the separator and the line ending
print("2026", "03", "10", sep="-")
print("Loading", end="... ")
print("done")` },
        { type: 'list', items: [
          'Lines starting with # are comments: Python ignores them.',
          'Python is case-sensitive: print works, Print does not.',
          'A program is just a text file ending in .py that you run with: python hello.py',
        ] },
      ],
    },
    {
      id: 'py-indentation',
      title: 'Indentation and Code Blocks',
      blocks: [
        { type: 'text', value: 'Python uses indentation (4 spaces) instead of { } to group code. A line ending with a colon : starts a block, and every line in that block is indented the same amount. Wrong indentation is a syntax error, not just bad style.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`temperature = 34

if temperature > 30:
    print("It is hot today")        # inside the if block
    print("Drink water")            # still inside
print("This always runs")           # back outside the block

for day in ["Sat", "Sun", "Mon"]:
    print("Planning", day)` },
        { type: 'note', value: 'Never mix tabs and spaces. Configure your editor to insert 4 spaces when you press Tab (VS Code does this for .py files by default).' },
      ],
    },
    {
      id: 'py-input-output',
      title: 'Input and Output',
      blocks: [
        { type: 'text', value: 'input() reads a line from the keyboard and always returns a string. Convert it with int() or float() when you need a number.' },
        { type: 'code', lang: 'python', value: String.raw`name = input("What is your name? ")
age = int(input("How old are you? "))
print(f"Hi {name}, next year you will be {age + 1}.")` },
        { type: 'text', value: 'Try it cannot read your keyboard, so in runnable samples we set the values directly. f-strings (f"...{value}...") put values inside text; you will use them everywhere.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`name = "Nadia"          # instead of input("Name: ")
age = int("24")         # input() gives a string, so convert it

print(f"Hi {name}, next year you will be {age + 1}.")
print(f"{name!r} has {len(name)} letters")
print(f"Price: {1499.5:,.2f} Tk")` },
      ],
    },
    {
      id: 'py-setup',
      title: 'Installing Python and Tools',
      blocks: [
        { type: 'list', items: [
          'Windows: download from python.org (tick "Add python.exe to PATH") or install from the Microsoft Store. macOS: brew install python. Linux: usually pre-installed (python3).',
          'Check: python --version (or python3 --version).',
          'Interactive shell (REPL): type python and press Enter; great for quick experiments.',
          'Editor: VS Code with the Python and Pylance extensions, or PyCharm.',
          'Notebooks: Jupyter or Google Colab for data science; code and charts in one document.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`$ python --version
Python 3.14.2

$ python
>>> 2 ** 10
1024
>>> exit()

$ python hello.py
Hello, World!` },
        { type: 'note', value: 'Each project should have its own virtual environment (python -m venv .venv) so packages do not clash. The Modules & Packages chapter shows how.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'getting-started', q: 'Which function prints a value?', options: ['echo()', 'print()', 'console.log()', 'write()'], answer: 1, explain: 'print() writes values to the screen.' },
    { chapterId: 'getting-started', q: 'How does Python mark a code block?', options: ['Curly braces { }', 'begin/end keywords', 'Indentation after a colon', 'Semicolons'], answer: 2, explain: 'A colon starts the block and indentation defines it.' },
    { chapterId: 'getting-started', q: 'What type does input() return?', options: ['int', 'str', 'float', 'It depends on what was typed'], answer: 1, explain: 'input() always returns a string; convert it with int() or float().' },
    { chapterId: 'getting-started', q: 'What starts a comment in Python?', options: ['//', '#', '--', '/*'], answer: 1, explain: 'Everything after # on a line is ignored.' },
    { chapterId: 'getting-started', q: 'What does print("a", "b", sep="-") output?', options: ['a b', 'ab', 'a-b', '"a"-"b"'], answer: 2, explain: 'sep sets the text placed between values.' },
    { chapterId: 'getting-started', q: 'What is an f-string?', options: ['A file string', 'A string with {expressions} inside, prefixed with f', 'A fast string', 'A formatted comment'], answer: 1, explain: 'f"Hi {name}" puts the value of name into the text.' },
  ],
};
