const Setting = require('../models/setting.model');
const Scheduler = require('../config/scheduler');

exports.findAll = async () => {
    const settings = await Setting.findAll();
    return settings;
}

exports.findOne = async (name) => {
    const setting = await Setting.findOne({
        where: {
            name: name
        }
    });
    return setting;
}

exports.createSetting = async (name, value) => {
    const setting = await Setting.create({name: name, value: value});
    return setting;
}

exports.updateSetting = async (name, value) => {
    const setting = await Setting.findOne({
        where: {
            name: name
        }
    });

    if (setting) {
        setting.value = value;
        await setting.save();
    } else {
        await Setting.create({name: name, value: value});
    }
}

exports.getSchedulerEnabled = async () => {
    const setting = await this.findOne('schedulerEnabled');
    if ( setting === 'true' ) {
        return true;
    }
    return false;
}

exports.getSchedulerInterval = async () => {
    const setting = await this.findOne('schedulerInterval');
    return setting ? parseInt(setting.value) : 0;
}

exports.setSchedulerEnabled = async (enabled) => {
    await this.updateSetting('schedulerEnabled', enabled.toString());
    await Scheduler.cancelScheduler();
    await Scheduler.setupScheduler();
}

exports.setSchedulerInterval = async (intervalMins) => {
    await this.updateSetting('schedulerInterval', intervalMins.toString());
    await Scheduler.cancelScheduler();
    await Scheduler.setupScheduler();
}
