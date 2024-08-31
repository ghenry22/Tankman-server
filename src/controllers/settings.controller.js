const Setting = require('../models/setting.model');

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
    const setting = await this.getSetting('schedulerEnabled');
    if ( setting === 'true' ) {
        return true;
    }
    return false;
}

exports.setSchedulerEnabled = async (enabled) => {
    await this.setSetting('schedulerEnabled', enabled.toString());
}

exports.setSchedulerInterval = async (intervalMins) => {
    await this.setSetting('schedulerInterval', intervalMins.toString());
}

exports.getSchedulerInterval = async () => {
    const setting = await this.getSetting('schedulerInterval');
    return setting ? parseInt(setting.value) : 0;
}