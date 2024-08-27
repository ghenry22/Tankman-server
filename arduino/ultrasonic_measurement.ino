// ---------------------------------------------------------------- //
// Arduino Ultrasoninc Sensor HC-SR04 / SEN-0208 or compatible
// Tested on 25 August 2024
//
// Measurement is triggered by:
// "1\n" - sensor 1
// "2\n" - sensor 2
// any other input ending with \n - sensor 1
//
// Returns a JSON object with the unit of measurement, 10
// sample measurements and the sensorID
//
// ---------------------------------------------------------------- //

#include <ArduinoJson.h>
#define echoPin1 3 // attach pin D3 Arduino to pin Echo of HC-SR04
#define trigPin1 2 // attach pin D2 Arduino to pin Trig of HC-SR04

#define echoPin2 5 // attach pin D3 Arduino to pin Echo of HC-SR04
#define trigPin2 4 // attach pin D2 Arduino to pin Trig of HC-SR04

// defines variables
long duration; // variable for the duration of sound wave travel
long distance; // variable for the distance measurement
long measurements[10]; // variable to store the set of measurements
JsonDocument doc; // json document to store JSON formatted response

void setup() {

  // SENSOR 1

  // Sets the trigPin as an OUTPUT
  pinMode(trigPin1, OUTPUT);
  // Sets the echoPin as an INPUT
  pinMode(echoPin1, INPUT);

  // SENSOR 2

  // Sets the trigPin as an OUTPUT
  pinMode(trigPin1, OUTPUT);
  // Sets the echoPin as an INPUT
  pinMode(echoPin1, INPUT);

  // Serial Communication is starting with 9600 of baudrate speed
  Serial.begin(9600);

}

void loop() {

  // only take readings when requested
  if(Serial.available()) {

    // check which sensor is requested & clear the serial input to reset the trigger
    String input = Serial.readStringUntil('\n');

    if (input != "1" && input != "2") {
      input = "1";
    }

    if (input == "1" || input != "2") {
      // Take 10 readings from sensor 1
      for (int loops = 0; loops < 10; loops++) {
        // Clears the trigPin condition
        digitalWrite(trigPin1, LOW);
        delayMicroseconds(10);
        // Sets the trigPin HIGH (ACTIVE) for 10 microseconds
        digitalWrite(trigPin1, HIGH);
        delayMicroseconds(40);
        digitalWrite(trigPin1, LOW);
        // Reads the echoPin, returns the sound wave travel time in microseconds
        duration = pulseIn(echoPin1, HIGH);
        // Calculating the distance and add to the measurements array
        distance = duration * 0.034 / 2; // Speed of sound wave divided by 2 (go and back)

        // Add to the measurements array
        measurements[loops] = distance;

        // allow a small gap between readings
        delay(50);
      }
    }

    if (input == "2") {
      // Take 10 readings from sensor 2
      for (int loops = 0; loops < 10; loops++) {
        // Clears the trigPin condition
        digitalWrite(trigPin2, LOW);
        delayMicroseconds(10);
        // Sets the trigPin HIGH (ACTIVE) for 10 microseconds
        digitalWrite(trigPin2, HIGH);
        delayMicroseconds(40);
        digitalWrite(trigPin2, LOW);
        // Reads the echoPin, returns the sound wave travel time in microseconds
        duration = pulseIn(echoPin2, HIGH);
        // Calculating the distance and add to the measurements array
        distance = duration * 0.034 / 2; // Speed of sound wave divided by 2 (go and back)

        // Add to the measurements array
        measurements[loops] = distance;

        // allow a small gap between readings
        delay(50);
      }
    }

    // add values to the JSON document and return with an end of line
    doc["unit"] = "cm";
    doc["status"] = "ok";
    doc["sensorId"] = input;
    copyArray(measurements, doc["measurements"]);
    serializeJson(doc, Serial);
    Serial.print("\n");

    // clear the JSON document
    doc.clear();

    // ensure serial buffer is empty and all data sent
    Serial.flush();
  }
}