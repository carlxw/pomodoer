// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlists-tracks
// https://developer.spotify.com/console/get-playlist-tracks/?playlist_id=&market=&fields=&limit=&offset=&additional_types=

// playlist-read-private scope
const token = "BQBZbLk9u4rfLMmzPA1a5nTIgd18QRoaAnXO2L1VzADyFFcSmHoRaDmM_GcjRMtjwMZhxYLPiSKJ4N21BMQ1nT65PLtXYdw7nuvaHMUte55BNKiKQ5Ma7SbyLHywCalUngPTsxJWiFD9yVSkTN3Rt7bf_Ekp8UhlvAUTf4I0H7pEc3aul8HmtYH5BEnVHg0";

const processLink = (str) => {
    str = str.replace("https://open.spotify.com/playlist/", "");
    return str.substring(0, str.indexOf("?"));
}

const getSpotifyPlaylist = async (link) => {
    const data = await fetch(`https://api.spotify.com/v1/playlists/${link}/tracks`, {
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
    ).catch(err => console.err(err));

    const playlist = [];
    for (let i = 0; i < data.items.length; i++) {
        playlist.push({
            "name": data.items[i].track.name,
            "artist": data.items[i].track.album.artists[0].name,
            "cover": data.items[i].track.album.images[0].url
        })
    }

    return playlist;
}

// Returns the number of times needed to run fetch
const getSpotifyPlaylistLength = (link) => {
    const playlist = fetch(`https://api.spotify.com/v1/playlists/${link}/tracks`, {
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
    ).catch(err => console.err(err));

    return Math.floor(playlist.total/100) + 1;
}

async function main() {
    const link = processLink("https://open.spotify.com/playlist/4ERjA5BDMJ1cGt3URjbW6i?si=0c55f05f3f934d73&pt=d45541bf4495898d71e9f772524f389f");

    const playlist = await getSpotifyPlaylist(link);

    playlist.forEach((x) => {
        console.log(x);
    })
}
main();