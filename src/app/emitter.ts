import { LngLatBoundsLike } from "@tomtom-international/web-sdk-maps";
import { postDB } from "./indexed_db";
import { map_inst } from "./shared/components/map/map";
import { BuildingEvents, DatabasePostOptions, GameEvents, MissionEvents, ShopItemData, VehicleEvents } from "./shared/types/types";
import tt, { LngLat } from "@tomtom-international/web-sdk-services";
import { API_KEY } from "./page";
var EventEmitter = require('events')

export const VehicleEmitter: VehicleEvents = new EventEmitter();
export const BuildingEmitter: BuildingEvents = new EventEmitter();
export const GameEmitter: GameEvents = new EventEmitter();
export const MissionEmitter: MissionEvents = new EventEmitter();

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

MissionEmitter.on('EVENT_MISSION_ITEM_TOGGLE', (data) => {
    // @ts-expect-error
    // type not corectly implemented (https://developer.tomtom.com/maps-sdk-web-js/documentation#Maps.Map)
    map_inst.flyTo({ center: data.location.coords })
})

MissionEmitter.on('EVENT_MISSION_START', (data) => {
    console.log(data);
    // @ts-expect-error
    // type not corectly implemented (https://developer.tomtom.com/maps-sdk-web-js/documentation#Maps.Map)
    map_inst.flyTo({ center: data.location.coords });
})

MissionEmitter.on('EVENT_MISSION_RESPOND', (data) => {
    console.log(data.mission);
    const mission_loc = data.mission.location.coords;
    data.responding.forEach((vhc: ShopItemData) => {

        const { lat, lng } = vhc.item_position;
        console.log(`${lat},${lng}:${mission_loc}`);

        tt.services.calculateRoute({
            key: API_KEY!,
            locations: `${lng},${lat}:${mission_loc}`,
            computeTravelTimeFor: 'all'
        })
            .then((r) => {
                const geojson = r.toGeoJson();
                map_inst.addLayer({
                    id: `route-${vhc.id}`,
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: geojson
                    },
                    paint: {
                        'line-color': 'rgb(204, 0, 0)',
                        'line-width': 5
                    }
                });
            })
            .catch((e) => {
                console.log(e);
                throw new Error(e);
            })
    });

    // also use vehicleHeight, vehicleLength, vehicleWidth, vehicleMaxSpeed, vehicleWeight  and travelMode: 'truck' for more realism
})