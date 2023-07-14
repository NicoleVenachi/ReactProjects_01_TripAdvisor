import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import List from './components/List/List'
import PlaceDetails from './components/PlaceDetails/PlaceDetails'
import Map from './components/Map/Map'

import {CssBaseline, Grid} from '@material-ui/core'
import { getPlacesData, getWeatherData } from './api'

function App() {

  const [places, setPlaces] = useState([])
  const [weatherData, setWeatherData] = useState([])
  
  // {lat:2.44682 , lng:-76.60291}
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState(null)

  //pa saber cual se cliqueo en el mapa
  const [childClicked, setChildClicked] = useState(null)

  //par carga
  const [isLoading, setIsLoading] = useState(false)


  //para elegir 
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')

  //
  const [filteredPlaces, setFilteredPlaces]= useState([])

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
      // console.log(latitude, longitude);
      setCoordinates({
        lat: latitude,
        lng: longitude
      })
    }) //saco info de la poscion del usuario
  }, [])

  useEffect(()=>{
    const filteredPlaces =places.filter((place)=> place.rating> rating)
    setFilteredPlaces(filteredPlaces)
  }, [rating])

  useEffect(()=>{
    setIsLoading(true) //empieza fetch
    if (bounds?.sw && bounds?.ne) {

      getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) =>{
          setWeatherData(data)
          console.log("🚀 ~ file: App.js:55 ~ .then ~ data:", data)
        })
      //le paso el type, para que sepa que tipo de datos traer
      getPlacesData(type, bounds?.sw, bounds?.ne)
      .then((data)=>{
        // console.log(data);
        setPlaces(data?.filter(place => place.name && place.num_reviews > 0))

        setFilteredPlaces(false) //cambia lugar, quito filtro
        setIsLoading(false) //termina el fetching de data
      })
    }
  }, [bounds, type]) //al cambiar el lugar, se actualiza
  return (
    <div>
      <>
        <CssBaseline/>
        <Header setCoordinates={setCoordinates}/>

        {/* sx de grillas para el contenido */}
        <Grid container spacing={3} style={{width: '100%'}}>
          
          {/* en mobile, toma 12 (todo), en  medium 4*/}
          <Grid item xs={12} md= {4}>
            <List 
              places={filteredPlaces.length ? filteredPlaces : places} 
              childClicked={childClicked} 
              isLoading={isLoading}
              type={type}
              setType = {setType}
              rating = {rating}
              setRating = {setRating}
            />
          </Grid>

          <Grid item xs={12} md= {8}>
            <Map 
              setCoordinates={setCoordinates} 
              setBounds={setBounds}
              coordinates={coordinates}
              places={filteredPlaces.length ? filteredPlaces : places}
              setChildClicked = {setChildClicked}
              weatherData = {weatherData}
            />
          </Grid>
        </Grid>

        
        {/* <PlaceDetails/> */}
        
      </>


    </div>
  )
}

export default App
