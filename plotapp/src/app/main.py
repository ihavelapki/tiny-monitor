from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request
from app.core.config import settings
from .api.v1 import api_router_v1

kek="jopa"
app = FastAPI(title=settings.PROJECT_NAME, version="0.1.0")
app.include_router(api_router_v1, prefix="/kek")

@app.get('/')
async def index():
    return {'response': 'This is a FastApi backend app'}

# Настройка маршрута для статических файлов
app.mount("/static", StaticFiles(directory="src/app/static"), name="static")
templates = Jinja2Templates(directory="src/app/static/templates")

# Установка favicon
@app.get("/favicon.ico")
async def read_favicon():
    return FileResponse("src/app/static/favicon.ico")

@app.get("/kek")
async def dashboard(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})