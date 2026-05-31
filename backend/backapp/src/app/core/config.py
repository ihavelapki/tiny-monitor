from urllib.parse import quote_plus
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "tinymonitor backend"
    VERSION: str = "0.1.0"

    ROOT_PATH: str = ""
    API_V1_PREFIX: str = "/api/v1"

    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:5173"]

    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432
    POSTGRES_DB: str = "tmdb"
    POSTGRES_USER: str = "tmdbadm"
    POSTGRES_PASSWORD: str = "Qwerty123"

    DATABASE_ASYNC_DRIVER: str = "postgresql+asyncpg"
    DATABASE_SYNC_DRIVER: str = "postgresql+psycopg"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
    )

    @property
    def async_database_url(self) -> str:
        password = quote_plus(self.POSTGRES_PASSWORD)
        return (
            f"{self.DATABASE_ASYNC_DRIVER}://"
            f"{self.POSTGRES_USER}:{password}@"
            f"{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/"
            f"{self.POSTGRES_DB}"
        )

    @property
    def sync_database_url(self) -> str:
        password = quote_plus(self.POSTGRES_PASSWORD)
        return (
            f"{self.DATABASE_SYNC_DRIVER}://"
            f"{self.POSTGRES_USER}:{password}@"
            f"{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/"
            f"{self.POSTGRES_DB}"
        )


settings = Settings()