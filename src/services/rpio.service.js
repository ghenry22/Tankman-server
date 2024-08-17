const rpio = require('@remarkablearts/rpio');

module.exports = class RpioService {

    async init() {
        return new Promise((resolve) => {
            const options = {
                gpiomem: true,
                mapping: 'physical',
                //mock: 'raspi-zero-w',
                close_on_exit: true
            };

            rpio.on('warn', function(event) {
                resolve(event);
            });

            rpio.init(options);

            setTimeout(() => {
                resolve('ok');
            }, 1500);
        });
    }

    pinTest() {
        // Open pin 12, set the pin LOW and read it
        rpio.open(12, rpio.OUTPUT, rpio.LOW);
        // When set as low should return 0
        const pinStatus = rpio.read(12);
        // Close pin 12
        rpio.close(12);

        if (pinStatus === 0) {
            return 'ok';
        } else {
            return 'error';
        }
    }
}