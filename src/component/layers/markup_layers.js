import { useState }  from 'react'
import L from "leaflet"
import {LayerGroup,Marker,Popup } from 'react-leaflet'
import defaultIcon from "../../component/icons"
import { Card,Button,InputNumber,Space } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'


const DEFAULT_RADIUS=3000;

const Popupstatic=({feature,setRadiusFilter})=>{
  const [radius,setRadius]= useState(DEFAULT_RADIUS);
  const {name,adm0name,pop_max}=feature.properties;
  return (
  <>
    <Card type='inner' title="Name"><b>{`${name},${adm0name}`} </b></Card>
    <Card type='inner' title="Population"><b>{`${pop_max}`}</b></Card>
    <Card type='inner' title="Radius Filter">
      <Space>
        <InputNumber
          defaultValue={DEFAULT_RADIUS}
          min={0}
          onChange={(e)=>setRadius(()=> e!==null ?e  :0 )}
        >
        </InputNumber>
        <Button type='primary' 
          shape='round' 
          icon={<FilterOutlined/>}
          onClick={()=>{setRadiusFilter(prevState=>{
            let newFilter;
            console.log(radius)
            if(prevState){
              if(radius===0){
                return newFilter=prevState;
              }
              const sameFeature=prevState.feature===feature;
              const sameRadius=prevState.radius===radius;
              if(!sameFeature||!sameRadius){
                newFilter={feature,radius}
              }} else if(radius!==0){
                newFilter={feature,radius}
              }
              return newFilter
            
          })}}
        >
          Filter by Km
        </Button>

      </Space>

    </Card>
  </>
  )
}

export const MarkerLayer=({data,setRadiusFilter,getRadiusFilter,getGeofilter})=>{
  const geofilter=getGeofilter();
  const radiusFilter=getRadiusFilter();

  let centerPoint;
  if(radiusFilter){
    const {coordinates}=radiusFilter.feature.geometry;
    centerPoint=L.latLng(coordinates[1],coordinates[0]);
  }
    const layer=data.features
    .filter((currentFeature)=>{
      let filterbyradius;
      let filterbygeo;

      if( centerPoint){
        const {coordinates}=currentFeature.geometry;
        const currentPoint=L.latLng(coordinates[1],coordinates[0]);
         filterbyradius=centerPoint.distanceTo(currentPoint)/1000 < radiusFilter.radius
      }

      if(geofilter){
        filterbygeo= booleanPointInPolygon(currentFeature,geofilter)
      }

      let dofilter=true;
      if(geofilter && radiusFilter){
        dofilter= filterbygeo && filterbyradius
      }else if(geofilter && !radiusFilter){
        dofilter=filterbygeo
      }else if(!geofilter && radiusFilter){
        dofilter=filterbyradius
      }

      return dofilter
    })
    .map( feature=>{
     const {coordinates}= feature.geometry;
 
     return(
       <Marker key={String(coordinates)} position={[coordinates[1],coordinates[0]]}   icon={defaultIcon} dofittobound={true} >
         <Popup>
           <Popupstatic feature={feature} setRadiusFilter={setRadiusFilter}/>
         </Popup>
       </Marker>
     )
    })
   
    return <LayerGroup>{layer}</LayerGroup>;
 }