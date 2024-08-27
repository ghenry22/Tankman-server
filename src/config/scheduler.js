const cron = require('node-cron');
const tankController = require('../controllers/tank.controller');
const measurementController = require('../controllers/measurement.controller');
const ArduinoService = require('../services/arduino.service');
const MeasurementService = require('../services/measurement.service');

const arduinoService = new ArduinoService();
const measurementService = new MeasurementService();

// Start Schedule jobs to take readings
// TODO, configurable schedule
cron.schedule('*/10 * * * * *', async () => {
    try {
        console.log('running scheduled task to fetch levels every 10 seconds');
        const tanks = await tankController.findAll();
        tanks.forEach(async tank => {

            const sensorData = await arduinoService.readSensor(tank.sensorId);
            const capacityRes = await measurementService.calculateCapacity(tank.diameter, tank.height, tank.sensorDistanceWhenFull, tank.isRound, tank.statedCapacity, sensorData);

            const measurement = {
                tankId: tank.id,
                distanceFromSensor: sensorData,
                availableCapacity: capacityRes.availableCapacity,
                availablePercentage: capacityRes.availablePercentage,
                timeStamp: new Date()
            };
            await measurementController.create(measurement);
        });
    } catch (error) {
        console.error('Error in cron job:', error);
    }
});