'use client'

import { useRouter } from "next/navigation";
import { BsBuildingFillAdd } from "react-icons/bs"
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';
import { services } from "@tomtom-international/web-sdk-services";
import { API_KEY } from "@/app/page";
import tt from "@tomtom-international/web-sdk-maps";
import { useEffect } from "react";
import { map_inst } from "../map/map";
import { cst_fs } from "@/app/script/file/fs";
import { postResult } from "@/app/actions";

export function BuildingMenu() {
    const router = useRouter();
    return (
        <>
            <div className="extsb-interface">
                <button className="extsb-btn react-icon-regular"
                    onClick={() => {
                        router.push('./buildings/new')
                    }}>
                    <BsBuildingFillAdd />
                    <span className="extsb-btn-tt">Neues Gebäude</span>
                </button>
            </div>
            <div className="extsb-content"></div>
        </>
    )
}

export function AddBuildingMenu() {

    return (
        <>
            <div className="extsb-content">
                <div className="extsb-advice">
                    <p>
                        Klicke auf die Karte oder suche in der Suchleiste unten um einen Standort für dein neues Gebäude auszuwählen.
                    </p>
                </div>
            </div>
            <div className="extsb-interface" id="bm-interface">
                <BMSearchBox />
                <form action={postResult}>
                    <div className="bm-naming">
                        <input type="text" name="bm-name" id="bm-name-inp" required />
                    </div>
                    <div className="bm-type">
                        <select name="bm-type" id="bm-type-inp">
                            <option value="FIREBRIGADE">Feuerwehr</option>
                            <option value="VOLUNTEER_FIREBRIGADE">Freiwillige Feuerwehr</option>
                        </select>
                    </div>
                    <div className="bm-final">
                        <button type="submit">Bauen</button>
                    </div>
                </form>
            </div>
        </>
    )
}

function BMSearchBox() {

    useEffect(() => {
        const BMInterface = document.querySelector('#bm-interface')!;

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

        const marker = new tt.Marker({ draggable: false, })
        const popup = new tt.Popup({ anchor: 'top', closeButton: false });

        searchBox.on('tomtom.searchbox.resultselected', (target) => {
            const result: any = target.data.result;
            const freeFormAddress = result.address.freeformAddress

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
        })
    }, [])

    return (
        <div className="bm-searchbox" id="bm-searchbox"></div>
    );
}