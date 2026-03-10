from fastapi import APIRouter
from app.data.portfolio_data import PORTFOLIO_DATA

router = APIRouter(tags=["experience"])

@router.get("/experience")
async def get_experience():
    return PORTFOLIO_DATA.get("experience", [])