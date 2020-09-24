<p align="center"><img src="docs/logo.png" align="center" alt="remotify" height="128" style="display: block; margin: auto;" /></p>

# Remotify

### Local REST API to interact with running Spotify desktop client.


This is a proof of concept but it turned out to be very effective.

## How it works.

Node process start rest api server which can be control running Spotify app.
It needs Spotify to be running in debug mode (devtools protocol) so Electron gui of Spotify can be accessed this way.
If Spotify is running already in regular mode - it can be restarted with debug mode turned on.
Actual actions can be performed by UI automation.

Currently implemented actions include: 
* Connect to running spotify
* Restart or start Spotify in debug mode 
* Toggle Play / Pause
* Next Track 




_Icon taken from [here](https://www.iconfinder.com/icons/1665672/flag_media_networking_social_spotify_icon)._

_Express REST API starter cloned from [@jaredpetersen](https://github.com/jaredpetersen/nodejs-api-template)_
