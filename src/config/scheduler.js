const cron = require('node-cron');
const tankController = require('../controllers/tank.controller');
const measurementController = require('../controllers/measurement.controller');
const settingController = require('../controllers/setting.controller');
const ArduinoService = require('../services/arduino.service');
const MeasurementService = require('../services/measurement.service');
const util = require('../utils/util');

const arduinoService = new ArduinoService();
const measurementService = new MeasurementService();

//let scheduledTask; // Reference to the scheduled task

// Start Schedule jobs to take readings
// Scheduler needs to be enabled in settings
// Scheduler interval needs to be set in settings to a valid value in mins

class Scheduler {

    constructor() {
        this.scheduledTask = null;
    }

setupScheduler = async () => {
    const isEnabled = await settingController.getSchedulerEnabled();
    const interval = await settingController.getSchedulerInterval();
    console.log('Scheduler enabled:', isEnabled);
    console.log('Scheduler interval:', interval);

    if (!isEnabled) {
        console.log('Scheduler is disabled');
        return;
    }

    if (interval === 0) {
        console.log('Scheduler interval is not set');
        return;
    }

    const schedule = util.minutesToCronSchedule(interval);

    scheduledTask = cron.schedule(schedule, async () => {
        try {
            console.log('running scheduled task to fetch levels every ' + interval + ' minutes');
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
}

cancelScheduler = async () => {
    if (scheduledTask) {
        scheduledTask.stop();
        console.log('Scheduler has been cancelled');
        return
    } else {
        console.log('No scheduler to cancel');
        return;
    }
}

}

module.exports = new Scheduler();