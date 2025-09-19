from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "plotapp for tinymonitor"
    BACKEND_CORS_ORIGINS: list[str] = ["*"]
    DATABASE_URL: str = "sqlite:///./test.db"  # или postgres://...

    class Config:
        env_file = ".env"

settings = Settings() 