import { LngLatBoundsLike } from "@tomtom-international/web-sdk-maps";
import { postDB } from "./indexed_db";
import { map_inst } from "./shared/components/map/map";
import { BuildingEvents, DatabasePostOptions, GameEvents, MissionEvents, VehicleEvents } from "./shared/types/types";
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
    // @ts-expect-error
    // type not corectly implemented (https://developer.tomtom.com/maps-sdk-web-js/documentation#Maps.Map)
    map_inst.flyTo({ center: data.location.coords })
})