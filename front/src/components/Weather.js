import React from 'react';
import PropTypes from 'prop-types';
import Skycons from 'react-skycons';
import HourWeather from './HourWeather';

const Weather = ({ city, icon, windSpeed, summary, tempMin, tempMax, pm25, pm10, hourly }) => {
  function bgColorClass() {
    let result;

    if (tempMax >= 30) {
      result = 'very-warm';
    }
    else if (tempMax >= 20 && tempMax < 30) {
      result = 'warm';
    }
    else if (tempMax > 10 && tempMax < 20) {
      result = 'normal';
    }
    else if (tempMax > 0 && tempMax < 10) {
      result = 'cold';
    }
    else if (tempMax <= 0) {
      result = 'very-cold';
    }

    return result;
  }

  return (
    <div className={"container-fluid weather " + bgColorClass()}>
      <div className="row justify-content-center">
        <div className="col-xs">
          <div className="city">{city}</div>
        </div>
        <div className="col-xs">
          <div className="icon">
            <Skycons
              color='white'
              icon={icon.toUpperCase().replace(/-/g, '_')}
              autoplay={true}
            />
          </div>
        </div>
        <div className="col-xs">
          <div className="wind-speed">{windSpeed}&nbsp;kph</div>
        </div>
        <div className="col-xs">
          <div className="temp">min&nbsp;{tempMin}&deg;C</div>
        </div>
        <div className="col-xs">
          <div className="temp">max&nbsp;{tempMax}&deg;C</div>
        </div>
      </div>
      <div className="row justify-content-center">
        {hourly.data.slice(0,9).map((object, i) => <div className="col-xs" style={{padding: '5px'}} key={object.time}><HourWeather data={object} /></div>)}
      </div>
      <div className="row">
        <div className="col text-center">
          <div className="summary">{summary}</div>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <div className="pm">PM 2.5: {pm25}&nbsp;μg/m3</div>
        </div>
        <div className="col text-center">
          <div className="pm">PM 10: {pm10}&nbsp;μg/m3</div>
        </div>
      </div>
    </div>
  );
};

Weather.propTypes = {
  city: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  windSpeed: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  tempMin: PropTypes.number.isRequired,
  tempMax: PropTypes.number.isRequired,
  pm25: PropTypes.number.isRequired,
  pm10: PropTypes.number.isRequired,
  hourly: PropTypes.object.isRequired
}

export default Weather;