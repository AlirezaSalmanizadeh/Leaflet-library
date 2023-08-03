import React from 'react'
import {LayersControl, Marker,Tooltip } from 'react-leaflet'

//------------------------- library for use react version 18 and leaflet version 4 ------------------------

import MarkerClusterGroup from '@changey/react-leaflet-markercluster';


import defaultIcon from "../icons"
// import  LeafIcoin  from './../mountainicon'
// import { defaultIcon } from '../mountainicon'




export const MarkerLayertooltipCluster=({data})=>{
    const layer= data.features.map( feature=>{
     const {coordinates}= feature.geometry;
     const {name}=feature.properties;
 
     return(
  
       <Marker key={String(coordinates)} position={[coordinates[1],coordinates[0]]} icon={defaultIcon} >
         <Tooltip>
           <h3>{name}</h3>
         </Tooltip>
       </Marker>
     )
    }) 
    return (
      <LayersControl.Overlay name='World cities cluster'> 
         <MarkerClusterGroup>{layer}</MarkerClusterGroup>
      </LayersControl.Overlay>
    )
 }