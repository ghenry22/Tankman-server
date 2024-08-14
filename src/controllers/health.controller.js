exports.serverStatus = async () => {
    const status = {
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date(),
      };
      return status;
};