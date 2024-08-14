const express = require('express');
const router = express.Router();
const tankController = require('../controllers/tank.controller');

router.get('/', async (req, res) => {
    const tanks = await tankController.findAll();
    res.json(tanks);
});

router.get('/:id', async (req, res) => {
    const tank = await tankController.findById(req.params.id);
    res.json(tank);
});

router.post('/', async (req, res) => {
    const tank = await tankController.create(req.body);
    res.json(tank);
});

router.put('/:id', async (req, res) => {
    const tank = await tankController.findById(req.params.id);
    if (tank) {
        await tank.update(req.body);
        res.json(tank);
    } else {
        res.status(404).json({ message: 'Tank not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const tank = await tankController.findById(req.params.id);
    if (tank) {
        await tank.destroy();
        res.json({ message: 'Tank deleted' });
    } else {
        res.status(404).json({ message: 'Tank not found' });
    }
});

module.exports = router;