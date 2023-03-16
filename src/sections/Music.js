import React, { useState, useEffect } from "react";
import WebPlayback from "../WebPlayback"
import Login from "../components/Login"

const Music = () => {
  	const [token, setToken] = useState("");

	useEffect(() => {
		async function getToken() {
			const response = await fetch("/auth/token");
			const json = await response.json();
			setToken(json.access_token);
		}
		getToken();
  	}, []);

  return (
	<>
		<div className="music">
			<div className="player">
				{ (token === "") ? <Login /> : <WebPlayback token={ token } /> }
			</div>
		</div>
	</>
  );
}

export default Music;
