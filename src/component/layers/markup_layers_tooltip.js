import React from 'react'
import {LayerGroup, LayersControl,Marker,Tooltip } from 'react-leaflet'
import defaultIcon from "../icons"
// import  LeafIcoin  from './../mountainicon'
import { mountainIcon } from '../mountainicon'




export const MarkerLayertooltip=({data})=>{
    const layer= data.features.map( feature=>{
     const {coordinates}= feature.geometry;
     const {name,elevation, continent}=feature. properties;
 
     return(
  
       <Marker key={String(coordinates)} position={[coordinates[1],coordinates[0]]} icon={mountainIcon} >
         <Tooltip>
           <h3> Mr.{name} </h3>
           continent: <b>{continent}</b>  <br />
           elevation:<b> { elevation}</b>
         </Tooltip>
       </Marker>
     )
    }) 
    return (<LayerGroup>{layer}</LayerGroup>)
 }