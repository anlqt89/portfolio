import json
import re
from typing import Any, Dict, List, Optional, Tuple

from openai import OpenAI
from app.core.config import OPENAI_API_KEY
from app.data.portfolio_data import PORTFOLIO_DATA

client = OpenAI(api_key=OPENAI_API_KEY)

# Text helpers
def normalize_text(text: str) -> str:
    return re.sub(r"\s+", " ", text.lower().strip())


def contains_any(text: str, keywords: List[str]) -> bool:
    return any(keyword in text for keyword in keywords)


def is_exact_greeting(question: str) -> bool:
    q = normalize_text(question)
    greetings = {
        "hi", "hello", "hey", "good morning", "good afternoon", "good evening"
    }
    return q in greetings


def safe_get_list(data: Dict[str, Any], key: str) -> List[Any]:
    value = data.get(key, [])
    return value if isinstance(value, list) else []


def safe_get_dict(data: Dict[str, Any], key: str) -> Dict[str, Any]:
    value = data.get(key, {})
    return value if isinstance(value, dict) else {}


def stringify_json(data: Any) -> str:
    return json.dumps(data, indent=2, ensure_ascii=False)


def extract_skill_names(skills: List[Any]) -> List[str]:
    names: List[str] = []

    for skill in skills:
        if isinstance(skill, dict):
            name = skill.get("name")
            if isinstance(name, str) and name.strip():
                names.append(name.strip())
        elif isinstance(skill, str) and skill.strip():
            names.append(skill.strip())

    seen = set()
    unique = []
    for name in names:
        lower = name.lower()
        if lower not in seen:
            seen.add(lower)
            unique.append(name)

    return unique


def get_project_tech_stack(project: Dict[str, Any]) -> List[str]:
    keys = ["techStack", "tech_stack", "stack", "technologies", "tools", "skills"]
    for key in keys:
        value = project.get(key)
        if isinstance(value, list):
            return [str(v).strip() for v in value if str(v).strip()]
        if isinstance(value, str) and value.strip():
            return [part.strip() for part in value.split(",") if part.strip()]
    return []


def project_to_text(project: Dict[str, Any]) -> str:
    parts = []
    for _, value in project.items():
        if isinstance(value, str):
            parts.append(value)
        elif isinstance(value, list):
            parts.extend([str(v) for v in value])
        elif isinstance(value, dict):
            parts.append(json.dumps(value))
    return " ".join(parts).lower()


def truncate_projects(projects: List[Dict[str, Any]], limit: int = 5) -> List[Dict[str, Any]]:
    return projects[:limit]


