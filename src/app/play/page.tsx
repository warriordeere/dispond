'use client'

import '@shared/style/globals.css';
import '@shared/style/game.css'

import { useEffect } from "react";
import { GameEmitter } from "../script/utils/emitter";


import RadioMenu from '../shared/components/modules/radio_module';
import { MenuWrapper } from '../shared/components/modules/menu_module';
import Toolbox from "../shared/components/toolbox";
import { coreApp } from '../script/core/app';

import { coreMap } from '../script/core/map';
import TTMap from '../shared/components/map';

export default function Page() {
    useEffect(() => {
        coreMap.init();
        coreApp.initBuildings();
        coreApp.loadActiveDispatches();

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
    }, []);

    return (
        <>
            <Toolbox />
            <RadioMenu />
            <TTMap />
            <MenuWrapper />
        </>
    )
}
