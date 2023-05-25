import React, { createContext } from 'react';

const PayPeriodContext = createContext();

export const PayPeriodContextProvider = ({ children }) => {
  const appStartDate = new Date('2022-12-04T04:00:00');
  const appEndDate = new Date('2092-12-04T03:59:59');

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

  function currentPayPeriodCalculator (currentPayPeriodStart, currentPayPeriodEnd) {
    // consider validation for dates being passed in
    const dates = [currentPayPeriodStart, currentPayPeriodEnd];
    const formattedDates = dates.map(date => {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear().toString().slice(-2);
      return `${month}/${day}/${year}`;
    });
    const result = formattedDates.join(' - ');
    return result;
  }

  const formattedCurrentPayPeriod = currentPayPeriodCalculator(currentPayPeriodStart, currentPayPeriodEnd);
  return <PayPeriodContext.Provider value={formattedCurrentPayPeriod}>{children}</PayPeriodContext.Provider>;
};

export default PayPeriodContext;


