require('dotenv').config();
const express = require('express');
const app = express();
const baseUrl = process.env.BASE_URL;
const { Card } = require('../src/components/Card.js');
const { getRecentlyPlayed } = require('../src/scripts/spotify.js');
const { imageToBase64 } = require('../src/utils/imageToBase64.js');

app.get('/api', async (req, res) => {
    try {
        let urlTrack = '#';
        let imageUrl = '';
        let titleTrack = '';
        let artistTrack = '';

        const recentlyPlayed = await getRecentlyPlayed()

        if (recentlyPlayed) {
            const { title, artist, image, url } = recentlyPlayed;
            const imageBase64 = await imageToBase64(image);

            titleTrack = title;
            artistTrack = artist;
            imageUrl = imageBase64;
            urlTrack = url;
        }

        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(
            Card({ title: titleTrack, artist: artistTrack, image: imageUrl, url: urlTrack })
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
