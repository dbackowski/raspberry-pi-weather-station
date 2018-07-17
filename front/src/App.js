import React, { Component } from 'react';
import './App.css';
import Weather from './components/Weather.js';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  state = {
    forecast: null,
    isLoading: true,
    error: null
  };

  componentDidMount() {
    this.callApi()
      .then(response => this.setState({ forecast: response, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  callApi = async () => {
    const response = await fetch('/api/forecast');
    const body = await response;

    if (response.status !== 200) throw Error('Error occured during fetching the forecast');
    return body.json();
  };

  render() {
    const { forecast, isLoading, error } = this.state;

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
        city="Kraków"
        icon={forecast.daily.data[0].icon}
        summary={forecast.daily.data[0].summary}
        tempMin={Math.round(forecast.daily.data[0].temperatureMin)}
        tempMax={Math.round(forecast.daily.data[0].temperatureMax)}
      />
    );
  }
}

export default App;
