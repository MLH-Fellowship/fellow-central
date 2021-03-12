from flask import Flask, redirect, sessions, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
import requests
import os
from models import db, User, Points, Event
from dotenv import load_dotenv
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from flask_cors import CORS

load_dotenv()

DISCORD_CLIENT_ID = os.environ['DISCORD_CLIENT_ID']
DISCORD_CLIENT_SECRET = os.environ['DISCORD_CLIENT_SECRET']
REDIRECT_URI = 'http://127.0.0.1:5000/discord/callback'
FELLOWSHIP_GUILD_ID = '818888976458973224'
BOT_TOKEN = os.environ['BOT_TOKEN']
CURRENT_FELLOWSHIP = '0'

DB_USER = os.environ['DB_USER']
DB_PW = os.environ['DB_PW']
DB_HOST = os.environ['DB_HOST']
DB_PORT = os.environ['DB_PORT']
DB_NAME = os.environ['DB_NAME']

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
    screen_name = str(username) + "#" + str(discriminator)
    avatar = data.json()["avatar"]

    session["discord_id"] = discord_id
    session["username"] = username
    session["email"] = email
    session["discriminator"] = discriminator
    session["screen_name"] = screen_name
    session["avatar"] = avatar

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
            new_user = User(id=discord_id, name=screen_name,
                            email=email, role=role)
            db.session.add(new_user)
            db.session.commit()
            message = "Success: User registered!"

    jwt_token = create_access_token(identity=discord_id, expires_delta=False)
    return redirect(f"{FRONTEND_URL}?token={jwt_token}&msg={message}")


@app.route("/points/add", methods=['POST'])
def add_points():
    """
    Add points
    """
    data = request.json

    amount = data['amount']
    assignee = data['assignee']
    description = data['description']
    event_id = None

    discord_id = User.query.filter_by(name=assignee).first().id

    if description == 'Event':
        event_id = data.get('event_id')
        secret_input = data.get('secret_input')
        if event_id is None:
            return jsonify({
                "success": False,
                "message": 'Please specify the event id'
            })
        if secret_input is None:
            return jsonify({
                "success": False,
                "message": 'Please input the secret code'
            })

        # Check if points are already claimed for event
        if Points.query.filter_by(event_id=event_id, assignee=discord_id).first():
            return jsonify({
                "success": False,
                "message": 'Event points already claimed'
            })
        else:
            # Check if input matches event secret code
            event = Event.query.filter_by(id=event_id).first()
            if event.secret_code == secret_input:
                amount = event.points_amount
                message = f'{amount} points added to {assignee} for Event {event.name}'
                success = True
            else:
                return jsonify({
                    "success": False,
                    "message": f'The code {secret_input} is incorrect for Event {event.name}'
                })

    elif description == 'Discord':
        # Check daily limit of 5 messages is exceeded
        discord_points_today = Points.query.filter_by(description='Discord', assignee=discord_id) \
            .filter(func.date(Points.timestamp) == func.date(func.now())).all()
        if len(discord_points_today) >= 5:
            return jsonify({
                "success": False,
                "message": 'Daily limit for Discord activity points reached'
            })
        else:
            message = f'{amount } points added to {assignee} for Discord activity'
            success = True
    else:
        message = f'{amount} points added to {assignee} for {description}'
        success = True

    # Create a Points in the points table
    new_point = Points(amount=amount, assignee=discord_id,
                       description=description, event_id=event_id)
    db.session.add(new_point)
    db.session.commit()

    return jsonify({
        "success": success,
        "message": message
    })


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run()
