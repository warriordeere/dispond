import { db_save_area, db_save_name, db_save_position, db_save_type } from "./indexed";
import { BuildingEvents, GameEvents, ReadFileInterface } from "./shared/types/types";
var EventEmitter = require('events')

export const building: BuildingEvents = new EventEmitter()
export const game: GameEvents = new EventEmitter()

building.on('EVENT_SET_BUILDING_NAME', async (data) => {
    db_save_name({
        id: data.id,
        name: data.name
    })
})

building.on('EVENT_SET_BUILDING_POS', async (data) => {
    db_save_position({
        id: data.id,
        position: data.position
    })
})

building.on('EVENT_SET_BUILDING_TYPE', async (data) => {
    db_save_type({
        id: data.id,
        type: data.type
    })
})

building.on('EVENT_SET_MISSION_AREA', async (data) => {
    db_save_area({
        id: data.id,
        mission_area: data.mission_area
    })
})
