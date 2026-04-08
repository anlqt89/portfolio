# openai_service.py — Architecture Notes

## Flow

```
question (string)
  │
  ▼
route_question()        ← keyword matching → intent label
  │
  ▼
build_context()         ← pull only relevant slice from resume.json
  │
  ▼
build_system_prompt()   ← pick persona based on intent
  │
  ▼
OpenAI API (GPT-4o-mini)
  │
  ▼
answer (string)
```

---

## Intent Labels

| Intent | Triggered by |
|---|---|
| `greeting` | "hi", "hello", "hey" |
| `behavioral_intro` | "tell me about yourself", "introduce yourself" |
| `behavioral_best_project` | "best project", "most proud of" |
| `behavioral_story` | "tell me about a time", "challenge", "conflict" |
| `behavioral_fit` | "why should we hire you", "strengths" |
| `resume` | "resume", "cv", "background" |
| `experience` | "experience", "internship", "employment" |
| `education` | "school", "university", "degree" |
| `skills` | "skills", "skill" |
| `tech_stack` | "technology", "framework", "stack" |
| `projects` | "project", "portfolio", "built" |
| `projects_by_technology` | "projects with X", "built with X" |
| `contact` | "email", "linkedin", "github" |
| `general` | fallback |

---

## Techniques Used

### Intent Detection
- **Keyword matching** — `contains_any(text, keywords)` checks if any keyword exists in the normalized question
- **Exact greeting check** — set membership for short greetings to avoid false positives
- **Text normalization** — lowercase + collapse whitespace before matching

### Context Injection (Token Optimization)
- Only the relevant data slice is sent to OpenAI, not the full resume
- `truncate_projects(projects, 5)` — caps project list to 5 to reduce token usage
- `extract_skill_names(skills)` — flattens skill objects to a plain list of strings
- `find_projects_by_technology(projects, question)` — matches tech keywords from question against project stack

### Project Scoring — `score_project(project)`
- Weighted keyword scoring: terms like "scalable", "AI", "full-stack" add points
- Bonus for longer descriptions (more content = richer project)
- Bonus for more technologies listed
- Used by `pick_best_project()` to answer "what is your best project?"

### Prompt Engineering
- **Two personas** based on intent group:
  - **Recruiter mode** — third person, assistant tone ("An Lam is...")
  - **Behavioral mode** — first person, interview tone ("I built...")
- **Temperature tuning**: `0.4` for behavioral (more natural), `0.2` for factual (more precise)
- **Token cap**: `max_tokens=350` to keep responses concise

---

## Limitations (Current)
- No conversation memory — each question is stateless, history not sent
- Intent detection is keyword-only — no semantic understanding
- Context is hand-picked per intent — not dynamically retrieved

## Planned Improvements
- Use TF-IDF search engine (already built) for retrieval instead of keyword intent
- Send last 4-6 messages as history for multi-turn conversations
- Streaming response via SSE
