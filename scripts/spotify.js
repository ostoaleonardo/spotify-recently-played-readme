const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_SECRET_ID,
    SPOTIFY_REFRESH_TOKEN,
} = process.env;

const TOKEN_END_POINT = 'https://accounts.spotify.com/api/token';
const RECENTLY_PLAYED_END_POINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

const getAccessToken = async () => {
    const response = await fetch(TOKEN_END_POINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_SECRET_ID)
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: SPOTIFY_REFRESH_TOKEN,
        })
    })

    const data = await response.json();
    return data;
}

const fetchData = async (accessToken, endPoint) => {
    const response = await fetch(endPoint, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
        },
    });

    if (response.status === 204 || response.status > 400) {
        return null;
    }

    return response.json();
};

const getRecentlyPlayed = async () => {
    try {
        const { access_token } = await getAccessToken();
        const song = await fetchData(access_token, RECENTLY_PLAYED_END_POINT);
        return formatRecentlySong(song);
    } catch (error) {
        return null;
    }
};

const formatRecentlySong = (song) => {
    if (!song) {
        return null;
    }

    const track = song.items[0].track;

    const image = track.album.images[1]?.url || track.album.images[0]?.url;
    const artist = track.artists.map((_artist) => _artist.name).join(', ');
    const title = track.name || '';
    const url = track.external_urls.spotify || '';

    return {
        title,
        artist,
        image,
        url,
    };
};

module.exports = {
    getRecentlyPlayed,
};
