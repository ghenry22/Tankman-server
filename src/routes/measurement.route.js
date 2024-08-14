const express = require('express');
const router = express.Router();
const measurementController = require('../controllers/measurement.controller');

router.get('/', async (req, res) => {
    const measurements = await measurementController.findAll();
    res.json(measurements);
});

router.get('/:id', async (req, res) => {
    const measurement = await measurementController.findById(req.params.id);
    res.json(measurement);
});

router.post('/', async (req, res) => {
    const measurement = await measurementController.create(req.body);
    res.json(measurement);
});

router.put('/:id', async (req, res) => {
    const measurement = await measurementController.findById(req.params.id);
    if (measurement) {
        await measurement.update(req.body);
        res.json(measurement);
    } else {
        res.status(404).json({ message: 'Measurement not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const measurement = await measurementController.findById(req.params.id);
    if (measurement) {
        await measurement.destroy();
        res.json({ message: 'Measurement deleted' });
    } else {
        res.status(404).json({ message: 'Measurement not found' });
    }
});

module.exports = router;