const express = require('express');
const router = express.Router();
const settingController = require('../controllers/setting.controller');
const scheduler = require('..config/scheduler');

router.get('/', async (req, res) => {
    const settings = await settingController.findAll();
    res.json(settings);
});

router.post('/', async (req, res) => {
    const setting = await settingController.createSetting(req.body.name, req.body.value);
    res.json(setting);
});

router.delete('/:name', async (req, res) => {
    const setting = await settingController.findOne(req.params.name);
    if (setting) {
        await setting.destroy();
        res.json({ message: 'Setting deleted' });
    } else {
        res.status(404).json({ message: 'Setting not found' });
    }
});

router.get('/schedulerEnabled', async (req, res) => {
    const enabled = await settingController.getSchedulerEnabled();
    res.json({ enabled });
});

router.put('/schedulerEnabled', async (req, res) => {
    await settingController.setSchedulerEnabled(req.body.value);
    await scheduler.setupScheduler();
    res.json({ message: 'Setting updated' });
});

router.get('/schedulerInterval', async (req, res) => {
    const interval = await settingController.getSchedulerInterval();
    res.json({ interval });
});

router.put('/schedulerInterval', async (req, res) => {
    await settingController.setSchedulerInterval(req.body.value);
    await scheduler.setupScheduler();
    res.json({ message: 'Setting updated' });
});

module.exports = router;