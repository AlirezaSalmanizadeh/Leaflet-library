
import L from "leaflet";
import image1 from './../asset/images/mountain-part-2-svgrepo-com.svg' ;


// const LeafIcoin =L.icon(
// {
//     iconUrl,
//     options:{
       
//         iconSize:[35,23]
//     }
// }
// )


var LeafIcon = L.Icon.extend({
    options: {
        iconSize:[40,30],
        iconAnchr:[17,16],
        tooltipAnchr:[15,-5]
      
    }
});


export const mountainIcon=new LeafIcon({iconUrl:image1});