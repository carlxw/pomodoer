// src: https://github.com/spotify/spotify-web-playback-sdk-example

import React, { useState, useEffect } from "react";

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
    const [volume, setVolume] = useState(100);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: "Pomodoro Website",
                getOAuthToken: callback => { callback(token); },
                volume: volume/100
            });
            
            setPlayer(player);
            
            player.addListener("ready", ({ device_id }) => {
                console.log("Ready with Device ID", device_id);  
            });
            
            player.addListener("not_ready", ({ device_id }) => {
                console.log("Device ID has gone offline", device_id);
            });

            player.addListener("player_state_changed", ( state => {
                console.log(state);
                if (!state) {
                    console.log("Trashed")
                    player.disconnect();
                    setToken("")
                }

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then( state => { 
                    (!state) ? setActive(false) : setActive(true) 
                });
            }));

            player.connect();
        };
    }, []);

    const handleVolumeChange = (e) => {
        player.setVolume(e.target.value/100)
        setVolume(e.target.value);
    }

    if (!is_active) { 
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">
                        <b> Instance not active. Transfer your playback using your Spotify app </b>
                    </div>
                </div>
            </>)
    } else {
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">
                        <img src={ current_track.album.images[0].url } className="now-playing__cover" alt="" />

                        <div className="now-playing__side">
                            <div className="now-playing__name">{ current_track.name }</div>
                            <div className="now-playing__artist">{ current_track.artists[0].name }</div>

                            <button className="btn-spotify" onClick={() => { player.previousTrack() }} >
                                &lt;&lt;
                            </button>

                            <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
                                { is_paused ? "PLAY" : "PAUSE" }
                            </button>

                            <button className="btn-spotify" onClick={() => { player.nextTrack() }} >
                                &gt;&gt;
                            </button>

                            <button className="btn-spotify" onClick={() => { player.disconnect(); setToken("") }} >
                                dc
                            </button>

                            <input 
                                id="volume_slider" 
                                type="range" 
                                min="0" max="100" 
                                value={ volume } 
                                onChange={ handleVolumeChange }
                                step="1"
                            />
                            <label>Volume</label>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default WebPlayback;