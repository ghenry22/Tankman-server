const Tank = require('../models/tank.model');
const Measurement = require('../models/measurement.model');
const ArduinoService = require('../services/arduino.service');
const MeasurementService = require('../services/measurement.service');

const arduinoService = new ArduinoService();
const measurementService = new MeasurementService();

exports.latestMeasurementByTankId = async (tankId) => {
    const measurement = await Measurement.findOne({
        where: {
            tankId: tankId
        },
        order: [['timeStamp', 'DESC']]
    });
    return measurement;
}

exports.allmeasurementsByTankId = async (tankId) => {
    const measurements = await Measurement.findAll({
        where: {
            tankId: tankId
        }
    });
    return measurements;
}

exports.liveMeasurementByTankId = async (tankId) => {

    const tank = await Tank.findByPk(tankId);
    const sensorData = await arduinoService.readSensor(tank.sensorId);
    const capacityRes = await measurementService.calculateCapacity(tank.diameter, tank.height, tank.sensorDistanceWhenFull, tank.isRound, tank.statedCapacity, sensorData);

    const measurement =
        {tankId: tankId,
        distanceFromSensor: sensorData,
        availableCapacity: capacityRes.availableCapacity,
        availablePercentage: capacityRes.availablePercentage,
        timeStamp: new Date()};

    return measurement;
}