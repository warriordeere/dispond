'use client'

import { GameEmitter } from '@/app/emitter';
import { init } from '@/app/script/setup';
import Sidebar from '@/app/shared/components/sidebar/sidebar';
import { useEffect } from 'react';

export default function Page() {
    useEffect(() => {
        init();
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
        <Sidebar data={{
            renderCallsButton: true,
            renderLocationButton: true,
            renderManageButton: true,
            renderHomeButton: true
        }} />
    );
}