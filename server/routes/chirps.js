const express = require('express');
const chirpStore = require('../chirpstore');
let router = express.Router();

router.get('/:id?', (req, res) => {
    let id = req.params.id

    if(id) {
        res.json(chirpStore.GetChirp(id));
    } else {
        res.send(chirpStore.GetChirps());
    }
});

router.post('/', (req, res) => {
    chirpStore.CreateChirp(req.body);
    res.send(chirpStore.GetChirps());
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let chirp = req.body;

    chirpStore.UpdateChirp(id, chirp);
    res.send(chirpStore.GetChirps());
});

router.delete('/:id', (req, res) => {
    let id = req.params.id

    chirpStore.DeleteChirp(id);
    res.send(chirpStore.GetChirps());
});

module.exports = router;