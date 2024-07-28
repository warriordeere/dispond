'use client'

import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';

import { API_KEY } from "@/app/page";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import * as tts from "@tomtom-international/web-sdk-services"
import tt, { LngLatLike } from "@tomtom-international/web-sdk-maps";
import { services } from "@tomtom-international/web-sdk-services";
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';

import { map_inst } from "./map";
import { postDB } from "@/app/script/utils/idb";

import { BsBuildingFillAdd, BsBuildingFillGear, BsCashCoin, BsFillBuildingFill, BsPencilFill } from "react-icons/bs"
import { BuildingTypeOptions, BuildingInterface } from '@shared/types/building.types';
import { DatabasePostOptions } from '@shared/types/idb.types';
import { GeometryData } from '@shared/types/ttcst.types';

export function BuildingMenu() {
    const router = useRouter();
    return (
        <div className="sidemenu-action-row">
            <div className="sidemenu-ar-item">
                <button className="sidemenu-btn react-icon-regular"
                    onClick={() => {
                        router.push('./buildings/new')
                    }}>
                    <BsBuildingFillAdd />
                </button>
                <span className="sidemenu-btn-label">Neues Gebäude</span>
            </div>
            <div className="sidemenu-ar-item">
                <button className="sidemenu-btn react-icon-regular"
                    onClick={() => {
                        router.push('./buildings/manage')
                    }}>
                    <BsBuildingFillGear />
                </button>
                <span className="sidemenu-btn-label">Gebäude Verwalten</span>
            </div>
        </div>
    )
}

