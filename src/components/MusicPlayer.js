import { useState } from "react";
import { IconContext } from "react-icons";
import { MdPause, MdPlayArrow, MdVolumeUp } from "react-icons/md";

const MusicPlayer = ({ player, current_track, is_paused, createPlayer, setActive }) => {
    const [volume, setVolume] = useState(25);

    const handleVolumeChange = (e) => {
        player.setVolume(e.target.value/100)
        setVolume(e.target.value);
    }

    // Future
    const handleDisconnect = () => {
        if (player) player.disconnect(); 
        setTimeout(() => setActive(false), 500); 
        createPlayer();
    }

    return(
        <div className="spotify-container">
            <div className="spotify-main-wrapper music-flex">
                <img src={ current_track.album.images[0].url } className="now-playing__cover" alt="" />

                <div className="now-playing__side music-column-flex">
                    <div className="song-info music-column-flex">
                        <div className="now-playing__name title-overflow">{ current_track.name }</div>
                        <div className="now-playing__artist title-overflow">{ current_track.artists[0].name }</div>
                    </div>

                    <div>
                        <div className="media-controls">
                            <div className="player-buttons">
                                <button id="change-track" className="btn-spotify" onClick={() => { player.previousTrack() }} >
                                    &lt;&lt;
                                </button>

                                <button id="play-pause" className="btn-spotify" onClick={() => { player.togglePlay() }} >
                                    <IconContext.Provider value={{ size: "2rem", verticalAlign: "middle" }}>
                                        { is_paused ? <MdPlayArrow className="react-icons"/> : <MdPause className="react-icons"/> }
                                    </IconContext.Provider>
                                </button>

                                <button id="change-track" className="btn-spotify" onClick={() => { player.nextTrack() }} >
                                    &gt;&gt;
                                </button>

                                {/* <button className="btn-spotify" onClick={handleDisconnect} >
                                    Disconnect
                                </button> */}
                            </div>
                            
                            <div className="volume-slider music-flex">
                                <input 
                                    id="volume_slider" 
                                    type="range" 
                                    min="0" max="100" 
                                    value={ volume } 
                                    onChange={ handleVolumeChange }
                                    step="1"
                                />
                                <label>
                                    <IconContext.Provider value={{ size: "1.5rem", verticalAlign: "middle" }}>
                                        <MdVolumeUp />
                                    </IconContext.Provider>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* <img id="spotify-icon" src={ image } style={{ height: "3rem" }} /> */}
                </div>
            </div>
        </div>
    );
}
export default MusicPlayer;