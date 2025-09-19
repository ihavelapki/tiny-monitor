# Application for showing plots

## Description:



## Process of developing:

- Select Interpreter:
`Command + Shift + P` -> `Python: Select Interpreter` -> Choose New one 

    Or create the new one before by following command: `python -m venv .venv`

- To add virtual env to the gitignore: `echo ".venv" >> .gitignore`
- To activate this .venv: `source .venv/bin/activate`
- Check path to current python: `which python`
- Install `poetry`: `pip install poetry`
- I also did: `python -m pip install --upgrade pip`
- Check version: `poetry --version`
    ```
    Poetry (version 2.1.4)
    ```
- Let's initiate new project: `poetry new plotapp`
    
    I've got a following structure:
    ```
    plotapp
    ├── README.md
    ├── src
    │   ├── plotapp
    │       └── __init__.py
    ├── tests/
    ├── poetry.lock
    └── pyproject.toml
    ```

- Let's add requirements to poetry
```sh
poetry add fastapi
poetry add uvicorn
```

```sh
pip install fastapi
pip install uvicorn
```


### start in dev:
```sh
poetry run uvicorn app.main:app --reload --app-dir src
```