import {List} from "antd"



export const ShowActiveFilterControl=({getFilters})=>{

    const {geofilter,radiusFilter}=getFilters();
    const getDisplayFilter=()=>{
        const filterToDisplay=[];

        const round=(num)=>Math.round(num*100)/1000

        if(geofilter){
            filterToDisplay.push(geofilter.properties.CONTINENT)
        }

        if(radiusFilter){
            const {coordinates}=radiusFilter.feature.geometry;
            const {radius}=radiusFilter;
            const radiusFilterToDisplay=`
            Center: (Lat ${round(coordinates[1])},Lon ${round(coordinates[0])})
            Radius ${radius} km`;
            filterToDisplay.push(radiusFilterToDisplay)
        }

        return filterToDisplay.length>0 ?filterToDisplay :["No Filter Actives"];
    }

    const ActiveFilter=()=>{
       return(<List
        size="small"
        header={<div><b>Active Filters</b></div>}
        bordered
        dataSource={getDisplayFilter()}
        renderItem={(item)=><List.Item>{item}</List.Item>}
    
        />  
       )
    }

    return(
        <div className=" leaflet-bottom leaflet-left">
            <div className=" leaflet-control leaflet-bar leaflet-control-layers">
                <div>
                   <ActiveFilter />
                </div>
            </div>
        </div>
    )

}