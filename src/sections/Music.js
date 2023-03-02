import { useState } from "react";
import image from "../album-cover.jpg";
import axios from "axios";

const Music = () => {
    const [url, setUrl] = useState("");

    const handleSubmit = (e) => {
        console.log(url);
        // fetch("http://localhost:8000/upload", {
        //     method: "POST",
        //     headers: {"Content-Type": "application/JSON"},
        //     body: url
        // }).then(
        //     console.log("POSTED"),
        //     setUrl("")
        // )

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