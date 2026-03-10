from fastapi import APIRouter, HTTPException
from app.data.portfolio_data import PORTFOLIO_DATA

router = APIRouter(tags=["projects"])

@router.get("/projects")
async def get_projects():
    return PORTFOLIO_DATA.get("projects", [])

@router.get("/projects/{project_id}")
async def get_project_by_id(project_id: int):
    projects = PORTFOLIO_DATA.get("projects", [])
    for project in projects:
        if project.get("id") == project_id:
            return project
    raise HTTPException(status_code=404, detail=f"Project {project_id} not found")
