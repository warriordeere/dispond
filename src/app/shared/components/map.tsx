'use client'

import { API_KEY } from '@/app/page';

import "@tomtom-international/web-sdk-maps/dist/maps.css";
import '@shared/style/globals.css';
import '@shared/style/map.css';

import { useEffect, useRef, useState } from 'react';
import { coreMap } from '@/app/script/core/map';

async function loadTomTomSDK() {
    const tt = await import('@tomtom-international/web-sdk-maps');
    return tt;
}

export default function TTMap() {
    const [ttSDK, set_ttSDK] = useState<any>(null);
    const [mapInstance, setMapInstance] = useState<tt.Map | null>(null);
    const mapref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadTomTomSDK()
            .then((ttModule) => {
                set_ttSDK(ttModule);
            });
    }, []);

    useEffect(() => {
        if (ttSDK && mapref.current) {

            const mapContainer = document.querySelector('#map');
            if (mapContainer && mapContainer?.childElementCount === 0) {
                const map = ttSDK.map({
                    key: `${API_KEY}`,
                    center: [13.5, 52.5],
                    zoom: 10,
                    container: 'map',
                    style: `https://api.tomtom.com/style/1/style/*?map=2/basic_street-satellite&poi=2/poi_dynamic-satellite&key=${API_KEY}`
                });

                map.addControl(new ttSDK.NavigationControl());
                map.addControl(new ttSDK.GeolocateControl());

                setMapInstance(map);
                coreMap.setMapInstance(map);
            }
        }

    }, [ttSDK])

    return (
        <section className="map-container">
            <div id="map" ref={mapref}></div>
        </section>
    );
}