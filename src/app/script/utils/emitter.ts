import { API_KEY } from "../../page";

import { postDB } from "./idb";
import { animateRespond } from "./utils";
import EventEmitter from "events";

import { VehicleEvents, BuildingEvents, GameEvents, MissionEvents, MenuEvents } from "../../shared/types/emitter.types";
import { DatabasePostOptions } from "@shared/types/idb.types";
import { VehicleInterface } from "@/app/shared/types/vehicle.types";

export const VehicleEmitter: VehicleEvents = new EventEmitter();
export const BuildingEmitter: BuildingEvents = new EventEmitter();
export const GameEmitter: GameEvents = new EventEmitter();
export const MissionEmitter: MissionEvents = new EventEmitter();
export const MenuEmitter: MenuEvents = new EventEmitter();

BuildingEmitter.on('EVENT_BUILDING_CREATE', async (data) => {
    const options: DatabasePostOptions = {
        database: 'DB_SAVEGAME_DATA',
        store: 'DB_STORE_BUILDINGS',
        schema: 'SCHEMA_SAVEGAME_DATA',
        data: data
    }
    postDB(options);
})

MissionEmitter.on('EVENT_MISSION_CREATE', (data) => {
    const options: DatabasePostOptions = {
        database: 'DB_SAVEGAME_DATA',
        store: 'DB_STORE_ACTIVE_MISSIONS',
        schema: 'SCHEMA_SAVEGAME_DATA',
        data: data
    }
    postDB(options);
})

// MissionEmitter.on('EVENT_MISSION_ITEM_TOGGLE', (data) => {
//     // @ts-expect-error
//     // type not corectly implemented (https://developer.tomtom.com/maps-sdk-web-js/documentation#Maps.Map)
//     map_inst.flyTo({ center: data.location.coords })
// })

// MissionEmitter.on('EVENT_MISSION_RESPOND', (data) => {
//     const mission_loc = data.mission.location.coords;
//     data.responding.forEach((vhc: VehicleInterface) => {

//         const { lng, lat } = vhc.positon;
//         // also use vehicleHeight, vehicleLength, vehicleWidth, vehicleMaxSpeed, vehicleWeight  and travelMode: 'truck' for more realism

//         tt.services.calculateRoute({
//             key: API_KEY!,
//             locations: `${lng},${lat}:${mission_loc}`,
//             computeTravelTimeFor: 'all'
//         })
//             .then((r) => {
//                 const geojson = r.toGeoJson();
//                 // @ts-ignore [TODO] FIX-IT!!!
//                 animateRespond(geojson);

//                 // map_inst.addLayer({
//                 //     id: `route-${vhc.id}`,
//                 //     type: 'line',
//                 //     source: {
//                 //         type: 'geojson',
//                 //         data: geojson
//                 //     },
//                 //     paint: {
//                 //         'line-color': 'rgb(204, 0, 0)',
//                 //         'line-width': 5
//                 //     }
//                 // });

//                 // const rcd = geojson.features[0].geometry.coordinates;
//                 // const ttis = r.routes[0].summary.travelTimeInSeconds * 100;
//                 // const vhcmrk = new Marker({
//                 //     color: 'blue'
//                 // });

//                 // const stps = new LngLat(rcd[0][0] as number, rcd[0][1] as number)

//                 // vhcmrk.setLngLat(stps);
//                 // vhcmrk.addTo(map_inst);

//                 // let idx = 0;

//                 // const intv = setInterval(() => {
//                 //     if (idx < rcd.length - 1) {
//                 //         const cps = new LngLat(rcd[idx][0] as number, rcd[idx][1] as number);
//                 //         vhcmrk.setLngLat(cps);
//                 //         idx++;
//                 //     }
//                 //     else {
//                 //         clearInterval(intv);
//                 //         idx = 0;
//                 //         MissionEmitter.emit('EVENT_MISSION_START', mission_loc);
//                 //     }
//                 // }, ttis / rcd.length);
//             })
//             .catch((e) => {
//                 console.log(e);
//                 throw new Error(e);
//             })
//     });
// })