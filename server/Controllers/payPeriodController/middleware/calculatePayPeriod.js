const calculatePayPeriod = (req, res, next) => {
  const appStartDate = new Date('2022-12-04T04:00:00');
  const appEndDate = new Date('2092-12-04T03:59:59');

  try {
    function twoWeekLoop(startDate, endDate) {
      const dateArray = [];
      const payPeriodDuration = 1209600000; // 2 weeks in milliseconds
      let interval = payPeriodDuration;
      let intervalTime = Date.parse(startDate);
    
      while (intervalTime <= Date.parse(endDate)) {
        const startDate = new Date(intervalTime);
        const endDate = new Date(intervalTime + payPeriodDuration);
        const displayStartDate = startDate.toDateString();
        const displayEndDate = endDate.toDateString();
    
        dateArray.push({ startDate, endDate, displayStartDate, displayEndDate });
    
        intervalTime += interval;
      }
    
      // Filter out pay periods that are entirely before the current pay period
      const recentPayPeriods = dateArray.filter((payPeriod) => payPeriod.endDate > Date.now());
    
      // Find the most recent pay period that is entirely after the current pay period
      const mostRecentPayPeriod = recentPayPeriods.find((payPeriod) => payPeriod.startDate > Date.now());
      return mostRecentPayPeriod;
    }
  
    function getCurrentPayPeriod(mostRecentPayPeriod) {
      const startOfPayPeriod = new Date(mostRecentPayPeriod.startDate.getTime() - 1209600000);
      const endOfPayPeriod = new Date(mostRecentPayPeriod.startDate.getTime() - 1);
      return [startOfPayPeriod, endOfPayPeriod];
    }
  
    const mostRecentPayPeriod = twoWeekLoop(appStartDate, appEndDate);
    const [currentPayPeriodStart, currentPayPeriodEnd] = getCurrentPayPeriod(mostRecentPayPeriod);
  
    req.payPeriod = {
      start: currentPayPeriodStart,
      end: currentPayPeriodEnd,
    };
  
    next();
  } catch (error) {
    console.log('Error calculating pay period:', error);
  }
};

module.exports = calculatePayPeriod;