# Project ranking / matching helpers
def score_project(project: Dict[str, Any]) -> int:
    text = project_to_text(project)

    weighted_terms = {
        "scalable": 3,
        "performance": 3,
        "optimized": 3,
        "optimization": 3,
        "full-stack": 3,
        "full stack": 3,
        "ai": 3,
        "ml": 3,
        "machine learning": 3,
        "data": 2,
        "analytics": 2,
        "search": 2,
        "real-time": 2,
        "real time": 2,
        "postgresql": 2,
        "docker": 2,
        "cloud": 2,
        "kubernetes": 2,
        "pipeline": 2,
        "production": 2,
        "latency": 2,
        "index": 2,
        "materialized view": 2,
        "gin": 2,
        "trigram": 2,
        "benchmark": 2,
        "faster": 2,
        "deployed": 2,
    }

    total = 0
    for term, score in weighted_terms.items():
        if term in text:
            total += score

    total += min(len(text) // 200, 5)
    total += min(len(get_project_tech_stack(project)), 4)
    return total


def pick_best_project(projects: List[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    if not projects:
        return None
    return max(projects, key=score_project)


def find_projects_by_technology(projects: List[Dict[str, Any]], question: str) -> List[Dict[str, Any]]:
    q = normalize_text(question)
    matched = []

    for project in projects:
        project_text = project_to_text(project)
        techs = [t.lower() for t in get_project_tech_stack(project)]

        if any(tech in q for tech in techs):
            matched.append(project)
            continue

        if all(word in project_text for word in q.split() if len(word) > 2):
            matched.append(project)

    seen = set()
    unique = []
    for p in matched:
        name = str(p.get("name", "")).strip().lower()
        if name and name not in seen:
            seen.add(name)
            unique.append(p)

    return unique


# Intent routing
def route_question(question: str) -> str:
    q = normalize_text(question)

    if is_exact_greeting(q):
        return "greeting"

    if contains_any(q, [
        "tell me about yourself",
        "walk me through your background",
        "introduce yourself",
        "can you introduce yourself",
        "candidate summary",
        "summary"
    ]):
        return "behavioral_intro"

    if contains_any(q, [
        "best project", "strongest project", "most impressive project",
        "favorite project", "most proud of", "proudest project"
    ]):
        return "behavioral_best_project"

    if contains_any(q, [
        "tell me about a time",
        "describe a time",
        "give me an example of",
        "challenge you faced",
        "deadline",
        "mistake you made",
        "worked on a team",
        "conflict",
        "feedback",
        "took initiative",
        "solved a difficult problem",
        "learn something quickly",
        "ambiguity",
        "multiple priorities"
    ]):
        return "behavioral_story"

    if contains_any(q, [
        "why should we hire you",
        "why are you a good fit",
        "what are your strengths",
        "why do you want this role",
        "why this company",
        "what are you looking for"
    ]):
        return "behavioral_fit"

    if contains_any(q, ["resume", "cv", "full profile", "background"]):
        return "resume"

    if contains_any(q, ["experience", "work experience", "internship", "internships", "employment"]):
        return "experience"

    if contains_any(q, ["education", "school", "university", "college", "degree", "studied"]):
        return "education"

    if contains_any(q, [
        "tech stack", "tech stacks", "technology", "technologies",
        "framework", "frameworks", "tools", "languages", "stack", "stacks"
    ]):
        return "tech_stack"

    if contains_any(q, ["skills", "skill", "technical skills", "strengths"]):
        return "skills"

    if contains_any(q, ["project with", "projects with", "used", "built with", "worked with"]) and contains_any(q, ["project", "projects"]):
        return "projects_by_technology"

    if contains_any(q, ["project", "projects", "portfolio", "built", "worked on"]):
        return "projects"

    if contains_any(q, ["contact", "email", "phone", "linkedin", "github"]):
        return "contact"

    return "general"


# Context builder
def build_context(question: str) -> Tuple[str, Dict[str, Any]]:
    intent = route_question(question)

    profile = safe_get_dict(PORTFOLIO_DATA, "profile")
    projects = safe_get_list(PORTFOLIO_DATA, "projects")
    skills = safe_get_list(PORTFOLIO_DATA, "skills")
    experience = safe_get_list(PORTFOLIO_DATA, "experience")
    education = safe_get_list(PORTFOLIO_DATA, "education")

    if intent == "resume":
        resume = safe_get_dict(PORTFOLIO_DATA, "resume")
        return intent, {
            "profile": profile,
            "experience": experience,
            "education": education,
            "skills": extract_skill_names(skills),
            "projects": truncate_projects(projects, 5),
            "resume_download": resume,
        }

    if intent == "projects":
        return intent, {"projects": truncate_projects(projects, 5)}

    if intent == "skills":
        return intent, {"skills": extract_skill_names(skills)}

    if intent == "tech_stack":
        return intent, {
            "skills": extract_skill_names(skills),
            "projects": truncate_projects(projects, 5),
        }

    if intent == "experience":
        return intent, {"experience": experience}

    if intent == "education":
        return intent, {"education": education}

    if intent == "contact":
        return intent, {"profile": profile}

    if intent == "projects_by_technology":
        return intent, {
            "projects": truncate_projects(find_projects_by_technology(projects, question), 5),
            "skills": extract_skill_names(skills),
        }

    if intent == "behavioral_intro":
        return intent, {
            "profile": profile,
            "experience": experience,
            "education": education,
            "skills": extract_skill_names(skills),
            "projects": truncate_projects(projects, 3),
        }

    if intent == "behavioral_best_project":
        best = pick_best_project(projects)
        return intent, {
            "projects": [best] if best else [],
            "skills": extract_skill_names(skills),
            "experience": experience,
        }

    if intent == "behavioral_story":
        return intent, {
            "projects": truncate_projects(projects, 5),
            "experience": experience,
            "education": education,
            "skills": extract_skill_names(skills),
            "profile": profile,
        }

    if intent == "behavioral_fit":
        return intent, {
            "profile": profile,
            "experience": experience,
            "projects": truncate_projects(projects, 5),
            "skills": extract_skill_names(skills),
            "education": education,
        }

    return intent, PORTFOLIO_DATA


# Prompt builder
def build_system_prompt(intent: str, portfolio_context: str) -> str:
    behavioral_mode_intents = {
        "behavioral_intro", "behavioral_best_project",
        "behavioral_story", "behavioral_fit"
    }

    if intent in behavioral_mode_intents:
        return f"""
        You are An Lam, a software engineer, speaking directly in a job interview.

        Speak naturally and confidently in first person — like a real person, not a chatbot.
        Keep answers to 2-3 short paragraphs. Be specific but conversational.
        Never mention "portfolio data" or that you’re an AI.
        Only use facts from the data below — don’t invent anything.
        If something isn’t in the data, be honest and keep it brief.

        For behavioral questions, naturally weave in a relevant experience:
        what the situation was, what you did, and what came out of it.

        For "tell me about yourself", give a natural intro: who you are, what you’ve built, what you’re looking for.

        {portfolio_context}
        """.strip()

    return f"""
        You are a friendly assistant helping recruiters learn about An Lam, a software engineer.

        Answer conversationally — warm, clear, and to the point. Not robotic.
        Only use the data below. Don’t invent skills, companies, or achievements.
        If something isn’t there, say "I don’t have that info" naturally.
        Keep responses concise. Use bullet points only for lists of 3+ items.
        Don’t reveal contact info unless directly asked.

        If asked about resume or to download resume, write 1 short sentence about An, then on separate lines:
        SWE Resume: <exact url from resume_download.swe>
        AI/ML Resume: <exact url from resume_download.ml>
        Plain text only, no markdown.

        {portfolio_context}
        """.strip()


# Main function
def ask_resume_bot(question: str) -> str:
    try:
        if not question or not question.strip():
            return "Please ask a question about the candidate."

        if is_exact_greeting(question):
            return "Hello! I’m An Lam’s AI interview assistant. What would you like to know?"

        intent, context = build_context(question)
        system_prompt = build_system_prompt(intent, stringify_json(context))

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            temperature=0.4 if intent.startswith("behavioral_") else 0.2,
            max_tokens=350,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": question}
            ]
        )

        return response.choices[0].message.content or "I don’t see that in the portfolio data."

    except Exception as e:
        return f"Error: {str(e)}"


# Optional local testing
if __name__ == "__main__":
    questions = [
        "Hi",
        "Tell me about yourself",
        "What is your best project?",
        "What technologies do you use?",
        "Tell me about a time you solved a difficult problem",
        "Tell me about your internship experience",
        "Why should we hire you?",
        "What projects used PostgreSQL?",
    ]

    for q in questions:
        print("=" * 80)
        print("Q:", q)
        print("A:", ask_resume_bot(q))
        print()