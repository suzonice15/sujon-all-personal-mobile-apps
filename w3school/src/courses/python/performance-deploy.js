// Python chapter: Performance and Deployment. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'performance-deploy',
  title: 'Performance & Deployment',
  description: 'Profiling, optimisation, caching, packaging, Docker, CI and production servers',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'py-profiling',
      title: 'Measure First: timeit and cProfile',
      blocks: [
        { type: 'text', value: 'Never guess where code is slow. Time small snippets with timeit, and find the slow functions in a real program with a profiler (cProfile, or py-spy and Scalene on production code).' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import timeit, cProfile, pstats, io

setup = "nums = list(range(10_000))"
print("loop + append :", round(timeit.timeit("r = []\nfor n in nums: r.append(n * 2)", setup, number=200), 3), "s")
print("comprehension :", round(timeit.timeit("[n * 2 for n in nums]", setup, number=200), 3), "s")
print("join strings  :", round(timeit.timeit("''.join(str(n) for n in nums)", setup, number=200), 3), "s")

def slow_report():
    data = [str(i) for i in range(30_000)]
    text = ""
    for d in data:
        text += d + ","            # repeated string building
    return sorted(data, key=lambda s: int(s))

profiler = cProfile.Profile()
profiler.enable()
slow_report()
profiler.disable()

buf = io.StringIO()
pstats.Stats(profiler, stream=buf).sort_stats("cumulative").print_stats(5)
print("\n".join(buf.getvalue().splitlines()[:14]))` },
      ],
    },
    {
      id: 'py-optimisation',
      title: 'Making Python Fast',
      blocks: [
        { type: 'list', items: [
          'Pick the right data structure first: set/dict lookups instead of list scans.',
          'Use built-ins and the standard library (sum, sorted, collections, itertools): they run in C.',
          'Vectorise numeric work with NumPy or pandas instead of Python loops.',
          'Cache repeated work (functools.cache, Redis for web apps).',
          'For I/O-bound apps use concurrency (asyncio, threads); for CPU-bound use multiprocessing.',
          'When a hot loop must be faster: Cython, Numba (JIT for numeric code), or rewrite that piece in Rust with PyO3.',
          'Newer Python versions are faster: 3.11 was 25% faster than 3.10 on average; upgrade regularly.',
        ] },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import time
from functools import cache

def timed(label, fn):
    t = time.perf_counter(); result = fn(); print(f"{label:<28} {time.perf_counter() - t:.4f}s"); return result

banned = [f"user{i}" for i in range(5000)]
banned_set = set(banned)
users = [f"user{i}" for i in range(0, 20000, 3)]

timed("list membership", lambda: [u for u in users if u in banned])
timed("set membership", lambda: [u for u in users if u in banned_set])

def fib(n): return n if n < 2 else fib(n - 1) + fib(n - 2)
@cache
def fib_cached(n): return n if n < 2 else fib_cached(n - 1) + fib_cached(n - 2)
timed("fib(24) no cache", lambda: fib(24))
timed("fib(24) with @cache", lambda: fib_cached(24))

import numpy as np
values = list(range(1_000_000))
arr = np.arange(1_000_000)
timed("sum of squares (Python)", lambda: sum(v * v for v in values))
timed("sum of squares (NumPy)", lambda: int((arr.astype(np.int64) ** 2).sum()))` },
      ],
    },
    {
      id: 'py-packaging',
      title: 'Packaging and Publishing',
      blocks: [
        { type: 'code', lang: 'text', value: String.raw`# Build a wheel and source distribution from pyproject.toml
$ uv build                       # or: python -m build
dist/codenest_shop-1.0.0-py3-none-any.whl
dist/codenest_shop-1.0.0.tar.gz

# Publish to PyPI (test first on test.pypi.org)
$ uv publish                     # or: twine upload dist/*

# Anyone can now:
$ pip install codenest-shop
$ shop --help                    # the command from [project.scripts]` },
        { type: 'list', items: [
          'Use semantic versioning: MAJOR.MINOR.PATCH.',
          'Keep the code in src/ (the "src layout") so tests run against the installed package.',
          'Pin exact versions in applications (lock file); use version ranges in libraries.',
        ] },
      ],
    },
    {
      id: 'py-deploy',
      title: 'Deploying Python Web Apps',
      blocks: [
        { type: 'code', lang: 'text', value: String.raw`# Dockerfile for a FastAPI app
FROM python:3.14-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev
COPY . .
EXPOSE 8000
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]

# Django: gunicorn config.wsgi:application --workers 4   (behind Nginx, which serves /static)` },
        { type: 'code', lang: 'text', value: String.raw`# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v6
      - run: uv sync
      - run: uv run ruff check .
      - run: uv run mypy src
      - run: uv run pytest --cov=src` },
        { type: 'list', items: [
          'Configuration from environment variables (pydantic-settings or django-environ), never secrets in git.',
          'Run several worker processes (uvicorn --workers, gunicorn) behind Nginx or a cloud load balancer, with HTTPS.',
          'Background jobs: Celery, RQ or arq with Redis; scheduled jobs with Celery beat or cron.',
          'Observability: structured logs, error tracking (Sentry), metrics and health-check endpoints.',
          'Hosting options: a VPS with Docker, Render, Railway, Fly.io, AWS (ECS, Lambda), Google Cloud Run.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'performance-deploy', q: 'What should you do before optimising code?', options: ['Rewrite it in C', 'Measure with timeit or a profiler to find the real bottleneck', 'Add threads', 'Remove comments'], answer: 1, explain: 'Guesses about performance are usually wrong.' },
    { chapterId: 'performance-deploy', q: 'Which tool shows how much time each function takes?', options: ['pip', 'cProfile', 'venv', 'ruff'], answer: 1, explain: 'cProfile (or py-spy, Scalene) profiles a running program.' },
    { chapterId: 'performance-deploy', q: 'What is the best first fix for slow membership checks in a big list?', options: ['Use threads', 'Convert it to a set', 'Sort it every time', 'Use recursion'], answer: 1, explain: 'set lookups are O(1).' },
    { chapterId: 'performance-deploy', q: 'Which command builds a wheel from pyproject.toml?', options: ['pip freeze', 'uv build (or python -m build)', 'python setup.py run', 'pip wheel-it'], answer: 1, explain: 'The wheel goes to dist/.' },
    { chapterId: 'performance-deploy', q: 'How should a FastAPI app run in production?', options: ['fastapi dev on a laptop', 'Several uvicorn/gunicorn workers behind Nginx or a load balancer with HTTPS', 'python main.py in a terminal', 'Inside Jupyter'], answer: 1, explain: 'The development server is not meant for production traffic.' },
  ],
};
