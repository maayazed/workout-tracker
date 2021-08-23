const router = require('express').Router();
const { workout } = require('../models/workouts');

router.post('/api/workouts', (req, res) => {
    try {
        workout.create(req.body)
            .then((dbCreate) => {
                res.json(dbCreate);
            });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/api/workouts/range', (req, res) => {
    try {
        workout.aggregate([
            {
                $addFields: {
                    totalTime:
                        { $sum: '$exercises.duration' },
                    totalAmount:
                        { $sum: '$exercises.weight' },
                    Distance:
                        { $sum: '$exercises.distance' }
                }
            },
            {
                $addFields: {
                    totalDuration:
                        { $add: ['$totalTime'] },
                    totalDistance:
                        { $add: ['$Distance'] }
                }
            }
        ])
            .sort({ day: -1 },
                { _id: -1 })
            .limit(7)
            .then((dbFind) => {
                res.json(dbFind);
            });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.get("/api/workouts", (req, res) => {
    try {
        workout.aggregate([
            {
                $addFields: {
                    totalTime: {
                        $sum: '$exercises.duration'
                    },
                    Distance: {
                        $sum: 'exercises.distance'
                    }
                }
            },
            {
                $addFields: {
                    totalDuration:
                        { $add: ['$totalTime'] },
                    totalDistance:
                        { $add: ['$Distance'] }
                }
            }
        ])
            .then((dbFind) => {
                res.json(dbFind);
            });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/api/workouts/:id', (req, res) => {
    try {
        workout.findByIdAndUpdate(
            { _id: req.params.id },
            { exercises: req.body }
        )
            .then((dbCreate) => {
                res.json(dbCreate);
            });

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;