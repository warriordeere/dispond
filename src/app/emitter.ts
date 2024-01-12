import { db_save_active_mission, db_save_area, db_save_name, db_save_position, db_save_type, postDB } from "./indexed";
import { BuildingEvents, DatabasePostOptions, GameEvents, MissionEvents, ReadFileInterface } from "./shared/types/types";
var EventEmitter = require('events')

export const BuildingEmitter: BuildingEvents = new EventEmitter()
export const GameEmitter: GameEvents = new EventEmitter()
export const MissionEmitter: MissionEvents = new EventEmitter()

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