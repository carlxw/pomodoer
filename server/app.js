const express = require("express")
// const request = require("request");
const dotenv = require("dotenv");

const port = 8000

global.access_token = ""

dotenv.config()
let app = express();

const config = require("../src/config.json");

let spotify_client_id = "a4f3f6ce94e146d4aa6416ef2e859ea1"
let spotify_client_secret = "e26d6398972a4bf0930f1c05907ce965"
let spotify_redirect_uri = config.redirect_url;

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
	let scope = "streaming \ user-read-email \ user-read-private"
	let state = generateRandomString(16);

	let auth_query_parameters = new URLSearchParams({
		response_type: "code",
		client_id: spotify_client_id,
		scope: scope,
		redirect_uri: spotify_redirect_uri,
		state: state
	})

	res.redirect("https://accounts.spotify.com/authorize/?" + auth_query_parameters.toString());
})

app.get("/auth/callback", async (req, res) => {
	let authOptions = {
		url: "https://accounts.spotify.com/api/token",
		form: {
			code: req.query.code,
			redirect_uri: spotify_redirect_uri,
			grant_type: "authorization_code"
		},
		headers: {
			"Authorization": "Basic " + (Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString("base64")),
			// "Content-Type" : "application/x-www-form-urlencoded"
		}
		// json: true
	};

	const form = new FormData

	// request.post(authOptions.url, function(error, response, body) {
	// 	if (!error && response.statusCode === 200) {
	// 		access_token = body.access_token;
	// 		res.redirect("/")
	// 	}
	// });

	let response = await fetch(authOptions.url, {
		method: "POST",
		headers: authOptions.headers,
		body: new URLSearchParams(authOptions.form)
	})

	if (response.status === 200) {
		const data = await response.json();
		access_token = data.access_token;

		res.redirect("/");
	}
})

app.get("/auth/token", (req, res) => {
  	res.json({ access_token: access_token})
})

/* ========== PLAYLIST ========== */

app.listen(port, () => {
  	console.log(`Listening at http://localhost:${port}`)
})
