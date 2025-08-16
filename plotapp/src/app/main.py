from fastapi import FastAPI

app = FastAPI()

@app.get('/')
async def index():
    return {'response': 'This is a FastApi backend app'}