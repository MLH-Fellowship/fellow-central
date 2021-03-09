from flask import Flask, redirect, sessions, request, jsonify, session
import requests
import os

app = Flask(__name__)
app.config["SECRET_KEY"] = "secretkey"

DISCORD_CLIENT_ID = os.getenv("DISCORD_CLIENT_ID")
DISCORD_CLIENT_SECRET = os.getenv("DISCORD_CLIENT_SECRET")
REDIRECT_URI = "http://127.0.0.1:5000/discord/callback"
FELLOWSHIP_GUILD_ID = "716052909271285803"

@app.route('/discord')
def discord():
    return redirect("https://discord.com/api/oauth2/authorize?client_id=818733316948623370&redirect_uri=http%3A%2F%2F127.0.0.1%3A5000%2Fdiscord%2Fcallback&response_type=code&scope=guilds%20identify%20email")

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
    }, headers = {
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

    # get all the guilds that user's in
    guilds = requests.get("https://discord.com/api/v8/users/@me/guilds", headers={
        "Authorization": f"Bearer {session.get('discord_access_token')}"
    })

    # check if the user is in the fellowship guide
    in_fellowship = False
    for guild in guilds.json():
        if guild["id"] == FELLOWSHIP_GUILD_ID:
            in_fellowship = True
        elif in_fellowship == False:
            in_fellowship = False

    # redirect to homepage
    return redirect("/")


if __name__ == '__main__':
    app.run()