const Tank = require('../models/tank.model');
const Measurement = require('../models/measurement.model');
const ArduinoService = require('../services/arduino.service');
const arduinoService = new ArduinoService();

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
    const sensorRes = await arduinoService.readSensor();

    //TODO change distance to a level measurement
    return { level: sensorRes, status: sensorRes.status, timestamp: new Date() };
}