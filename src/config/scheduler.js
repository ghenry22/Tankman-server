const cron = require('node-cron');
const tankController = require('../controllers/tank.controller');
const measurementController = require('../controllers/measurement.controller');

// Start Schedule jobs to take readings
// TODO, configurable schedule, real sensor readings
cron.schedule('*/10 * * * * *', async () => {
    try {
        console.log('running scheduled task to fetch levels every 10 seconds');
        const tanks = await tankController.findAll();
        tanks.forEach(async tank => {
            const measurement = {
                tankId: tank.id,
                level: Math.random() * 100,
                availableCapacity: Math.random() * 100,
                availablePercentage: Math.random() * 100,
                timeStamp: new Date()
            };
            await measurementController.create(measurement);
        });
    } catch (error) {
        console.error('Error in cron job:', error);
    }
});