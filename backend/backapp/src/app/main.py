from fastapi import FastAPI


def create_app() -> FastAPI:
    app = FastAPI(
        title="TinyMonitor Backend",
        version="0.1.0",
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