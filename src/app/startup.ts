import { game } from "./emitter";
import { cst_fs } from "./script/file/fs";

game.on('start', (savegame_id) => {
    console.log('game starting');    
    cst_fs.setupConfig({ auth: { game_id: savegame_id } })
})