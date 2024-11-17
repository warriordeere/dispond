'use client'

import '@shared/style/globals.css';
import '@shared/style/game.css'

import { useEffect } from "react";
import { GameEmitter } from "../script/utils/emitter";


import RadioMenu from '../shared/components/modules/radio_module';
import { MenuWrapper } from '../shared/components/modules/menu_module';
import Toolbox from "../shared/components/toolbox";
import { App } from '../script/utils/app';

import dynamic from 'next/dynamic';
const TTMap = dynamic(() => import('../shared/components/map'), { ssr: false });

export default function Page() {
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
