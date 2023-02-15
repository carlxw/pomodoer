import image from "./album-cover.jpg";

const Music = () => {
    return (
        <div className="music">
            <div className="url_input">
                <p>url:</p>
                <input type="url"></input>
            </div>

            <div className="music_source">
                <button>YouTube</button>
                <button>Spotify</button>
                <button>SoundCloud</button>
            </div>
            
            <img src={image} style={{ width: 128, height: 128}} className="album_cover" alt="album cover" />

            <div className="song_info">
                <h1>NIGHT RIDER</h1>
                <h2>Joji</h2>
            </div>

            <div className="media_controls">
                <button>prev</button>
                <button>play</button>
                <button>next</button>
            </div>
        </div>
    );
}

export default Music;