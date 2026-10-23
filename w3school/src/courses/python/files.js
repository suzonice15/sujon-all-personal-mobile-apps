// Python chapter: Files, CSV and JSON. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// Try it has an in-memory file system, so file samples really run.

export default {
  id: 'files',
  title: 'Files, CSV & JSON',
  description: 'open() and with, pathlib, CSV, JSON, binary files and big files',
  icon: 'folder-open',
  lessons: [
    {
      id: 'py-open-with',
      title: 'Reading and Writing Text Files',
      blocks: [
        { type: 'text', value: 'open() returns a file object. Always use a with block: it closes the file automatically, even if an error happens. Always pass encoding="utf-8" for text.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`# "w" creates or overwrites, "a" appends, "x" creates only if missing
with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("First line\n")
    f.write("দ্বিতীয় লাইন\n")          # Unicode is fine with utf-8

with open("notes.txt", "a", encoding="utf-8") as f:
    print("Third line", file=f)       # print can write to files

with open("notes.txt", encoding="utf-8") as f:
    content = f.read()                 # whole file as one string
print(content)

with open("notes.txt", encoding="utf-8") as f:
    for number, line in enumerate(f, start=1):     # line by line: memory friendly
        print(number, line.rstrip("\n"))

with open("notes.txt", encoding="utf-8") as f:
    lines = f.read().splitlines()
print(lines)` },
      ],
    },
    {
      id: 'py-pathlib',
      title: 'pathlib: Paths the Modern Way',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from pathlib import Path

base = Path("project")
(base / "data" / "raw").mkdir(parents=True, exist_ok=True)   # / joins paths

report = base / "data" / "report.txt"
report.write_text("Sales: 1200\n", encoding="utf-8")
print(report.read_text(encoding="utf-8"))

print(report.name, report.stem, report.suffix, report.parent)
print(report.exists(), report.is_file(), (base / "data").is_dir())
print(report.with_suffix(".csv").name)

for name in ["a.csv", "b.csv", "notes.md"]:
    (base / "data" / "raw" / name).write_text("x", encoding="utf-8")

print(sorted(p.name for p in (base / "data" / "raw").glob("*.csv")))
print(sorted(str(p) for p in base.rglob("*") if p.is_file()))

print(report.stat().st_size, "bytes")
report.unlink()                                  # delete a file
print(report.exists())
print(Path.cwd())` },
        { type: 'note', value: 'Use Path(__file__).resolve().parent to find files next to your script, no matter which folder the program is started from.' },
      ],
    },
    {
      id: 'py-csv',
      title: 'CSV Files',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import csv

students = [
    {"name": "Nadia", "email": "nadia@example.com", "score": 91},
    {"name": "Arif, Jr.", "email": "arif@example.com", "score": 78},   # comma gets quoted
    {"name": "Mim", "email": "mim@example.com", "score": 85},
]

with open("students.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "email", "score"])
    writer.writeheader()
    writer.writerows(students)

print(open("students.csv", encoding="utf-8").read())

with open("students.csv", newline="", encoding="utf-8") as f:
    rows = list(csv.DictReader(f))          # every row is a dict of STRINGS

scores = [int(r["score"]) for r in rows]
print(rows[1]["name"], sum(scores) / len(scores))
best = max(rows, key=lambda r: int(r["score"]))
print("Top student:", best["name"])` },
        { type: 'note', value: 'Pass newline="" when opening CSV files, otherwise you can get blank lines on Windows. For big or complex tabular data, pandas (Data Analysis chapter) is easier.' },
      ],
    },
    {
      id: 'py-json',
      title: 'JSON',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import json
from datetime import date

course = {"id": 7, "title": "Python for Experts", "tags": ["backend", "data"],
          "free": True, "author": None, "price": 0.0}

text = json.dumps(course)                         # Python -> JSON string
print(text)
print(json.dumps(course, indent=2, ensure_ascii=False))

data = json.loads('{"name": "নাদিয়া", "skills": ["python", "sql"], "ok": true}')
print(data["name"], data["skills"][1], data["ok"])

# Files
with open("course.json", "w", encoding="utf-8") as f:
    json.dump(course, f, indent=2)
with open("course.json", encoding="utf-8") as f:
    print(json.load(f)["title"])

# Types JSON does not know need a converter
try:
    json.dumps({"day": date(2026, 3, 10)})
except TypeError as e:
    print("TypeError:", e)
print(json.dumps({"day": date(2026, 3, 10)}, default=str))

try:
    json.loads("{bad json}")
except json.JSONDecodeError as e:
    print("Invalid JSON:", e.msg, "at position", e.pos)` },
      ],
    },
    {
      id: 'py-binary-big-files',
      title: 'Binary Files, Big Files and Temporary Files',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import hashlib, os, shutil, tempfile
from pathlib import Path

# Binary mode: bytes in, bytes out
Path("data.bin").write_bytes(bytes(range(256)) * 1000)

# Process a big file in chunks without loading it all
def sha256_of(path, chunk_size=64 * 1024):
    digest = hashlib.sha256()
    with open(path, "rb") as f:
        while chunk := f.read(chunk_size):
            digest.update(chunk)
    return digest.hexdigest()

print(os.path.getsize("data.bin"), "bytes, sha256", sha256_of("data.bin")[:16], "...")

# Copy, move, remove trees
shutil.copy("data.bin", "copy.bin")
Path("archive").mkdir(exist_ok=True)
shutil.move("copy.bin", "archive/copy.bin")
print(sorted(os.listdir("archive")))
shutil.rmtree("archive")

# Temporary files and folders clean themselves up
with tempfile.TemporaryDirectory() as tmp:
    p = Path(tmp) / "scratch.txt"
    p.write_text("temporary", encoding="utf-8")
    print(p.exists())
print(p.exists())` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'files', q: 'Why open files with a with statement?', options: ['It is faster', 'The file is closed automatically, even on errors', 'It reads the whole file', 'It is required'], answer: 1, explain: 'with uses a context manager that always closes the file.' },
    { chapterId: 'files', q: 'Which mode appends to a text file?', options: ['"r"', '"w"', '"a"', '"x"'], answer: 2, explain: '"w" overwrites; "a" appends.' },
    { chapterId: 'files', q: 'How do you join paths with pathlib?', options: ['Path("a") + "b"', 'Path("a") / "b"', 'Path.join("a", "b")', '"a" & "b"'], answer: 1, explain: 'The / operator joins path parts on every operating system.' },
    { chapterId: 'files', q: 'What type are values read with csv.DictReader?', options: ['Their real types', 'Strings', 'Bytes', 'JSON'], answer: 1, explain: 'Convert numbers yourself with int() or float().' },
    { chapterId: 'files', q: 'Which function turns a Python dict into a JSON string?', options: ['json.load', 'json.loads', 'json.dump', 'json.dumps'], answer: 3, explain: 'dumps = dump to string; dump writes to a file.' },
    { chapterId: 'files', q: 'How do you process a 10 GB file safely?', options: ['f.read() once', 'Read it in chunks or line by line', 'Load it into a list', 'Open it twice'], answer: 1, explain: 'Streaming keeps memory usage small.' },
  ],
};
