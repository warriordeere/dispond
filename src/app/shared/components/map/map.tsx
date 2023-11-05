import './map.css';
import '../../../globals.css';
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { useEffect, useRef, useState } from "react";
import { TTMapContext } from '@/app/context';
import { API_KEY } from '@/app/page';

export default function TTMap() {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const [mapInstance, setMapInstance] = useState<tt.Map | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current) {
            return;
        }

        const ttmap = tt.map({
            key: `${API_KEY}`,
            center: [13.5, 52.5],
            zoom: 10,
            container: mapContainerRef.current,
            style: `https://api.tomtom.com/style/1/style/*?map=2/basic_street-satellite&poi=2/poi_dynamic-satellite&key=${API_KEY}`
        });

        ttmap.addControl(new tt.NavigationControl());
        ttmap.addControl(new tt.FullscreenControl());

        setMapInstance(ttmap);
    }, []);

    return (
        <TTMapContext.Provider value={mapInstance}>
            <section className="map-container">
                <div ref={mapContainerRef} id="map"></div>
            </section>
        </TTMapContext.Provider>
    );
}
