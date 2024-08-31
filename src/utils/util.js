/**
 * Converts a value in minutes to a node-cron schedule string.
 * @param {number} minutes - The interval in minutes.
 * @returns {string} - The node-cron schedule string.
 */
exports.minutesToCronSchedule = (minutes) => {
    if (minutes <= 0) {
      throw new Error('Minutes should be greater than 0');
    }
  
    const days = Math.floor(minutes / 1440); // 1440 minutes in a day
    const remainingMinutes = minutes % 1440;
    const hours = Math.floor(remainingMinutes / 60);
    const remainingMinutesInHour = remainingMinutes % 60;
  
    if (days > 0) {
      return `0 0 */${days} * *`;
    } else if (hours > 0 && remainingMinutesInHour > 0) {
      return `*/${remainingMinutesInHour} */${hours} * * *`;
    } else if (hours > 0) {
      return `0 */${hours} * * *`;
    } else {
      return `*/${remainingMinutesInHour} * * * *`;
    }
  }