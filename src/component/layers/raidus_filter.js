
import { LayersControl,Circle } from "react-leaflet";


export const RadiusFilter=({radiusFilter,setRadiusFilter})=>{

    if(radiusFilter)
    {
        const {coordinates}=radiusFilter.feature.geometry;
       
          const layer=(<Circle center={[coordinates[1],coordinates[0]]}
                radius={radiusFilter.radius *1000}
                eventHandlers={{
                    dblclick:(e)=>{
                        e.originalEvent.view.L.DomEvent.stopPropagation(e);
                        setRadiusFilter(null);
                    }
                }}
                color={"red"}
                weight={3}
                fillOpacity={0.4}
            />
          )
          console.log(layer)
        return(<LayersControl.Overlay  name="radius filter">{layer}</LayersControl.Overlay>) 


    }else{
        return  null;
    }

}