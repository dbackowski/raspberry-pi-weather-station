const express = require('express');
const dotEnvConfig = require('dotenv').config();
const request = require('request-promise-native');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;
let lat, lng;

const getLatAndLng = async () => {
  const geoApiUri = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(dotEnvConfig.parsed['CITY'])}&key=${dotEnvConfig.parsed['GOOGLE_API_KEY']}`;
  const geocode = await request({ uri: geoApiUri, json: true });
  return geocode['results'][0]['geometry']['location'];
};

app.get('/api/forecast', async (req, res) => {
  const forecastUri = `https://api.darksky.net/forecast/${dotEnvConfig.parsed['DARK_SKY_API_KEY']}/${lat},${lng}?units=ca&lang=pl`;
  const forecast = await request({ uri: forecastUri, json: true });
  res.json(forecast);
});

app.get('/api/air', async (req, res) => {
  const airlyUri = `https://airapi.airly.eu/v1/nearestSensor/measurements?latitude=${lat}&longitude=${lng}&maxDistance=1000`
  const pollution = await request({ uri: airlyUri, headers: { 'apikey': dotEnvConfig.parsed['AIRLY_API_KEY'] }, json: true });
  res.json(pollution);
});

app.listen(port, () => {
  getLatAndLng()
  .then(response => {
    ({ lat, lng } = response);
    console.log(`Listening on port ${port}`);
  })
  .catch(error => {
    console.log(error);
  });
});
