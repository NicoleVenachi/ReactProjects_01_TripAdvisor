import React, { useState, useEffect, createRef } from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'

import PlaceDetails from '../PlaceDetails/PlaceDetails'

import useStyles from './styles'
function List({ places, childClicked, isLoading, type, setType, rating, setRating }) {

  const classes = useStyles()



  const [elRefs, setElRefs] = useState([])

  useEffect(() => {
    const refs = Array(places.length).fill().map((_, id) => {
      //devovlemos las referencias si existen, sino las creamos
      return elRefs[id] || createRef()
    }) //creo elmentos con ese constructor de array, el numero de elems lo da el size de placs

    setElRefs(refs) //asigno las referencais
  }, [places])

  return (
    <div className={classes.containesr}>
      <Typography variant='h4'> Restaurants, Hotels & Attractions around you </Typography>

      {
        isLoading ? (
          <div className={classes.loading}>
            <CircularProgress size='5rem'></CircularProgress>
          </div>

        ) : (
          <>
            <FormControl className={classes.formControl}>
              <InputLabel> Type </InputLabel>
              <Select value={type} onChange={(event) => setType(event.target.value)}>
                <MenuItem value='restaurants'>Restaurants</MenuItem>
                <MenuItem value='hotels'>Hotels</MenuItem>
                <MenuItem value='attractions'>Attractions</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel> Rating </InputLabel>
              <Select value={rating} onChange={(event) => setRating(event.target.value)}>
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>Above 3.0</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
              </Select>
            </FormControl>

            <Grid container spacing={3} className={classes.list}>
              {
                places?.map((place, id) => (
                  <Grid ref={elRefs[id]} item key={id} xs={12}>
                    <PlaceDetails

                      selected={Number(childClicked) === id} //paso si el place fuee el seleccionado
                      refProp={elRefs[id]}
                      place={place}
                    />
                  </Grid>
                ))
              }

            </Grid>
          </>
        )
      }



    </div>
  )
}

export default List
