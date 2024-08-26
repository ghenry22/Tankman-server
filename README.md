# tankman-server
Water Tank Monitoring Backend

## What is this?

This little package is designed to measure the available water in a tank using an ultrasonic sensor.
Originally I tested running various sensors directly from the Raspverry Pi GPIO but found the readings
to be flakey and inconsistent whether I used python or node.

The sensors being 5v based also needed voltage dividers to avoid killing the Pi GPIO on the echo pin
which added complexity and points of failure.

Using a microcontroller to drive the ultrasonic sensor and send data back to the pi over a serial link
resolves all of these issues and the sensor readings were MUCH more accurate and consistent.

I used an Arduino Uno R3, paired with an ultrasonic sensor.

The arduino is configured to only trigger a measurement when it receives some data ending with a new line
\n over it's serial port.

When triggered it will take 10 measurements and return them in a JSON format.

### Hardware Setup

Arduino Uno R3
Raspberry Pi Zero W
SEN0208 waterproof Ultrasonic Sensor

Usb connection from the arduino to the Pi to power the arduino and provide the serial link for communications.

Installed in a weatherproof box that can be mounted to or next to the tank.

The sensor is mounted into a 25mm piece of PVC with silicon sealant on the cable end.  This will be inserted into
the roof of the water tank, either through the inlet screen or a dedicated hole drilled in the tank.

The Raspberry Pi is connected to wifi for remote administration.