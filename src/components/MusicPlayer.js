import { useState } from "react";

import "../css/MusicPlayer.css"; 

const MusicPlayer = ({ player, current_track, is_paused, createPlayer, setActive }) => {
    const [volume, setVolume] = useState(25);

    const handleVolumeChange = (e) => {
        player.setVolume(e.target.value/100)
        setVolume(e.target.value);
    }

    const handleDisconnect = () => {
        if (player) player.disconnect(); 
        setTimeout(() => setActive(false), 500); 
        createPlayer();
    }

    return(
        <>
            <div className="spotify-container">
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

                        <button className="btn-spotify" onClick={handleDisconnect} >
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
export default MusicPlayer;