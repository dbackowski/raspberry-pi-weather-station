import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { faMeh } from '@fortawesome/free-solid-svg-icons';
import { faFrownOpen } from '@fortawesome/free-solid-svg-icons';
import { faDizzy } from '@fortawesome/free-solid-svg-icons';

const AirPolution = ({ pollutionLevel, pm25, pm10 }) => {
  const pollutionLevelIcons = {
    1: faSmile,
    2: faMeh,
    3: faFrownOpen,
    4: faDizzy,
    5: faDizzy,
    6: faDizzy
  }

  const pm25percentage = () => pm25 * 100 / 25;

  const pm10percentage = () => pm10 * 100 / 50;

  return (
    <div className="row">
      <div className="col-2 text-center">
        <FontAwesomeIcon icon={pollutionLevelIcons[pollutionLevel]} size="3x"/>
      </div>
      <div className="col text-center">
        <div className="pm">
          PM 2.5: {pm25}&nbsp;μg/m3
          <br/>
          ({pm25percentage()} %)
        </div>
      </div>
      <div className="col text-center">
        <div className="pm">
          PM 10: {pm10}&nbsp;μg/m3
          <br/>
          ({pm10percentage()} %)
        </div>
      </div>
    </div>
  );
};

AirPolution.propTypes = {
  pollutionLevel: PropTypes.number.isRequired,
  pm25: PropTypes.number.isRequired,
  pm10: PropTypes.number.isRequired
}

export default AirPolution;