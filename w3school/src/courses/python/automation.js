// Python chapter: Automation and Scripting. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'automation',
  title: 'Automation & Scripting',
  description: 'CLI tools with argparse, file automation, web scraping, email and scheduling',
  icon: 'terminal',
  lessons: [
    {
      id: 'py-argparse',
      title: 'Command-Line Tools with argparse',
      blocks: [
        { type: 'text', value: 'Python is the favourite language for automating boring tasks. A good script accepts options from the command line, prints help, and returns an exit code. argparse (standard library) does all of that.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`import argparse

def build_parser():
    p = argparse.ArgumentParser(prog="report", description="Create a sales report")
    p.add_argument("files", nargs="+", help="CSV files to read")
    p.add_argument("--month", required=True, help="month as YYYY-MM")
    p.add_argument("--format", choices=["csv", "json", "table"], default="table")
    p.add_argument("--top", type=int, default=5, help="how many products to show")
    p.add_argument("-v", "--verbose", action="store_true")
    return p

parser = build_parser()

# In a terminal: python report.py jan.csv feb.csv --month 2026-02 --top 3 -v
args = parser.parse_args(["jan.csv", "feb.csv", "--month", "2026-02", "--top", "3", "-v"])
print(args)
print(args.files, args.month, args.top, args.verbose, args.format)

print(parser.format_help())

try:
    parser.parse_args(["x.csv", "--month", "2026-02", "--format", "pdf"])
except SystemExit as e:
    print("argparse exited with code", e.code, "(invalid choice)")` },
        { type: 'note', value: 'For bigger tools, Typer (built on type hints) and Click make subcommands and rich output easy. Install your script as a command with [project.scripts] in pyproject.toml.' },
      ],
    },
    {
      id: 'py-file-automation',
      title: 'Automating Files and Folders',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from pathlib import Path
import shutil
from datetime import datetime

# Create a messy "Downloads" folder
downloads = Path("Downloads")
downloads.mkdir(exist_ok=True)
for name in ["report.pdf", "photo1.jpg", "photo2.PNG", "invoice.pdf", "song.mp3", "notes.txt", "data.csv"]:
    (downloads / name).write_text("x")

CATEGORIES = {
    "Images": {".jpg", ".jpeg", ".png", ".gif"},
    "Documents": {".pdf", ".docx", ".txt", ".csv"},
    "Music": {".mp3", ".wav"},
}

def category_for(path):
    ext = path.suffix.lower()
    return next((cat for cat, exts in CATEGORIES.items() if ext in exts), "Other")

def organize(folder, dry_run=False):
    moved = 0
    for file in folder.iterdir():
        if file.is_file():
            target = folder / category_for(file) / file.name
            print(f"{'would move' if dry_run else 'move'} {file.name} -> {target.parent.name}/")
            if not dry_run:
                target.parent.mkdir(exist_ok=True)
                shutil.move(file, target)
            moved += 1
    return moved

organize(downloads, dry_run=True)
print(organize(downloads), "files organised")
print(sorted(str(p.relative_to(downloads)) for p in downloads.rglob("*") if p.is_file()))

# Batch rename with a date prefix
stamp = datetime(2026, 3, 10).strftime("%Y%m%d")
for i, img in enumerate(sorted((downloads / "Images").iterdir()), start=1):
    img.rename(img.with_name(f"{stamp}_{i:03d}{img.suffix.lower()}"))
print(sorted(p.name for p in (downloads / "Images").iterdir()))` },
        { type: 'note', value: 'Always add a --dry-run option to scripts that move or delete files, and test on a copy first.' },
      ],
    },
    {
      id: 'py-web-scraping',
      title: 'Web Scraping with BeautifulSoup',
      blocks: [
        { type: 'text', value: 'Fetch a page with httpx or requests, then parse the HTML with BeautifulSoup using CSS selectors. Respect each site\'s terms and robots.txt, identify your bot with a User-Agent, and do not overload servers. Prefer an official API when one exists.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from bs4 import BeautifulSoup
import re, csv, io

# In a real scraper: html = httpx.get(url, headers={"User-Agent": "CodeNestBot/1.0"}, timeout=10).text
html = """
<div class="products">
  <article class="product" data-sku="KB-01">
    <h2><a href="/p/kb-01">Mechanical Keyboard</a></h2>
    <span class="price">৳ 4,500</span><span class="stock in">In stock</span>
  </article>
  <article class="product" data-sku="MS-02">
    <h2><a href="/p/ms-02">Wireless Mouse</a></h2>
    <span class="price">৳ 1,250</span><span class="stock out">Out of stock</span>
  </article>
  <article class="product" data-sku="HD-03">
    <h2><a href="/p/hd-03">Headphones</a></h2>
    <span class="price">৳ 2,999</span><span class="stock in">In stock</span>
  </article>
</div>
<a class="next" href="/products?page=2">Next</a>
"""

soup = BeautifulSoup(html, "html.parser")
rows = []
for card in soup.select("article.product"):
    rows.append({
        "sku": card["data-sku"],
        "name": card.select_one("h2 a").get_text(strip=True),
        "url": "https://shop.example" + card.select_one("h2 a")["href"],
        "price": int(re.sub(r"\D", "", card.select_one(".price").text)),
        "in_stock": "in" in card.select_one(".stock")["class"],
    })

for r in rows:
    print(r)
print("Next page:", soup.select_one("a.next")["href"])

out = io.StringIO()
writer = csv.DictWriter(out, fieldnames=rows[0].keys())
writer.writeheader(); writer.writerows(rows)
print(out.getvalue())` },
        { type: 'note', value: 'Sites that build pages with JavaScript need a real browser: use Playwright for Python (pip install playwright) to load the page, then parse it.' },
      ],
    },
    {
      id: 'py-email-excel',
      title: 'Sending Email and Writing Excel Reports',
      blocks: [
        { type: 'code', lang: 'python', value: String.raw`import smtplib, os
from email.message import EmailMessage

msg = EmailMessage()
msg["Subject"] = "Monthly sales report"
msg["From"] = "reports@codenest.app"
msg["To"] = "manager@example.com"
msg.set_content("Hi,\n\nThe March report is attached.\n\nCodeNest bot")
with open("report.xlsx", "rb") as f:
    msg.add_attachment(f.read(), maintype="application", subtype="vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                       filename="report-2026-03.xlsx")

with smtplib.SMTP("smtp.gmail.com", 587, timeout=20) as server:
    server.starttls()
    server.login(os.environ["SMTP_USER"], os.environ["SMTP_APP_PASSWORD"])   # an app password, never your real one
    server.send_message(msg)` },
        { type: 'code', lang: 'python', value: String.raw`# pip install openpyxl  (pandas uses it for .xlsx)
import pandas as pd

sales = pd.read_csv("orders.csv", parse_dates=["date"])
summary = sales.groupby("product", as_index=False)["revenue"].sum().sort_values("revenue", ascending=False)

with pd.ExcelWriter("report.xlsx", engine="openpyxl") as xl:
    summary.to_excel(xl, sheet_name="By product", index=False)
    sales.to_excel(xl, sheet_name="Raw data", index=False)
    xl.sheets["By product"].column_dimensions["A"].width = 30` },
        { type: 'note', value: 'Both samples need a real computer: Try it has no network for SMTP. The pandas and openpyxl parts work anywhere pandas is installed.' },
      ],
    },
    {
      id: 'py-scheduling',
      title: 'Scheduling Scripts',
      blocks: [
        { type: 'list', items: [
          'Linux/macOS: cron, e.g. 0 7 * * 1-5 /home/me/.venv/bin/python /home/me/report.py runs at 07:00 on weekdays.',
          'Windows: Task Scheduler, pointing at the python.exe inside your virtual environment.',
          'Inside a long-running Python process: the schedule or APScheduler libraries.',
          'In the cloud: GitHub Actions with on: schedule, or a serverless function with a timer trigger.',
          'Log every run, exit with a non-zero code on failure, and send yourself an alert when it fails.',
        ] },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from datetime import datetime, timedelta

# A tiny scheduler: when is a job due next?
def next_run(now, hour, minute, weekdays=range(7)):
    candidate = now.replace(hour=hour, minute=minute, second=0, microsecond=0)
    while candidate <= now or candidate.weekday() not in weekdays:
        candidate += timedelta(days=1)
        candidate = candidate.replace(hour=hour, minute=minute)
    return candidate

now = datetime(2026, 3, 13, 9, 15)          # a Friday morning
print("now:     ", now.strftime("%a %d %b %H:%M"))
print("daily 07:", next_run(now, 7, 0).strftime("%a %d %b %H:%M"))
print("weekdays:", next_run(now, 7, 0, weekdays=range(0, 5)).strftime("%a %d %b %H:%M"))
print("today 18:", next_run(now, 18, 30).strftime("%a %d %b %H:%M"))` },
      ],
    },
  ],
  quiz: [
    { chapterId: 'automation', q: 'Which module parses command-line arguments in the standard library?', options: ['sys.args', 'argparse', 'optparse only', 'cli'], answer: 1, explain: 'argparse also generates --help text and validates types and choices.' },
    { chapterId: 'automation', q: 'Why add a --dry-run option to a file-moving script?', options: ['It is faster', 'To see what would happen without changing anything', 'To delete files', 'For logging'], answer: 1, explain: 'Mistakes in file scripts can destroy data.' },
    { chapterId: 'automation', q: 'Which library parses HTML with CSS selectors?', options: ['json', 'BeautifulSoup', 'pandas only', 'smtplib'], answer: 1, explain: 'soup.select("article.product") returns matching elements.' },
    { chapterId: 'automation', q: 'What should you check before scraping a website?', options: ['Nothing', 'Its terms of use, robots.txt, and whether an official API exists', 'Only its colours', 'Its font'], answer: 1, explain: 'Scrape responsibly and legally.' },
    { chapterId: 'automation', q: 'How should a script tell cron or CI that it failed?', options: ['Print "failed"', 'Exit with a non-zero exit code', 'Return None', 'Write to a file'], answer: 1, explain: 'sys.exit(1); schedulers and CI check the exit code.' },
  ],
};
