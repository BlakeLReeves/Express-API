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
    res.sendStatus(200);
});

router.put('/:id?', (req, res) => {
    let id = req.params.id

    res.json(chirpStore.UpdateChirp(id));
});

module.exports = router;