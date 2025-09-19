from fastapi import APIRouter
from .endpoints import router

api_router_v1 = APIRouter()
api_router_v1.include_router(router, prefix="/api/v1")
