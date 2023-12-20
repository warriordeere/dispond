import { db_save_area, db_save_name, db_save_position, db_save_type } from "./indexed";
import { BuildingEvents, GameEvents } from "./shared/types/types";
var EventEmitter = require('events')

export const building: BuildingEvents = new EventEmitter()
export const game: GameEvents = new EventEmitter()

building.on('set_name', async (data) => {
    db_save_name({
        id: data.id,
        name: data.name
    })
})

building.on('set_position', async (data) => {
    console.log(data);
    db_save_position({
        id: data.id,
        position: data.position
    })
})

building.on('set_type', async (data) => {
    db_save_type({
        id: data.id,
        type: data.type
    })
})

building.on('set_mission_area', async (data) => {
    db_save_area({
        id: data.id,
        mission_area: data.mission_area
    })
})