import { Control, DomUtil } from 'leaflet'
import { MapControl } from 'react-leaflet'
import './css/react-leaflet-zoom-indicator.css'


export default class ZoomIndicator extends MapControl {

    constructor(props,context) {
        super(props)
        this.div = DomUtil.create(
            'div',
            'leaflet-zoom-indicator-control leaflet-bar-part leaflet-bar',
        );
        this.span = DomUtil.create(
            'span',
            'leaflet-zoom-indicator-control-span leaflet-bar-part leaflet-bar',
            this.div
        );
        this.input = DomUtil.create(
            'input',
            'leaflet-zoom-indicator-control-input leaflet-bar-part leaflet-bar',
            this.div
        );
        this.map = context.map;
    }

    createLeafletElement(props) {
        const auto =
        typeof props.changeAuto !== 'undefined' ? props.changeAuto : true
        const ZoomIndicator = Control.extend({
            onAdd: () => {
                if (auto) this.changeZoomInfoAuto();
                this.updateZoomInfo();
                return this.div;
            },
            onRemove: () => {

            }
        })
        return new ZoomIndicator(props)
    }

    updateZoomInfo() {
        this.div.innerHTML = `${this.props.head} ${this.map.getZoom()}`
    }

    changeZoomInfoAuto() {
        const mapEvent = () => { this.updateZoomInfo() }
        this.map.on('zoomend', mapEvent)
    }
}
