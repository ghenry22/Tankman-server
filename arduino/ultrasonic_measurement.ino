// ---------------------------------------------------------------- //
// Arduino Ultrasoninc Sensor HC-SR04 / SEN-0208 or compatible
// Tested on 25 August 2024
//
// Measurement is triggered by any serial input ending with new
// line \n
//
// Returns a JSON object with the unit of measurement and 10
// sample measurements
//
// ---------------------------------------------------------------- //

#include <ArduinoJson.h>
#define echoPin 3 // attach pin D3 Arduino to pin Echo of HC-SR04
#define trigPin 2 //attach pin D2 Arduino to pin Trig of HC-SR04

// defines variables
int retries = 0; // retry counter for quality control to stop infinite loops
long duration; // variable for the duration of sound wave travel
long distance; // variable for the distance measurement
long measurements[10]; // variable to store the set of measurements
JsonDocument doc; // json document to store JSON formatted response

void setup() {
  // Sets the trigPin as an OUTPUT
  pinMode(trigPin, OUTPUT);
  // Sets the echoPin as an INPUT
  pinMode(echoPin, INPUT);
  // Serial Communication is starting with 9600 of baudrate speed
  Serial.begin(9600);

  // Print init text
  // Serial.println("Ultrasonic Sensor");
  // Serial.println("with Arduino UNO R3");
  // Serial.println("send any data ending with new line to trigger");
}
void loop() {

  // only take readings when requested
  if(Serial.available()) {

    // clear the serial input to reset the trigger
    String clearInput = Serial.readStringUntil('\n');

    // Take 10 readings from the sensor
    for (int loops = 0; loops < 10; loops++) {
      // Clears the trigPin condition
      digitalWrite(trigPin, LOW);
      delayMicroseconds(10);
      // Sets the trigPin HIGH (ACTIVE) for 10 microseconds
      digitalWrite(trigPin, HIGH);
      delayMicroseconds(40);
      digitalWrite(trigPin, LOW);
      // Reads the echoPin, returns the sound wave travel time in microseconds
      duration = pulseIn(echoPin, HIGH);
      // Calculating the distance and add to the measurements array
      distance = duration * 0.034 / 2; // Speed of sound wave divided by 2 (go and back)

      // Add to the measurements array
      measurements[loops] = distance;

      // allow a small gap between readings
      delay(50);
    }

    // add values to the JSON document
    doc["unit"] = "cm";
    doc["status"] = "ok";
    copyArray(measurements, doc["measurements"]);
    serializeJson(doc, Serial);
    Serial.print("\n");

    // clear the JSON document
    doc.clear();

    // ensure serial buffer is empty and all data sent
    Serial.flush();
  }
}