import React from 'react';
import PropTypes from 'prop-types';
import Skycons from 'react-skycons';

const HourWeather = ({ data }) => {
  return (
    <div>
      {new Date(data.time * 1000).getHours()}:00
      <div style={{width: '40px', height: '30px'}}>
        <Skycons
          color='white'
          icon={data.icon.toUpperCase().replace(/-/g, '_')}
          autoplay={true}
        />
      </div>
      <div>
        {Math.round(data.precipIntensity)}&nbsp;mm
      </div>
      <div>
        {Math.round(data.temperature)}&deg;C
      </div>
    </div>
  );
};

HourWeather.propTypes = {
  data: PropTypes.object.isRequired
}

export default HourWeather;