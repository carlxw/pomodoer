// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlists-tracks
// https://developer.spotify.com/console/get-playlist-tracks/?playlist_id=&market=&fields=&limit=&offset=&additional_types=

// playlist-read-private scope
const token = "BQCGH4MRipxgKdO19lO3mUVhgZZYab-z0dcahskVmxbqRVGDPD6a8mP5hQHhWHqZCxnzNlaE2IxWigy0ke6L8kGqhte-Bi90TlovpljgfUmZjwfLs0bcLdo2372XukwgRvhwzAnI0WFIX7U2uNXniwlVz2g0XB-ik2U-mPSeQaASrCCuShqqtam8PS3CbNg";

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
}).then(res => {
    console.log(res.json().then(
        data => {
            for (let i = 0; i < data.items.length; i++) {
                console.log(data.items[i].track.name); // Song name
                console.log(data.items[i].track.album.artists[0].name); // Artist name
                console.log(data.items[i].track.album.images[0].url); // Largest album cover
                console.log();
            }
        }
    ))
});