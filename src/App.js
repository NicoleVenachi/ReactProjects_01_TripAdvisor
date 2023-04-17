import React from 'react'
import Header from './components/Header/Header'
import List from './components/List/List'
import PlaceDetails from './components/PlaceDetails/PlaceDetails'
import Map from './components/Map/Map'

import {CssBaseline, Grid} from '@material-ui/core'

function App() {
  return (
    <div>
      <>
        <CssBaseline/>
        <Header/>

        {/* sx de grillas para el contenido */}
        <Grid container spacing={3} style={{width: '100%'}}>
          
          {/* en mobile, toma 12 (todo), en  medium 4*/}
          <Grid item xs={12} md= {4}>
            <List/>
          </Grid>

          <Grid item xs={12} md= {4}>
          <Map/>
          </Grid>
        </Grid>

        
        <PlaceDetails/>
        
      </>


    </div>
  )
}

export default App
