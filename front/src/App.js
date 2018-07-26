import React, { Component } from 'react';
import './App.css';
import Weather from './components/Weather.js';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  state = {
    locationName: null,
    forecast: null,
    pollution: null,
    isLoading: true,
    error: null
  };

  componentDidMount() {
    Promise.all([
      this.callLocationApi(),
      this.callForeactApi(),
      this.callAirPollutionApi()
    ])
    .then(response => {
      console.log(response);
      this.setState({
        locationName: response[0].locationName,
        forecast: response[1],
        pollution: response[2],
        isLoading: false
      });
    })
    .catch(error => this.setState({ error, isLoading: false }));
  }

  callForeactApi = async () => {
    const response = await fetch('http://localhost:8080/api/forecast');
    const body = await response;

    if (response.status !== 200) throw Error('Error occured during fetching the forecast');
    return body.json();
  };

  callAirPollutionApi = async () => {
    const response = await fetch('http://localhost:8080/api/air');
    const body = await response;

    if (response.status !== 200) throw Error('Error occured during fetching the air pollution');
    return body.json();
  };

  callLocationApi = async() => {
    const response = await fetch('http://localhost:8080/api/location');
    const body = await response;
    return body.json();
  };

  render() {
    const { locationName, forecast, pollution, isLoading, error } = this.state;

    if (isLoading) {
      return (
        <div>
          <p>Loading ...</p>
        </div>
      )
    }

    if (error) {
      return (
        <div>
          <p>{error.message}</p>
        </div>
      )
    }

    return (
      <Weather
        city={locationName}
        icon={forecast.daily.data[0].icon}
        windSpeed={forecast.daily.data[0].windSpeed}
        pressure={forecast.daily.data[0].pressure}
        summary={forecast.daily.data[0].summary}
        tempMin={Math.round(forecast.daily.data[0].temperatureMin)}
        tempMax={Math.round(forecast.daily.data[0].temperatureMax)}
        hourly={forecast.hourly}
        pollutionLevel={pollution.pollutionLevel}
        pm25={Math.round(pollution.pm25)}
        pm10={Math.round(pollution.pm10)}
      />
    );
  }
}

export default App;
