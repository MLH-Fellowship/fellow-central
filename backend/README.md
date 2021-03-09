# Fellow Central - Backend

Backend server of Fellow Central.

## Technologies Used

- Flask
- PostgreSQL

## Setup Dev Enviroment

1. Install [Python 3.x](https://www.python.org/downloads/)

2. Set up virtual environment for local development:
    ```bash
    virtualenv venv
    ```

3. Activate virtual environment
    ```bash
    source venv/bin/activate
    ```

4. Install dependencies
    ```bash
    pip install -r requirements.txt
    ```

5. (optional) Set flask development environment - enables debug mode

    Windows:
    ```bash
    set FLASK_ENV=development
    ```

    Linux:
    ```bash
    export FLASK_ENV=development
    ```

5. Run Flask server locally
    ```bash
    python -m flask run
    ```
