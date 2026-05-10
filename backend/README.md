# Backend roadmap cheatsheet


## How to start poetry project

```sh
~ backend % 

poetry new backapp --name app
cd backapp 
poetry env use python3.12
poetry install
```
- Change pyproject.toml

```sh
poetry add fastapi
(app-py3.12) ~ backapp % poetry run python --version
Python 3.12.10
(app-py3.12) ~ backapp % deactivate
~ backapp % poetry run python --version
Python 3.12.10
~ backapp % poetry add "uvicorn[standard]"
```




### How to add dev-tools

Let's add development dependencies to this project

```sh
poetry add --group dev ruff mypy pytest pytest-asyncio httpx
```

- add to end of the pyproject.toml file

```toml
[tool.ruff]
line-length = 88
target-version = "py312"

[tool.ruff.lint]
select = ["E", "F", "I", "B", "UP"]
ignore = []

[tool.pytest.ini_options]
asyncio_mode = "auto"
testpaths = ["tests"]

[tool.mypy]
python_version = "3.12"
strict = true
plugins = []
```