
import axios from 'axios';

//const url = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlacesData = async (type, sw, ne) => {  

  try {
    const options = {
      // method: 'GET',
      params: {
        bl_latitude: sw?.lat,
        tr_latitude: ne?.lat,
        bl_longitude: sw?.lng,
        tr_longitude: ne?.lng,
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      },
      
    };
    const {data: {data}} = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
      ,options);
    return data
  } catch (error) {
    return error
  }
}

export const getWeatherData = async (lat, lng) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://vision-weather-map.p.rapidapi.com/Current-weather/',
      params: {
        lat: lat,
        lon: lng,
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_WEATHER_API_KEY,
        'X-RapidAPI-Host': 'vision-weather-map.p.rapidapi.com'
      }
    };
    
    const {data} = await axios.request(options)
    return data
  } catch (error) {
    return error
  }
}