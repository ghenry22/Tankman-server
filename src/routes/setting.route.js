const express = require('express');
const router = express.Router();
const settingController = require('../controllers/setting.controller');

router.get('/', async (req, res) => {
    const settings = await settingController.findAll();
    res.json(settings);
});

router.get('/:name', async (req, res) => {
    const setting = await settingController.findOne(req.params.name);
    res.json(setting);
});

router.post('/', async (req, res) => {
    const setting = await settingController.createSetting(req.body.name, req.body.value);
    res.json(setting);
});

router.put('/:name', async (req, res) => {
    const setting = await settingController.findOne(req.params.name);
    if (setting) {
        await setting.update(req.body);
        res.json(setting);
    } else {
        res.status(404).json({ message: 'Setting not found' });
    }
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
    await settingController.setSchedulerEnabled(req.body.enabled);
    res.json({ message: 'Setting updated' });
});

router.get('/schedulerInterval', async (req, res) => {
    const interval = await settingController.getSchedulerInterval();
    res.json({ interval });
});

router.put('/schedulerInterval', async (req, res) => {
    await settingController.setSchedulerInterval(req.body.interval);
    res.json({ message: 'Setting updated' });
});

module.exports = router;