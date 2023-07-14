
import axios from 'axios';

const url = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlacesData = async (sw, ne) => {  

  try {
    const options = {
      // method: 'GET',
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        
      },
      
    };

    const {data: {data}} = await axios.get(url,options);
    return data
  } catch (error) {
    return error
  }
}