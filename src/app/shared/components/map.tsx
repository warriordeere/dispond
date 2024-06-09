'use client'

<<<<<<< HEAD:src/app/shared/components/map.tsx
=======
import './map.css';
import '../../../shared/style/globals.css';
import "@tomtom-international/web-sdk-maps/dist/maps.css";
>>>>>>> 8f3971f33de3a5e05011cd27d8ad6f164110dbb6:src/app/shared/components/map/map.tsx
import { useEffect, useRef } from 'react';

import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from '@tomtom-international/web-sdk-maps';
import { API_KEY } from '@/app/page';

import '../style/globals.css';
import '../style/map.css';

export let map_inst: tt.Map;

export default function TTMap() {
    const mapref = useRef<HTMLDivElement>(null);
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
        }

    }, [])

    return (
        <section className="map-container">
            <div id="map" ref={mapref}></div>
        </section>
    );
}