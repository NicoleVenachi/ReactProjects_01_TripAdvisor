
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