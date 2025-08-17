from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME, version="0.1.0")

@app.get('/')
async def index():
    return {'response': 'This is a FastApi backend app'}

# Настройка маршрута для статических файлов
app.mount("/static", StaticFiles(directory="src/app/static"), name="static")

# Установка favicon
@app.get("/favicon.ico")
async def read_favicon():
    return FileResponse("src/app/static/favicon.ico")