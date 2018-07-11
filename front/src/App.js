import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    forecast: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ forecast: JSON.parse(res) }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/forecast');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div className="App">
        <p className="App-intro">{this.state.forecast ? this.state.forecast.daily.data[0].summary : ''}</p>
        <p className="App-intro">{this.state.forecast ? this.state.forecast.daily.data[0].icon : ''}</p>
        <p className="App-intro">temp. min {this.state.forecast ? this.state.forecast.daily.data[0].temperatureMin : ''}</p>
        <p className="App-intro">temp. max {this.state.forecast ? this.state.forecast.daily.data[0].temperatureMax : ''}</p>
        <p className="App-intro">{this.state.forecast ? this.state.forecast.daily.data[0].apparentTemperatureMin : ''}</p>
        <p className="App-intro">{this.state.forecast ? this.state.forecast.daily.data[0].apparentTemperatureMax : ''}</p>
      </div>
    );
  }
}

export default App;
