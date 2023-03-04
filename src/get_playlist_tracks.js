// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlists-tracks
// https://developer.spotify.com/console/get-playlist-tracks/?playlist_id=&market=&fields=&limit=&offset=&additional_types=

// playlist-read-private scope
const token = "";

const getSpotifyPlaylist = async (link) => {
    let playlist_id = link.replace("https://open.spotify.com/playlist/", "");
    playlist_id = playlist_id.substring(0, playlist_id.indexOf("?"));

    const data = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }).then(res => res.json()).then(
        data => {
            return data;
        }
    ).catch(err => console.log(err));

    const queue = [];
    for (let i = 0; i < data.items.length; i++) {
        queue.push({
            "name": data.items[i].track.name,
            "artist": data.items[i].track.album.artists.map(x => x.name),
            "cover": data.items[i].track.album.images[0].url
        })
    }

    return queue;
}

const getSpotifyAlbum = async (link) => {
    let album_id = link.replace("https://open.spotify.com/album/", "");
    album_id = album_id.substring(0, album_id.indexOf("?"));

    const data = await fetch(`https://api.spotify.com/v1/albums/${album_id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }).then(res => res.json()).then(
        data => {
            return data;
        }
    ).catch(err => console.log(err));

    const queue = [];
    for (let i = 0; i < data.tracks.items.length; i++) {
        queue.push({
            "name": data.tracks.items[i].name,
            "artist": data.tracks.items[i].artists.map(x => x.name),
            "cover": data.images[0].url
        })
    }

    return queue;
}

async function main() {
    const playlist = await getSpotifyPlaylist("https://open.spotify.com/playlist/1iryxAiy6ImObnh4wS70JD?si=8835f0947e85488f&pt=1f70266072c5d662c4d8254017e3f9ab");

    playlist.forEach((x) => {
        console.log(x);
    })
}
main();