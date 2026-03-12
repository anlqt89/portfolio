from fastapi import APIRouter, Query
from app.services.search_engine import search_engine

router = APIRouter()

@router.get("/search")
def search(q: str = Query(..., min_length=1, description="Search query")):
    results = search_engine.search(q, top_k=5)
    return {"query": q, "results": results}
