// Python chapter: Strings. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'strings',
  title: 'Strings',
  description: 'Quoting, indexing, slicing, methods, f-strings and Unicode',
  icon: 'text-fields',
  lessons: [
    {
      id: 'py-string-basics',
      title: 'Creating Strings',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`single = 'It\'s fine'
double = "She said \"hi\""
mixed = "It's easier to mix quotes"
multi = """Line one
Line two
Line three"""
raw = r"C:\new\folder"          # raw string: backslashes are kept as typed

print(single, double, mixed, sep="\n")
print(multi)
print(raw)
print("Tab:\tafter\nNew line")
print(len("Python"), "Py" + "thon", "ha" * 3)

# Strings are immutable: methods return NEW strings
name = "codenest"
upper = name.upper()
print(name, upper)` },
        { type: 'note', value: 'Raw strings (r"...") are essential for Windows paths and regular expressions, where backslashes would otherwise be escape characters.' },
      ],
    },
    {
      id: 'py-indexing-slicing',
      title: 'Indexing and Slicing',
      blocks: [
        { type: 'text', value: 'Every character has a position starting at 0. Negative indexes count from the end. A slice s[start:stop:step] takes a part: start is included, stop is excluded.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`s = "CodeNest Python"
#    0123456789...

print(s[0], s[4], s[-1], s[-6])
print(s[0:4])        # 'Code'
print(s[4:8])        # 'Nest'
print(s[:4])         # from the start
print(s[9:])         # to the end
print(s[-6:])        # last 6 characters
print(s[::2])        # every second character
print(s[::-1])       # reversed

# Slicing never raises IndexError, indexing does
print(s[100:200] == "")
try:
    s[100]
except IndexError as e:
    print("IndexError:", e)` },
      ],
    },
    {
      id: 'py-string-methods',
      title: 'Essential String Methods',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`text = "   Learn Python with CodeNest   "
t = text.strip()

print(repr(t))
print(t.lower(), "|", t.upper(), "|", t.title())
print(t.startswith("Learn"), t.endswith("Nest"), "Python" in t)
print(t.find("Python"), t.find("Java"))     # index or -1
print(t.count("n"))
print(t.replace("Python", "Django"))

words = t.split()                 # split on any whitespace
print(words)
print(" | ".join(words))
print("a,b,,c".split(","))
print("2026-03-10".split("-", maxsplit=1))

print("42".zfill(5), "7".rjust(3, "0"), "hi".center(10, "*"))
print("abc123".isalnum(), "123".isdigit(), "hello".isalpha(), "   ".isspace())

# Clean user input in one line
email = "  Nadia@Example.COM \n"
print(email.strip().lower())
print("Mr. Rahim".removeprefix("Mr. "), "report.pdf".removesuffix(".pdf"))` },
      ],
    },
    {
      id: 'py-fstrings',
      title: 'f-Strings and Formatting',
      blocks: [
        { type: 'text', value: 'f-strings are the modern way to build text. Inside { } you can put any expression and a format specification after a colon.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`product, price, qty = "Keyboard", 1499.5, 3

print(f"{product} x {qty} = {price * qty:,.2f} Tk")
print(f"{0.4567:.1%}")           # percentage
print(f"{42:05d}|{42:>8}|{42:<8}|{42:^8}|")
print(f"{255:b} {255:o} {255:x} {255:X}")
print(f"{1234567.891:_.2f}")
print(f"{'left':<10}|{'right':>10}|")

# Debugging helper: name=value
total = price * qty
print(f"{total=}")
print(f"{qty * 2 = }")

# Dates format too
from datetime import date
d = date(2026, 3, 10)
print(f"{d:%d %B %Y}")

# Aligned table
rows = [("Mouse", 450), ("Monitor", 15500), ("USB cable", 120)]
for name, cost in rows:
    print(f"{name:<12}{cost:>8,}")` },
        { type: 'note', value: 'Older code uses "%s" % value and "{}".format(value). You should read them, but write f-strings.' },
      ],
    },
    {
      id: 'py-unicode',
      title: 'Unicode, Bytes and Encodings',
      blocks: [
        { type: 'text', value: 'A Python str is a sequence of Unicode characters, so Bangla, Arabic and emoji just work. Bytes (b"...") are raw data. Convert between them with encode() and decode(), almost always using UTF-8.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`bn = "বাংলা"
print(len(bn), bn[0])   # 5 code points: vowel signs like া are separate characters
print(bn[::-1])         # so reversing detaches the signs from their letters (looks broken)

data = bn.encode("utf-8")
print(data, len(data), "bytes")
print(data.decode("utf-8"))

print(ord("A"), chr(65), ord("অ"), "\u0985")
print("café".upper(), "STRASSE".lower() == "straße".casefold())

emoji = "Hello 👋"
print(len(emoji), emoji.encode("utf-8"))

# Normalisation: two ways to write é
import unicodedata
a, b = "é", "e\u0301"
print(a == b, unicodedata.normalize("NFC", a) == unicodedata.normalize("NFC", b))` },
        { type: 'note', value: 'Always open text files with encoding="utf-8". The default encoding on Windows may be different and corrupt Bangla text.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'strings', q: 'What does "Python"[1:4] return?', options: ['"Pyt"', '"yth"', '"ytho"', '"Pyth"'], answer: 1, explain: 'Index 1 included, index 4 excluded.' },
    { chapterId: 'strings', q: 'How do you reverse a string s?', options: ['s.reverse()', 's[::-1]', 'reversed(s)', 's[-1:]'], answer: 1, explain: 'A slice with step -1 walks backwards. reversed(s) returns an iterator, not a string.' },
    { chapterId: 'strings', q: 'What does " ".join(["a", "b", "c"]) return?', options: ['"abc"', '"a b c"', '["a b c"]', '"a,b,c"'], answer: 1, explain: 'join puts the separator between items.' },
    { chapterId: 'strings', q: 'What does "abc".find("z") return?', options: ['None', '0', '-1', 'It raises ValueError'], answer: 2, explain: 'find returns -1; index() would raise ValueError.' },
    { chapterId: 'strings', q: 'What does f"{3.14159:.2f}" produce?', options: ['3.14159', '3.14', '3.1', '3'], answer: 1, explain: '.2f formats with two decimals.' },
    { chapterId: 'strings', q: 'Why use r"C:\\new" for a Windows path?', options: ['It is faster', 'So \\n is not turned into a new line', 'To make it read-only', 'It is required for files'], answer: 1, explain: 'Raw strings keep backslashes as typed.' },
    { chapterId: 'strings', q: 'How do you turn a str into bytes?', options: ['bytes.decode()', 's.encode("utf-8")', 'str(s, "bytes")', 's.to_bytes()'], answer: 1, explain: 'encode() turns text into bytes; decode() goes back.' },
  ],
};
