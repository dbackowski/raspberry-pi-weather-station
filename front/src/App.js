import React, { Component } from 'react';
import './App.css';

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
        <div className="App">
          <p>Loading ...</p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="App">
          <p>{error.message}</p>
        </div>
      )
    }

    return (
      <div className="App">
        <p className="App-intro">{forecast.daily.data[0].summary}</p>
        <p className="App-intro">{forecast.daily.data[0].icon}</p>
        <p className="App-intro">temp. min {forecast.daily.data[0].temperatureMin}</p>
        <p className="App-intro">temp. max {forecast.daily.data[0].temperatureMax}</p>
      </div>
    );
  }
}

export default App;
