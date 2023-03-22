import requests
import base64

CLIENT_ID = ''
CLIENT_SECRET = ''

APPLICATION_ID = ''
GUILD_ID = ''

def get_token():
    data = {
        'grant_type': 'client_credentials',
        'scope': 'applications.commands.update'
    }
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    r = requests.post('https://discord.com/api/v10/oauth2/token', data=data, headers=headers, auth=(CLIENT_ID, CLIENT_SECRET))
    r.raise_for_status()
    return r.json()['access_token']

url = f"https://discord.com/api/v10/applications/{APPLICATION_ID}/guilds/{GUILD_ID}/commands"

json = {
    "name": "quote",
    "type": "3"
}

headers = {
    "authorization": "Bearer " + get_token()
}

r = requests.post(url, headers=headers, json=json)
