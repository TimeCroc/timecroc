import React, { Component } from 'react';

type ClockState = {
  time: string
  date: string
}

class Clock extends Component<{}, ClockState> {
  //  intervalID will need a type other than any
  //  private intervalID: ReturnType<typeof setInterval> | null = null;
  //  private intervalID: NodeJS.Timeout;
  intervalID: any;

  constructor(props: {}){
    super(props);

    this.state ={
      time: new Date().toLocaleTimeString(),
      date: new Date().toDateString()
    }
  }

  componentDidMount() {
    this.intervalID = setInterval(() =>
      this.updateClock(),
      1000
    );}

  componentWillUnmount(){
    clearInterval(this.intervalID)
  }

  updateClock(){
    this.setState({
      time: new Date().toLocaleTimeString()
    });
  }

  render() {
    return (
      <div className="clock">
        <div className="clock__date">{this.state.date}</div>
        <div className="clock__time">{this.state.time}</div>
      </div>
    );
  }
}

export default Clock;