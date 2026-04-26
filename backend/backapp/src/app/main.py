from fastapi import FastAPI
from app.core.config import settings

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        root_path=settings.ROOT_PATH
    )

    @app.get("/")
    async def root() -> dict[str, str]:
        return {"message": "TinyMonitor backend is running"}

    @app.get("/health/live")
    async def liveness() -> dict[str, str]:
        return {"status": "alive"}

    @app.get("/health/ready")
    async def readiness() -> dict[str, str]:
        return {"status": "ready"}

    return app


app = create_app()