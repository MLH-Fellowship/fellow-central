from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

db_uri = 'postgresql://{dbuser}:{dbpw}@{dbhost}:{dbport}/{dbname}'.format(
    dbuser=os.environ['DB_USER'],
    dbpw=os.environ['DB_PW'],
    dbhost=os.environ['DB_HOST'],
    dbport=os.environ['DB_PORT'],
    dbname=os.environ['DB_NAME']
)

app.config.update(
    SQLALCHEMY_DATABASE_URI=db_uri,
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
)

db = SQLAlchemy(app)

if __name__ == '__main__':
    app.run()