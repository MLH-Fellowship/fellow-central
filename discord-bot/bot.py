import discord
import os
import requests
from datetime import datetime
from discord.utils import get
from datetime import date, timedelta

today = date.today()

warned = []

BASE_URL = "https://fellow-central.herokuapp.com"
CHECK_USER_REGISTRATION_ENDPOINT = BASE_URL + "/check-user-registration-status"
ADD_POINT = BASE_URL + "/admin/add_points"
GET_TOP_FELLOWS = BASE_URL + "/get_top_fellows"
GET_POINT = BASE_URL + "/discord/get_user_points"


client = discord.Client()

@client.event
async def on_ready():
    print('We have logged in as {0.user}'.format(client))


@client.event
async def on_message(message):
    bot_id = client.user.id
    if str(bot_id) in message.content:
        option = str(message.content).split(f"<@!{bot_id}> ")[1].split(",")[0]
        print(option)

        if option == "view":
            data = requests.get(GET_POINT + f"?id={message.author.id}")
            print(data.json())
            await message.channel.send(data.json()["data"]["points_total"])

        elif option == "rank":
            data = requests.get(GET_TOP_FELLOWS)
            top_fellows = ""
            for i in range(len(data.json()["data"])):
                top_fellows += f"{i+1} - {data.json()['data'][i]['name']}\n"
            await message.channel.send(top_fellows)

        elif option == "add":
            # only admin
            if get(message.author.roles, name="admin"):
                splitted_msg = str(message.content).split(f"<@!{bot_id}> ")[1].split(",")

                try:
                    amount = int(splitted_msg[1])
                    assignee = splitted_msg[2][4:-2]
                    description = splitted_msg[3]
                except IndexError:
                    await message.channel.send("Invalid, make sure to provide in this order: amount, assignee (tag them), description")

                try:
                    int(amount)
                    int(assignee)
                except:
                    await message.channel.send("Invalid, make sure to provide in this order: amount, assignee (tag them), description")

                print(assignee, message.author.id)
                if str(assignee) == str(message.author.id):
                    await message.channel.send("Can't add point to yourself!")
                elif str(assignee) == str(bot_id):
                    await message.channel.send("Thanks for giving me a point too!")
                else:
                    data = requests.post(ADD_POINT, json={
                        "data": {
                            "amount": amount,
                            "assignee": str(assignee),
                            "description": str(description)
                        }
                    })
                    print(data.text)
                    try:
                        await message.channel.send(data.json()["message"])
                    except:
                        await message.channel.send("Are you sure you registered at https://leagueoffellow.netlify.app")
            else:
                await message.channel.send("Admin only")

        elif option == "help":
            await message.channel.send(
            """
            Register on the web interface: https://leagueoffellow.netlify.app\n

            Everytime you send a message that does not tag this bot, you will earn 1 point. You can earn up to 5 times per day.\n

            Tag the bot with add command, you can add point to fellow if you are an admin
            """)

        elif option == "spam":
            await message.channel.send(f"<@!{bot_id}> Invalid command")

        else:
            if str(message.author.id) != str(bot_id):
                await message.channel.send(f"Invalid command, type `<@!{bot_id}> help` for help.")

    else:
        if str(message.author.id) != str(bot_id):
            print(message.content)
            data = requests.post(ADD_POINT, json={
                "data": {
                    "amount": 1,
                    "assignee": str(message.author.id),
                    "description": 'Discord'
                }
            })
            today = date.today()
            yesterday = datetime.now() - timedelta(1)
            global warned
            print(data.json())
            if data.json()["success"] == False:
                if not [message.author.id, today.day] in warned:
                    warned.append([message.author.id, today.day])
                    try:
                        warned.remove([message.author.id, yesterday.day])
                    except ValueError:
                        pass
                    await message.channel.send(data.json()["message"])
            else:
                await message.channel.send(data.json()["message"])


client.run(os.getenv("DISCORD_BOT_TOKEN"))