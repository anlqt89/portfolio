# Intent Routing — Trace Example

## Query
```
"tell me about your background and experience"
```
This query contains keywords from **multiple intents**:
- `"background"` → matches `resume` intent
- `"experience"` → matches `experience` intent

---

## Step 1 — `normalize_text(question)`
```
input:  "tell me about your background and experience"
action: lowercase + collapse whitespace
output: "tell me about your background and experience"  ← no change (already clean)
```

---

## Step 2 — `is_exact_greeting(question)`
```
input:  "tell me about your background and experience"
action: check if q is in {"hi", "hello", "hey", ...}
output: False  ← not a greeting, skip
```

---

## Step 3 — `route_question(question)` — checking intents one by one
```
check "tell me about yourself"  → NOT in q
check "introduce yourself"      → NOT in q
check "summary"                 → NOT in q
→ skip behavioral_intro

check "best project"            → NOT in q
→ skip behavioral_best_project

check "tell me about a time"    → NOT in q
check "deadline", "conflict"    → NOT in q
→ skip behavioral_story

check "why should we hire you"  → NOT in q
→ skip behavioral_fit

check "resume", "cv", "background"
→ "background" ✓ MATCH FOUND
→ return "resume"   ← STOPS HERE, never checks "experience"
```

---

## Step 4 — `build_context(intent="resume")`
```
input:  intent="resume"
action: fetch resume slice from PORTFOLIO_DATA
output: {
  "profile": {...},
  "experience": [...],
  "education": [...],
  "skills": ["Python", "React", ...],
  "projects": [first 5 projects],
  "resume_download": { "swe": "...", "ml": "..." }
}
```

---

## Step 5 — `build_system_prompt(intent="resume", context)`
```
input:  intent="resume", context JSON string
action: intent is in recruiter_mode_intents → use recruiter prompt
output: "You are a friendly assistant helping recruiters...
         If asked about resume, write 1 sentence then download links..."
```

---

## Step 6 — OpenAI API Call
```
input:  system_prompt + "tell me about your background and experience"
action: GPT-4o-mini generates response
        temperature=0.2 (factual, not behavioral)
output: "An Lam is a software engineer with experience in...
         SWE Resume: https://...
         AI/ML Resume: https://..."  ← resume links included, not intended
```

---

## The Bug — Intent Collision
```
User meant   → "experience" intent → show work history only
Program gave → "resume" intent     → show resume + download links

Reason: "background" appears in resume keywords BEFORE
        "experience" keywords are ever checked.
        First match wins — program stops and never reaches experience check.
```

---

## Why This Happens — Code Order Matters
```python
# resume checked first (line ~219)
if contains_any(q, ["resume", "cv", "background"]):
    return "resume"   ← matched here

# experience never reached (line ~222)
if contains_any(q, ["experience", "work experience"]):
    return "experience"
```

---

## How Other Techniques Would Handle This

| Technique | Behavior |
|---|---|
| **Keyword Matching** ← current | First match wins → wrong intent |
| **Naive Bayes** | Scores ALL intents → picks highest probability |
| **TF-IDF** | Scores ALL intents by similarity → picks best match |
| **Embeddings** | Understands meaning → "background" ≠ "resume download" |
