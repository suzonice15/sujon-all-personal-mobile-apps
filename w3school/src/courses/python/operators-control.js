// Python chapter: Operators and Control Flow. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'operators-control',
  title: 'Operators & Control Flow',
  description: 'Comparisons, if/elif, match, loops, break/continue and the walrus',
  icon: 'call-split',
  lessons: [
    {
      id: 'py-operators',
      title: 'Operators',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`a, b = 17, 5
print(a + b, a - b, a * b, a / b, a // b, a % b, a ** 2)

total = 100
total += 50; total -= 20; total *= 2; total //= 3
print(total)

# Chained comparisons read like maths
age = 25
print(18 <= age < 60)
print(1 < 2 < 3 > 2)

# and / or return one of their operands, not just True/False
print(0 or "default")          # 'default'
print("x" and "y")             # 'y'
name = ""
display = name or "Guest"
print(display)

# Membership and identity
print("py" in "python", 3 in [1, 2, 3], "k" not in {"a": 1})
x = None
print(x is None)

# Bitwise
print(5 & 3, 5 | 3, 5 ^ 3, ~5, 1 << 4, 256 >> 2)` },
      ],
    },
    {
      id: 'py-if-elif',
      title: 'if, elif, else and Conditional Expressions',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`marks = 78

if marks >= 80:
    grade = "A+"
elif marks >= 70:
    grade = "A"
elif marks >= 60:
    grade = "A-"
else:
    grade = "Below A-"
print("Grade:", grade)

# One-line conditional expression
status = "Passed" if marks >= 33 else "Failed"
print(status)

# Nested conditions are often clearer as early checks
def shipping_cost(weight_kg, city):
    if weight_kg <= 0:
        return 0
    if city == "Dhaka":
        return 60 if weight_kg <= 1 else 60 + (weight_kg - 1) * 15
    return 120 + weight_kg * 20

print(shipping_cost(0.5, "Dhaka"), shipping_cost(3, "Dhaka"), shipping_cost(2, "Sylhet"))` },
      ],
    },
    {
      id: 'py-match',
      title: 'Structural Pattern Matching (match)',
      blocks: [
        { type: 'text', value: 'match (Python 3.10+) is much more than a switch: it can match values, types, sequences and dictionary shapes, and capture parts into variables.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`def http_message(status):
    match status:
        case 200 | 201:
            return "OK"
        case 301 | 302:
            return "Redirect"
        case 404:
            return "Not Found"
        case code if 500 <= code < 600:
            return f"Server error {code}"
        case _:
            return "Unknown"

for s in [200, 404, 503, 418]:
    print(s, http_message(s))

# Match the SHAPE of data
def handle(command):
    match command.split():
        case ["go", direction]:
            return f"Moving {direction}"
        case ["pick", "up", item]:
            return f"Picked up {item}"
        case ["quit" | "exit"]:
            return "Bye"
        case _:
            return f"Unknown command: {command!r}"

for c in ["go north", "pick up lamp", "exit", "dance"]:
    print(handle(c))

# Match dictionaries (e.g. JSON events)
event = {"type": "payment", "amount": 2500, "currency": "BDT"}
match event:
    case {"type": "payment", "amount": amount, "currency": "BDT"} if amount > 1000:
        print("Large BDT payment:", amount)
    case {"type": "payment"}:
        print("Payment")
    case {"type": "refund", **rest}:
        print("Refund", rest)` },
      ],
    },
    {
      id: 'py-loops',
      title: 'for and while Loops',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`# for loops over any iterable
for fruit in ["mango", "banana", "jackfruit"]:
    print(fruit)

for i in range(1, 11, 3):          # start, stop (excluded), step
    print(i, end=" ")
print()

# enumerate gives index + value, zip walks several lists together
names = ["Nadia", "Rafi", "Mim"]
scores = [91, 78, 85]
for i, name in enumerate(names, start=1):
    print(i, name)
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# while loops while a condition is true
balance, months = 1000, 0
while balance < 1500:
    balance *= 1.1
    months += 1
print(f"{months} months -> {balance:.0f}")

# break, continue, and the loop else (runs only if no break happened)
for n in range(2, 30):
    for d in range(2, int(n ** 0.5) + 1):
        if n % d == 0:
            break
    else:
        print(n, end=" ")          # n is prime
print()` },
        { type: 'note', value: 'Avoid "for i in range(len(items))" to get indexes; use enumerate(items). It is clearer and works with any iterable.' },
      ],
    },
    {
      id: 'py-walrus',
      title: 'The Walrus Operator and Loop Patterns',
      blocks: [
        { type: 'text', value: 'The assignment expression := (the "walrus") assigns AND returns a value inside an expression. It shortens read-until-done loops and avoids computing things twice.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import random
random.seed(7)

# Without walrus you call the function twice or write a while True loop
while (roll := random.randint(1, 6)) != 6:
    print("Rolled", roll)
print("Got a six!")

data = [3, 18, 7, 42, 11]
if (n := len(data)) > 3:
    print(f"List is long ({n} items)")

# Compute once, use twice inside a comprehension
values = [1, 4, 9, 16, 25]
roots = [r for v in values if (r := v ** 0.5) > 2]
print(roots)

# Practice: FizzBuzz
print(" ".join("FizzBuzz" if i % 15 == 0 else "Fizz" if i % 3 == 0 else "Buzz" if i % 5 == 0 else str(i)
               for i in range(1, 16)))` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'operators-control', q: 'What does 0 or "default" evaluate to?', options: ['True', '0', '"default"', 'False'], answer: 2, explain: 'or returns the first truthy operand.' },
    { chapterId: 'operators-control', q: 'What is printed by: print(1 < 2 < 3)?', options: ['True', 'False', '1', 'An error'], answer: 0, explain: 'Chained comparisons mean 1 < 2 and 2 < 3.' },
    { chapterId: 'operators-control', q: 'What does range(1, 10, 3) produce?', options: ['1, 4, 7', '1, 4, 7, 10', '1, 3, 6, 9', '3, 6, 9'], answer: 0, explain: 'Stop (10) is excluded.' },
    { chapterId: 'operators-control', q: 'When does the else block of a for loop run?', options: ['Always', 'When the loop ends without break', 'When break runs', 'Never'], answer: 1, explain: 'Loop-else runs only if the loop finished normally.' },
    { chapterId: 'operators-control', q: 'What does case _: mean in match?', options: ['Match an underscore', 'Match anything (wildcard)', 'Skip the case', 'An error'], answer: 1, explain: '_ is the catch-all pattern.' },
    { chapterId: 'operators-control', q: 'What does the walrus operator := do?', options: ['Compares two values', 'Assigns a value inside an expression', 'Deletes a variable', 'Imports a module'], answer: 1, explain: 'It assigns and returns the value, e.g. while (line := f.readline()):' },
    { chapterId: 'operators-control', q: 'Which is the Pythonic way to loop with indexes?', options: ['for i in range(len(x))', 'for i, v in enumerate(x)', 'for i = 0; i < len(x); i++', 'while i < len(x)'], answer: 1, explain: 'enumerate yields (index, value) pairs.' },
  ],
};
