const router = require('express').Router();
const Act = require('../models/actMODEL');

router.post('/api/act', async ({ body }, res) => {
    try {
        const dbCreate = await Act.create(body);

        res.json(dbCreate);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/api/act/bulk', async ({ body }, res) => {
    try {
        const dbBulk = await Act.insertMany(body);

        res.json(dbBulk);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;