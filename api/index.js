require('dotenv').config();
const express = require('express');
const app = express();
const baseUrl = process.env.BASE_URL;
const { getRecentlyPlayed } = require('../scripts/spotify.js');

getRecentlyPlayed().then((track) => {
  return track;
});

app.get('/api', async (req, res) => {
  try {
    const recentlyPlayed = await getRecentlyPlayed();

    let urlTrack = '#';
    let imageUrl = '';
    let titleTrack = '';
    let artistTrack = '';

    const getInfoTrack = () => {
      const { title, artist, image, url } = recentlyPlayed;

      titleTrack = title;
      artistTrack = artist;
      imageUrl = image;
      urlTrack = url;
    };

    if (recentlyPlayed) {
      getInfoTrack();
    }

    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(
      `<svg fill="none" viewBox="0 0 400 150" width="400" height="150" xmlns="http://www.w3.org/2000/svg">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            <style>
              * {
                box-sizing: border-box;
                text-transform: uppercase;
                font-family: "Arial Black", sans-serif;
              }

              .card {
                display: flex;
                width: 400px;
                height: 150px;
                text-decoration: none;
                background-color: #0d1117;
              }

              .album-image {
                height: 100%;
                aspect-ratio: 1/1;
                background-size: cover;
                background-image: url(${imageUrl});
              }

              .card-body {
                display: flex;
                color: white;
                padding-left: 16px;
                flex-direction: column;
                justify-content: center;
              }

              .recently-played-title {
                width: fit-content;
                color: #0d1117;
                padding: 2px 8px;
                font-weight: bolder;
                background-color: #00cf74;
              }

              .title-track {
                max-width: 200px;
                margin-top: 10px;
                font-size: 1.5rem;
                overflow: hidden;
                font-weight: bolder;
                white-space: nowrap;
                text-overflow: ellipsis;
              }

              .artist-track {
                max-width: 200px;
                opacity: 0.7;
                font-size: 0.7rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-family: Helvetica, sans-serif;
              }
            </style>
            <a class="card" href="${urlTrack}" target="_blank">
                <div class="card">
                    <div class="album-image" />
                    <div class="card-body">
                        <div class="recently-played-title">
                          Recently Played
                        </div>
                        <div class="title-track">
                          <![CDATA[${titleTrack}]]>
                        </div>
                        <div class="artist-track">
                          <![CDATA[${artistTrack}]]>
                        </div>
                    </div>
                </div>
            </a>
          </div>
        </foreignObject>
      </svg>`
    );
    res.end();
  } catch (error) {
    console.error(JSON.stringify(error));
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => {
    console.log(`Server running at ${baseUrl}/api`);
  });
}

module.exports = app;
