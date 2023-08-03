import ReactDOM, { unmountComponentAtNode }  from 'react-dom'
import { Button } from 'antd'
import { BorderInnerOutlined, BorderOuterOutlined } from '@ant-design/icons'



import { createControlComponent } from '@react-leaflet/core'
import { Control,DomUtil, latLng } from 'leaflet'

const node=DomUtil.create("div")


Control.Fitboundstodatacontrol=Control.extend({
    options:{
        position:"topleft"
    },
    onAdd:function(map){
        const dofitdatatobounds=()=>{
            const latLngs=[];
            map.eachLayer((layer)=>{
                const latLng=layer.options.dofittobound && layer.getLatLng();
                if(latLng){
                    latLngs.push(latLng)
                }
            })

            map.fitBounds(latLngs);
        }

        const commonprops={
            className:'leaflet-control-layers',
            style:{width:"33px",height:"33px"}
        }

        ReactDOM.render(
            <div className='fit-bounds-control-layers'>
             <Button
                {...commonprops}
                title='Fit Bounds to data'
                icon={<BorderInnerOutlined/>}
                onClick={()=>dofitdatatobounds()}
            >

            </Button>

            <Button
                {...commonprops}   
                title='FitBounds to worlds'
                icon={<BorderOuterOutlined/>}
                onClick={()=>map.fitWorld()}
            >

            </Button>
            
            </div>
            ,
            node
        )
        return node;
    },
    onRemove:function(map){
        unmountComponentAtNode(node )
    }
})

export const Fitboundstodatacontrol = createControlComponent(
  (props) => new Control.Fitboundstodatacontrol(props),
)