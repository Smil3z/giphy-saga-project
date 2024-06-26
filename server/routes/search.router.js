const axios = require('axios');
const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

const API_KEY = 'YASEDgFgiSaJLWJEYAraiXsmLJ86SUXz'; // Directly assigning the API key

// GET req to retrieve search results from GIPHY
router.get('/:q', (req, res) => {
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${req.params.q}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
        .then((response) => {
            res.send(response.data.data);
        }).catch((error) => {
            console.log('Search error', error);
            res.sendStatus(500);
        });
});

module.exports = router;