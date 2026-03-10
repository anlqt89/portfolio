from fastapi import APIRouter
from app.data.portfolio_data import PORTFOLIO_DATA

router = APIRouter(tags=["skills"])

@router.get("/skills")
async def get_skills():
    return PORTFOLIO_DATA.get("skills", [])
