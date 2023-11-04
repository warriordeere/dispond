'use client'

import { API_KEY } from "@/app/page";
import Sidebar from "@/app/shared/components/sidebar/sidebar"
import { MapStateType } from "@/app/shared/types/types";
import tt from "@tomtom-international/web-sdk-maps";
import React, { useState, useEffect } from "react";
import "@/app/shared/components/map/map.css";

export default function ManageFleet() {
    const mapElement = React.useRef<HTMLDivElement>(null);
    const [state, setState] = React.useState<MapStateType>({
        mapLongitude: -121.91599,
        mapLatitude: 37.36765,
        mapZoom: 10,
        map: {}
    });
    const [mapStyle, setMapStyle] = useState(`https://api.tomtom.com/style/1/style/*?map=2/basic_street-satellite&poi=2/poi_dynamic-satellite&key=${API_KEY}`);
    const [mapZoom, setMapZoom] = useState(10);
    const [map, setMap] = useState({});

    useEffect(() => {
        const mapInstance = tt.map({
            key: `${API_KEY}`,
            container: mapElement.current as HTMLDivElement,
            center: [13.5, 52.5],
            zoom: mapZoom,
            style: mapStyle
        });
        setMap(mapInstance);
        return () => mapInstance.remove();
    }, [])
    
    return (
        <>
            <Sidebar data={{
                renderCallsButton: false,
                renderLocationButton: false,
                renderManageButton: false,
                extended_menu: "MENU_NEW_BUILDING",
                map_instance: map
            }} />

            <section className="map-container">
                <div id="map" ref={mapElement}></div>
            </section>
        </>
    )
}