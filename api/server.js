const express = require('express');
const dotEnvConfig = require('dotenv').config();
const request = require('request-promise-native')

const app = express();
const port = process.env.PORT || 8080;

app.get('/api/forecast', async (req, res) => {
  const uri = `https://api.darksky.net/forecast/${dotEnvConfig.parsed['DARK_SKY_API_KEY']}/50.022,19.981?units=si&lang=pl`;
  const forecast = await request({ uri: uri, json: true });
  res.json(forecast);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
