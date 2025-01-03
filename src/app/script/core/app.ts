'use client'

import { Dispatch, generateMissionData } from "../gen/mission";
import { getDB } from "../utils/idb";

import { BuildingInterface } from "@shared/types/building.types";
import { DatabaseGetOptions } from "@shared/types/idb.types";
import { GeometryData } from "@shared/types/ttcst.types";
import { AppMetaData } from "@shared/types/app.types";
import { LanguageString } from "@shared/types/types";
import { DispatchInterface } from "@/app/shared/types/dispatches.types";
import { dispatchTypeToString } from "../utils/utils";
import { coreMap } from "./map";

// import dynamic from 'next/dynamic';
// const map_inst = dynamic(() => import('../../shared/components/map'), { ssr: false });

export const coreApp = new class CORE_CLASS_APP {

    async metadata(): Promise<AppMetaData> {
        return {
            app: 'dispond',
            copyright: ['Warrior Deere', 'Arcavigi Interactive'],
            language: LanguageString.LANGUAGE_STRING_DE_DE,
            version: '0.5.0'
        };
    }

    async init() {

    }

    async initBuildings() {
        const db_opt: DatabaseGetOptions = {
            key: 'DB_GET_REQUEST_OPTION_ALL',
            database: "DB_SAVEGAME_DATA",
            store: "DB_STORE_BUILDINGS",
            schema: "SCHEMA_SAVEGAME_DATA"
        }

        const allBuildings: BuildingInterface[] = await getDB(db_opt);

        if (!allBuildings.length) {
            return console.warn(`[WARN] No Buildings Found To Initialize`);
        }

        allBuildings.forEach(async (building: BuildingInterface) => {
            const tt = await coreMap.loadMapSDK();

            const marker = new tt.Marker({ draggable: false, color: '#ff0000' });
            const popup = new tt.Popup({ anchor: 'top', closeButton: false })

            if (!building.location.coords && !building.name) {
                throw new Error(`[ERROR] Unexpected Value`);
            }

            if (coreMap.InternalMap) {
                marker.setLngLat(building.location.coords);
                marker.addTo(coreMap.InternalMap);

                popup.setText(building.name);
                popup.addTo(coreMap.InternalMap);

                marker.setPopup(popup);
                marker.togglePopup();

                console.debug(`[DEBUG] Attached Building To Map: ${building.id}@${building.location.coords}`);
            } else {
                console.warn(`[DEBUG] Could Not Attach Building To Map: ${building.id}@${building.location.coords}`);
            }
        });
    }

    async summonDispatch() {
        const db_opt: DatabaseGetOptions = {
            database: 'DB_SAVEGAME_DATA',
            store: 'DB_STORE_BUILDINGS',
            schema: 'SCHEMA_SAVEGAME_DATA',
            key: "DB_GET_REQUEST_OPTION_ALL"
        }

        const allBuildings: BuildingInterface[] = await getDB(db_opt);
        const dispatchAreaAry: GeometryData[] = new Array();

        allBuildings.forEach((d) => {
            return dispatchAreaAry.push(d.mission_area);
        });

        dispatchAreaAry.forEach(async (area) => {
            const dispatchData = await generateMissionData(area);
            const dispatch = new Dispatch(dispatchData);

            this.loadDispatchUI(dispatch.data);

            console.log(`[DEBUG] Summoned New Dispatch: ${dispatch.data.id}@${dispatch.data.location.coords}`);
        })

        //welp... i'll add this to my todo though - this is fine🔥

        let i: number = 0;

        const activeMissionCount = localStorage.getItem("active_missions");

        if (activeMissionCount === null) {
            localStorage.setItem('active_missions', '1');
            i = 1;
        }

        i++;

        localStorage.setItem('active_missions', i.toString());
    }

    async loadActiveDispatches() {
        const db_opt: DatabaseGetOptions = {
            key: "DB_GET_REQUEST_OPTION_ALL",
            database: "DB_SAVEGAME_DATA",
            store: "DB_STORE_ACTIVE_MISSIONS",
            schema: "SCHEMA_SAVEGAME_DATA"
        }

        const dispatchAry = await getDB(db_opt);
        dispatchAry.forEach((dispatch: DispatchInterface) => {
            this.loadDispatchUI(dispatch);
        });
    }

    private async loadDispatchUI(dispatch: DispatchInterface) {
        const tt = await coreMap.loadMapSDK();

        const mrk = new tt.Marker({ draggable: false, color: 'orange' });
        const pup = new tt.Popup({ anchor: 'top', closeButton: false });

        if (coreMap.InternalMap) {
            mrk.setLngLat(dispatch.location.coords);
            mrk.addTo(coreMap.InternalMap);

            pup.setHTML(`<strong>${await dispatchTypeToString(dispatch.type)}</strong><br>${dispatch.location.free_address}`);
            pup.addTo(coreMap.InternalMap);

            mrk.setPopup(pup);
            mrk.togglePopup();

            console.debug(`[DEBUG] Attached Dispatch To Map: ${dispatch.id}@${dispatch.location.coords}`);
        }
        else {
            console.warn(`[DEBUG] Could Not Attach Dispatch To Map: ${dispatch.id}@${dispatch.location.coords}`);
        }
    }
}