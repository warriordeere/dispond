import './map.css';
import '../../../globals.css';
import tt from "@tomtom-international/web-sdk-maps"
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { useEffect } from "react"

const API_KEY = process.env.TOMTOM_API_KEY

export default function TTMap() {
    useEffect(() => {
        const map = tt.map({
            key: `${API_KEY}`,
            center: [13.5, 52.5],
            zoom: 10,
            container: 'map',
            style: `https://api.tomtom.com/style/1/style/*?map=2/basic_street-satellite&poi=2/poi_dynamic-satellite&key=${API_KEY}`
        })

        map.addControl(new tt.NavigationControl);
        map.addControl(new tt.FullscreenControl);

        const marker = new tt.Marker({
            draggable: true
        })

        marker.setLngLat([13.5, 52.5])
        marker.addTo(map)
    }, [])

    return (
        <section className="map-container">
            <div id="map"></div>
        </section>
    )
}
