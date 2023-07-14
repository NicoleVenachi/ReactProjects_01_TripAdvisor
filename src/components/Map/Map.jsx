import React from 'react'

import GoogleMapReact from 'google-map-react';

import { Paper, Typography, useMediaQuery } from '@material-ui/core';

import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined"
import Rating from "@material-ui/lab"

import useStyles from './sytles'



function Map({ setCoordinates, setBounds, coordinates }) {

  const classes = useStyles()

  //hook media query, será false si el query es menor que esto
  const isMobile = useMediaQuery('(min-width: 600px)')

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
      // onChildClick={''} //click a algun restura en mapa
      >

      </GoogleMapReact>
      <h1> Maps </h1>
    </div>
  )
}

export default Map