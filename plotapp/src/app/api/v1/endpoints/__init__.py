from fastapi import APIRouter
from app.analysis.analysis import read_log_files

router = APIRouter()

@router.get("/metrics")
def get_metrics():
    return read_log_files("../var/log", "csv", 8600)