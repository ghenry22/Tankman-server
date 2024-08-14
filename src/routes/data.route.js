const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller');

router.get('/latestmeasurementbytankid/:id', async (req, res) => {
    const measurement = await dataController.latestMeasurementByTankId(req.params.id);
    res.json(measurement);
});

router.get('/allmeasurementsbytankid/:id', async (req, res) => {
    const measurements = await dataController.allmeasurementsByTankId(req.params.id);
    res.json(measurements);
});

router.get('/livemeasurementbytankid/:id', async (req, res) => {
    const measurement = await dataController.liveMeasurementByTankId(req.params.id);
    res.json(measurement);
});

module.exports = router;