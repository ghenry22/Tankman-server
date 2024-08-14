const Tank = require('../models/tank.model');
const Measurement = require('../models/measurement.model');

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
    return { level: Math.random() * 100, status: 'not implemented', timestamp: new Date() };
}