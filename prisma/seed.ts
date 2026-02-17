import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding ...')

  // Create Dummy Blog Posts
  await prisma.blog.createMany({
    data: [
      {
        title: 'Getting Started with Laravel 11',
        slug: 'getting-started-laravel-11',
        excerpt:
          'A comprehensive guide to setting up your first Laravel 11 project with best practices, new directory structure, and powerful features.',
        content: `# Getting Started with Laravel 11

Laravel 11 brings exciting new features and a streamlined developer experience. In this guide, we'll set up a project from scratch, explore the new directory structure, and build a simple API endpoint.

## Prerequisites

Before diving in, make sure you have the following installed:

- **PHP 8.2+** — Laravel 11 requires PHP 8.2 as the minimum version
- **Composer** — PHP dependency manager
- **Node.js 18+** — For frontend asset compilation
- **MySQL 8.0+** or **PostgreSQL 15+** — Database

## Installation

Create a new Laravel 11 project using Composer:

\`\`\`bash
composer create-project laravel/laravel my-app
cd my-app
php artisan serve
\`\`\`

Your application will be running at \`http://localhost:8000\`.

## The New Directory Structure

Laravel 11 introduced a significantly simplified directory structure. The \`app/Http/Middleware\` directory is gone — middleware is now registered in \`bootstrap/app.php\`:

\`\`\`php
// bootstrap/app.php
use Illuminate\\Foundation\\Application;
use Illuminate\\Foundation\\Configuration\\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'admin' => \\App\\Http\\Middleware\\EnsureIsAdmin::class,
        ]);
    })
    ->create();
\`\`\`

## Building a Simple API

Let's create a Task API with a model, migration, and controller.

### Step 1: Generate the Model

\`\`\`bash
php artisan make:model Task -mcr
\`\`\`

This creates the model, migration, and resource controller in one command.

### Step 2: Define the Migration

\`\`\`php
// database/migrations/xxxx_create_tasks_table.php
use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('status', ['pending', 'in_progress', 'completed'])->default('pending');
            $table->timestamp('due_date')->nullable();
            $table->timestamps();
        });
    }
};
\`\`\`

### Step 3: Create the Controller

\`\`\`php
// app/Http/Controllers/TaskController.php
namespace App\\Http\\Controllers;

use App\\Models\\Task;
use Illuminate\\Http\\Request;
use Illuminate\\Http\\JsonResponse;

class TaskController extends Controller
{
    public function index(): JsonResponse
    {
        $tasks = Task::orderBy('created_at', 'desc')->paginate(15);
        return response()->json($tasks);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:pending,in_progress,completed',
            'due_date' => 'nullable|date|after:today',
        ]);

        $task = Task::create($validated);
        return response()->json($task, 201);
    }

    public function show(Task $task): JsonResponse
    {
        return response()->json($task);
    }

    public function update(Request $request, Task $task): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'status' => 'in:pending,in_progress,completed',
        ]);

        $task->update($validated);
        return response()->json($task);
    }

    public function destroy(Task $task): JsonResponse
    {
        $task->delete();
        return response()->json(null, 204);
    }
}
\`\`\`

### Step 4: Register Routes

\`\`\`php
// routes/api.php
use App\\Http\\Controllers\\TaskController;

Route::apiResource('tasks', TaskController::class);
\`\`\`

## Key Improvements in Laravel 11

| Feature | Laravel 10 | Laravel 11 |
|---|---|---|
| Min PHP Version | 8.1 | 8.2 |
| Directory Structure | Full | Simplified |
| Middleware | Kernel.php | bootstrap/app.php |
| Config Files | 15+ files | On-demand publish |
| Health Check | Manual | Built-in \`/up\` route |

## What's Next?

- Add authentication with **Laravel Sanctum**
- Implement **Queues** for background jobs
- Set up **Laravel Reverb** for real-time features

Stay tuned for Part 2 where we'll add authentication and deploy to production!`,
        tags: ['Laravel', 'PHP', 'Backend', 'Tutorial'],
        published: true,
      },
      {
        title: 'Building REST APIs with FastAPI',
        slug: 'building-rest-apis-fastapi',
        excerpt:
          'Learn how to build high-performance REST APIs using Python and FastAPI with async support, Pydantic validation, and auto-generated docs.',
        content: `# Building REST APIs with FastAPI

FastAPI is one of the fastest Python web frameworks available today. It leverages Python type hints to provide automatic validation, serialization, and documentation. Let's build a complete CRUD API.

## Why Choose FastAPI?

- **Blazing Fast** — On par with Node.js and Go thanks to Starlette and Uvicorn
- **Auto Documentation** — Swagger UI and ReDoc out of the box
- **Type Safety** — Full editor support with Pydantic models
- **Async Native** — Built-in async/await support

## Installation

\`\`\`bash
pip install fastapi uvicorn sqlalchemy
\`\`\`

## Project Structure

\`\`\`
my-api/
├── main.py
├── models.py
├── schemas.py
├── database.py
└── requirements.txt
\`\`\`

## Setting Up the Database

\`\`\`python
# database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://user:password@localhost/mydb"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
\`\`\`

## Defining Models

\`\`\`python
# models.py
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from database import Base

class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(String, nullable=False)
    published = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
\`\`\`

## Pydantic Schemas

\`\`\`python
# schemas.py
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class ArticleCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    content: str = Field(..., min_length=10)
    published: bool = False

class ArticleResponse(BaseModel):
    id: int
    title: str
    content: str
    published: bool
    created_at: datetime

    class Config:
        from_attributes = True
\`\`\`

## Building the API

\`\`\`python
# main.py
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database import get_db, engine, Base
from models import Article
from schemas import ArticleCreate, ArticleResponse

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Blog API",
    description="A modern blog API built with FastAPI",
    version="1.0.0"
)

@app.get("/articles", response_model=List[ArticleResponse])
async def list_articles(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """Fetch all published articles with pagination."""
    articles = db.query(Article).filter(
        Article.published == True
    ).offset(skip).limit(limit).all()
    return articles

@app.post("/articles", response_model=ArticleResponse, status_code=201)
async def create_article(
    article: ArticleCreate,
    db: Session = Depends(get_db)
):
    """Create a new article."""
    db_article = Article(**article.model_dump())
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

@app.get("/articles/{article_id}", response_model=ArticleResponse)
async def get_article(article_id: int, db: Session = Depends(get_db)):
    """Get a single article by ID."""
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found"
        )
    return article

@app.delete("/articles/{article_id}", status_code=204)
async def delete_article(article_id: int, db: Session = Depends(get_db)):
    """Delete an article."""
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    db.delete(article)
    db.commit()
\`\`\`

## Running the Server

\`\`\`bash
uvicorn main:app --reload --port 8000
\`\`\`

Visit \`http://localhost:8000/docs\` to see the auto-generated Swagger documentation!

## Performance Comparison

| Framework | Requests/sec | Language |
|---|---|---|
| FastAPI | ~15,000 | Python |
| Express.js | ~14,000 | JavaScript |
| Flask | ~4,000 | Python |
| Django REST | ~3,500 | Python |

## Conclusion

FastAPI is an excellent choice for building production-ready APIs. Its combination of speed, type safety, and auto-documentation makes it a joy to work with. In the next tutorial, we'll add JWT authentication and deploy to production with Docker.`,
        tags: ['Python', 'FastAPI', 'API', 'Backend'],
        published: true,
      },
      {
        title: 'Next.js 15 Server Components Deep Dive',
        slug: 'nextjs-15-server-components-deep-dive',
        excerpt:
          'Understand React Server Components in Next.js 15 — when to use them, how they work, and patterns for mixing server and client components.',
        content: `# Next.js 15 Server Components Deep Dive

React Server Components (RSC) fundamentally change how we think about building React applications. In Next.js 15 with the App Router, every component is a **Server Component by default**. Let's explore what this means and how to use it effectively.

## Server vs Client Components

| Feature | Server Component | Client Component |
|---|---|---|
| Runs on | Server only | Client (+ server for SSR) |
| Can use hooks | ❌ No | ✅ Yes |
| Can access DB | ✅ Yes | ❌ No |
| Can use events | ❌ No | ✅ Yes |
| Bundle size | Zero | Adds to bundle |

## Fetching Data in Server Components

The beauty of Server Components is that you can fetch data directly — no \`useEffect\`, no loading states, no client-side fetching:

\`\`\`tsx
// app/posts/page.tsx — This is a Server Component by default
import { prisma } from '@/lib/prisma'

export default async function PostsPage() {
  // Direct database query — this never runs on the client!
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <article key={post.id} className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-muted-foreground mt-2">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  )
}
\`\`\`

## When to Use Client Components

Add \`'use client'\` only when you need interactivity:

\`\`\`tsx
'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'

interface LikeButtonProps {
  postId: string
  initialLikes: number
}

export function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)

  const handleLike = async () => {
    setLiked(!liked)
    setLikes(prev => liked ? prev - 1 : prev + 1)

    await fetch(\\\`/api/posts/\\\${postId}/like\\\`, {
      method: 'POST',
    })
  }

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-2 transition-colors"
    >
      <Heart
        className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}
      />
      <span>{likes}</span>
    </button>
  )
}
\`\`\`

## Server Actions

Server Actions let you mutate data from the client without creating API routes:

\`\`\`typescript
// app/actions/posts.ts
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  await prisma.post.create({
    data: { title, content, published: true },
  })

  revalidatePath('/posts')
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } })
  revalidatePath('/posts')
}
\`\`\`

Then use them directly in your components:

\`\`\`tsx
import { createPost } from '@/app/actions/posts'

export default function NewPostPage() {
  return (
    <form action={createPost} className="space-y-4 max-w-lg">
      <input
        name="title"
        placeholder="Post title"
        className="w-full rounded border px-4 py-2"
        required
      />
      <textarea
        name="content"
        placeholder="Write your post..."
        className="w-full rounded border px-4 py-2 min-h-[200px]"
        required
      />
      <button
        type="submit"
        className="bg-primary text-white px-6 py-2 rounded"
      >
        Publish
      </button>
    </form>
  )
}
\`\`\`

## Key Patterns

1. **Keep Server Components as parents** — pass data down as props
2. **Push \`'use client'\` as deep as possible** — only the interactive leaf needs it
3. **Use Server Actions for mutations** — no need for API routes
4. **Leverage \`loading.tsx\`** — for streaming and suspense boundaries

## Conclusion

Server Components reduce bundle size, improve performance, and simplify data fetching. The key is knowing when to reach for \`'use client'\` — and doing it as sparingly as possible.`,
        tags: ['Next.js', 'React', 'TypeScript', 'Frontend'],
        published: true,
      },
    ],
    skipDuplicates: true,
  })

  // Create Dummy Messages
  await prisma.message.createMany({
    data: [
      // {
      //   name: 'John Doe',
      //   email: 'john@example.com',
      //   message: 'Great portfolio! I would love to collaborate on a project.',
      // },
      // {
      //   name: 'Jane Smith',
      //   email: 'jane@example.com',
      //   message:
      //     'Interested in your Laravel consulting services. Can we schedule a call?',
      // },
    ],
    skipDuplicates: true,
  })

  // Create Dummy Newsletter Subscribers
  await prisma.newsletter.createMany({
    data: [
      // { email: 'subscriber1@example.com' },
      // { email: 'subscriber2@example.com' },
      // { email: 'subscriber3@example.com' },
    ],
    skipDuplicates: true,
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
