import { useRouter } from "next/navigation";
import { BsBuildingFillAdd } from "react-icons/bs"
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';
import { services } from "@tomtom-international/web-sdk-services";
import { API_KEY } from "@/app/page";
import { useContext, useEffect } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import { TTMapContext } from "@/app/context";
import { ttSearchboxResult } from "../../types/types";

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
                <div className="bm-naming"></div>
                <div className="bm-final"></div>
            </div>
        </>
    )
}

function BMSearchBox() {

    const ttmap_inst = useContext(TTMapContext)!;

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

        searchBox.on('tomtom.searchbox.resultselected', (target) => {
            const marker = new tt.Marker({ draggable: true })
            const hint = new tt.Popup({ anchor: 'top' })
            const result: any = target.data.result;

            console.log(result.position);

            marker.setLngLat(result.position);
            marker.addTo(ttmap_inst);
        })
    })

    return (
        <div className="bm-searchbox" id="bm-searchbox"></div>
    );
}