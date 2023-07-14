import React from 'react'

import GoogleMapReact from 'google-map-react';

import { Paper, Typography, useMediaQuery } from '@material-ui/core';

import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined"
import Rating from "@material-ui/lab/Rating"

import useStyles from './sytles'


function Map({ setCoordinates, setBounds, coordinates, places, setChildClicked }) {

  const classes = useStyles()

  //hook media query, será false si el query es menor que esto
  const isDesktop = useMediaQuery('(min-width: 600px)')

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        // key de ggogle map
        bootstrapURLKeys={{ key:  }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}

        margin={[50, 50, 50, 50]}

        // options={''}

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
      </GoogleMapReact>
      <h1> Maps </h1>
    </div>
  )
}

export default Map