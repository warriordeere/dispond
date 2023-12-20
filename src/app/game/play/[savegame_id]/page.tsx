import { game } from "@/app/emitter";
import Sidebar from "../../../shared/components/sidebar/sidebar";
import { cst_fs } from "@/app/script/file/fs";
import { BaseDirectory, readDir } from "@tauri-apps/api/fs";

export async function generateStaticParams() {

    const savegames =
        new Array(await cst_fs.read({
            file: {
                path: 'Arcavigi Interactive/dispond/saves'
            }
        })
        )
    console.log(savegames);
    return savegames.map((savegame) => {
        console.log(savegame);
    })
}

export default function Page({ params }: { params: { savegame_id: string } }) {
    const { savegame_id } = params
    game.emit('start', savegame_id)
    return (
        <>
            <Sidebar data={{
                renderCallsButton: true,
                renderLocationButton: true,
                renderManageButton: true
            }} />
        </>
    )
}