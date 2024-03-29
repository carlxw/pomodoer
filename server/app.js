const express = require("express");
const dotenv = require("dotenv");
const config = require("../src/config.json");
const axios = require("axios");
const cors = require("cors");

const port = process.env.PORT || 8000;
global.access_token = "";
dotenv.config();

let app = express();
app.use(cors());

let spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
let spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
let spotify_redirect_uri = `${config.dev ? "" : config.server_url}/auth/callback`;

let generateRandomString = function (length) {
	let text = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

/* ========== SPOTIFY AUTH ========== */

app.get("/auth/login", (req, res) => {
	let scope = "streaming \ user-read-email \ user-read-private";
	let state = generateRandomString(16);

	let auth_query_parameters = new URLSearchParams({
		response_type: "code",
		client_id: spotify_client_id,
		scope: scope,
		redirect_uri: spotify_redirect_uri,
		state: state
	})

	console.log("Redirecting to Spotify...");
	res.redirect("https://accounts.spotify.com/authorize/?" + auth_query_parameters.toString());
});

app.get("/auth/callback", async (req, res) => {
	let authOptions = {
		url: "https://accounts.spotify.com/api/token",
		form: { 
			// "Data"
			code: req.query.code,
			redirect_uri: spotify_redirect_uri,
			grant_type: "authorization_code"
		},
		headers: {
			"Authorization": "Basic " + (Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString("base64")),
			"Content-Type" : "application/x-www-form-urlencoded"
		},
		json: true
	};

	let response = await axios.post(authOptions.url, authOptions.form, { headers: authOptions.headers });

	if (response.status === 200) {
		access_token = response.data.access_token;

		console.log("Redirecting to home...");
		res.redirect(config.dev ? "/" : config.homepage_url);
	}
});

app.get("/auth/token", (req, res) => {
	res.json({ access_token: access_token });
});

app.listen(port, () => {
  	if (!process.env.PORT) console.log(`Listening at http://localhost:${port}`);
	else console.log(`Listening at port ${process.env.PORT}`);
});
