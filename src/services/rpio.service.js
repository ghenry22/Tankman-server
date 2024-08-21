const rpio = require('@remarkablearts/rpio');

module.exports = class RpioService {

    async sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('sleeping ' + ms + 'ms');
                resolve();
            }, ms);
        });

    }

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
        return new Promise((resolve, reject) => {
            try {
                // Open pin 7, set the pin LOW and read it
                rpio.open(7, rpio.OUTPUT, rpio.LOW);
                // When set as low should return 0
                const pinStatus = rpio.read(7);
                // Close pin 7
                rpio.close(7);

                if (pinStatus === 0) {
                    resolve('ok');
                } else {
                    resolve('error');
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async readSensor() {

        return new Promise(async (resolve, reject) => {
            try {
                let start = [0, 0];
                let stop = [0.0];
                let elapsed = 0.0;
                let distance = 0.0;

                // Set trigger to 0/false
                rpio.open(16, rpio.OUTPUT, rpio.LOW);
                await this.sleep(100);

                // Send 10us pulse to trigger
                rpio.write(16, rpio.HIGH);
                await this.sleep(0.001);
                rpio.write(16, rpio.LOW);

                while (rpio.read(18) === 0) {
                    start = process.hrtime();
                }
                console.log("Start time in millisecond is: ", start[0] * 1000 + start[1] / 1000000);

                while (rpio.read(18) === 1) {
                    stop = process.hrtime();
                }
                console.log("Stop time in millisecond is: ", stop[0] * 1000 + stop[1] / 1000000);

                // Calculate elapsed time
                elapsed = (stop[0] * 1000 + stop[1] / 1000000) - (start[0] * 1000 + start[1] / 1000000);
                console.log("Elapsed time in millisecond is: ", elapsed);

                // Calculate distance
                distance = (elapsed * 34326) / 2;
                console.log("Distance in cm is: ", distance);

                // Wait 10ms before next reading
                await this.sleep(10);

                resolve(distance);
            } catch (error) {
                reject(error);
            }
        });

    }
}