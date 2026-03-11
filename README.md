# My Portfolio

A full-stack personal portfolio with an AI-powered resume chatbot. Built with **React** (frontend) and **FastAPI** (backend).

---

## Features

- **Home** — intro, education, and resume download
- **Projects** — project gallery with modal details and media carousel
- **Stack** — skills and tech stack with proficiency levels
- **Experience** — work history timeline
- **Contact** — contact info with social links
- **AI Chatbot** — ask questions about my resume, powered by OpenAI

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React, Vite, CSS |
| Backend | FastAPI, Uvicorn, Python 3.11 |
| AI | OpenAI API |
| Containerization | Docker |

---

## Project Structure

```
my-portfolio/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app, CORS, router registration
│   │   ├── core/            # Config (env vars)
│   │   ├── data/            # resume.json, portfolio_data.py
│   │   ├── routers/         # API route handlers
│   │   │   ├── chat.py      # POST /api/chat
│   │   │   ├── contact.py   # GET  /api/contact
│   │   │   ├── education.py # GET  /api/education
│   │   │   ├── experience.py# GET  /api/experience
│   │   │   ├── projects.py  # GET  /api/projects, /api/projects/{id}
│   │   │   ├── resume.py    # GET  /api/resume/download
│   │   │   └── skills.py    # GET  /api/skills
│   │   ├── schemas/         # Pydantic models
│   │   ├── services/        # Business logic (chat service)
│   │   └── assets/          # Static files served at /media
│   ├── Dockerfile
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── pages/           # Home, Projects, Stack, Experience, Contact
    │   ├── components/      # Nav, Chatbot, Hero, ProjectCard, etc.
    │   ├── utilities/
    │   │   └── api.js       # Centralized API URL config
    │   └── data/            # Static helper data (tags, favicon titles)
    ├── Dockerfile
    └── vite.config.js
```

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- An OpenAI API key

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create a .env file
echo "OPENAI_API_KEY=your_key_here" > .env
echo "FRONTEND_URL=http://localhost:5173" >> .env

python -m uvicorn app.main:app --reload
# API runs at http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend
npm install

# Create a .env file
echo "VITE_API_URL=http://127.0.0.1:8000" > .env

npm run dev
# App runs at http://localhost:5173
```

---

## Docker

```bash
# Backend
cd backend
docker build -t portfolio-api .
docker run -p 8000:8000 --env-file .env portfolio-api

# Frontend
cd frontend
docker build -t portfolio-frontend .
docker run -p 5173:5173 portfolio-frontend
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/api/chat` | AI chatbot — body: `{ "question": "..." }` |
| `GET` | `/api/contact` | Contact info |
| `GET` | `/api/education` | Education history |
| `GET` | `/api/experience` | Work experience |
| `GET` | `/api/projects` | All projects |
| `GET` | `/api/projects/{id}` | Single project by ID |
| `GET` | `/api/skills` | Skills & tech stack |
| `GET` | `/api/resume/download` | Download resume PDF |
| `GET` | `/media/{filename}` | Static assets (images, etc.) |

---

## Environment Variables

### Backend `.env`

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key |
| `FRONTEND_URL` | Frontend origin for CORS (e.g. `http://localhost:5173`) |

### Frontend `.env`

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend base URL (e.g. `http://127.0.0.1:8000`) |
