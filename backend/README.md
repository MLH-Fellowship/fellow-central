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

5. Set up .env file (fill in values)
    ```
    FLASK_ENV=development
    FLASK_APP=app.py

    DB_USER=
    DB_PW=
    DB_HOST=
    DB_PORT=
    DB_NAME=

    DISCORD_CLIENT_ID=
    DISCORD_CLIENT_SECRET=
    BOT_TOKEN=

    FRONTEND_URL=
    SECRET_KEY=
    ```

6. Run Flask server locally
    ```bash
    python -m flask run
    ```

## Accessing the Database

1. Connect to the PostgreSQL DB instance
    ```bash
    psql \
    --host=<endpoint> \
    --port=<port> \
    --username=<username> \
    --password \
    --dbname=<database-name> 
    ```

2. Connect to the database
    ```bash
    \c <database-name>
    ```

3. View table
    ```sql
    SELECT * from <table-name>;
    ```