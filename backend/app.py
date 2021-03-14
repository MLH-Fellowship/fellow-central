from flask import Flask, redirect, sessions, request, jsonify, session, abort
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
import requests
import os
from models import db, User, Points, Event
from dotenv import load_dotenv
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    JWTManager,
)
from flask_cors import CORS

load_dotenv()

DISCORD_CLIENT_ID = os.getenv("DISCORD_CLIENT_ID")
DISCORD_CLIENT_SECRET = os.getenv("DISCORD_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")
FELLOWSHIP_GUILD_ID = "818888976458973224"
BOT_TOKEN = os.getenv("BOT_TOKEN")
CURRENT_FELLOWSHIP = "0"

DB_USER = os.getenv("DB_USER")
DB_PW = os.getenv("DB_PW")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

FRONTEND_URL = os.environ["FRONTEND_URL"]
SECRET_KEY = os.environ["SECRET_KEY"]

db_uri = "postgresql://{dbuser}:{dbpw}@{dbhost}:{dbport}/{dbname}".format(
    dbuser=DB_USER, dbpw=DB_PW, dbhost=DB_HOST, dbport=DB_PORT, dbname=DB_NAME
)

app = Flask(__name__)

app.config.update(
    SQLALCHEMY_DATABASE_URI=db_uri,
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
    SECRET_KEY=SECRET_KEY,
    JWT_SECRET_KEY=SECRET_KEY,
)

db.init_app(app)
jwt = JWTManager(app)
CORS(app)


@app.route("/")
def index():
    return f"Hello {session.get('username')}#{session.get('discriminator')} @ {session.get('role')}"


@app.route("/discord")
def discord():
    full_redirect_url = "https://discord.com/api/oauth2/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&scope={scope}".format(
        client_id=DISCORD_CLIENT_ID,
        redirect_uri=REDIRECT_URI,
        scope="identify email guilds",
    )
    return redirect(full_redirect_url)


@app.route("/discord/callback")
def discord_callback():
    """
    Discord Callback.
    Discord Access Token is stored in session.get('discord_access_token')
    """
    # Get the discord access token
    data = requests.post(
        "https://discord.com/api/oauth2/token",
        data={
            "client_id": DISCORD_CLIENT_ID,
            "client_secret": DISCORD_CLIENT_SECRET,
            "grant_type": "authorization_code",
            "code": request.args.get("code"),
            "redirect_uri": REDIRECT_URI,
            "scope": "identify email guilds",
        },
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )

    # Store access token in session
    session["discord_access_token"] = data.json()["access_token"]

    # Get user's information
    data = requests.get(
        "https://discord.com/api/v8/users/@me",
        headers={
            "Authorization": f"Bearer {session.get('discord_access_token')}"},
    )

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
    guilds = requests.get(
        "https://discord.com/api/v8/users/@me/guilds",
        headers={
            "Authorization": f"Bearer {session.get('discord_access_token')}"},
    )

    # check if the user is in the fellowship guide
    in_fellowship = False
    for guild in guilds.json():
        if guild["id"] == FELLOWSHIP_GUILD_ID:
            in_fellowship = True

    if not in_fellowship:
        message = "Error: User is not a current MLH fellow!"
        return redirect(f"{FRONTEND_URL}?error=true&msg={message}")
    else:
        role = requests.get(
            f"https://discord.com/api/v8/guilds/{FELLOWSHIP_GUILD_ID}/members/{session.get('discord_id')}",
            headers={"Authorization": f"Bot {BOT_TOKEN}"},
        )

        # assume user only have one role
        user_roles = role.json()["roles"]

        roles = requests.get(
            f"https://discord.com/api/v8/guilds/{FELLOWSHIP_GUILD_ID}/roles",
            headers={"Authorization": f"Bot {BOT_TOKEN}"},
        )

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


@app.route("/admin/add_points", methods=['POST'])
def add_points():
    """
    Add points
    """
    data = request.get_json(silent=True)['data']

    amount = data.get('amount')
    assignee = data['assignee']
    description = data['description']
    event_id = None

    # if user's discord id is given, change assignee to discord username
    if "#" in assignee:
        user = User.query.filter_by(name=assignee).first()
    else:
        user = User.query.filter_by(id=assignee).first()
        assignee = user.name

    discord_id = user.id

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

    # Add to user's total points
    user.points_total += int(amount)

    db.session.commit()

    return jsonify({
        "success": success,
        "message": message,
        "data": {
            "id": new_point.id,
            "amount": new_point.amount,
            "assignee": new_point.assignee,
            "description": new_point.description,
            "event_id": new_point.event_id,
            "timestamp": new_point.timestamp
        }
    })


@app.route("/admin/create_event", methods=["POST"])
def create_event():
    """Create an event.

    Returns:
        Status request: The id of the object created.
    """
    data = request.get_json(silent=True)['data']

    event_name = data["name"]
    start_time_f = data["start_time"]
    end_time_f = data["end_time"]
    link = data["event_link"]
    secret_code_f = data["secret_code"]
    points = data["points_amount"]
    event_id = None

    new_event = Event(
        name=event_name,
        start_time=start_time_f,
        end_time=end_time_f,
        points_amount=points,
        secret_code=secret_code_f,
        event_link=link,
    )

    try:
        db.session.add(new_event)
        db.session.commit()

        message = "Event successfully created."
        success = True

        event_id = new_event.id

        return jsonify({"success": success, "message": message, "id": event_id})

    except:
        message = "Server Error. Could not commit to database"
        success = False

        return jsonify({"success": success, "message": message})

          
