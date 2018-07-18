const express = require('express');
const dotEnvConfig = require('dotenv').config();
const request = require('request-promise-native')

const app = express();
const port = process.env.PORT || 8080;

app.get('/api/forecast', async (req, res) => {
  const geoApiUri = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(dotEnvConfig.parsed['CITY'])}&key=${dotEnvConfig.parsed['GOOGLE_API_KEY']}`;
  const geocode = await request({ uri: geoApiUri, json: true });
  const { lat, lng } = geocode['results'][0]['geometry']['location'];

  const forecastUri = `https://api.darksky.net/forecast/${dotEnvConfig.parsed['DARK_SKY_API_KEY']}/${lat},${lng}?units=si&lang=pl`;
  const forecast = await request({ uri: forecastUri, json: true });
  res.json(forecast);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
