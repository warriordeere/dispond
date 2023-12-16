import './map.css';
import '../../../globals.css';
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { useEffect, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import { API_KEY } from '@/app/page';

export let map_inst: tt.Map;

export default function TTMap() {
    const [mapInitialized, setMapInitialized] = useState(false)

    useEffect(() => {

        // used to make sure the map is added only once, I encountered an issue where the map was added multiple times.
        // I have no clue why it did that. This simple if statement seems to fix it.
        const mapContainer = document.querySelector('#map');
        if (mapContainer && mapContainer?.childElementCount === 0) {
            map_inst = tt.map({
                key: `${API_KEY}`,
                center: [13.5, 52.5],
                zoom: 10,
                container: 'map',
                style: `https://api.tomtom.com/style/1/style/*?map=2/basic_street-satellite&poi=2/poi_dynamic-satellite&key=${API_KEY}`
            });

            map_inst.addControl(new tt.NavigationControl());
            map_inst.addControl(new tt.GeolocateControl());
            setMapInitialized(true);
        }

    }, [])

    return (
        <section className="map-container">
            <div id="map"></div>
        </section>
    );
}