@app.route("/get_events")
@jwt_required()
def get_events():
    """ Get all events data

    Returns:
        json: payload describing conditions of query, success/failure and events data.
    """
    try:
        discord_id = get_jwt_identity()
        user = User.query.filter_by(id=discord_id).first()
        events = Event.query.all()

        events_data = []

        for event in events:
            event_data = {
                "id": event.id,
                "name": event.name,
                "start_time": event.start_time,
                "end_time": event.end_time,
                "points_amount": event.points_amount,
                "event_link": event.event_link,
                "vid_link": event.vid_link,
            }

            # Check if points are already claimed for event
            if Points.query.filter_by(event_id=event.id, assignee=discord_id).first():
                event_data['points_claimed'] = True
            else:
                event_data['points_claimed'] = False

            if user.role == 'admin':
                event_data['secret_code'] = event.secret_code

            events_data.append(event_data)

        return jsonify({
            "success": True,
            "message": "Events fetched successfully",
            "data": events_data
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error: {e}"
        })

          
@app.route("/get_pod_points")
@jwt_required()
def get_pod_points():
    """Return all the points for a single pod.

    Returns:
        json: Payload containing the pod name and the points.
    """

    pod = request.args["pod"]

    # Ideally this would be something like:
    # SELECT SUM(points_total)
    # FROM users
    # WHERE role=pod;
    #
    # But I honestly have NO clue how to do this with SQL alchemy syntax.

    fellows_in_pod = User.query.filter_by(role = pod)
    if fellows_in_pod is not None:

        points = 0
        for fellow in fellows_in_pod:
            points = points + fellow.points_total

        return jsonify({
            "success": True,
            "message": "Pod found.",
            str(pod): points
        })

    return jsonify({
        "success": False,
        "message": "Pod not found."
    })


def serialize_user(status, message, user=None):

    if user is None:
        return jsonify({
            "success": status,
            "message": message,
        })

    return jsonify({
        "success": status,
        "message": message,
        "data": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "points_total": user.points_total,
            "avatar_url": "https://cdn.discordapp.com/avatars/{user_id}/{avatar_hash}.png?size=128".format(
                user_id=session.get("discord_id"),
                avatar_hash=session.get("avatar")
            )
        }
    })

          
@app.route("/get_user")
@jwt_required()
def get_user():
    """Obtain user information. If a user is an admin, they can provide the optional "name" parameter
    to their GET request to obtain details about any user.
    If the user is a pod fellow, they can inquire about themselves only.

    Returns:
        json: payload describing conditions of query, success/failure and potentially user data.
    """
    discord_id = get_jwt_identity()
    user = User.query.filter_by(id=discord_id).first()
    if user is None:
        return serialize_user(False, "User not found.")

    else:
        # check if this is a fellow inquiring about their point total,
        # or if this is an admin inquiring about a fellow's total.
        if user.role == "admin":
            # get the specified info for admin
            r_discord_display_name = request.args.get('name')
            r_user = User.query.filter_by(name=r_discord_display_name).first()
            if r_user is None:
                return serialize_user(False, "The requested fellow was not found.")

            else:
                return serialize_user(True, "Fellow found.", r_user)

        else:
            return serialize_user(True, "Found your user.", user)

 
@app.route("/recent_points")
@jwt_required()
def recent_points():
    num_entries = int(request.args["num_entries"])

    # Ideally should be something like this:
    # SELECT name, timestamp, amount FROM
    #   points LEFT JOIN user ON user.id = points.id
    #   DESC LIMIT num_entries

    recent_points = reversed(Points.query.order_by(Points.timestamp)[1:num_entries])

    # FIXME: This is a hack. Join with Users table to get the *Discord* name, not the unique ID.
    data = []
    for point in recent_points:
        data.append({
            "timestamp": point.timestamp,
            "amount": point.amount,
            "user": User.query.filter_by(id=point.assignee).first().name
        })
          
    return jsonify({
        "success": True,
        "message": "{} out of {} entries found.".format(len(data), num_entries),
        "data": data,
    })

@app.route("/get_points_history")
@jwt_required()
def get_points_history():
    try:
        n = request.args.get('n') or 20  # Default 20

        points_history = Points.query.join(User).order_by(
            Points.timestamp.desc()).limit(n).all()

        points_history_data = []

        for points in points_history:
            points_data = {
                "amount": points.amount,
                "assignee": points.user.name,
                "description": points.description,
                "event_id": points.event_id,
                "timestamp": points.timestamp
            }

            points_history_data.append(points_data)

        # If user is not admin
        discord_id = get_jwt_identity()
        user = User.query.filter_by(id=discord_id).first()
        if user.role != "admin":
            points_history_data = list(filter(lambda p: p['assignee'] == user.name, points_history_data))

        return jsonify({
            "success": True,
            "message": "Points history fetched successfully",
            "data": points_history_data
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error: {e}"
        })


@app.route("/get_top_fellows")
def get_top_fellows():

    try:
        n = request.args.get('n') or 10  # Default 10

        top_fellows = User.query.filter(User.role != 'admin').order_by(
            User.points_total.desc()).limit(n).all()

        top_fellows_data = []

        for fellow in top_fellows:
            fellow_data = {
                "name": fellow.name,
                "points_total": fellow.points_total
            }

            top_fellows_data.append(fellow_data)

        return jsonify({
            "success": True,
            "message": "Top fellows fetched successfully",
            "data": top_fellows_data
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error: {e}"
        })


@app.route("/get_total_fellows")
@jwt_required()
def get_total_fellows():
    """Retrieve the number of fellows in the app.

    Returns:
        json: json payload containing requested information
    """
    try:
        num_fellows = User.query.count()
    
        return jsonify({
            "success": True,
            "message": "Number of fellows retrieved successfully",
            "data": num_fellows
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error: {e}"
        })

          
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run()
