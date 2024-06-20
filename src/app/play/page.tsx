'use client'

import TTMap from "../shared/components/map";
import RadioMenu from '../shared/components/radio_menu';
import MenuModule from '../shared/components/menu_module';
import Toolbox from "../shared/components/toolbox";
import { GameEmitter } from "../emitter";

import { useEffect } from "react";

import '../shared/style/globals.css';
import '../shared/style/game.css'

export default function Page() {

    useEffect(() => {
        const session = crypto.randomUUID()
        const game_data = {
            game_id: "My Save",
            session_id: session
        }
        localStorage.setItem('game', JSON.stringify(game_data))
        sessionStorage.setItem('game_session', session);

        GameEmitter.emit('EVENT_GAME_START', {
            created: Date.now(),
            modified: Date.now(),
            game: {
                name: 'My Save',
                spawn: [13.5, 52.5]
            }
        })
    }, [])

    return (
        <>
            <Toolbox />
            <MenuModule module_type="MENU_MODULE_TYPE_PRIMARY" />
            <RadioMenu />
            <MenuModule module_type="MENU_MODULE_TYPE_SECONDARY" />
            <TTMap />
        </>
    )
}
