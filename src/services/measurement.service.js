module.exports = class MeasurementService {

    calculateMaxCapacity(diameter, height) {
        return new Promise((resolve, reject) => {
            try {
                const radius = diameter / 2;
                const maxCapacity = Math.PI * Math.pow(radius, 2) * height;
                resolve(maxCapacity);
            } catch (error) {
                reject(error);
            }
        });
    }

    calculateCapacity(diameter, height, sensorDistanceWhenFull, isRound, statedCapacity, sensorData) {
        return new Promise((resolve, reject) => {
            try {
                const waterLevel = sensorData - sensorDistanceWhenFull;
                const availablePercentage = (waterLevel / height) * 100;
                let availableCapacity;

                if (isRound) {
                    const radius = diameter / 2;
                    availableCapacity = Math.PI * Math.pow(radius, 2) * waterLevel;
                } else {
                    availableCapacity = statedCapacity * availablePercentage / 100;
                }

                resolve({
                    availableCapacity: availableCapacity,
                    availablePercentage: availablePercentage
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}