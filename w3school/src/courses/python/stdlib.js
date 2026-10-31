// Python chapter: The Standard Library. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'stdlib',
  title: 'The Standard Library',
  description: 'datetime, zoneinfo, re, math, statistics, random, secrets, enum, os, sys',
  icon: 'local-library',
  lessons: [
    {
      id: 'py-datetime',
      title: 'Dates, Times and Time Zones',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from datetime import date, datetime, timedelta, timezone
from zoneinfo import ZoneInfo

d = date(2026, 3, 10)
print(d, d.year, d.strftime("%A %d %B %Y"), d.isoweekday())

dhaka = ZoneInfo("Asia/Dhaka")
order_time = datetime(2026, 3, 10, 18, 45, tzinfo=dhaka)       # timezone-aware
print(order_time, order_time.astimezone(timezone.utc))
print(order_time.astimezone(ZoneInfo("Europe/London")).strftime("%H:%M %Z"))

delivery = order_time + timedelta(days=3, hours=2)
print("Delivery:", delivery.strftime("%a %d %b %H:%M"))

birth = date(2001, 7, 25)
print("Days alive on", d, "=", (d - birth).days)

parsed = datetime.strptime("25/12/2026 09:30", "%d/%m/%Y %H:%M")
print(parsed.isoformat(), datetime.fromisoformat("2026-12-25T09:30:00+06:00"))

# Store in UTC, display in the user's zone
now_utc = datetime(2026, 3, 10, 6, 0, tzinfo=timezone.utc)
print(now_utc.astimezone(dhaka).strftime("%d %b %Y, %I:%M %p"))` },
        { type: 'note', value: 'Naive datetimes (without tzinfo) cause bugs as soon as users are in different time zones. Store aware datetimes in UTC and convert only for display.' },
      ],
    },
    {
      id: 'py-re',
      title: 'Regular Expressions with re',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import re

print(bool(re.fullmatch(r"01[3-9]\d{8}", "01712345678")))       # Bangladeshi mobile number
print(bool(re.fullmatch(r"01[3-9]\d{8}", "0123")))

m = re.search(r"(\d{4})-(\d{2})-(\d{2})", "Due: 2026-12-16")
print(m.group(0), m.groups(), m.group(1))

m = re.search(r"(?P<user>[\w.]+)@(?P<domain>[\w.-]+)", "mail nadia.k@codenest.app")
print(m["user"], m["domain"], m.groupdict())

print(re.findall(r"#(\w+)", "Learning #python and #django on #codenest"))
print(re.sub(r"\s+", " ", "too    many     spaces"))
print(re.sub(r"(\d{3})\d{5}(\d{3})", r"\1*****\2", "01712345678"))    # mask
print(re.split(r"[,;|]\s*", "python, sql;django| redis"))

# Compile patterns you reuse, and use flags
EMAIL = re.compile(r"^[\w.+-]+@[\w-]+\.[\w.]+$", re.IGNORECASE)
print([e for e in ["a@x.com", "bad@", "B.C@Mail.ORG"] if EMAIL.match(e)])

def slugify(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
print(slugify("  Python 3.14: What's New?! "))` },
        { type: 'note', value: 'Always write patterns as raw strings (r"\\d+") so backslashes reach the regex engine unchanged.' },
      ],
    },
    {
      id: 'py-math-stats-random',
      title: 'math, statistics, random and secrets',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import math, statistics as st, random, secrets

print(math.sqrt(2), math.floor(-2.5), math.ceil(2.1), math.gcd(48, 18), math.lcm(4, 6))
print(math.comb(10, 3), math.perm(5, 2), math.factorial(10), math.isclose(0.1 + 0.2, 0.3))
print(math.log10(1000), math.log2(1024), round(math.sin(math.pi / 2), 3), math.inf > 10**100)

marks = [56, 78, 91, 78, 64, 85, 99]
print(st.mean(marks), st.median(marks), st.mode(marks), round(st.stdev(marks), 2))
print(st.quantiles(marks, n=4))

random.seed(42)                          # reproducible results (tests, simulations)
print(random.random(), random.randint(1, 6), random.choice("ABCD"))
deck = list(range(1, 11))
random.shuffle(deck)
print(deck, random.sample(deck, 3))

# secrets: for passwords, tokens and OTPs (random is predictable!)
print(secrets.token_hex(16))
print(secrets.token_urlsafe(16))
print(f"{secrets.randbelow(1_000_000):06d}", "(OTP)")` },
      ],
    },
    {
      id: 'py-enum',
      title: 'Enums',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from enum import Enum, IntEnum, StrEnum, Flag, auto

class OrderStatus(StrEnum):
    PENDING = auto()          # "pending"
    PAID = auto()
    SHIPPED = auto()
    CANCELLED = auto()

    @property
    def is_final(self):
        return self in {OrderStatus.SHIPPED, OrderStatus.CANCELLED}

s = OrderStatus("paid")                     # from a database value
print(s, s.name, s.value, s.is_final, s == "paid")
print([m.value for m in OrderStatus])

class Priority(IntEnum):
    LOW = 1
    HIGH = 3
print(sorted([Priority.HIGH, Priority.LOW]), Priority.HIGH > 2)

class Permission(Flag):
    READ = auto()
    WRITE = auto()
    DELETE = auto()

editor = Permission.READ | Permission.WRITE
print(editor, Permission.WRITE in editor, Permission.DELETE in editor)

try:
    OrderStatus("lost")
except ValueError as e:
    print("ValueError:", e)` },
      ],
    },
    {
      id: 'py-os-sys',
      title: 'os, sys, environment variables and subprocess',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import os, sys, platform

print(sys.version.split()[0], sys.platform, platform.python_implementation())
print(sys.argv)                           # command-line arguments: ['script.py', 'arg1', ...]
print(sys.path[:2])                       # where import looks for modules

# Environment variables: configuration and secrets live here, not in code
os.environ["APP_ENV"] = "development"
print(os.environ.get("APP_ENV"), os.environ.get("DATABASE_URL", "sqlite:///dev.db"))
print(os.getenv("DEBUG", "false").lower() in {"1", "true", "yes"})

print(os.getcwd(), os.path.join("data", "2026", "report.csv"))
print(os.path.splitext("photo.final.jpg"), os.path.basename("/var/log/app.log"))
print(os.cpu_count() is not None)` },
        { type: 'code', lang: 'python', value: String.raw`import subprocess

# Run another program safely: pass a LIST of arguments (no shell injection)
result = subprocess.run(["git", "log", "--oneline", "-3"], capture_output=True, text=True, check=True)
print(result.stdout)

# Exit codes tell the caller (shell, cron, CI) whether you succeeded
import sys
sys.exit(0 if result.returncode == 0 else 1)` },
        { type: 'note', value: 'Never build shell commands from user input with shell=True. Pass a list of arguments; subprocess then cannot be tricked into running extra commands.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'stdlib', q: 'What is a "naive" datetime?', options: ['One without a time zone', 'One with microseconds', 'A date only', 'An invalid date'], answer: 0, explain: 'Aware datetimes carry tzinfo; prefer them.' },
    { chapterId: 'stdlib', q: 'Which module should generate a password reset token?', options: ['random', 'secrets', 'math', 'uuid only'], answer: 1, explain: 'secrets is cryptographically secure; random is predictable.' },
    { chapterId: 'stdlib', q: 'What does re.findall(r"\\d+", "a1b22c333") return?', options: ['["1", "22", "333"]', '[1, 22, 333]', '"122333"', 'A match object'], answer: 0, explain: 'findall returns a list of matching strings.' },
    { chapterId: 'stdlib', q: 'Why use random.seed(42)?', options: ['To make it more random', 'To get reproducible sequences for tests and simulations', 'To speed it up', 'For security'], answer: 1, explain: 'The same seed gives the same sequence.' },
    { chapterId: 'stdlib', q: 'Where should secrets like database passwords come from?', options: ['Hard-coded in the source', 'Environment variables or a secrets manager', 'Comments', 'The URL'], answer: 1, explain: 'Read them with os.environ / os.getenv.' },
    { chapterId: 'stdlib', q: 'Why pass a list of arguments to subprocess.run?', options: ['It is faster', 'It avoids shell injection from untrusted input', 'It is required on Windows', 'To run in parallel'], answer: 1, explain: 'Without shell=True, arguments are never interpreted by a shell.' },
  ],
};
