
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
      initStatus: "ok",
      pinTestStatus: "ok",
      date: new Date(),
  };
  
  return status;
};