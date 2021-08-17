const router = require('express').Router();
const Act = require('../models/actMODEL');

router.post('/api/workouts', async ({ body }, res) => {
    try {
        const dbCreate = await Act.create(body);

        res.json(dbCreate);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/api/workouts/range', async ({ body }, res) => {
    try {
        const dbBulk = await Act.insertMany(body);

        res.json(dbBulk);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/api/workouts', async (req, res) => {
    try {
        const dbFind = await Act.find({})
            .sort({ day: -1 })

        res.json(dbFind);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;