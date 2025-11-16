# 🧠 Granola AI — Meeting & YouTube Summarizer (LLM-powered)

Granola AI is a full-stack, AI-powered productivity tool that lets you:

✨ Summarize **meetings** (paste transcript → get structured summary)  
🎥 Summarize **YouTube videos** (paste a link → extract transcript + get summary)  
💻 If the video is a **DSA / algorithm explanation**, Granola AI auto-generates **optimized Java code**  
📚 Perfect for backend engineers, students, and tech professionals

---

## 🌐 Live Deployment

| Component | URL |
|----------|-----|
| **Frontend (Next.js)** | https://granola-ai-app.vercel.app/ |
| **Backend (FastAPI)** | https://granola-ai-app.onrender.com/ |

---

## 🧩 Core Features

- AI Meeting Summaries (Markdown format)
- YouTube Transcript Extraction + TL;DR Summary
- Auto Java Code Generation for DSA-related videos
- Persistent data storage in PostgreSQL (via render)
- Clean, modern UI using Tailwind CSS
- Fully deployed (client + server)

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Axios**
- Deployed on **Vercel**

### Backend
- **FastAPI** (Python)
- **SQLAlchemy ORM**
- **PostgreSQL**
- **Groq Llama 3.1 8B Instant** (LLM Summaries + Code Generation)
- **youtube-transcript-api**
- Deployed on **Render.com**

---

## 🗄️ Database Schema

### `meetings` table
| Column      | Type      |
|-------------|-----------|
| id          | int (PK)  |
| title       | string    |
| raw_text    | text      |
| summary     | text      |
| created_at  | timestamp |
| updated_at  | timestamp |

### `videos` table
| Column      | Type      |
|-------------|-----------|
| id          | int (PK)  |
| url         | string    |
| transcript  | text      |
| summary     | text      |
| code        | text      |
| created_at  | timestamp |

---

## 🚀 Getting Started (Local Development)

### 1️⃣ Clone the repo
```sh
git clone https://github.com/IshanDwivedii/granola-ai-app.git
cd granola-ai-app
