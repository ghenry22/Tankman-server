const RpioService = require('../services/rpio.service');
const rpioService = new RpioService();

exports.serverStatus = async () => {
    const status = {
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date(),
      };
      return status;
};

exports.sensorStatus = async () => {
  const status = {
      initStatus: await rpioService.init(),
      pinTestStatus: await rpioService.pinTest(),
      date: new Date(),
  };
  
  return status;
};