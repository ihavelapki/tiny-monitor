FROM python:3.12-slim AS runtime

WORKDIR /app

COPY ./app /app/app
COPY ./pyproject.toml ./poetry.lock /app/

RUN useradd -r -u 10001 tinymonitor
RUN pip install --no-cache-dir poetry && \
    poetry config virtualenvs.create false && \
    poetry install --no-dev --no-interaction --no-ansi
USER tinymonitor

CMD ["python", "-m", "app"]