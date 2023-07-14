import React from 'react'

import GoogleMapReact from 'google-map-react';

import { Paper, Typography, useMediaQuery } from '@material-ui/core';

import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined"
import Rating from "@material-ui/lab/Rating"

import useStyles from './sytles'

import { mapStyles } from './mapStyles'

function Map({ setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData }) {

  const classes = useStyles()

  //hook media query, será false si el query es menor que esto
  const isDesktop = useMediaQuery('(min-width: 600px)')

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        // key de ggogle map
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}

        margin={[50, 50, 50, 50]}

        options={{
          disableDefaultUI: true, //quita casi todos los estilos
          zoomControl: true, //conserva el zoomControl
          styles: mapStyles //paso los estilos
        }}

        onChange={(event) => {
          setCoordinates({
            lat: event.center.lat,
            lng: event.center.lng,
          })
          setBounds({
            ne: event.marginBounds.ne,
            sw: event.marginBounds.sw,
          })
        }} //cambia el mapa
        onChildClick={(child) => { setChildClicked(child) }} //click a algun restura en mapa, devuelve su id
      >
        {/* show pins */}
        {
          places?.map((place, id) => (

            <div
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={id}
            >
              {
                !isDesktop ? (
                  <LocationOnOutlinedIcon color='primary' fontSize='large' />
                ) : (
                  <Paper elevation={3} className={classes.paper}>
                    <Typography className={classes.typography} variant='subtitle2' gutterBottom>
                      {place.name}
                    </Typography>
                    <img
                      className={classes.pointer}
                      src={place?.photo ? place?.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                      alt={place.name}
                    />
                    <Rating size='small' value={Number(place.rating)} readOnly />
                  </Paper>
                )
              }
            </div>
          ))
        }

        {
          weatherData?.list?.map((data, idx) => (
            <div key={idx} lat={data.coord.lat} lng={data.coord.lon}>
              <img
                height={100}
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                alt=''
              />
            </div>
          ))
        }
      </GoogleMapReact>
    </div>
  )
}

export default Map