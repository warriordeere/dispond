import { db_save_area, db_save_name, db_save_position, db_save_type } from "./indexed";
import { BuildingEvents, GameEvents, gameConfigFile, savegameInterface } from "./shared/types/types";
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

// game.on('create', async (data) => {
//     console.log('[START]: create event caught');

//     const savesFileContent: savegameInterface[] = [{
//         game: {
//             name: data.game.name,
//             spawn: data.game.spawn
//         },
//         created: Date.now(),
//         modified: Date.now()
//     }]

//     const file = `Arcavigi Interactive/dispond/saves/saves.json`;
//     if (await exists(file, { dir: BaseDirectory.Document })) {
//         console.log('[START]: writing uuid to saves.json - exist?:true');
//         await readTextFile(file, { dir: BaseDirectory.Document })
//             .then(async (data) => {
//                 const dataArray = JSON.parse(data);
//                 dataArray.push(savesFileContent[0])
//                 const finalData = JSON.stringify(dataArray)
//                 return await writeTextFile(file, finalData, { dir: BaseDirectory.Document })
//                     .then(() => {
//                         console.log('write success1');
//                     })
//                     .catch((r) => {
//                         console.log('write failed1');
//                         throw new Error(r)
//                     })
//             })
//             .catch((r) => {
//                 console.log('write failed1.1');
//                 throw new Error(r)
//             })
//     }
//     else {
//         console.log('[START]: writing uuid to saves.json - exist?:false');
//         return await writeTextFile(file, JSON.stringify(savesFileContent), { dir: BaseDirectory.Document })
//             .then(() => {
//                 console.log('write success2');
//             })
//             .catch((r) => {
//                 console.log('write failed2');
//                 throw new Error(r)
//             })
//     }
// })