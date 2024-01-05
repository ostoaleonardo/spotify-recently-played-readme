<div align="center">
<img width="70%" height = "auto" src="https://spotify-recently-played-github-readme.vercel.app/api" alt="Recently Played Spotify" />
</div>

<h1 align="center">Recently Played on Spotify README</h1>

If you want to show what you are listening to on Spotify on your GitHub profile, this is the way to do it.

## Getting started

#### Create a Spotify application

- Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and log in with your Spotify account.
- Click on `Create app` and fill in the required fields.
- Click on `Settings` and add `http://localhost:3000` as a redirect URI.
- Copy the `Client ID` and `Client Secret`.

#### Get a refresh token

- Replace the `{CLIENT_ID}` and `{REDIRECT_URI}` placeholders in the following URL with the values from your Spotify application.

```
https://accounts.spotify.com/authorize?client_id={CLIENT_ID}&response_type=code&redirect_uri={REDIRECT_URI}&scope=user-read-recently-played
```

- Open the URL in your browser and log in with your Spotify account.
- You will be redirected to `http://localhost:3000/?code={CODE}`. Copy the `{CODE}` value from the URL.

- Encode the `{CLIENT_ID}` and `{CLIENT_SECRET}` values from your Spotify application as a base64 string. You can use [Base64Encode.org](https://www.base64encode.org/) for this. The format should be as follows:

```
{CLIENT_ID}:{CLIENT_SECRET}
```

- Replace the `{ENCODED_CLIENT_CREDENTIALS}`, `{CODE}` and `{REDIRECT_URI}` placeholders in the following command with the values from your Spotify application. Run the command in your terminal.

```
curl -H "Authorization: Basic {ENCODED_CLIENT_CREDENTIALS}" -d grant_type=authorization_code -d code={CODE} -d redirect_uri={REDIRECT_URI} https://accounts.spotify.com/api/token
```

- If everything went well, you should get a response that looks something like this, containing your refresh token:

```
{
    "access_token": {YOUR_ACCESS_TOKEN},
    "token_type": "Bearer",
    "expires_in": 3600,
    "refresh_token": {YOUR_REFRESH_TOKEN},
    "scope": "user-read-recently-played"
}
```

- Copy the `"refresh_token"` value.

#### Clone this repository

- Clone this repository to your local machine.

- Rename the `.env.example` file to `.env`.

- Replace the `{SPOTIFY_CLIENT_ID}`, `{SPOTIFY_SECRET_ID}` and `{SPOTIFY_REFRESH_TOKEN}` placeholders in the `.env` file with yours values.

```
SPOTIFY_CLIENT_ID=YOUR-SPOTIFY-CLIENT-ID
SPOTIFY_SECRET_ID=YOUR-SPOTIFY-SECRET-ID
SPOTIFY_REFRESH_TOKEN=YOUR-SPOTIFY-REFRESH-TOKEN
```

- Install the dependencies.

```
npm install
```

- Run the application.

```
npm run start
```

- If everything went well, you should see the following message in your terminal:

```
Server running at http://localhost:3000/api
```

#### Deploy the application

- Deploy the application to a server of your choice. I recommend [Vercel](https://vercel.com/).

- Make sure to set the `SPOTIFY_CLIENT_ID`, `SPOTIFY_SECRET_ID` and `SPOTIFY_REFRESH_TOKEN` environment variables in your settings on the server (In Vercel, you can do this in the `Environment Variables` section of your project settings).

- Copy your deployment URL.

#### Add the badge to your GitHub profile

- Add the following markdown to your GitHub profile README. Replace the `{YOUR-DEPLOYMENT-URL}` placeholder with your deployment URL.

```
![Recently Played Spotify]({YOUR-DEPLOYMENT-URL}/api)
```

- It should look something like this:

![Recently Played Spotify](https://spotify-recently-played-github-readme.vercel.app/api)
