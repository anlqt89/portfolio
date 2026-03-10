from fastapi import APIRouter
from app.data.portfolio_data import PORTFOLIO_DATA

router = APIRouter(tags=["contact"])

@router.get("/contact")
async def get_contact():
    return PORTFOLIO_DATA.get("contact", {})
