import React, { Component } from 'react';

class Clock extends Component {
  constructor(props){
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
        <h2>{this.state.date}</h2>
        <h3>{this.state.time}</h3>
      </div>
    );
  }
}

export default Clock;