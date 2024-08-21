const Tank = require('../models/tank.model');
const Measurement = require('../models/measurement.model');
const RpioService = require('../services/rpio.service');
const rpioService = new RpioService();

exports.latestMeasurementByTankId = async (tankId) => {
    const measurement = await Measurement.findOne({
        where: {
            tankId: req.params.id
        },
        order: [['timeStamp', 'DESC']]
    });
    return measurement;
}

exports.allmeasurementsByTankId = async (tankId) => {
    const measurements = await Measurement.findAll({
        where: {
            tankId: req.params.id
        }
    });
    return measurements;
}

exports.liveMeasurementByTankId = async (tankId) => {
    const distance = await rpioService.readSensor();
    //TODO change distance to a level measurement
    return { level: distance, status: 'ok', timestamp: new Date() };
}