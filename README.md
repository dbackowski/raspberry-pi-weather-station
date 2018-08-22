# Simple Raspberry Pi Weather Station

<img src="https://i.imgur.com/h3m4LHu.jpg" width="250"> <img src="https://i.imgur.com/UFWXJWa.jpg" width="250"> <img src="https://i.imgur.com/P05UYfm.jpg" width="250"> 


## Hardware

* Raspberry Pi 3 B+
* 3.5inch LCD for Raspberry Pi from Waveshare (480x320 px)


## Instalation

```sh
git clone https://github.com/dbackowski/raspberry-pi-weather-station.git
cd raspberry-pi-weather-station
```

Create .env file in api directory

```sh
touch api/.env
```

Put yours keys and city name in it:

```
DARK_SKY_API_KEY=XXX
GOOGLE_API_KEY=XXX
AIRLY_API_KEY=XXX
CITY=Kraków,kozłówek
```

Start it:

```sh
yarn start
```

Open browser on URL:

```
http://127.0.0.1:3000
```

## License

Released under the MIT License.