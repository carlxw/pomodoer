// src: https://github.com/spotify/spotify-web-playback-sdk-example

import React, { useState, useEffect } from "react";
import ConnectPlayer from "./components/ConnectPlayer";
import MusicPlayer from "./components/MusicPlayer";
import axios from "axios";

import config from "./config.json";

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

const WebPlayback = ({ token, setToken }) => {
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);

    const createPlayer = () => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: config.sdk_player_name,
                getOAuthToken: async (callback) => { 
                    let today = new Date();
                    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    console.log(`getOAuthToken called at ${time}`);
                    
                    axios.get(`https://api.spotify.com/v1/me?access_token=${token}`)
                    .then((res) => {
                        console.log(`Success with ${token}`);
                        callback(token);
                    })
                    .catch(async (err) => {
                        console.log("Error");
                        console.log(err);

                        axios.get(`${config.dev ? "http://localhost:8000" : config.server_url}/refresh_token`)
                        .then(res => {
                            console.log(res);
                            if (res.data.access_token === undefined) return;

                            console.log(`New access token ${res.data.access_token} obtained`);
                            token = res.data.access_token;
                            setToken(res.data.access_token);
                            callback(res.data.access_token);

                            player.connect().then(success => {
                                if (success) console.log("Player connected via Refresh Token!");
                            });
                        })
                        .catch((err) => console.log(err));
                    })
                },
                volume: 0.25
            });
            
            setPlayer(player);
            
            player.addListener("ready", ({ device_id }) => {
                console.log("Ready with Device ID", device_id);  
            });
            
            player.addListener("not_ready", ({ device_id }) => {
                console.log("Device ID has gone offline", device_id);
            });

            player.addListener("player_state_changed", (state => {
                if (state.duration === 0) {
                    setActive(false);
                    return;
                }
                else {
                    setTrack(state.track_window.current_track);
                    setPaused(state.paused);

                    player.getCurrentState().then(state => { 
                        console.log(player);
                        console.log(state);
                        (state.duration === 0) ? setActive(false) : setActive(true) 
                    });
                }
            }));

            player.connect().then(success => {
                if (success) console.log("Web Player connected to Spotify on first run!");
            });
        }
    };

    useEffect(() => {
        createPlayer();   
    }, []);

    if (!is_active) { 
        return (
            <ConnectPlayer />
        );
    } else {
        return (
            <MusicPlayer player={ player } current_track={ current_track } is_paused={ is_paused } createPlayer={ createPlayer } setActive={ setActive } />
        );
    }
}

export default WebPlayback;