// Python chapter: Web APIs with FastAPI. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.
// FastAPI apps run inside Try it: requests are sent in-process with httpx's ASGI transport.

export default {
  id: 'web-apis',
  title: 'Web APIs: HTTP, FastAPI, Flask',
  description: 'Calling APIs with httpx/requests, building REST APIs with FastAPI, and Flask',
  icon: 'api',
  lessons: [
    {
      id: 'py-http-clients',
      title: 'Calling APIs with requests and httpx',
      blocks: [
        { type: 'text', value: 'requests is the classic HTTP library; httpx has the same friendly API plus async support and HTTP/2. Always set a timeout and check the status code.' },
        { type: 'code', lang: 'python', value: String.raw`import httpx

response = httpx.get(
    "https://api.github.com/repos/python/cpython",
    headers={"Accept": "application/vnd.github+json"},
    timeout=10,
)
response.raise_for_status()              # raises for 4xx / 5xx
repo = response.json()
print(repo["full_name"], repo["stargazers_count"])

# POST JSON with authentication
r = httpx.post("https://api.example.com/sms",
               json={"to": "01712345678", "text": "Your OTP is 482913"},
               headers={"Authorization": f"Bearer {API_KEY}"},
               timeout=5)

# Reuse connections with a client (much faster for many requests)
with httpx.Client(base_url="https://api.example.com", timeout=10) as client:
    for page in range(1, 4):
        items = client.get("/products", params={"page": page}).json()` },
        { type: 'code', lang: 'python', value: String.raw`import asyncio, httpx

async def fetch_all(urls):
    async with httpx.AsyncClient(timeout=10) as client:
        responses = await asyncio.gather(*(client.get(u) for u in urls), return_exceptions=True)
    return [r.status_code if isinstance(r, httpx.Response) else repr(r) for r in responses]

print(asyncio.run(fetch_all(["https://example.com", "https://python.org"])))` },
        { type: 'note', value: 'These samples need real internet access from Python, which Try it does not provide. The FastAPI lessons below run fully in the app.' },
      ],
    },
    {
      id: 'py-fastapi-intro',
      title: 'Building an API with FastAPI',
      blocks: [
        { type: 'text', value: 'FastAPI builds APIs from normal Python functions with type hints. It validates input with pydantic, converts output to JSON, and generates interactive documentation at /docs automatically. It is one of the most popular Python web frameworks.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import httpx

app = FastAPI(title="CodeNest Shop API")

class ProductIn(BaseModel):
    name: str = Field(min_length=2)
    price: int = Field(gt=0)

class Product(ProductIn):
    id: int

DB: dict[int, Product] = {}

@app.get("/products")
async def list_products(min_price: int = 0) -> list[Product]:
    return [p for p in DB.values() if p.price >= min_price]

@app.get("/products/{product_id}")
async def get_product(product_id: int) -> Product:
    if product_id not in DB:
        raise HTTPException(status_code=404, detail="Product not found")
    return DB[product_id]

@app.post("/products", status_code=201)
async def create_product(data: ProductIn) -> Product:
    product = Product(id=len(DB) + 1, **data.model_dump())
    DB[product.id] = product
    return product

# Send requests to the app in-process (in production: uvicorn main:app --reload)
async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://shop") as client:
    for body in [{"name": "Keyboard", "price": 1500}, {"name": "Mouse", "price": 450}, {"name": "X", "price": -1}]:
        r = await client.post("/products", json=body)
        print("POST", r.status_code, r.json() if r.status_code == 201 else [e["msg"] for e in r.json()["detail"]])
    print("GET ", (await client.get("/products", params={"min_price": 1000})).json())
    r = await client.get("/products/99")
    print("GET ", r.status_code, r.json())` },
        { type: 'code', lang: 'text', value: String.raw`$ uv add "fastapi[standard]"
$ fastapi dev main.py          # or: uvicorn main:app --reload
INFO:     Uvicorn running on http://127.0.0.1:8000
# Open http://127.0.0.1:8000/docs for the automatic Swagger UI` },
      ],
    },
    {
      id: 'py-fastapi-dependencies',
      title: 'Dependencies, Authentication and Routers',
      blocks: [
        { type: 'text', value: 'Depends() injects shared things into endpoints: the database session, the current user, pagination parameters. It is how FastAPI apps stay organised and testable.' },
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from typing import Annotated
from fastapi import FastAPI, Depends, Header, HTTPException, APIRouter
import httpx

TOKENS = {"secret-nadia": {"id": 7, "name": "Nadia", "role": "admin"},
          "secret-rafi": {"id": 9, "name": "Rafi", "role": "student"}}

async def current_user(authorization: Annotated[str | None, Header()] = None) -> dict:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(401, "Missing token")
    user = TOKENS.get(authorization.removeprefix("Bearer "))
    if user is None:
        raise HTTPException(401, "Invalid token")
    return user

async def require_admin(user: Annotated[dict, Depends(current_user)]) -> dict:
    if user["role"] != "admin":
        raise HTTPException(403, "Admins only")
    return user

async def pagination(page: int = 1, size: int = 10) -> dict:
    return {"offset": (page - 1) * size, "limit": min(size, 100)}

router = APIRouter(prefix="/api/v1")

@router.get("/me")
async def me(user: Annotated[dict, Depends(current_user)]):
    return user

@router.get("/reports")
async def reports(admin: Annotated[dict, Depends(require_admin)], page: Annotated[dict, Depends(pagination)]):
    return {"by": admin["name"], **page}

app = FastAPI()
app.include_router(router)

async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://api") as c:
    for token, path in [(None, "/api/v1/me"), ("secret-rafi", "/api/v1/me"),
                        ("secret-rafi", "/api/v1/reports"), ("secret-nadia", "/api/v1/reports?page=3&size=20")]:
        headers = {"Authorization": f"Bearer {token}"} if token else {}
        r = await c.get(path, headers=headers)
        print(r.status_code, path, r.json())` },
        { type: 'note', value: 'Dependencies can be plain def or async def; FastAPI runs plain def ones in a thread pool (Try it has no threads, so these are async). In real apps use OAuth2 with JWT access tokens (fastapi.security), store password hashes with argon2 or bcrypt, and get the database session from a dependency that closes it after the request.' },
      ],
    },
    {
      id: 'py-fastapi-testing',
      title: 'Testing an API',
      blocks: [
        { type: 'code', lang: 'python', tryIt: true, value: String.raw`from fastapi import FastAPI
import httpx

app = FastAPI()
TODOS = []

@app.post("/todos", status_code=201)
async def add(todo: dict):
    TODOS.append({"id": len(TODOS) + 1, **todo, "done": False})
    return TODOS[-1]

@app.patch("/todos/{todo_id}")
async def complete(todo_id: int):
    TODOS[todo_id - 1]["done"] = True
    return TODOS[todo_id - 1]

async def test_create_and_complete():
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://t") as c:
        r = await c.post("/todos", json={"title": "Learn FastAPI"})
        assert r.status_code == 201 and r.json()["done"] is False
        r = await c.patch("/todos/1")
        assert r.json() == {"id": 1, "title": "Learn FastAPI", "done": True}

await test_create_and_complete()
print("API test passed")

# With pytest on your computer you would typically write:
#   from fastapi.testclient import TestClient
#   client = TestClient(app)
#   def test_create(): assert client.post("/todos", json={...}).status_code == 201` },
      ],
    },
    {
      id: 'py-flask',
      title: 'Flask in a Nutshell',
      blocks: [
        { type: 'text', value: 'Flask is a small, flexible web framework that has been popular for over a decade. Many existing projects and tutorials use it, so you should be able to read and extend Flask code.' },
        { type: 'code', lang: 'python', value: String.raw`# pip install flask ; flask --app app run --debug
from flask import Flask, jsonify, request, abort, render_template

app = Flask(__name__)
PRODUCTS = {1: {"id": 1, "name": "Keyboard", "price": 1500}}

@app.get("/")
def home():
    return render_template("home.html", products=PRODUCTS.values())   # Jinja2, auto-escaped

@app.get("/api/products/<int:product_id>")
def get_product(product_id):
    product = PRODUCTS.get(product_id) or abort(404)
    return jsonify(product)

@app.post("/api/products")
def create_product():
    data = request.get_json(silent=True) or {}
    if not data.get("name") or not isinstance(data.get("price"), int):
        return jsonify(error="name and integer price are required"), 422
    new_id = max(PRODUCTS) + 1
    PRODUCTS[new_id] = {"id": new_id, **data}
    return jsonify(PRODUCTS[new_id]), 201` },
        { type: 'list', items: [
          'Flask: minimal core, you choose extensions (Flask-SQLAlchemy, Flask-Login). Synchronous by default.',
          'FastAPI: async, type-hint driven validation and automatic docs; ideal for APIs and microservices.',
          'Django: "batteries included" (ORM, admin, auth, forms); ideal for full websites and big teams (next chapter).',
          'Production: run behind a real server (gunicorn or uvicorn workers) and Nginx, never the development server.',
        ] },
      ],
    },
  ],
  quiz: [
    { chapterId: 'web-apis', q: 'Why always pass timeout= to HTTP requests?', options: ['It is required syntax', 'Without it a slow server can hang your program forever', 'To retry automatically', 'To use HTTP/2'], answer: 1, explain: 'requests has no timeout by default.' },
    { chapterId: 'web-apis', q: 'How does FastAPI validate request bodies?', options: ['Manually with if statements', 'From pydantic models declared in the type hints', 'With regular expressions', 'It does not'], answer: 1, explain: 'Invalid input automatically returns 422 with details.' },
    { chapterId: 'web-apis', q: 'What status code does FastAPI return for invalid input?', options: ['400', '404', '422', '500'], answer: 2, explain: '422 Unprocessable Content, with a list of errors.' },
    { chapterId: 'web-apis', q: 'What does Depends() do in FastAPI?', options: ['Installs packages', 'Injects a dependency (user, DB session, params) into an endpoint', 'Defines a route', 'Creates a thread'], answer: 1, explain: 'Dependencies can depend on other dependencies.' },
    { chapterId: 'web-apis', q: 'Which framework is "batteries included" with an admin panel and ORM?', options: ['Flask', 'FastAPI', 'Django', 'httpx'], answer: 2, explain: 'Django ships ORM, admin, auth, forms and more.' },
    { chapterId: 'web-apis', q: 'Where is FastAPI\'s automatic interactive documentation?', options: ['/admin', '/docs', '/api', '/swagger.json only'], answer: 1, explain: '/docs serves Swagger UI; /redoc is an alternative.' },
  ],
};
