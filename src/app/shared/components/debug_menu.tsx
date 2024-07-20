'use client'

import '@shared/style/globals.css'

import { App } from '@script/utils/app';
import { postDB } from '@script/utils/idb';
import { DEBUG_ONLY_fc } from '@/app/tests';
import { GameEmitter } from '@script/utils/emitter';

import { useRef } from 'react';
import Draggable from 'react-draggable';
import { useRouter } from 'next/navigation';
import tt from '@tomtom-international/web-sdk-services';
import { LngLatLike } from '@tomtom-international/web-sdk-services';

import { API_KEY } from '@/app/page';
import { BuildingInterface } from '../types/building.types';

export function DebugMenu() {

    const cst_page_ref = useRef<HTMLInputElement>(null);
    const search_params_name_ref = useRef<HTMLInputElement>(null);
    const search_params_value_ref = useRef<HTMLInputElement>(null);

    const router = useRouter();

    function handleCstPage() {
        if (cst_page_ref.current) {
            router.replace(cst_page_ref.current.value);
        }
    }

    function handleMdfyParams() {
        const url = new URL(window.location.href);
        url.searchParams.set(search_params_name_ref.current!.value, search_params_value_ref.current!.value);
        window.location.assign(url.href);
    }

    async function runCustomScript() {
        // const url = new URL(window.location.href);

        // // url.searchParams.set('primary', 'type_dispatch_menu');
        // // url.searchParams.set('secondary', 'type_item_display');
        // // url.searchParams.set('view', '2e69959b-aefa-4248-bf5e-478ec1a4a0b4');

        // console.log(await generateMissionData(DEBUG_ONLY_fc));

        // const dispatchData = await generateMissionData(DEBUG_ONLY_fc);
        // const dispatch = new Dispatch(dispatchData);

        // console.log(dispatchTypeToString(dispatch.data.type));

        // // window.location.assign(url.href);

        // console.log(await getDB({
        //     database: "DB_SAVEGAME_DATA",
        //     schema: "SCHEMA_SAVEGAME_DATA",
        //     store: "DB_STORE_BUILDINGS",
        //     key: ["a144cd90-d5b7-425d-b296-e8e671dd23b3"]
        // }))

        const lcd: LngLatLike = [14.9695377, 51.1543045];
        const rev = tt.services.reverseGeocode({ key: API_KEY!, position: lcd })
            .then((r: any) => {
                return r.addresses[0].address;
            });
        const geo_result = await rev;

        await postDB({
            database: 'DB_SAVEGAME_DATA',
            store: 'DB_STORE_BUILDINGS',
            schema: 'SCHEMA_SAVEGAME_DATA',
            data: {
                id: crypto.randomUUID(),
                mission_area: DEBUG_ONLY_fc,
                type: 'BUILDING_TYPE_VOLUNTEER_FIREBRIGADE',
                name: "Freiwillige Feuerwehr Görlitz Innenstadt",
                location: {
                    coords: lcd,
                    free_address: geo_result.freeformAddress,
                    municapality: geo_result.municipality,
                    postal_code: geo_result.postalCode,
                    street_n_number: geo_result.streetNameAndNumber
                }
            } as BuildingInterface
        })
    }

    function fireEvent() {
        GameEmitter.emit("EVENT_GAME_START", { "created": 1717834102804, "modified": 1717834102804, "game": { "name": "My Save", "spawn": [13.5, 52.5] } })
    }

    return (
        <Draggable
            handle='#dbgm-drag-handle'
        >
            <section id="debug-menu">
                <div id="dbgm-drag-handle">
                    <code>Debug Menu</code>
                </div>
                <div className="dbgm-content">
                    <details open>
                        <summary>Page Changer</summary>
                        <div className="dbgm-wrapper">
                            <div>
                                <button onClick={handleCstPage}>Custom Page</button>
                                <input type="text" ref={cst_page_ref} />
                            </div>
                            <div>
                                <button onClick={handleMdfyParams}>Modify Searchparams</button>
                                <input type="text" ref={search_params_name_ref} />
                                <input type="text" ref={search_params_value_ref} />
                            </div>
                            <div>
                                <button onClick={runCustomScript}>Custom Script</button>
                            </div>
                        </div>
                    </details>
                    <details open>
                        <summary>Events</summary>
                        <div className="dbgm-wrapper">
                            <div>
                                <button onClick={fireEvent}>fire "EVENT_GAME_START"</button>
                            </div>
                        </div>
                    </details>
                    <details open>
                        <summary>Functions</summary>
                        <div className="dbgm-wrapper">
                            <div>
                                <button onClick={App.initMap}>[DEBUG] module:new_setup.ts App.initMap()</button>
                            </div>
                        </div>
                        <div className="dbgm-wrapper">
                            <div>
                                <button onClick={App.initBuildings}>[DEBUG] module:new_setup.ts App.initBuildings()</button>
                            </div>
                        </div>
                        <div className="dbgm-wrapper">
                            <div>
                                <button onClick={App.summonDispatch}>[DEBUG] module:new_setup.ts App.dispatchSummoning()</button>
                            </div>
                        </div>
                    </details>
                </div>
            </section>
        </Draggable>
    );
}