export function AddBuildingMenu() {

    let building_cost: number = 120;
    const [building_id, setBuildingId] = useState<string | undefined>();
    const [building_name, setBuildingName] = useState<string | undefined>();
    const [building_type, setBuildingType] = useState<BuildingTypeOptions | undefined>();
    const [building_location, setBuildingLocation] = useState<LngLatLike | undefined>();
    const [building_area, setBuildingArea] = useState<GeometryData | undefined>();

    useEffect(() => {
        const nameValue = document.querySelector('#bm-name-inp');
        nameValue?.addEventListener('blur', (event: Event) => {
            const target = event.target as HTMLInputElement
            setBuildingName(target.value)
        })

        const typeValue = document.querySelector('#bm-type-inp');
        typeValue?.addEventListener('change', (event: Event) => {
            const target = event.target as HTMLInputElement
            setBuildingType(target.value as BuildingTypeOptions);
        })

    }, [])

    async function handleBuildingFinish() {
        setBuildingId(crypto.randomUUID());

        console.log({
            id: building_id,
            name: building_name,
            position: building_location,
            type: building_type,
            mission_area: building_area
        });


        if (
            building_id &&
            building_name &&
            building_location &&
            building_type &&
            building_area
        ) {
            const data: BuildingInterface = {
                id: building_id,
                name: building_name,
                location: building_location as any,
                type: building_type,
                mission_area: building_area
            }

            const options: DatabasePostOptions = {
                data: data,
                database: "DB_SAVEGAME_DATA",
                store: "DB_STORE_BUILDINGS",
                schema: "SCHEMA_SAVEGAME_DATA"
            }

            await postDB(options);
        }
        else {
            console.error('something is invalid');
        }
    }

    return (
        <>
            {/* <div className="extsb-content">
                <div className="extsb-advice">
                    <p>
                        Klicke auf die Karte oder suche in der Suchleiste unten um einen Standort für dein neues Gebäude auszuwählen.
                    </p>
                </div>
            </div> */}
            <div className="sidemenu-action-field" id="bm-interface">
                <BMSearchBox />
                <div className="bm-input-box">
                    <span className="bm-box-icon">
                        <BsPencilFill />
                    </span>
                    <div className="bm-naming">
                        <input type="text" name="bm-name" id="bm-name-inp" placeholder="Name" />
                    </div>
                </div>
                <div className="bm-input-box">
                    <span className="bm-box-icon">
                        <BsFillBuildingFill />
                    </span>
                    <div className="bm-type">
                        <select name="bm-type" id="bm-type-inp">
                            <option value="FIREBRIGADE">Feuerwehr</option>
                            <option value="VOLUNTEER_FIREBRIGADE">Freiwillige Feuerwehr</option>
                        </select>
                    </div>
                </div>
                <div className="bm-finish">
                    <button className="bm-finish-btn" onClick={handleBuildingFinish}>
                        Bauen
                        <span>
                            {building_cost}&nbsp;
                            <BsCashCoin />
                        </span>
                    </button>
                </div>
            </div>
        </>
    )

    function BMSearchBox() {
        useEffect(() => {
            const BMInterface = document.querySelector('#bm-searchbox')!;

            const existingSearchBox = BMInterface.querySelector('.tt-search-box');
            if (existingSearchBox) {
                existingSearchBox.remove();
            }

            const searchBox = new SearchBox(services, {
                idleTimePress: 800,
                minNumberOfCharacters: 2,
                searchOptions: {
                    key: API_KEY,
                    language: 'de-DE',
                    countrySet: 'DE',
                    idxSet: 'PAD,Str'
                },
                labels: {
                    placeholder: 'Addresse',
                    noResultsMessage: 'Unbekannte Addresse'
                }
            });

            BMInterface?.append(searchBox.getSearchBoxHTML());

            const marker = new tt.Marker({ draggable: false, color: '#ff0000' })
            const popup = new tt.Popup({ anchor: 'top', closeButton: false });

            searchBox.on('tomtom.searchbox.resultselected', (target) => {
                const result: any = target.data.result;
                const freeFormAddress = result.address.freeformAddress

                setBuildingLocation(result.position);

                // @ts-expect-error
                // due to an incorect set up type definition in tomtoms api i'll get an error since the center property isn't defined properly,
                // although it's implemnted and described within the offical docs: https://developer.tomtom.com/maps-sdk-web-js/documentation#Maps.Map
                map_inst.flyTo({ center: result.position })

                marker
                    .setLngLat(result.position)
                    .addTo(map_inst)

                popup.setHTML(`<p>${freeFormAddress}</p>`);
                popup.setLngLat(result.position);
                marker.setPopup(popup);
                marker.togglePopup();

                // setMissionArea(`\nKommune:${JSON.stringify(result.address.municipality)}\nLandkreis:${JSON.stringify(result.address.countrySecondarySubdivision)}\nBundesland:${JSON.stringify(result.address.countrySubdivision)}`)
                // setMissionArea

                // draw area
                const polygon_data = tts.services.reverseGeocode({
                    key: API_KEY as string,
                    position: result.position,
                    // entityType: 'CountrySubdivision' | 'CountrySecondarySubdivision' | 'Municipality'
                    entityType: 'CountrySecondarySubdivision'
                })
                    .then((r) => {
                        return r.addresses[0].dataSources.geometry.id;
                    })
                    .then((r) => {
                        return tts.services.additionalData({
                            key: API_KEY as string,
                            geometries: [r],
                            geometriesZoom: 22
                        });
                    })
                    .then((r) => {
                        map_inst.removeLayer('line')
                        map_inst.removeLayer('polygon')

                        const result = r.additionalData;
                        for (let i = 0; i < result.length; i++) {
                            const geo_json: GeometryData = result[0].geometryData
                            setBuildingArea(geo_json);
                            map_inst.addLayer({
                                id: 'polygon',
                                type: 'fill',
                                source: {
                                    type: 'geojson',
                                    data: geo_json
                                },
                                paint: {
                                    'fill-color': '#ff0000',
                                    'fill-opacity': .35
                                }
                            });

                            map_inst.addLayer({
                                id: 'line',
                                type: 'line',
                                source: {
                                    type: 'geojson',
                                    data: geo_json
                                },
                                paint: {
                                    'line-color': '#ff0000',
                                    'line-width': 1
                                }
                            });
                        }
                    })

            })

            searchBox.on('tomtom.searchbox.resultscleared', () => {
                popup.remove()
                marker.remove()
                map_inst.removeLayer('line')
                map_inst.removeLayer('polygon')
            })
        }, [])

        return (
            <div className="bm-search-box" id="bm-searchbox"></div>
        );
    }
}
