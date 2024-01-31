import react, {Dispatch, SetStateAction} from 'react';
import './ScrollPayPeriods.css'
import Button from 'react-bootstrap/Button';

type ScrollPayPeriodProps = {
  displayScroll?: boolean;
  setDisplayScroll: Dispatch<SetStateAction<boolean>>;
  setPayPeriodStart: Dispatch<SetStateAction<string>>;
  setPayPeriodEnd: Dispatch<SetStateAction<string>>
}

type DateObject = {
  startDate: Date;
  endDate: Date;
  displayStartDate: string;
  displayEndDate: string;
}




const ScrollPayPeriods = (props: ScrollPayPeriodProps) => {

  //reused from Timesheet.js 
  //TODO - move twoWeekLoop to backend

  const appStartDate = new Date('2022-12-04T04:00:00');
  const appEndDate = new Date();

  function twoWeekLoop(startDate, endDate) {
    const dateArray: DateObject[] = [];
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
    return dateArray;
  }
  const scrollList = twoWeekLoop(appStartDate, appEndDate);
  //console.log(scrollList);
  const display = scrollList.map(item => {
    return <li key={item.displayStartDate}> 
        {/* {item.displayStartDate} - {item.displayEndDate} */}
        <button onClick={() => {
          props.setPayPeriodStart(item.displayStartDate);
          props.setPayPeriodEnd(item.displayEndDate);
          props.setDisplayScroll(false);
          }
        }>{item.displayStartDate} - {item.displayEndDate}</button>
      </li>
    }).reverse();

  return(
    <div className='scroll'>
      <Button variant="danger" onClick={()=>{props.setDisplayScroll(false)}}>close</Button>
      <ul>
       {display}
      </ul>
 

    </div>
  )
};

export default ScrollPayPeriods;