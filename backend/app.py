from flask import Flask, redirect, sessions, request, jsonify, session, abort
from flask_sqlalchemy import SQLAlchemy
import requests
import os
from models import db, User, Points, Event
from dotenv import load_dotenv
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from flask_cors import CORS

load_dotenv()

DISCORD_CLIENT_ID = os.getenv('DISCORD_CLIENT_ID')
DISCORD_CLIENT_SECRET = os.getenv('DISCORD_CLIENT_SECRET')
REDIRECT_URI = 'http://127.0.0.1:5000/discord/callback'
FELLOWSHIP_GUILD_ID = '818888976458973224'
BOT_TOKEN = os.getenv('BOT_TOKEN')
CURRENT_FELLOWSHIP = '0'

DB_USER = os.getenv('DB_USER')
DB_PW = os.getenv('DB_PW')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_NAME = os.getenv('DB_NAME')

FRONTEND_URL = os.environ['FRONTEND_URL']
SECRET_KEY = os.environ['SECRET_KEY']

db_uri = 'postgresql://{dbuser}:{dbpw}@{dbhost}:{dbport}/{dbname}'.format(
    dbuser=DB_USER,
    dbpw=DB_PW,
    dbhost=DB_HOST,
    dbport=DB_PORT,
    dbname=DB_NAME
)

app = Flask(__name__)

app.config.update(
    SQLALCHEMY_DATABASE_URI=db_uri,
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
    SECRET_KEY=SECRET_KEY,
    JWT_SECRET_KEY=SECRET_KEY
)

db.init_app(app)
jwt = JWTManager(app)
CORS(app)


@app.route("/")
def index():
    return f"Hello {session.get('username')}#{session.get('discriminator')} @ {session.get('role')}"


@app.route('/discord')
def discord():
    full_redirect_url = 'https://discord.com/api/oauth2/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&scope={scope}'.format(
        client_id=DISCORD_CLIENT_ID,
        redirect_uri=REDIRECT_URI,
        scope='identify email guilds'
    )
    return redirect(full_redirect_url)


@app.route("/discord/callback")
def discord_callback():
    """
    Discord Callback.
    Discord Access Token is stored in session.get('discord_access_token')
    """
    # Get the discord access token
    data = requests.post("https://discord.com/api/oauth2/token", data={
        'client_id': DISCORD_CLIENT_ID,
        'client_secret': DISCORD_CLIENT_SECRET,
        'grant_type': 'authorization_code',
        'code': request.args.get("code"),
        'redirect_uri': REDIRECT_URI,
        'scope': 'identify email guilds'
    }, headers={
        'Content-Type': 'application/x-www-form-urlencoded'
    })

    # Store access token in session
    session["discord_access_token"] = data.json()["access_token"]

    # Get user's information
    data = requests.get("https://discord.com/api/v8/users/@me", headers={
        "Authorization": f"Bearer {session.get('discord_access_token')}"
    })

    email = data.json()["email"]
    discriminator = data.json()["discriminator"]
    discord_id = data.json()["id"]
    username = data.json()["username"]

    session["discord_id"] = discord_id
    session["username"] = username
    session["email"] = email
    session["discriminator"] = discriminator

    # get all the guilds that user's in
    guilds = requests.get("https://discord.com/api/v8/users/@me/guilds", headers={
        "Authorization": f"Bearer {session.get('discord_access_token')}"
    })

    # check if the user is in the fellowship guide
    in_fellowship = False
    for guild in guilds.json():
        if guild["id"] == FELLOWSHIP_GUILD_ID:
            in_fellowship = True

    if not in_fellowship:
        message = "Error: User is not a current MLH fellow!"
        return redirect(f"{FRONTEND_URL}?error=true&msg={message}")
    else:
        role = requests.get(f"https://discord.com/api/v8/guilds/{FELLOWSHIP_GUILD_ID}/members/{session.get('discord_id')}", headers={
            "Authorization": f"Bot {BOT_TOKEN}"
        })

        # assume user only have one role
        user_roles = role.json()["roles"]

        roles = requests.get(f"https://discord.com/api/v8/guilds/{FELLOWSHIP_GUILD_ID}/roles", headers={
            "Authorization": f"Bot {BOT_TOKEN}"
        })

        role = None
        for r in roles.json():
            if r["name"] == "admin" and r["id"] in user_roles:
                role = "admin"
            elif r["name"][4] == CURRENT_FELLOWSHIP and r["id"] in user_roles:
                role = r["name"]

        session["role"] = role

        # create and add a new user if doesn't exist
        if User.query.filter_by(id=discord_id).first():
            message = "Success: Logged in!"
        else:
            new_user = User(id=discord_id, name=username,
                            email=email, role=role)
            db.session.add(new_user)
            db.session.commit()
            message = "Success: User registered!"

    jwt_token = create_access_token(identity=discord_id, expires_delta=False)
    return redirect(f"{FRONTEND_URL}?token={jwt_token}&msg={message}")


@app.route("/admin/create_event", methods = ["POST"])
def create_event():
    print (request.method)
    if request.method == 'POST':
        # enter the values provided by the form
        event_name = request.form['name']
        start_time_f = request.form['start_time']
        end_time_f = request.form['end_time']
        link = request.form['event_link']
        secret_code_f = request.form['secret_code']
        points = request.form['points_amount']

        new_event = Event(name=event_name, start_time=start_time_f,
                          end_time=end_time_f,
                          points_amount=points,
                          secret_code=secret_code_f,
                          event_link=link)

        db.session.add(new_event)
        db.session.commit()

        return f"{new_event.id}"

    else:
        print("What")
        abort(405)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run()
