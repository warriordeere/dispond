'use client'

import '@shared/style/globals.css';
import '@shared/style/game.css'

import { useEffect, useState } from "react";
import { GameEmitter } from "../script/utils/emitter";

import TTMap from "../shared/components/map";
import RadioMenu from '../shared/components/modules/radio_module';
import MenuModule from '../shared/components/modules/menu_module';
import Toolbox from "../shared/components/toolbox";
import { App } from '../script/utils/app';

export default function Page() {
    const [renderLarge, setRenderLarge] = useState<boolean>(false);

    useEffect(() => {
        App.initMap();
        App.initBuildings();
        App.loadActiveDispatches();

        const session = crypto.randomUUID();
        const game_data = {
            game_id: "My Save",
            session_id: session
        };

        localStorage.setItem('game', JSON.stringify(game_data));
        sessionStorage.setItem('game_session', session);

        GameEmitter.emit('EVENT_GAME_START', {
            created: Date.now(),
            modified: Date.now(),
            game: {
                name: 'My Save',
                spawn: [13.5, 52.5]
            }
        });

        const url = new URLSearchParams(window.location.search);
        if (url.get('large_menu')) {
            setRenderLarge(true);
        }

    }, []);

    return (
        <>
            <Toolbox />
            <RadioMenu />
            <TTMap />
            {
                renderLarge ?
                    (
                        <MenuModule module_type="MENU_TYPE_LARGE" />
                    ) : (
                        <>
                            <MenuModule module_type="MENU_MODULE_TYPE_PRIMARY" />
                            <MenuModule module_type="MENU_MODULE_TYPE_SECONDARY" />
                        </>
                    )
            }
        </>
    )
}
