module.exports = class MeasurementService {

    calculateMaxCapacity(diameter, height) {
        return new Promise(async (resolve, reject) => {
            try {
                const radius = diameter / 2;
                const maxCapacityCm3 = Math.PI * Math.pow(radius, 2) * height;
                const maxCapacityLiters = Math.round(maxCapacityCm3 / 1000); // Convert to liters
                resolve(maxCapacityLiters);
            } catch (error) {
                reject(error);
            }
        });
    }

    calculateCapacity(diameter, height, sensorDistanceWhenFull, isRound, statedCapacity, sensorData) {
        return new Promise(async (resolve, reject) => {
            try {
                const waterLevel = sensorData - sensorDistanceWhenFull;
                const availablePercentage = Math.round(100 - ((waterLevel / height) * 100));
                let usedCapacityCm3;
                let availableCapacityLiters;

                if (isRound) {
                    const radius = diameter / 2;
                    usedCapacityCm3 = Math.PI * Math.pow(radius, 2) * waterLevel;
                    availableCapacityLiters = Math.round (await this.calculateMaxCapacity(diameter, height) - (usedCapacityCm3 / 1000));
                } else {
                    availableCapacityLitres = Math.round(statedCapacity * availablePercentage / 100);
                }

                resolve({
                    availableCapacity: availableCapacityLiters,
                    availablePercentage: availablePercentage
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}