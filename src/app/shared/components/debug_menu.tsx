'use client'

import '@shared/style/globals.css'

import { generateMissionData } from '@/app/script/gen/mission';
import { DEBUG_ONLY_fc } from '@/app/tests';

import Draggable from 'react-draggable';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { GameEmitter } from '@/app/script/utils/emitter';
import { App } from '@/app/script/utils/app';

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

        console.log(await generateMissionData(DEBUG_ONLY_fc));

        // // window.location.assign(url.href);

        // console.log(await getDB({
        //     database: "DB_SAVEGAME_DATA",
        //     schema: "SCHEMA_SAVEGAME_DATA",
        //     store: "DB_STORE_BUILDINGS",
        //     key: ["a144cd90-d5b7-425d-b296-e8e671dd23b3"]
        // }))
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