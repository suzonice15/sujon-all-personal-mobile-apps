// Python chapter: Security. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'security',
  title: 'Security in Python',
  description: 'Passwords, secrets, injection, unsafe deserialization, tokens and dependency safety',
  icon: 'security',
  lessons: [
    {
      id: 'py-passwords',
      title: 'Hashing Passwords',
      blocks: [
        { type: 'text', value: 'Never store passwords in plain text or with fast hashes like md5 or sha256. Use a slow, salted password hash: Argon2 (argon2-cffi) or bcrypt, or PBKDF2 from the standard library. Frameworks like Django do this for you.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from argon2 import PasswordHasher          # pip install argon2-cffi
from argon2.exceptions import VerifyMismatchError

ph = PasswordHasher()                       # Argon2id with safe default parameters

stored = ph.hash("correct horse battery staple")
print(stored)                               # algorithm, parameters, salt and hash in one string

print(ph.verify(stored, "correct horse battery staple"))
try:
    ph.verify(stored, "wrong guess")
except VerifyMismatchError:
    print("wrong password")

print(ph.hash("same") == ph.hash("same"))   # False: every hash gets a random salt
print(ph.check_needs_rehash(stored))        # True after you raise the parameters: rehash at next login` },
        { type: 'code', lang: 'python', value: String.raw`# Standard-library alternative (no extra package): PBKDF2
import hashlib, hmac, os, base64

ITERATIONS = 600_000            # OWASP recommendation for PBKDF2-SHA256

def hash_password(password: str) -> str:
    salt = os.urandom(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, ITERATIONS)
    parts = ["pbkdf2_sha256", str(ITERATIONS), base64.b64encode(salt).decode(), base64.b64encode(digest).decode()]
    return "$".join(parts)

def verify_password(password: str, stored: str) -> bool:
    _, iterations, salt_b64, digest_b64 = stored.split("$")
    actual = hashlib.pbkdf2_hmac("sha256", password.encode(), base64.b64decode(salt_b64), int(iterations))
    return hmac.compare_digest(actual, base64.b64decode(digest_b64))     # constant-time comparison` },
        { type: 'note', value: 'Try it runs the Argon2 sample; the PBKDF2 version needs a normal Python build with OpenSSL (any computer). Django uses PBKDF2 by default and supports Argon2 with one setting.' },
      ],
    },
    {
      id: 'py-secrets-tokens',
      title: 'Secrets, Tokens and Signatures',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import secrets, hmac, hashlib, json, base64, time

print(secrets.token_urlsafe(32))                   # password reset / API key
print(f"{secrets.randbelow(10**6):06d}")            # 6-digit OTP

# Sign data so nobody can change it (webhooks, signed cookies, download links)
SECRET = b"load-me-from-an-environment-variable"

def sign(payload: dict) -> str:
    body = base64.urlsafe_b64encode(json.dumps(payload, separators=(",", ":")).encode()).decode()
    mac = hmac.new(SECRET, body.encode(), hashlib.sha256).hexdigest()
    return f"{body}.{mac}"

def verify(token: str, max_age: int, now: float):
    body, mac = token.rsplit(".", 1)
    expected = hmac.new(SECRET, body.encode(), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(mac, expected):
        return None                                  # tampered
    data = json.loads(base64.urlsafe_b64decode(body))
    return data if now - data["iat"] <= max_age else None   # expired

now = 1_800_000_000
link = sign({"file": "invoice-42.pdf", "user": 7, "iat": now})
print(link[:50], "...")
print(verify(link, 3600, now + 60))
forged_body = base64.urlsafe_b64encode(json.dumps({"file": "salary.xlsx", "user": 7, "iat": now}).encode()).decode()
forged = forged_body + "." + link.rsplit(".", 1)[1]        # new payload, old signature
print(verify(forged, 3600, now))                          # None: signature does not match
print(verify(link, 3600, now + 7200))` },
        { type: 'note', value: 'Keep secrets in environment variables or a secret manager, rotate them, and never commit .env files. Tools like gitleaks or GitHub secret scanning catch accidental commits.' },
      ],
    },
    {
      id: 'py-injection-risks',
      title: 'Injection and Unsafe Code Execution',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import json, ast, shlex
from pathlib import Path

user_input = "__import__('os').system('rm -rf /')"

# 1. NEVER eval/exec user input. To read Python literals safely use ast.literal_eval
try:
    ast.literal_eval(user_input)
except ValueError:
    print("literal_eval refused the code")
print(ast.literal_eval("[1, 2, {'a': 3}]"))

# 2. NEVER unpickle untrusted data: pickle.loads can run arbitrary code. Use JSON.
print(json.loads('{"cart": [1, 2, 3]}'))

# 3. Shell commands: pass a list to subprocess, never shell=True with input
filename = "report.pdf; rm -rf /"
print(["convert", filename, "out.png"])            # what subprocess.run receives: one safe argument
print(shlex.quote(filename))                       # if you truly must build a shell string

# 4. Path traversal: keep user-chosen files inside a base folder
BASE = Path("uploads").resolve()
def safe_path(name):
    target = (BASE / name).resolve()
    if not target.is_relative_to(BASE):
        raise PermissionError(f"blocked: {name}")
    return target
print(safe_path("avatar.png").name)
try:
    safe_path("../../etc/passwd")
except PermissionError as e:
    print(e)

# 5. YAML: yaml.safe_load, never yaml.load with untrusted input` },
        { type: 'list', items: [
          'SQL injection: always parameterized queries or an ORM (Databases chapter).',
          'XSS: template engines (Jinja2, Django) escape by default; never mark user content as safe.',
          'SSRF: when your server fetches a user-given URL, allow-list hosts and block internal IP addresses.',
        ] },
      ],
    },
    {
      id: 'py-dependency-safety',
      title: 'Dependencies, Configuration and the OWASP Top 10',
      blocks: [
        { type: 'list', items: [
          'Audit dependencies: pip-audit or uv pip audit list packages with known vulnerabilities; enable Dependabot.',
          'Typosquatting: double-check package names (requests, not reqeusts) before installing.',
          'Pin versions with a lock file and review upgrades.',
          'Run bandit (a security linter) in CI: it flags eval, pickle, shell=True, hard-coded passwords and weak hashes.',
          'Production config: DEBUG off, strict CORS, HTTPS only, secure and HttpOnly cookies, security headers.',
          'Authorization on every request: check that the current user owns the object (IDOR is the most common API bug).',
          'Rate-limit login, OTP and password-reset endpoints, and log security events.',
        ] },
        { type: 'code', lang: 'text', value: String.raw`$ uv add --dev bandit pip-audit
$ uv run bandit -r src
>> Issue: [B307:blacklist] Use of possibly insecure function - consider using safer ast.literal_eval.
   Severity: Medium   Confidence: High   Location: src/shop/import.py:14
$ uv run pip-audit
Found 1 known vulnerability in 1 package
Name    Version ID                  Fix Versions
jinja2  3.1.2   GHSA-h5c8-rqwp-cp95 3.1.3` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'security', q: 'Which is suitable for storing passwords?', options: ['sha256(password)', 'md5 with a salt', 'Argon2, bcrypt or PBKDF2 with a random salt', 'base64'], answer: 2, explain: 'Password hashes must be slow and salted.' },
    { chapterId: 'security', q: 'Why use hmac.compare_digest instead of ==?', options: ['It is shorter', 'It compares in constant time and prevents timing attacks', 'It hashes the values', 'It ignores case'], answer: 1, explain: '== can stop at the first different character.' },
    { chapterId: 'security', q: 'Which module should generate an API key?', options: ['random', 'secrets', 'uuid1', 'time'], answer: 1, explain: 'secrets uses a cryptographically secure source.' },
    { chapterId: 'security', q: 'Why is pickle.loads(data_from_user) dangerous?', options: ['It is slow', 'Unpickling can execute arbitrary code', 'It only works on lists', 'It is deprecated'], answer: 1, explain: 'Use JSON for untrusted data.' },
    { chapterId: 'security', q: 'How do you safely read a Python literal from a string?', options: ['eval()', 'exec()', 'ast.literal_eval()', 'compile()'], answer: 2, explain: 'It only accepts literals, never function calls.' },
    { chapterId: 'security', q: 'Which tool scans your dependencies for known vulnerabilities?', options: ['ruff', 'pip-audit', 'pytest', 'black'], answer: 1, explain: 'Also enable Dependabot or similar alerts.' },
  ],
};
