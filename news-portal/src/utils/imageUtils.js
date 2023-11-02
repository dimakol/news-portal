// Weather images src: https://github.com/tomorrow-io-api/tomorrow-weather-codes/tree/master

import clear from "../assets/images/weather/10000_clear_large@2x.png";
import mostlyClear from "../assets/images/weather/11000_mostly_clear_large@2x.png";
import partlyCloudy from "../assets/images/weather/11010_partly_cloudy_large@2x.png";
import mostlyCloudy from "../assets/images/weather/11020_mostly_cloudy_large@2x.png";
import cloudy from "../assets/images/weather/10010_cloudy_large@2x.png";
import lightFog from "../assets/images/weather/21000_fog_light_large@2x.png";
import fog from "../assets/images/weather/20000_fog_large@2x.png";
import drizzle from "../assets/images/weather/40000_drizzle_large@2x.png";
import lightRain from "../assets/images/weather/42000_rain_light_large@2x.png";
import rain from "../assets/images/weather/40010_rain_large@2x.png";
import heavyRain from "../assets/images/weather/42010_rain_heavy_large@2x.png";
import flurries from "../assets/images/weather/50010_flurries_large@2x.png";
import lightSnow from "../assets/images/weather/51000_snow_light_large@2x.png";
import snow from "../assets/images/weather/50000_snow_large@2x.png";
import heavySnow from "../assets/images/weather/51010_snow_heavy_large@2x.png";
import freezingDrizzle from "../assets/images/weather/60000_freezing_rain_drizzle_large@2x.png";
import lightFreezingDrizzle from "../assets/images/weather/62000_freezing_rain_light_large@2x.png";
import freezingRain from "../assets/images/weather/60010_freezing_rain_large@2x.png";
import heavyFreezingRain from "../assets/images/weather/62010_freezing_rain_heavy_large@2x.png";
import lightIcePellets from "../assets/images/weather/71020_ice_pellets_light_large@2x.png";
import icePellets from "../assets/images/weather/70000_ice_pellets_large@2x.png";
import heavyIcePellets from "../assets/images/weather/71010_ice_pellets_heavy_large@2x.png";
import thunderstorm from "../assets/images/weather/80000_tstorm_large@2x.png";

/**
 * Set the weather icon according the weather code
 * @param {number} weatherCode - the weather code as we get from the API response
 * @returns {string} the image as source path
 */
export const setWeatherIcon = (weatherCode) => {
  let img;

  switch (weatherCode) {
    case 1000:
      img = clear;
      break;
    case 1100:
      img = mostlyClear;
      break;
    case 1101:
      img = partlyCloudy;
      break;
    case 1102:
      img = mostlyCloudy;
      break;
    case 1001:
      img = cloudy;
      break;
    case 2000:
      img = fog;
      break;
    case 2100:
      img = lightFog;
      break;
    case 4000:
      img = drizzle;
      break;
    case 4001:
      img = rain;
      break;
    case 4200:
      img = lightRain;
      break;
    case 4201:
      img = heavyRain;
      break;
    case 5000:
      img = snow;
      break;
    case 5001:
      img = flurries;
      break;
    case 5100:
      img = lightSnow;
      break;
    case 5101:
      img = heavySnow;
      break;
    case 6000:
      img = freezingDrizzle;
      break;
    case 6001:
      img = freezingRain;
      break;
    case 6200:
      img = lightFreezingDrizzle;
      break;
    case 6201:
      img = heavyFreezingRain;
      break;
    case 7000:
      img = icePellets;
      break;
    case 7101:
      img = heavyIcePellets;
      break;
    case 7102:
      img = lightIcePellets;
      break;
    case 8000:
      img = thunderstorm;
      break;
    default:
      break;
  }

  return img;
};
