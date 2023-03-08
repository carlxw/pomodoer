import { Howl } from "howler";
import { useState, useEffect } from "react";

const MusicPlayer = ({ token }) => {
    let [isPlaying, setIsPlaying] = useState(false);

    const track = {
        cover: 1,
        name: 1,
        artist: 1
    }

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', ( state => {
                if (!state) {
                    return;
                }

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true) 
                });

            }));

            player.connect();
        };
    }, []);

    return(
        <>
            <img src={ track.cover } style={{ width: 128, height: 128}} id="album_cover" alt="album cover" />

            <div id="track_info">
                <h1>{ track.name }</h1>
                <h2>{ track.artist }</h2>
            </div>

            <div id="media_controls">
                <button onClick={() => player.previousTrack()}>prev</button>
                <button onClick={() => {
                    player.play();
                }}>{ isPlaying ? "pause" : "play" }</button>
                <button onClick={() => player.nextTrack()}>next</button>
            </div>
        </>
    );
}

export default MusicPlayer;