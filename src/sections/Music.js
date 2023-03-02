import { useState } from "react";
import axios from "axios";
import MusicPlayer from "../components/MusicPlayer";
import image from "../album-cover.jpg";

const Music = () => {
    const [url, setUrl] = useState("");

    const handleSubmit = (e) => {
        const config = {
            url: "http://localhost:8000/upload",
            content: JSON.stringify({ link: url }),
            param: {headers: {"Content-Type": "application/json"}}
        }
        axios.post(config.url, config.content, config.param)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err);
        })
        
        e.preventDefault(); // To remove
    }

    return (
        <div className="music">
            <form onSubmit={ handleSubmit }>
                <p>url:</p>
                <input 
                    type="text" 
                    placeholder="Paste URL here"
                    value={ url } 
                    onChange={ (e) => setUrl(e.target.value) } 
                    autoComplete="off"
                />
                <button type="submit">Submit</button>
            </form>

            <div className="music_source">
                <button>YouTube</button>
                <button>Spotify</button>
                <button>SoundCloud</button>
            </div>

            <MusicPlayer image={ image } track_name="NIGHT RIDER" artist_name="Joji" />
        </div>
    );
}

export default Music;