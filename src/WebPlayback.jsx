// src: https://github.com/spotify/spotify-web-playback-sdk-example

import React, { useState, useEffect } from "react";
import ConnectPlayer from "./components/ConnectPlayer";
import MusicPlayer from "./components/MusicPlayer";

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

const WebPlayback = ({ token }) => {
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
                name: "Pomodoro Website",
                getOAuthToken: callback => { callback(token); },
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
                        (state.duration === 0) ? setActive(false) : setActive(true) 
                    });
                }
            }));

            player.connect();
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