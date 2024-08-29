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

    readSensor(sensorID) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.open();

                parser.on('data', (data) => {
                    // parse the JSON data
                    const sensorData = JSON.parse(data);
                    // sort the measurements
                    sensorData.measurements.sort();
                    // average the middle measurements, remove outliers and round to nearest integer
                    const avg = Math.round((sensorData.measurements[3] + sensorData.measurements[4] + sensorData.measurements[5]) / 3);
                    // return the average
                    resolve(avg);
                });

                if (sensorID === 1) {
                    serialPort.write('1\n');
                }
                if (sensorID === 2) {
                    serialPort.write('2\n');
                }

            } catch (error) {
                reject(error);
            }
        });
    }
}
