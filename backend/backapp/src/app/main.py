from fastapi import FastAPI

app = FastAPI(title="TinyMonitor Backend")


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "TinyMonitor backend is running"}