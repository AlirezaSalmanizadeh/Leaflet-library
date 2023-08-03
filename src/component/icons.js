import L from "leaflet"
import iconUrl from "./../asset/images/marker-icon.png"
import iconShadow from "./../asset/images/marker-shadow.png"
console.log(L.Marker.prototype.options.icon.options);
const {iconSize,shadowSize, iconAnchor,popupAnchor,tooltipAnchor}=L.Marker.prototype.options.icon.options;
 const defaultIcon =L.icon({
    iconUrl,
    iconShadow,
    iconSize,
    shadowSize,
    iconAnchor,
    popupAnchor,
    tooltipAnchor
})

export default defaultIcon