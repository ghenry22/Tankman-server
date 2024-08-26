const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const serialPort = new SerialPort({
    path: '/dev/ttyACM0',
    baudRate: 9600
});

const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

module.exports = class ArduinoService {

    open() {
        return new Promise((resolve, reject) => {
            if (!serialPort.isOpen) {
                serialPort.on('open', () => {
                    console.log('Serial Port is opened');
                    resolve();
                });

                serialPort.on('error', (err) => {
                    console.error('Error opening serial port:', err);
                    reject(err);
                });

                serialPort.open();
            } else {
                resolve();
            }
        });
    }

    readSensor() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.open();

                parser.on('data', (data) => {
                    console.log('Data:', JSON.parse(data));
                    resolve(JSON.parse(data));
                });

                serialPort.write('trigger\n');

            } catch (error) {
                reject(error);
            }
        });
    }
}
