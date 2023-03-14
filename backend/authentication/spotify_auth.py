import requests
import base64

def get_access_token():
    client_id = "1062ec374487407eb597e2e70e02a000"
    client_secret = "aded918113254101aaf48ef3904eed6b"
    encoded = base64.b64encode((client_id + ":" + client_secret).encode("ascii")).decode("ascii")

    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + encoded
    }
    
    data = {
        "grant_type": "client_credentials"
    }
    
    response = requests.post("https://accounts.spotify.com/api/token", data=data, headers=headers)

    if response.status_code != 200:
        raise Exception("Failed to obtain access token")
    else:
        token_data = response.json()
        access_token = token_data['access_token']

        return access_token

access_token = get_access_token()