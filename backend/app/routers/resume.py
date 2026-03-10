import os
from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter(tags=["resume"])

RESUME_PATH = os.path.join(os.path.dirname(__file__), "../assets/resume/resume-anlam.pdf")

@router.get("/resume/download")
async def download_resume():
    return FileResponse(
        path=RESUME_PATH,
        media_type="application/pdf",
        filename="resume-anlam.pdf"
    )
