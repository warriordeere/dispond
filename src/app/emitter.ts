import { db_get_active_missions, db_save_active_mission, db_save_area, db_save_name, db_save_position, db_save_type } from "./indexed";
import { BuildingEvents, GameEvents, MissionEvents, ReadFileInterface } from "./shared/types/types";
var EventEmitter = require('events')

export const BuildingEmitter: BuildingEvents = new EventEmitter()
export const GameEmitter: GameEvents = new EventEmitter()
export const MissionEmitter: MissionEvents = new EventEmitter()

BuildingEmitter.on('EVENT_SET_BUILDING_NAME', async (data) => {
    db_save_name({
        id: data.id,
        name: data.name
    })
})

BuildingEmitter.on('EVENT_SET_BUILDING_POS', async (data) => {
    db_save_position({
        id: data.id,
        position: data.position
    })
})

BuildingEmitter.on('EVENT_SET_BUILDING_TYPE', async (data) => {
    db_save_type({
        id: data.id,
        type: data.type
    })
})

BuildingEmitter.on('EVENT_SET_MISSION_AREA', async (data) => {
    db_save_area({
        id: data.id,
        mission_area: data.mission_area
    })
})

MissionEmitter.on('EVENT_MISSION_CREATE', (d) => {
    db_save_active_mission(d);
})