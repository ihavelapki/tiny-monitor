from fastapi import FastAPI
from app.core.config import settings
from app.api.v1.router import api_router

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        root_path=settings.ROOT_PATH
    )

    app.include_router(
        api_router,
        prefix=settings.API_V1_PREFIX,
    )

    @app.get("/")
    async def root() -> dict[str, str]:
        return {"message": "tinymonitor backend is running"}

    return app


app = create_app()