import  {useState ,useEffect} from 'react';
import './App.css';
import {LayersControl, MapContainer, TileLayer} from 'react-leaflet'
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from "react-dom/server";
import { EnvironmentFilled } from '@ant-design/icons';
import "leaflet/dist/leaflet.css";



import { cites } from './component/data/cites';
import {continents} from "./component/data/continents"
import {mountains} from "./component/data/mountaions"


import { MarkerLayer } from './component/layers/markup_layers';
import {MarkerLayertooltip} from "./component/layers/markup_layers_tooltip"
import { RadiusFilter } from './component/layers/raidus_filter';
import {Continents} from "./component/layers/continents"
import {MarkerLayertooltipCluster} from "./component/layers/markup_layers_tooltip_cluster"


import {Fitboundstodatacontrol} from "./component/control/fit_data"
import { ShowActiveFilterControl } from './component/control/show_active_filter';





// 





function App() {
  const position=[51.505, -0.09]
  const [radiusFilter,setRadiusFilter]=useState(null);
  const getRadiusFilter=()=>{ return radiusFilter};

  const [geofilter , setgeofilter]=useState(null);
  const getGeofilter=()=>{return geofilter};


  const [asyncCities, setasyncCities]=useState({features:[]});

  useEffect(()=>{
    const feachData= async()=>{
      const response=await fetch('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_geography_regions_points.geojson')
      const cities = await response.json(); 
      setasyncCities(cities)
    }

    feachData().catch(console.error)
  },[])
  

  console.log(asyncCities)
  //------------------------- icon one way -------------------------- 

  // const iconmarkup=renderToStaticMarkup(
  //   <EnvironmentFilled style={{ fontSize: '30px', color: '#08c' ,background:"transparent"}}/>
  // );
  // const cusicon=divIcon(
  //   {
  //     html:iconmarkup
  //   }
  // )


  




 
  const onclick=()=>{
    console.log("Position:")
  }

  return (
    <div className="App">
      <MapContainer center={[0,0]} zoom={1} scrollWheelZoom={true} >
        <LayersControl position='topright'>
          <LayersControl.BaseLayer  name="osm streets">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              noWrap={true}
              bounds={ [[-90, -180],
                [90, 180]]}
              className='map'
              
            />

          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer checked name="Esri.WorldImagery">
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              className='map'
              noWrap={true}
              bounds={[  [-90, -180],
                [90, 180]]}
            />

          </LayersControl.BaseLayer>



          {/* ------------------------------ marker unic pouint--------------------- */}

          {/* <Marker position={position} draggable eventHandlers={{click:onclick }} icon={defaultIcon} >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>*/}

          <LayersControl.Overlay  name='Pointer'>
            <MarkerLayer data={asyncCities} setRadiusFilter={setRadiusFilter} getRadiusFilter={getRadiusFilter} getGeofilter={getGeofilter}/>
          </LayersControl.Overlay>
        
          <LayersControl.Overlay  name="Highes mountains">
            <MarkerLayertooltip data={mountains}/>
          </LayersControl.Overlay>

            <MarkerLayertooltipCluster data={cites}/>
       
             
          

          <RadiusFilter radiusFilter={radiusFilter} setRadiusFilter={setRadiusFilter}/>
          <Continents  data={continents} getGeofilter={getGeofilter} setgeofilter={setgeofilter} getgeofilter={getGeofilter}/>
        </LayersControl>

        <Fitboundstodatacontrol/>
        <ShowActiveFilterControl getFilters={()=>({geofilter,radiusFilter})}/>
      </MapContainer> 
    </div>
  );
}

export default App;
