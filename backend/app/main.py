from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routers.chat import router as chat_router
from app.routers.contact import router as contact_router
from app.routers.experience import router as expereince_router
from app.routers.skills import router as skills_router
from app.routers.projects import router as projects_router
from app.routers.resume import router as resume_router
from app.routers.education import router as education_router
from app.core.config import FRONTEND_URL

app = FastAPI(title="Resume Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix='/api')
app.include_router(contact_router, prefix='/api')
app.include_router(expereince_router, prefix='/api')
app.include_router(skills_router, prefix='/api')
app.include_router(projects_router, prefix='/api')
app.include_router(resume_router, prefix='/api')
app.include_router(education_router, prefix='/api')

ASSETS_DIR = Path(__file__).parent / "assets"
app.mount("/media", StaticFiles(directory=ASSETS_DIR), name="media")

@app.get("/")
async def root():
    return {"message": "BACKEND..."}