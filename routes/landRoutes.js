const router = require('express').Router();
const path = require('path');

router.get('/exercise', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/exercise.html'));
    } catch {
        res.status(404).json(err);
    }
});

router.get('/stats', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/stats.html'));
    } catch {
        res.status(404).json(err);
    }
});

module.exports = router;