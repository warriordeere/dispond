import { map_inst } from "../../shared/components/map";

import tt from "@tomtom-international/web-sdk-maps";

import { Dispatch, generateMissionData } from "../gen/mission";
import { getDB } from "./idb";

import { BuildingInterface } from "@shared/types/building.types";
import { DatabaseGetOptions } from "@shared/types/idb.types";
import { GeometryData } from "@shared/types/ttcst.types";
import { AppMetaData } from "@shared/types/app.types";
import { LanguageString } from "@shared/types/types";
import { DispatchInterface } from "@/app/shared/types/dispatches.types";
import { dispatchTypeToString } from "./utils";

export const App = new class INTERNAL_APP_CLASS {

    async metadata(): Promise<AppMetaData> {
        return {
            app: 'dispond',
            copyright: ['Warrior Deere', 'Arcavigi Interactive'],
            language: LanguageString.LANGUAGE_STRING_DE_DE,
            version: '0.5.0'
        };
    }

    async initMap() {
        const spawnPoint = (await fetch('api/data/saves?filter=spawn'))
            .json()
            .then((r) => {
                return r[0] as [number, number];
            });

        const coords = tt.LngLat.convert(await spawnPoint);
        map_inst.easeTo({ center: coords });
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

        allBuildings.forEach((building: BuildingInterface) => {
            const marker = new tt.Marker({ draggable: false, color: '#ff0000' });
            const popup = new tt.Popup({ anchor: 'top', closeButton: false })

            if (!building.location.coords && !building.name) {
                throw new Error(`[ERROR] Unexpected Value`);
            }

            marker.setLngLat(building.location.coords);
            marker.addTo(map_inst);

            popup.setText(building.name);
            popup.addTo(map_inst);

            marker.setPopup(popup);
            marker.togglePopup();

            console.log(`[DEBUG] Spawned Building: ${building.id}@${building.location.coords}`);
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
            console.log(`[DEBUG] Spawned Active Dispatch: ${dispatch.id}@${dispatch.location.coords}`);
        });
    }

    private async loadDispatchUI(dispatch: DispatchInterface) {
        const mrk = new tt.Marker({ draggable: false, color: 'orange' });
        const pup = new tt.Popup({ anchor: 'top', closeButton: false });

        mrk.setLngLat(dispatch.location.coords);
        mrk.addTo(map_inst);

        pup.setHTML(`<strong>${await dispatchTypeToString(dispatch.type)}</strong><br>${dispatch.location.free_address}`);
        pup.addTo(map_inst);

        mrk.setPopup(pup);
        mrk.togglePopup();
    }
}