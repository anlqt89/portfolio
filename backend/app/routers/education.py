from fastapi import APIRouter
from app.data.portfolio_data import PORTFOLIO_DATA

router = APIRouter(tags=["education"])

@router.get("/education")
async def get_education():
    return PORTFOLIO_DATA.get("education", [])
