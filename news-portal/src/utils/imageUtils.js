import clearDay from '../assets/images/weather/clear-day.svg';
import clearNight from '../assets/images/weather/clear-night.svg';
import cloudy from '../assets/images/weather/cloudy.svg';
import fog from '../assets/images/weather/fog.svg';
import hail from '../assets/images/weather/hail.svg';
import partlyCloudyDay from '../assets/images/weather/partly-cloudy-day.svg';
import partlyCloudyNight from '../assets/images/weather/partly-cloudy-night.svg';
import rain from '../assets/images/weather/rain.svg';
import sleet from '../assets/images/weather/sleet.svg';
import snow from '../assets/images/weather/snow.svg';
import thunderstorm from '../assets/images/weather/thunderstorm.svg';
import tornado from '../assets/images/weather/tornado.svg';
import wind from '../assets/images/weather/wind.svg';

// Set the weather icon according the given name
export const setWeatherIcon = (iconName) => {
    let img;

    switch (iconName) {
        case 'clear-day': 
            img = clearDay;
            break;
        case 'clear-night': 
            img = clearNight;
            break;
        case 'cloudy': 
            img = cloudy;
            break;
        case 'fog': 
            img = fog;
            break;
        case 'hail': 
            img = hail;
            break;
        case 'partly-cloudy-day': 
            img = partlyCloudyDay;
            break;   
        case 'partly-cloudy-night': 
            img = partlyCloudyNight;
            break;
        case 'rain': 
            img = rain;
            break;
        case 'sleet': 
            img = sleet;
            break;
        case 'snow': 
            img = snow;
            break;
        case 'thunderstorm': 
            img = thunderstorm;
            break;
        case 'tornado': 
            img = tornado;
            break;  
        case 'wind': 
            img = wind;
            break; 
        default:
            break;
    }

    return img;
}
