// Python chapter: Modules, Packages and Environments. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Try it has a small in-memory file system, so samples can create and import modules.

export default {
  id: 'modules-packages',
  title: 'Modules, Packages & pip',
  description: 'import, __name__, packages, virtual environments, pip, uv and pyproject.toml',
  icon: 'inventory',
  lessons: [
    {
      id: 'py-imports',
      title: 'Importing Modules',
      blocks: [
        { type: 'text', value: 'A module is a .py file. import runs it once and gives you its names. The standard library has hundreds of modules ready to use.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import math
import random as rnd                       # alias
from datetime import date, timedelta       # import specific names
from collections import Counter

print(math.sqrt(144), math.pi, math.ceil(4.1))
rnd.seed(1)
print(rnd.choice(["red", "green", "blue"]), rnd.randint(1, 6))
print(date(2026, 3, 10) + timedelta(days=30))
print(Counter("banana"))

# What does a module contain?
print([name for name in dir(math) if not name.startswith("_")][:10])

# Modules are cached: importing twice runs the file once
import sys
print("math" in sys.modules)` },
        { type: 'note', value: 'Avoid "from module import *": it hides where names come from and can overwrite your own variables.' },
      ],
    },
    {
      id: 'py-own-modules',
      title: 'Your Own Modules and __name__',
      blocks: [
        { type: 'text', value: 'Every module has a __name__. When a file is run directly it is "__main__"; when imported it is the module\'s name. The if __name__ == "__main__": guard runs code only when the file is executed as a script.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import sys, pathlib, textwrap

# Create a module file (normally you just write pricing.py in your editor)
pathlib.Path("pricing.py").write_text(textwrap.dedent('''
    """Price helpers for the shop."""
    VAT = 0.05

    def with_vat(amount):
        return round(amount * (1 + VAT), 2)

    def _private_helper():          # leading underscore = internal
        return "not part of the API"

    if __name__ == "__main__":
        print("Running pricing.py directly")
    else:
        print(f"pricing imported (__name__ = {__name__!r})")
'''))
sys.path.insert(0, ".")

import pricing
from pricing import with_vat

print(pricing.VAT, with_vat(1000))
print(pricing.__doc__)
print(__name__)                     # this file is the main program` },
      ],
    },
    {
      id: 'py-packages',
      title: 'Packages and Project Layout',
      blocks: [
        { type: 'text', value: 'A package is a folder of modules, usually with an __init__.py. Use absolute imports (from shop.models import Product) in applications.' },
        { type: 'code', lang: 'text', value: String.raw`shop-project/
├── pyproject.toml
├── README.md
├── src/
│   └── shop/
│       ├── __init__.py          # makes "shop" a package; can expose the public API
│       ├── models.py
│       ├── services/
│       │   ├── __init__.py
│       │   └── checkout.py      # from shop.models import Product
│       └── __main__.py          # runs with: python -m shop
└── tests/
    └── test_checkout.py` },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import pathlib, sys, textwrap

root = pathlib.Path("demo_src")
(root / "shop" / "services").mkdir(parents=True, exist_ok=True)
(root / "shop" / "__init__.py").write_text('from .models import Product\n__all__ = ["Product"]\n__version__ = "1.0.0"\n')
(root / "shop" / "models.py").write_text(textwrap.dedent('''
    from dataclasses import dataclass

    @dataclass
    class Product:
        name: str
        price: int
'''))
(root / "shop" / "services" / "__init__.py").write_text("")
(root / "shop" / "services" / "checkout.py").write_text(textwrap.dedent('''
    from ..models import Product          # relative import inside the package

    def total(products: list[Product]) -> int:
        return sum(p.price for p in products)
'''))
sys.path.insert(0, str(root))

import shop
from shop.services.checkout import total

cart = [shop.Product("Keyboard", 1500), shop.Product("Mouse", 450)]
print(shop.__version__, total(cart))
print(sorted(p.name for p in root.rglob("*.py")))` },
      ],
    },
    {
      id: 'py-venv-pip',
      title: 'Virtual Environments and pip',
      blocks: [
        { type: 'text', value: 'Install packages per project inside a virtual environment, never globally. Then two projects can use different versions of Django without conflict.' },
        { type: 'code', lang: 'text', value: String.raw`$ python -m venv .venv                # create
$ .venv\Scripts\activate              # Windows
$ source .venv/bin/activate           # macOS / Linux
(.venv) $ pip install requests "django>=5.1,<6"
(.venv) $ pip list
(.venv) $ pip freeze > requirements.txt
(.venv) $ pip install -r requirements.txt     # on another machine
(.venv) $ deactivate` },
        { type: 'text', value: 'uv is a modern, very fast replacement for pip, venv and more (written in Rust). Many teams now use it.' },
        { type: 'code', lang: 'text', value: String.raw`$ uv init shop && cd shop          # project with pyproject.toml
$ uv add fastapi "sqlalchemy>=2"    # add dependencies (creates .venv and uv.lock)
$ uv add --dev pytest ruff
$ uv run python main.py             # run inside the project environment
$ uv sync                           # install exactly what uv.lock says` },
        { type: 'note', value: 'Add .venv/ to .gitignore. Commit pyproject.toml and the lock file (uv.lock or requirements.txt) so everyone installs the same versions.' },
      ],
    },
    {
      id: 'py-pyproject',
      title: 'pyproject.toml',
      blocks: [
        { type: 'text', value: 'pyproject.toml is the standard file describing a Python project: its name, version, dependencies and tool settings (pytest, ruff, mypy).' },
        { type: 'code', lang: 'text', value: String.raw`[project]
name = "codenest-shop"
version = "1.0.0"
description = "Online shop backend"
requires-python = ">=3.12"
dependencies = [
    "fastapi>=0.115",
    "sqlalchemy>=2.0",
    "pydantic>=2.9",
]

[project.optional-dependencies]
dev = ["pytest>=8", "ruff>=0.7", "mypy>=1.13"]

[project.scripts]
shop = "shop.cli:main"          # installs a "shop" command

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.ruff]
line-length = 100

[tool.pytest.ini_options]
testpaths = ["tests"]` },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import tomllib       # read TOML files (standard library since 3.11)

config = tomllib.loads('''
[project]
name = "codenest-shop"
version = "1.0.0"
dependencies = ["fastapi>=0.115", "sqlalchemy>=2.0"]

[tool.ruff]
line-length = 100
''')
print(config["project"]["name"], config["project"]["version"])
print(config["project"]["dependencies"])
print(config["tool"]["ruff"]["line-length"])` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'modules-packages', q: 'What is __name__ when a file is run directly?', options: ['The file name', '"__main__"', '"main"', 'None'], answer: 1, explain: 'When imported, __name__ is the module name instead.' },
    { chapterId: 'modules-packages', q: 'Why use a virtual environment?', options: ['It makes Python faster', 'Each project gets its own isolated packages and versions', 'It is required by Python', 'To hide code'], answer: 1, explain: 'Projects stop fighting over package versions.' },
    { chapterId: 'modules-packages', q: 'How do you save installed packages for others?', options: ['pip save', 'pip freeze > requirements.txt (or a lock file)', 'pip export', 'python -m save'], answer: 1, explain: 'Others run pip install -r requirements.txt.' },
    { chapterId: 'modules-packages', q: 'What does importing a module twice do?', options: ['Runs it twice', 'Runs it once; the second import uses the cache in sys.modules', 'Raises an error', 'Reloads it'], answer: 1, explain: 'Modules are cached after the first import.' },
    { chapterId: 'modules-packages', q: 'Which file is the modern standard for project metadata and dependencies?', options: ['setup.cfg', 'pyproject.toml', 'package.json', 'Makefile'], answer: 1, explain: 'pyproject.toml holds metadata, dependencies and tool settings.' },
    { chapterId: 'modules-packages', q: 'What does a leading underscore in _helper() mean?', options: ['It is private and enforced', 'It is internal by convention, not part of the public API', 'It is faster', 'It is a constant'], answer: 1, explain: 'Python does not enforce privacy; underscores are a convention.' },
  ],
};
