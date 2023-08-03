import {LayersControl,GeoJSON} from "react-leaflet"


export const Continents=({data ,setgeofilter,getgeofilter})=>{

    const geofilter=getgeofilter();

    const layer=(<GeoJSON key="geo-jason-layer" data={data}
            eventHandlers={{
                click:(e)=>{setgeofilter((prevstate)=>{
                   const same= prevstate===e.propagatedFrom.feature

                   return same ?null :e.propagatedFrom.feature
                })}
            }}

            style={(feature)=>{
                return{
                    color: geofilter === feature  ?"red" :'blue',
                    weight:0.5,
                    fillOpacity:0.4
                }
            }}
        >

        </GeoJSON>
    );
     return (<LayersControl.Overlay  name="continents">{layer}</LayersControl.Overlay> )
}