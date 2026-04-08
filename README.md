# An Lam — Personal Portfolio

A full-stack personal portfolio with an AI-powered resume chatbot and a custom TF-IDF search engine. Built with **React** (frontend) and **FastAPI** (backend), deployed on AWS EC2 behind Cloudflare and Nginx.

Live: [anlam.app](https://anlam.app)

---

## Features

### Pages
- **Home** — intro, education summary, dual resume download (SWE & AI/ML)
- **Projects** — project gallery with category filters, keyword search, modal details, and media carousel
- **Stack** — skills and tech stack with proficiency levels
- **Experience** — work history timeline with supervisor info
- **Contact** — contact form with EmailJS and social links

### AI Chatbot
An intelligent conversational assistant powered by **OpenAI GPT-4o-mini** that answers questions about the portfolio in natural language.

- **Intent routing** — detects query category (projects, skills, experience, education, contact, resume) and injects only the relevant context into the prompt, keeping responses focused and token-efficient
- **Resume download links** — responds to resume requests with direct download links for both the SWE and AI/ML resumes
- **Contextual system prompt** — behaves as a professional AI assistant representing the portfolio owner, with a recruiter-friendly tone
- **Async FastAPI endpoint** — non-blocking, ready for streaming

#### System Design

```
User → React Chatbot.jsx
         ↓ POST /api/chat { question }
       FastAPI chat.py
         ↓
       openai_service.py
         ├── detect_intent(question)     # keyword matching → intent label
         ├── build_context(intent)       # pull relevant slice from resume.json
         └── build_system_prompt()       # behavioral instructions
         ↓ GPT-4o-mini
       response → user
```

#### Planned Improvements

| Feature | Current | Planned |
|---|---|---|
| Intent detection | Keyword regex | TF-IDF retrieval (already built) |
| Context | Full resume slice | Top-K matched docs only |
| Memory | Single turn | Last 6 turns sent as history |
| Response | Buffered | Streaming via SSE |
| Fallback | Generic reply | "I don't know" + suggestions |

### TF-IDF Search Engine
A custom information retrieval engine built from scratch (no external IR libraries), adapted from a Data Mining (CSE 5334) course project.

**How it works:**
1. At startup, all projects and work experience from `resume.json` are indexed into text documents
2. Each document is tokenized, stop words are removed, and terms are suffix-stripped (stemmed)
3. **TF-IDF weights** are computed per term per document:
   - `TF(t, d) = 1 + log10(freq)` — rewards term frequency
   - `IDF(t) = log10(N / df)` — penalizes common terms across all docs
4. Document vectors are **L2-normalized** to unit length
5. At query time, the same preprocessing pipeline is applied to the query string
6. **Cosine similarity** is computed as the dot product of the normalized query and document vectors
7. Results are ranked by similarity score and returned as JSON

**Endpoint:** `GET /api/search?q=<query>`

Example queries: `"machine learning"`, `"React PostgreSQL"`, `"iOS Swift"`, `"distributed systems C++"`

On the Projects page, search is integrated with live debounced input (350ms) and works alongside the category filter pills.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| Backend | FastAPI, Uvicorn, Python 3.11 |
| AI | OpenAI GPT-4o-mini |
| Search | Custom TF-IDF + Cosine Similarity (pure Python) |
| Containerization | Docker |
| Web Server | Nginx (reverse proxy + SSL termination) |
| DNS / CDN | Cloudflare (Full SSL mode) |
| Cloud | AWS EC2 (Ubuntu) |
| CI/CD | GitHub Actions + SSH deploy |
| Email | EmailJS (frontend), SMTP Gmail (backend) |

---

## Project Structure

```
my-portfolio/
├── .github/workflows/
│   └── deploy.yml              # CI/CD: pull → build → swap container → reload nginx
├── backend/
│   ├── app/
│   │   ├── main.py             # FastAPI app, CORS, routers, search index startup event
│   │   ├── core/config.py      # Env var loading
│   │   ├── data/
│   │   │   ├── resume.json     # All portfolio data (projects, experience, skills, education)
│   │   │   └── portfolio_data.py
│   │   ├── routers/
│   │   │   ├── chat.py         # POST /api/chat — AI chatbot
│   │   │   ├── search.py       # GET  /api/search — TF-IDF search
│   │   │   ├── contact.py      # GET/POST /api/contact
│   │   │   ├── education.py    # GET  /api/education
│   │   │   ├── experience.py   # GET  /api/experience
│   │   │   ├── projects.py     # GET  /api/projects, /api/projects/{id}
│   │   │   ├── resume.py       # GET  /api/resume/download
│   │   │   └── skills.py       # GET  /api/skills
│   │   ├── schemas/            # Pydantic request/response models
│   │   ├── services/
│   │   │   ├── openai_service.py    # Intent routing + prompt builder + OpenAI call
│   │   │   └── search_engine.py     # TF-IDF indexer + cosine similarity search
│   │   └── assets/             # Static media served at /media (images, GIFs)
│   ├── Dockerfile
│   ├── requirements.txt
│   └── run.sh                  # Local dev runner (activates venv, loads .env, starts uvicorn)
└── frontend/
    ├── public/
    │   ├── resume-sw.pdf        # SWE resume
    │   └── resume-ML.pdf        # AI/ML resume
    ├── src/
    │   ├── pages/               # Home, Projects, Stack, Experience, Contact
    │   ├── components/
    │   │   ├── Chatbot.jsx           # Floating AI chat widget
    │   │   ├── Search.jsx            # Global search modal (TF-IDF backed)
    │   │   ├── ProjectCard.jsx       # Project display card
    │   │   ├── ProjectModal.jsx      # Full-screen project detail modal
    │   │   ├── MediaCarousel.jsx     # Image/GIF carousel
    │   │   ├── PerformanceChart.jsx  # Chart.js performance visualization
    │   │   ├── PuzzleGame.jsx        # Interactive 8-puzzle AI demo
    │   │   └── Nav.jsx               # Sticky top navigation
    │   ├── utilities/api.js     # Centralized API URL config
    │   └── data/                # Static helper data (tags, favicon titles)
    └── vite.config.js
```

---

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 20+
- OpenAI API key (with Model capabilities: Write permission)

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env
echo "OPENAI_API_KEY=your_key_here" > .env
echo "FRONTEND_URL=http://localhost:5173" >> .env
echo "EMAIL_ADDRESS=your_email@gmail.com" >> .env
echo "EMAIL_PASSWORD=your_app_password" >> .env

# Run (auto-loads .env, activates venv, starts uvicorn with --reload)
./run.sh
# API at http://127.0.0.1:8000
# Search index built automatically on startup
```

### Frontend

```bash
cd frontend
npm install
echo "VITE_API_URL=http://127.0.0.1:8000" > .env
npm run dev
# App at http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/api/chat` | AI chatbot — body: `{ "question": "..." }` |
| `GET` | `/api/search?q=<query>` | TF-IDF cosine similarity search |
| `GET` | `/api/projects` | All projects |
| `GET` | `/api/projects/{id}` | Single project by ID |
| `GET` | `/api/experience` | Work experience |
| `GET` | `/api/skills` | Skills & tech stack |
| `GET` | `/api/education` | Education history |
| `GET` | `/api/contact` | Contact info |
| `POST` | `/api/contact/send` | Send contact email |
| `GET` | `/api/resume/download` | Download resume PDF |
| `GET` | `/media/{filename}` | Static assets (images, GIFs) |

---

## CI/CD Pipeline

Every push to `main` triggers a GitHub Actions workflow that:

1. SSHs into the EC2 instance
2. Pulls latest code (`git reset --hard origin/main`)
3. Builds the React frontend (`npm run build`)
4. Builds a new Docker image (`portfolio-api-new`) — **old container stays live during build**
5. Swaps containers atomically — downtime is ~1-2 seconds
6. Reloads Nginx (zero dropped connections)
7. Runs a health check against the live API and frontend

All secrets (`OPENAI_API_KEY`, `EMAIL_ADDRESS`, `EMAIL_PASSWORD`) are stored in GitHub Secrets and injected via Docker `-e` flags at container start — never committed to git.

---

## Environment Variables

### Backend `.env`

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key |
| `FRONTEND_URL` | Frontend origin for CORS (e.g. `https://anlam.app`) |
| `EMAIL_ADDRESS` | Gmail address for contact form backend |
| `EMAIL_PASSWORD` | Gmail app password |

### Frontend `.env`

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend base URL (e.g. `https://anlam.app`) |
