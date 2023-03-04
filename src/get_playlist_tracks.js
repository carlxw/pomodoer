// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlists-tracks
// https://developer.spotify.com/console/get-playlist-tracks/?playlist_id=&market=&fields=&limit=&offset=&additional_types=

// playlist-read-private scope
const token = "BQB4Z6s0ep1Pij8qTXlNkSd96tUdlqct418RKxEwuKdBMN07uYgH7_CmLLIw3pRyRzNfbpIzt9s3Mjgj9G_uuMOU3noJhNqqbmu2PyulSQl6UyNuEp2uuWBHPSRl1yRQs5GXwiwkmoS0cIiqQEcCVvim-OspZlGbQfEyW6G0xD-ohprdcJTcvFyks3mDzEY";

const processLink = (str) => {
    str = str.replace("https://open.spotify.com/playlist/", "");
    return str.substring(0, str.indexOf("?"));
}
const link = processLink("https://open.spotify.com/playlist/2FmWFmEIH44B6y1ww7E47u?si=7d474e7536a14af5&pt=6d41266a39c65638961cda57002c3ed5");

const data = fetch(`https://api.spotify.com/v1/playlists/${link}/tracks`, {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    }
}).then(res => res.json()).then(
    data => {
        for (let i = 0; i < data.items.length; i++) {
            console.log(data.items[i].track.name); // Song name
            console.log(data.items[i].track.album.artists[0].name); // Artist name
            console.log(data.items[i].track.album.images[0].url); // Largest album cover
            console.log();
        }
    }
);