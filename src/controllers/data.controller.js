const Tank = require('../models/tank.model');
const Measurement = require('../models/measurement.model');
const ArduinoService = require('../services/arduino.service');
const MeasurementService = require('../services/measurement.service');

const arduinoService = new ArduinoService();
const measurementService = new MeasurementService();

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

    const tank = await Tank.findByPk(tankId);
    const sensorData = await arduinoService.readSensor(tankId);
    const capacityRes = await measurementService.calculateCapacity(tank.diameter, tank.height, tank.sensorDistanceWhenFull, tank.isRound, tank.statedCapacity, sensorData);

    const measurement = new Measurement
    ({
        tankId: tankId,
        distanceFomrSensor: sensorData,
        availableCapacity: capacityRes.availableCapacity,
        availablePercentage: capacityRes.availablePercentage,
        timeStamp: new Date()
    });

    return measurement;
}