import discord
import os

client = discord.Client()

@client.event
async def on_ready():
    print('We have logged in as {0.user}'.format(client))



client.run(os.environ("DISCORD_BOT_TOKEN"))