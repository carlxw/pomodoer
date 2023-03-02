import { Howl } from "howler";
import { useState } from "react";

const MusicPlayer = ({ image, track_name, artist_name }) => {
    let [isPlaying, setIsPlaying] = useState(false);

    const song = {
        cover: image,
        name: track_name,
        artist: artist_name
    }

    return(
        <>
            <img src={ song.cover } style={{ width: 128, height: 128}} id="album_cover" alt="album cover" />

            <div id="song_info">
                <h1>{ song.name }</h1>
                <h2>{ song.artist }</h2>
            </div>

            <div id="media_controls">
                <button>prev</button>
                <button onClick={() => {
                    if (isPlaying) setIsPlaying(false);
                    else setIsPlaying(true);
                }}>{ isPlaying ? "pause" : "play" }</button>
                <button>next</button>
            </div>
        </>
    );
}

export default MusicPlayer;