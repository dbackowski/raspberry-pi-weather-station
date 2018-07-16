import React from 'react';
import PropTypes from 'prop-types';
import Skycons from 'react-skycons';

const Weather = ({ city, icon, summary, tempMin, tempMax }) => {
  function bgColorClass() {
    let result;

    if (tempMax >= 30) {
      result = 'very-warm';
    }
    else if (tempMax > 20 && tempMax < 30) {
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
    <div className={"weather " + bgColorClass()}>
      <div className="city">{city}</div>
      <div className="icon">
        <Skycons
          color='white'
          icon={icon.toUpperCase()}
          autoplay={true}
        />
      </div>
      <div className="temp">Temp. min {tempMin}&deg;C</div>
      <div className="temp">Temp. max {tempMax}&deg;C</div>
      <div className="clear"></div>
      <div className="summary">{summary}</div>
    </div>
  );
};

Weather.propTypes = {
  city: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  tempMin: PropTypes.string.isRequired,
  tempMax: PropTypes.string.isRequired
}

export default Weather;