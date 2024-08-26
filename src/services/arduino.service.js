const SerialPort = require('serialport');
const serialPort = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });

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

                serialPort.once('data', (data) => {
                    console.log('Data:', data.toString());
                    resolve(data);
                });

                serialPort.write('trigger\n');
                
            } catch (error) {
                reject(error);
            }
        });
    }
}